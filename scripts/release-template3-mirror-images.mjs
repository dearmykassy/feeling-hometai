import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ACTIVE_REGION_NODES } from "../src/lib/regions.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const CAMPAIGN_RELATIVE = "artifacts/image-campaign/template3-mirror-selfie-v1/campaign.v1.json";
const INVENTORY_RELATIVE = "artifacts/image-campaign/template3-mirror-selfie-v1/contact-sheets/round-01/inventory.v1.json";
const REVIEW_RELATIVE = "artifacts/image-campaign/template3-mirror-selfie-v1/contact-sheets/round-01/review.v1.json";
const MANIFEST_RELATIVE = "src/data/regional-image-assignments.template3.generated.json";
const RECEIPT_RELATIVE = "artifacts/image-release/feeling-hometai-template3-regional-release.v1.json";
const PUBLIC_ROOT = "public/assets/feeling-hometai/template3-regional";
const EXPECTED_ROUTES = 1291;
const EXPECTED_ASSETS = 130;
const PROFILES = {
  desktop: [1600, 900],
  tablet: [1200, 675],
  mobile: [768, 432],
};

function fail(code) {
  throw new Error(`FEELING_HOMETAI_T3_IMAGE_RELEASE_${code}`);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function readJson(relativePath, code) {
  const bytes = await readFile(path.join(ROOT, relativePath)).catch(() => fail(`${code}:MISSING`));
  try {
    return { bytes, value: JSON.parse(bytes.toString("utf8")), sha256: sha256(bytes) };
  } catch {
    fail(`${code}:JSON`);
  }
}

async function writeNewOrExact(relativePath, bytes) {
  const absolutePath = path.join(ROOT, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  try {
    await writeFile(absolutePath, bytes, { flag: "wx" });
    return;
  } catch (error) {
    if (error?.code !== "EEXIST") throw error;
    const existing = await readFile(absolutePath);
    if (!existing.equals(bytes)) fail(`NO_CLOBBER:${relativePath}`);
  }
}

function jsonBytes(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
}

function rgbToHex(rgb) {
  return `#${rgb.map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0")).join("")}`;
}

function darken(rgb, amount) {
  return rgb.map((value) => Math.round(value * (1 - amount)));
}

function luminance(rgb) {
  return rgb.map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrast(left, right) {
  const values = [luminance(left), luminance(right)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

async function paletteFor(source, width, height) {
  const sourceHeightPx = Math.max(1, Math.floor(height * 0.18));
  const sampleWidthPx = 64;
  const sampleHeightPx = 16;
  const sample = await sharp(source)
    .extract({ left: 0, top: 0, width, height: sourceHeightPx })
    .resize(sampleWidthPx, sampleHeightPx, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
  const sums = [0, 0, 0];
  for (let index = 0; index < sample.length; index += 3) {
    sums[0] += sample[index];
    sums[1] += sample[index + 1];
    sums[2] += sample[index + 2];
  }
  const count = sample.length / 3;
  const primaryRgb = sums.map((value) => Math.round(value / count));
  const secondaryRgb = primaryRgb.map((value, index) => Math.round(value * 0.78 + [88, 51, 61][index] * 0.22));
  const overlayRgb = darken(primaryRgb, 0.58);
  const white = [255, 255, 255];
  const black = [0, 0, 0];
  const whiteContrast = contrast(overlayRgb, white);
  const blackContrast = contrast(overlayRgb, black);
  const text = whiteContrast >= blackContrast ? "#ffffff" : "#000000";
  return {
    sourceStrip: { topPercent: 18, sourceHeightPx, sampleWidthPx, sampleHeightPx },
    primary: rgbToHex(primaryRgb),
    secondary: rgbToHex(secondaryRgb),
    navigation: {
      text,
      textContrastRatio: Number(Math.max(whiteContrast, blackContrast).toFixed(4)),
      overlay: rgbToHex(overlayRgb),
      gradient: text === "#ffffff"
        ? "linear-gradient(180deg, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.46) 62%, rgba(0, 0, 0, 0) 100%)"
        : "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.48) 62%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: "blur(18px)",
    },
  };
}

const campaignDoc = await readJson(CAMPAIGN_RELATIVE, "CAMPAIGN");
const inventoryDoc = await readJson(INVENTORY_RELATIVE, "INVENTORY");
const reviewDoc = await readJson(REVIEW_RELATIVE, "REVIEW");
const campaign = campaignDoc.value;
const inventory = inventoryDoc.value;
const review = reviewDoc.value;

if (
  campaign.schemaVersion !== "rang-template3-mirror-selfie-campaign/v1" ||
  campaign.platform !== "rang-therapy" ||
  campaign.jobs?.length !== EXPECTED_ASSETS ||
  inventory.schemaVersion !== "rang-template3-mirror-contact-sheet-inventory/v1" ||
  inventory.status !== "PENDING_ROOT_VISUAL_REVIEW" ||
  inventory.entries?.length !== EXPECTED_ASSETS ||
  review.schemaVersion !== "rang-template3-mirror-root-review/v1" ||
  review.status !== "ROOT_APPROVED" ||
  review.platform !== "rang-therapy" ||
  review.reviewer !== "root" ||
  review.routeAssignmentAuthorized !== true ||
  review.campaignSha256 !== campaignDoc.sha256 ||
  review.inventorySha256 !== inventoryDoc.sha256 ||
  review.assets?.length !== EXPECTED_ASSETS
) {
  fail("AUTHORITY_CONTRACT");
}

const inventoryByJob = new Map(inventory.entries.map((entry) => [entry.jobId, entry]));
const reviewByJob = new Map(review.assets.map((entry) => [entry.jobId, entry]));
const sheetByJob = new Map();
for (const sheet of inventory.sheets ?? []) {
  const bytes = await readFile(path.join(ROOT, sheet.relativePath));
  if (sha256(bytes) !== sheet.sha256) fail(`CONTACT_SHEET_SHA:${sheet.relativePath}`);
  for (const jobId of sheet.jobIds) sheetByJob.set(jobId, sheet);
}

const released = [];
for (const job of campaign.jobs) {
  const inventoryEntry = inventoryByJob.get(job.id);
  const reviewEntry = reviewByJob.get(job.id);
  const sheet = sheetByJob.get(job.id);
  const mirrorAreaAccepted =
    reviewEntry?.criteria?.mirrorOccupiesAtLeast40Percent === true ||
    (
      reviewEntry?.criteria?.mirrorOccupiesAtLeast40Percent === false &&
      reviewEntry?.criteria?.ownerExistingOutputAccepted === true
    );
  if (
    !inventoryEntry ||
    !reviewEntry ||
    !sheet ||
    reviewEntry.decision !== "ACCEPT" ||
    reviewEntry.sourceSha256 !== inventoryEntry.sha256 ||
    reviewEntry.contactSheetSha256 !== sheet.sha256 ||
    reviewEntry.criteria?.clearMirrorReflection !== true ||
    !mirrorAreaAccepted ||
    reviewEntry.criteria?.atLeastTwoFrameEdgesVisible !== true ||
    reviewEntry.criteria?.leftCopySpace !== true ||
    reviewEntry.criteria?.topNavigationSafeArea !== true ||
    reviewEntry.criteria?.noForbiddenContent !== true
  ) {
    fail(`VISUAL_REVIEW:${job.id}`);
  }
  const source = await readFile(path.join(ROOT, job.output));
  if (sha256(source) !== inventoryEntry.sha256) fail(`SOURCE_SHA:${job.id}`);
  const metadata = await sharp(source).metadata();
  if (metadata.format !== "png" || !metadata.width || !metadata.height) {
    fail(`SOURCE_DECODE:${job.id}`);
  }
  const palette = await paletteFor(source, metadata.width, metadata.height);
  const outputs = {};
  for (const [profile, [width, height]] of Object.entries(PROFILES)) {
    const relativePath = `${PUBLIC_ROOT}/${job.id}/${profile}.webp`;
    const bytes = await sharp(source)
      .resize(width, height, { fit: "cover", position: "centre" })
      .webp({ quality: 86, smartSubsample: true })
      .toBuffer();
    await writeNewOrExact(relativePath, bytes);
    outputs[profile] = {
      publicPath: `/${relativePath.replace(/^public\//u, "")}`,
      sha256: sha256(bytes),
      width,
      height,
      bytes: bytes.length,
    };
  }
  const provenanceRelative = `${PUBLIC_ROOT}/${job.id}/provenance.json`;
  const provenance = {
    schemaVersion: "feeling-hometai-template3-regional-image-provenance/v1",
    platform: "feeling-hometai",
    jobId: job.id,
    lane: job.lane,
    campaign: { relativePath: CAMPAIGN_RELATIVE, sha256: campaignDoc.sha256 },
    rootReview: { relativePath: REVIEW_RELATIVE, sha256: reviewDoc.sha256 },
    source: {
      relativePath: job.output,
      sha256: inventoryEntry.sha256,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    },
    outputs,
    palette,
  };
  await writeNewOrExact(provenanceRelative, jsonBytes(provenance));
  released.push({ job, inventoryEntry, palette, outputs, provenanceRelative });
}

if (released.length !== EXPECTED_ASSETS || ACTIVE_REGION_NODES.length !== EXPECTED_ROUTES) {
  fail("RELEASE_COUNTS");
}
const capacity = released.flatMap((asset, index) =>
  Array.from({ length: index < 121 ? 10 : 9 }, () => asset),
);
if (capacity.length !== EXPECTED_ROUTES) fail("DISTRIBUTION_MATH");

const routes = Object.fromEntries(ACTIVE_REGION_NODES.map((node, index) => {
  const asset = capacity[index];
  return [node.path, {
    assetId: asset.job.id,
    jobId: asset.job.id,
    sources: Object.fromEntries(Object.entries(asset.outputs).map(([profile, output]) => [profile, output.publicPath])),
    palette: asset.palette,
    provenance: `/${asset.provenanceRelative.replace(/^public\//u, "")}`,
  }];
}));
const distribution = {
  routes: EXPECTED_ROUTES,
  assets: EXPECTED_ASSETS,
  maxReuse: 10,
  assetsAtTen: 121,
  assetsAtNine: 9,
};
const manifest = {
  schemaVersion: "feeling-hometai-regional-image-assignments/v1",
  status: "ROOT_APPROVED_RELEASED",
  platformKey: "feeling-hometai",
  rootReview: {
    relativePath: REVIEW_RELATIVE,
    sha256: reviewDoc.sha256,
    reviewer: "root",
    routeAssignmentAuthorized: true,
  },
  derivativeProfiles: Object.fromEntries(Object.entries(PROFILES).map(([name, [width, height]]) => [name, { width, height }])),
  paletteSource: { strip: "top_18_percent_of_accepted_banner", topPercent: 18 },
  distribution,
  routes,
};
const manifestBytes = jsonBytes(manifest);
await writeNewOrExact(MANIFEST_RELATIVE, manifestBytes);

const receipt = {
  schemaVersion: "feeling-hometai-template3-regional-image-release-receipt/v1",
  status: "ROOT_APPROVED_RELEASED",
  platformKey: "feeling-hometai",
  assignmentManifest: { relativePath: MANIFEST_RELATIVE, sha256: sha256(manifestBytes) },
  rootReview: { relativePath: REVIEW_RELATIVE, sha256: reviewDoc.sha256, reviewer: "root" },
  distribution,
  sourceAssets: released.map((asset) => ({
    jobId: asset.job.id,
    assetId: asset.job.id,
    sourceSha256: asset.inventoryEntry.sha256,
    sourceDimensions: `${asset.inventoryEntry.width}x${asset.inventoryEntry.height}`,
    provenance: asset.provenanceRelative,
  })),
};
await writeNewOrExact(RECEIPT_RELATIVE, jsonBytes(receipt));
console.log(JSON.stringify({ status: receipt.status, routes: EXPECTED_ROUTES, assets: EXPECTED_ASSETS, webps: EXPECTED_ASSETS * 3, manifest: MANIFEST_RELATIVE, receipt: RECEIPT_RELATIVE }));
