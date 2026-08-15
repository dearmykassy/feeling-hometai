import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const ROOT = path.resolve("artifacts/image-campaign/template3-mirror-selfie-v1");
const ORIGINALS_ROOT = "public/images/rang-template3/regional-originals";

const lanes = [
  ["A", "a tall softly backlit arched floor mirror with a slim brushed-brass frame", "warm ivory plaster and walnut dressing lounge", "a fully opaque mocha fine-knit long-sleeve top with charcoal tailored trousers"],
  ["B", "a large rounded-rectangle wall mirror with a pale oak frame, its complete outline clearly visible", "quiet cream hotel dressing vestibule with a travertine console", "a modest ivory long-sleeve blouse with cocoa wide-leg trousers"],
  ["C", "an oversized vertical oval mirror with a thin champagne-metal frame", "soft blush-beige wellness lounge with linen and light stone", "a fully buttoned muted-rose cardigan with dark tailored trousers"],
  ["D", "a beveled full-length mirror leaning safely against a walnut feature wall, with all four edges visible", "minimal warm-gray apartment dressing room with indirect cove light", "a cream tailored jacket over a high-neck taupe top and black trousers"],
  ["E", "a sculptural organic wavy mirror with a clean ivory frame, visibly occupying much of the scene", "contemporary off-white gallery-like dressing room with a single wood bench", "a soft gray fitted long-sleeve knit with charcoal pleated trousers"],
  ["F", "a broad three-panel vanity mirror with clear side seams and a softly lit perimeter", "refined hotel vanity lounge in sand and walnut tones", "an opaque high-neck beige jersey top with deep-brown tailored trousers"],
  ["G", "a smoked-bronze framed floor mirror with a clearly visible rectangular silhouette", "stone-and-walnut wellness lobby alcove with warm evening light", "a clean oversized taupe zip hoodie over a fully covered top with straight black trousers"],
  ["H", "a large circular wall mirror with a thin dark-bronze frame, fully readable as a mirror", "linen-toned private lounge with softly textured plaster and one low console", "a modest black fine-knit turtleneck with beige tailored trousers"],
  ["I", "a classic beveled full-length mirror with gently rounded upper corners and an illuminated edge", "mid-century cream-and-walnut dressing salon with restrained decor", "a fully opaque cream long-sleeve top with a charcoal midi skirt"],
  ["J", "a wide softly backlit arch mirror with a visible frame and generous reflective surface", "modern spa reception dressing alcove in muted olive, ivory, and walnut", "a muted-olive long-sleeve knit with black high-waisted trousers"],
];

const variants = [
  ["standing in a relaxed three-quarter pose, framed from mid-thigh upward", "long softly waved dark hair worn down", "warm indirect morning light"],
  ["standing straight with one free hand lightly resting near a console, framed from the knees upward", "long straight dark hair with a neat center part", "clean neutral daylight"],
  ["slightly angled toward the mirror with a calm closed-lip expression", "collarbone-length smooth dark lob, never chin-length or short", "soft late-afternoon light"],
  ["standing in a full-length fashion-editorial pose with both feet naturally grounded", "long dark hair tucked behind one ear", "subtle warm evening light"],
  ["holding the phone just below eye level in a natural three-quarter reflection", "long loose dark waves", "balanced diffused studio-like room light"],
  ["seated upright on a simple dressing stool, never on a bed, framed from the waist upward", "long straight dark hair", "soft window-side daylight"],
  ["standing slightly farther from the mirror so the frame and reflection are both unmistakable", "long dark hair in a low ponytail with soft face-framing strands", "gentle amber cove lighting"],
  ["turning her shoulders a few degrees while looking at the phone screen", "collarbone-length dark lob with softly curved ends, never a bob", "quiet overcast daylight"],
  ["standing beside a minimal console, one hand relaxed and visible", "long dark hair with natural volume", "warm sunset-toned indirect light"],
  ["taking a composed waist-up mirror portrait with the phone covering only part of one cheek", "long sleek dark hair", "bright soft morning light"],
  ["standing in a wider architectural composition that emphasizes the beautiful mirror outline", "long softly layered dark hair", "moody but clear evening illumination"],
  ["seated upright on a backless vanity stool with both shoulders relaxed, no bed in frame", "collarbone-length dark lob, below shoulder line and never short", "warm bedside-free lounge lighting"],
  ["captured in a natural just-before-the-photo moment, still and elegant rather than playful", "long dark hair worn down with a gentle side part", "premium softbox-like ambient light"],
];

