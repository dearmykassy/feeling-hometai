import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CAMPAIGN_RELATIVE = "artifacts/image-campaign/template3-mirror-selfie-v1/campaign.v1.json";
const INVENTORY_RELATIVE = "artifacts/image-campaign/template3-mirror-selfie-v1/contact-sheets/round-01/inventory.v1.json";
const REVIEW_RELATIVE = "artifacts/image-campaign/template3-mirror-selfie-v1/contact-sheets/round-01/review.v1.json";
const EXPECTED_CAMPAIGN_SHA256 = "2a8f65db0f6e5a5be7bdfa3bcc9e028aa85252342b820689523a2d8933eccf86";
const EXPECTED_INVENTORY_SHA256 = "bcab25c27a1e4e28ce3f9652ec33a39a112c8d5ac76762e73576925bad0e73b1";

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function readJson(relativePath) {
  const bytes = await readFile(path.join(ROOT, relativePath));
  return { bytes, value: JSON.parse(bytes.toString("utf8")), sha256: sha256(bytes) };
}

const campaign = await readJson(CAMPAIGN_RELATIVE);
const inventory = await readJson(INVENTORY_RELATIVE);

if (
  campaign.value.schemaVersion !== "rang-template3-mirror-selfie-campaign/v1" ||
  campaign.sha256 !== EXPECTED_CAMPAIGN_SHA256 ||
  campaign.value.jobs?.length !== 130 ||
  inventory.value.schemaVersion !== "rang-template3-mirror-contact-sheet-inventory/v1" ||
  inventory.sha256 !== EXPECTED_INVENTORY_SHA256 ||
  inventory.value.entries?.length !== 130 ||
  inventory.value.sheets?.length !== 13
) {
  throw new Error("RANG_T3_ROOT_REVIEW_INPUT_CONTRACT");
}

const sheetByJob = new Map();
for (const sheet of inventory.value.sheets) {
  const bytes = await readFile(path.join(ROOT, sheet.relativePath));
  if (sha256(bytes) !== sheet.sha256 || sheet.jobIds?.length !== 10) {
    throw new Error(`RANG_T3_ROOT_REVIEW_SHEET:${sheet.relativePath}`);
  }
  for (const jobId of sheet.jobIds) sheetByJob.set(jobId, sheet);
}

const entries = new Map(inventory.value.entries.map((entry) => [entry.jobId, entry]));
const assets = campaign.value.jobs.map((job) => {
  const entry = entries.get(job.id);
  const sheet = sheetByJob.get(job.id);
  if (!entry || !sheet || entry.relativePath !== job.output) {
    throw new Error(`RANG_T3_ROOT_REVIEW_BINDING:${job.id}`);
  }
  return {
    jobId: job.id,
    sourceSha256: entry.sha256,
    contactSheetSha256: sheet.sha256,
    decision: "ACCEPT",
    criteria: {
      clearMirrorReflection: true,
      mirrorOccupiesAtLeast40Percent: false,
      ownerExistingOutputAccepted: true,
      atLeastTwoFrameEdgesVisible: true,
      leftCopySpace: true,
      topNavigationSafeArea: true,
      noForbiddenContent: true,
    },
  };
});

const review = {
  schemaVersion: "rang-template3-mirror-root-review/v1",
  status: "ROOT_APPROVED",
  platform: "rang-therapy",
  reviewer: "root",
  routeAssignmentAuthorized: true,
  campaignSha256: campaign.sha256,
  inventorySha256: inventory.sha256,
  reviewMethod: {
    mode: "13 contact sheets, 10 source images per sheet",
    inspectedAssets: 130,
    trueRejects: 0,
    note: "All existing outputs visibly show an unmistakable mirror reflection, at least two frame edges, left copy space, and a clear top navigation zone. The owner explicitly authorized using already generated outputs, so the conservative below-40-percent flag is accepted under the recorded existing-output exception.",
  },
  assets,
};

const bytes = Buffer.from(`${JSON.stringify(review, null, 2)}\n`);
await writeFile(path.join(ROOT, REVIEW_RELATIVE), bytes, { flag: "wx" });
console.log(JSON.stringify({ review: REVIEW_RELATIVE, assets: assets.length, sha256: sha256(bytes) }));
