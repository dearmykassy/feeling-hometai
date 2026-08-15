import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ACTIVE_REGION_NODES, ACTIVE_ROOT_KEYS, getActiveStaticParams, getDirectChildren, getRootNode, resolveRegionNode } from "@/lib/regions";

function sha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

describe("canonical 1,291-region graph", () => {
  it("preserves the exact active set and hierarchy", () => {
    expect(ACTIVE_REGION_NODES).toHaveLength(1291);
    expect(ACTIVE_REGION_NODES.filter((node) => node.kind === "root")).toHaveLength(11);
    expect(ACTIVE_REGION_NODES.filter((node) => node.kind === "hub")).toHaveLength(127);
    expect(ACTIVE_REGION_NODES.filter((node) => node.kind === "representative")).toHaveLength(1153);
    expect(new Set(ACTIVE_REGION_NODES.map((node) => node.path))).toHaveLength(1291);
    expect(getActiveStaticParams()).toHaveLength(1291);
  });

  it("stays byte- and route-exact with the approved MassageBom region snapshot", () => {
    expect(
      sha256(
        readFileSync(new URL("../src/data/capital-regions.generated.json", import.meta.url)),
      ),
    ).toBe("0242e5d86894321cba66b7f747675115520d856c7aaada870869e19f247500d2");
    expect(
      sha256(
        readFileSync(
          new URL("../src/data/service-city-regions.generated.json", import.meta.url),
        ),
      ),
    ).toBe("72a318974585509632ba229307a954d01c40adcb8d98ff4ba6fbd1f1655f0d3d");
    expect(sha256(ACTIVE_REGION_NODES.map((node) => node.path).sort().join("\n"))).toBe(
      "8a80b8a8d68fd6e1f0db9e4c662c82d3dafd24b7a70a532fe8f71b0d16d8c29d",
    );
  });

  it("resolves every root and every generated path", () => {
    for (const key of ACTIVE_ROOT_KEYS) expect(getRootNode(key).rootKey).toBe(key);
    for (const node of ACTIVE_REGION_NODES) {
      expect(resolveRegionNode(node.segments)?.path).toBe(node.path);
      if (node.kind !== "representative") {
        expect(getDirectChildren(node).length).toBeGreaterThan(0);
      }
    }
  });
});