const jobs = [];
for (let laneIndex = 0; laneIndex < lanes.length; laneIndex += 1) {
  const [lane, mirror, room, outfit] = lanes[laneIndex];
  for (let variantIndex = 0; variantIndex < variants.length; variantIndex += 1) {
    const sequence = laneIndex * variants.length + variantIndex + 1;
    const [pose, hair, light] = variants[variantIndex];
    const id = `rng-t3-rgn-${String(sequence).padStart(3, "0")}-v1`;
    const prompt = [
      "Generate ONLY a clean edge-to-edge 16:9 PHOTOGRAPH — not a website mockup, poster, advertisement, or interface.",
      "Absolutely no typography, letters, numbers, logos, buttons, navigation, graphic overlays, signs, or watermarks anywhere.",
      "Depict one clearly adult Korean woman age 26-32, naturally attractive and elegant, with a slim balanced build, taking a tasteful mirror selfie with a plain modern black smartphone.",
      "The scene must unmistakably feature " + mirror + "; the mirror surface and at least two frame edges must be plainly visible and the mirror should occupy at least 40% of the photograph.",
      "Setting: " + room + ". Outfit: " + outfit + ".",
      "Pose and crop: " + pose + ". Hair: " + hair + ". Lighting: " + light + ".",
      "Professional, calm, non-sensual wellness mood. Clothing is fully opaque and modest: no cleavage, no lingerie, no exposed midriff, no logos.",
      "Wide website composition: reserve the LEFT 48% as quiet low-detail negative space for Korean headline copy; place the woman and mirror on the RIGHT 42%.",
      "Keep the TOP 18% clean, low-detail, and darker than the center with ample space above her hair for a translucent navigation bar.",
      "Photorealistic high-end editorial camera, realistic skin and proportions, anatomically correct hands and reflection, subtle film grain.",
      "One person only; no duplicate reflection, extra limbs, warped phone, distorted mirror, bed, text, explicit content, or suggestive pose.",
    ].join(" ");

    jobs.push({
      id,
      lane,
      laneOrdinal: variantIndex + 1,
      prompt,
      output: `${ORIGINALS_ROOT}/lane-${lane.toLowerCase()}/${id}.png`,
      maxReuse: 10,
      reviewStatus: "PENDING",
    });
  }
}

if (jobs.length !== 130 || new Set(jobs.map((job) => job.id)).size !== 130) {
  throw new Error("CAMPAIGN_JOB_COUNT_INVALID");
}

const promptDigest = createHash("sha256")
  .update(jobs.map((job) => `${job.id}\n${job.prompt}\n`).join(""))
  .digest("hex");

const manifest = {
  schemaVersion: "rang-template3-mirror-selfie-campaign/v1",
  platform: "rang-therapy",
  status: "READY_FOR_GENERATION",
  visualDirection: {
    subject: "clearly adult Korean woman age 26-32",
    concept: "tasteful mirror selfie with a clearly visible premium mirror",
    referenceUse: "composition and mood only; never copy identity, face, exact pose, room, or clothing",
    copySide: "left",
    subjectSide: "right",
    topNavigationSafeArea: 0.18,
    minimumVisibleMirrorArea: 0.4,
    prohibited: ["minor appearance", "short pixie or chin bob", "lingerie", "cleavage", "exposed midriff", "bed", "text", "logo", "watermark", "duplicate reflection"],
  },
  assignmentMath: {
    regionalRoutes: 1291,
    maxReusePerOriginal: 10,
    requiredOriginals: 130,
    exactReuseDistribution: { "10": 121, "9": 9 },
  },
  lanes: Object.fromEntries(lanes.map(([lane]) => [lane, jobs.filter((job) => job.lane === lane).map((job) => job.id)])),
  promptDigest,
  jobs,
};

await mkdir(ROOT, { recursive: true });
await writeFile(path.join(ROOT, "campaign.v1.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(JSON.stringify({ jobs: jobs.length, promptDigest, output: path.join(ROOT, "campaign.v1.json") }, null, 2));
