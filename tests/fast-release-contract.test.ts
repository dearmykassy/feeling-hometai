import { describe, expect, it } from "vitest";
import { FAST_RELEASE_CONTRACT } from "@/lib/fast-release";

describe("Feeling Hometai fast-release contract", () => {
  it("uses one Feeling-owned namespace for every active release artifact", () => {
    expect(FAST_RELEASE_CONTRACT).toEqual({
      platformId: "feeling-hometai",
      builtOutputAuditSchema: "feeling-hometai-built-output-audit/v1",
      candidateBindingProtocol: "feeling-hometai-fast-candidate-binding/v1",
      aiCopyReviewSchema: "feeling-hometai-fast-ai-copy-review/v1",
      localChromiumQaSchema: "feeling-hometai-fast-local-chromium-qa/v1",
      candidateReceiptSchema: "feeling-hometai-fast-candidate/v1",
    });
    expect(Object.values(FAST_RELEASE_CONTRACT).join("\n")).not.toMatch(
      /rang(?:-therapy|-fast|-built)/iu,
    );
  });
});
