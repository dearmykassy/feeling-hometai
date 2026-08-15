import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const CAMPAIGN_PATH = path.join(
  ROOT,
  "artifacts/image-campaign/template3-mirror-selfie-v1/campaign.v1.json",
);
const ROUND = "round-01";
const OUTPUT_ROOT = path.join(
  ROOT,
  "artifacts/image-campaign/template3-mirror-selfie-v1/contact-sheets",
  ROUND,
);
const EXPECTED_IMAGES = 130;
const COLUMNS = 2;
const ROWS = 5;
const TILE_WIDTH = 520;
const TILE_HEIGHT = 293;
const LABEL_HEIGHT = 34;
const GAP = 12;
const PADDING = 16;

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function fail(code) {
  throw new Error(`RANG_T3_CONTACT_SHEET_${code}`);
}

function sheetPath(index) {
  return path.join(OUTPUT_ROOT, `sheet-${String(index + 1).padStart(2, "0")}.png`);
}

async function createTile(job) {
  const sourcePath = path.join(ROOT, job.output);
  const source = await readFile(sourcePath).catch(() => fail(`MISSING:${job.id}`));
  const metadata = await sharp(source).metadata();
  if (
    metadata.format !== "png" ||
    !metadata.width ||
    !metadata.height ||
    metadata.width < 1200 ||
    metadata.height < 675 ||
    metadata.width / metadata.height < 1.68 ||
    metadata.width / metadata.height > 1.82
  ) {
    fail(`SOURCE_FORMAT:${job.id}`);
  }
  const photo = await sharp(source)
    .resize(TILE_WIDTH, TILE_HEIGHT, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  const label = Buffer.from(
    `<svg width="${TILE_WIDTH}" height="${LABEL_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#241a1c"/>
      <text x="14" y="23" fill="#fff" font-family="Arial, sans-serif" font-size="15" font-weight="700">${job.id} · lane ${job.lane}</text>
    </svg>`,
  );
  const tile = await sharp({
    create: {
      width: TILE_WIDTH,
      height: TILE_HEIGHT + LABEL_HEIGHT,
      channels: 4,
      background: "#241a1c",
    },
  })
    .composite([
      { input: photo, left: 0, top: 0 },
      { input: label, left: 0, top: TILE_HEIGHT },
    ])
    .png()
    .toBuffer();
  return {
    jobId: job.id,
    lane: job.lane,
    relativePath: job.output,
    sha256: sha256(source),
    bytes: source.length,
    width: metadata.width,
    height: metadata.height,
    tile,
  };
}

const campaign = JSON.parse(await readFile(CAMPAIGN_PATH, "utf8"));
if (
  campaign.schemaVersion !== "rang-template3-mirror-selfie-campaign/v1" ||
  campaign.platform !== "rang-therapy" ||
  campaign.jobs?.length !== EXPECTED_IMAGES ||
  new Set(campaign.jobs.map((job) => job.id)).size !== EXPECTED_IMAGES
) {
  fail("CAMPAIGN_CONTRACT");
}

const entries = [];
for (const job of campaign.jobs) entries.push(await createTile(job));
if (new Set(entries.map((entry) => entry.sha256)).size !== EXPECTED_IMAGES) {
  fail("DUPLICATE_SOURCE_BYTES");
}

await mkdir(OUTPUT_ROOT, { recursive: true });
const sheets = [];
for (let index = 0; index < entries.length; index += COLUMNS * ROWS) {
  const group = entries.slice(index, index + COLUMNS * ROWS);
  const width = PADDING * 2 + COLUMNS * TILE_WIDTH + (COLUMNS - 1) * GAP;
  const height = PADDING * 2 + ROWS * (TILE_HEIGHT + LABEL_HEIGHT) + (ROWS - 1) * GAP;
  const composites = group.map((entry, itemIndex) => ({
    input: entry.tile,
    left: PADDING + (itemIndex % COLUMNS) * (TILE_WIDTH + GAP),
    top: PADDING + Math.floor(itemIndex / COLUMNS) * (TILE_HEIGHT + LABEL_HEIGHT + GAP),
  }));
  const bytes = await sharp({
    create: { width, height, channels: 4, background: "#f7f1ef" },
  })
    .composite(composites)
    .png()
    .toBuffer();
  const output = sheetPath(index / (COLUMNS * ROWS));
  await writeFile(output, bytes, { flag: "wx" }).catch((error) => {
    if (error?.code === "EEXIST") fail(`OUTPUT_EXISTS:${path.basename(output)}`);
    throw error;
  });
  sheets.push({
    relativePath: path.relative(ROOT, output),
    sha256: sha256(bytes),
    width,
    height,
    jobIds: group.map((entry) => entry.jobId),
  });
}

const inventory = {
  schemaVersion: "rang-template3-mirror-contact-sheet-inventory/v1",
  platform: "rang-therapy",
  campaignRelativePath: path.relative(ROOT, CAMPAIGN_PATH),
  campaignSha256: sha256(await readFile(CAMPAIGN_PATH)),
  round: ROUND,
  status: "PENDING_ROOT_VISUAL_REVIEW",
  criteria: {
    mirrorSurfaceTarget: "40% of frame for newly generated candidates",
    mirrorFrameEdgesMinimum: 2,
    existingCandidatePolicy:
      "A root reviewer may accept a pre-existing candidate below the target only when the mirror reflection and at least two frame edges remain unmistakable.",
    required: [
      "clear mirror reflection",
      "adult Korean woman",
      "left copy space",
      "clean top navigation zone",
      "no text, logo, watermark, bed, or duplicate reflection",
    ],
  },
  entries: entries.map((entry) => ({
    jobId: entry.jobId,
    lane: entry.lane,
    relativePath: entry.relativePath,
    sha256: entry.sha256,
    bytes: entry.bytes,
    width: entry.width,
    height: entry.height,
  })),
  sheets,
};
const inventoryPath = path.join(OUTPUT_ROOT, "inventory.v1.json");
await writeFile(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ status: inventory.status, images: entries.length, sheets: sheets.length, inventory: path.relative(ROOT, inventoryPath) }));
