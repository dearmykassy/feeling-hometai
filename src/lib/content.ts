import type { RegionNode } from "@/lib/regions";
import {
  ACTIVE_REGION_NODES,
  getOfficialRegionLabel,
  getSearchRegionLabel,
} from "@/lib/regions";

export const KEYWORD_FAMILIES = [
  "필링홈타이",
  "홈타이",
  "출장홈타이",
  "출장마사지",
  "출장안마",
  "출장타이마사지",
  "출장스웨디시",
  "출장아로마마사지",
] as const;

export const CONTENT_CORE_PHRASES = [
  "서비스를 받을 정확한 주소",
  "도로명과 건물명",
  "희망 시작 시각",
  "이용 인원",
  "연락받을 고객 번호",
  "코스별 시간",
  "해당 주소의 서비스 가능 여부",
  "표시 금액",
  "선입금 없는 현장 후불",
  "현장 카드 결제",
  "공식 전화번호",
  "건물 출입 방식",
  "당일 운영 여부",
  "주소·시각·코스·결제",
] as const;

export type ContentSection = { id: string; heading: string; paragraphs: string[] };
export type RegionContent = {
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  hooks: string[];
  sections: ContentSection[];
  ctaLabels: string[];
};

type RegionalSentenceTemplate = (node: RegionNode, label: string) => string;
type ElevenRegionalSentences = readonly RegionalSentenceTemplate[];
type RegionalSeoTemplate = (label: string) => string;
type ElevenRegionalSeoTemplates = readonly RegionalSeoTemplate[];

export type CuratedRegionalSentenceFamily =
  | "description"
  | "hook:0:0"
  | "hook:1:0"
  | "area-scope-check:p0:s0"
  | "area-scope-check:p1:s0"
  | "call-detail-order:p0:s0"
  | "call-detail-order:p1:s0"
  | "time-course-choice:p0:s0"
  | "time-course-choice:p1:s0"
  | "price-reference:p0:s0"
  | "price-reference:p1:s0"
  | "onsite-payment:p0:s0"
  | "onsite-payment:p1:s0"
  | "final-change-check:p0:s0"
  | "final-change-check:p1:s0";

export type CuratedSecondSentenceFamily =
  | "area-scope-check:p0:s1"
  | "area-scope-check:p1:s1"
  | "call-detail-order:p0:s1"
  | "call-detail-order:p1:s1"
  | "time-course-choice:p0:s1"
  | "time-course-choice:p1:s1"
  | "price-reference:p0:s1"
  | "price-reference:p1:s1"
  | "onsite-payment:p0:s1"
  | "onsite-payment:p1:s1"
  | "final-change-check:p0:s1"
  | "final-change-check:p1:s1";

type ParagraphPlan = readonly [CuratedRegionalSentenceFamily, CuratedSecondSentenceFamily];
type SecondSentenceBank = {
  classification: "verified-operating-fact" | "candidate-customer-guidance";
  sentences: readonly string[];
};

function regionalSentenceBank(...values: RegionalSentenceTemplate[]) { return values; }
function labeledBank(...values: string[]): ElevenRegionalSentences {
  return values.map((value) => (_node, label) => value.replaceAll("{label}", label));
}
function regionalSeoBank(...values: RegionalSeoTemplate[]) { return values; }
function second(
  classification: SecondSentenceBank["classification"],
  ...sentences: string[]
): SecondSentenceBank {
  return { classification, sentences };
}

export const CURATED_TITLE_BANK = regionalSeoBank(
  (label) => `${label} 필링홈타이 | 전화상담 이용 항목`,
  (label) => `${label} 필링홈타이 | 시간·코스·결제 안내`,
  (label) => `${label} 필링홈타이 | 코스 시간과 금액`,
  (label) => `${label} 필링홈타이 | 주소와 희망 시각 확인`,
  (label) => `${label} 필링홈타이 | 현장 후불 이용 안내`,
  (label) => `${label} 필링홈타이 | 24시간 전화상담`,
  (label) => `${label} 필링홈타이 | 서비스 요청 항목`,
  (label) => `${label} 필링홈타이 | 코스 선택과 카드 결제`,
  (label) => `${label} 필링홈타이 | 이용 전 확인 사항`,
  (label) => `${label} 필링홈타이 | 가격표와 일정 문의`,
  (label) => `${label} 필링홈타이 | 주소·시간 상담 안내`,
);

export const CURATED_H1_BANK = regionalSeoBank(
  (label) => `${label} 필링홈타이 이용 안내`,
  (label) => `${label} 홈타이 전화상담 안내`,
  (label) => `${label} 코스 시간과 금액 안내`,
  (label) => `${label} 서비스 주소와 일정 확인`,
  (label) => `${label} 현장 후불 홈타이 안내`,
  (label) => `${label} 필링홈타이 코스 안내`,
  (label) => `${label} 홈타이 이용 항목 확인`,
  (label) => `${label} 주소·시간·코스 상담`,
  (label) => `${label} 24시간 전화상담 안내`,
  (label) => `${label} 필링홈타이 가격 안내`,
  (label) => `${label} 홈타이 현장 결제 안내`,
);

export const CURATED_SECOND_SENTENCE_BANKS: Record<
  CuratedSecondSentenceFamily,
  SecondSentenceBank
> = {
  "area-scope-check:p0:s1": second("candidate-customer-guidance",
    "주소에 적힌 시·군·구와 읍·면·동을 순서대로 확인해 주세요.",
    "같은 이름의 지역이 있으면 상위 행정구역까지 같이 보세요.",
    "통칭보다 도로명 주소에 적힌 행정구역을 기준으로 고르세요.",
    "지역을 잘못 골랐다면 상위 지역으로 돌아가 다시 찾을 수 있습니다.",
    "서비스 주소에 적힌 지역명과 선택한 지역이 같은지 살펴보세요.",
    "주소 별칭은 지역 선택 기준에서 제외하세요.",
    "동 이름이 같을 때는 시·군·구 이름도 함께 확인해 주세요.",
    "주소 표기와 다른 별칭은 지역 선택 기준으로 쓰지 않습니다.",
    "서비스 주소의 마지막 행정구역 단위까지 확인해 주세요.",
    "지역명 검색 결과가 여러 개면 전체 지역명을 비교하세요.",
    "하위 지역이 없는 페이지에서는 다음 항목의 상세 주소를 확인하세요.",
  ),
  "area-scope-check:p1:s1": second("candidate-customer-guidance",
    "시간 후보와 코스 이름은 서로 다른 항목으로 적어 주세요.",
    "이용 인원은 상담 전에 숫자로 정리하세요.",
    "고객 연락 번호의 숫자를 한 번 살펴보세요.",
    "코스 후보가 여러 개라면 우선순위를 정하세요.",
    "시작 시각은 오전과 오후를 구분해 적으세요.",
    "전화로 물어볼 내용은 짧게 메모해 두세요.",
    "이용 시간은 가격표의 분 단위를 기준으로 고르세요.",
    "결제에 관한 질문은 통화할 때 따로 물어보세요.",
    "여러 명이 이용한다면 정확한 인원을 준비하세요.",
    "고객 연락 번호는 현재 사용하는 번호로 적으세요.",
    "시간과 코스를 정한 뒤 전화상담을 이용하세요.",
  ),
  "call-detail-order:p0:s1": second("candidate-customer-guidance",
    "동·호수와 공동현관 안내는 도로명 뒤에 덧붙이면 됩니다.",
    "도로명 주소가 없으면 지번과 건물명을 함께 알려 주세요.",
    "건물 입구가 여러 곳이면 사용할 출입구를 설명해 주세요.",
    "공동현관 절차는 주소와 구분해 짧게 알려 주세요.",
    "건물명이 비슷한 곳이 있으면 도로명도 함께 말해 주세요.",
    "상세 주소의 오탈자는 통화 전에 한 번 확인해 주세요.",
    "도로명, 건물명, 동·호수 순서로 말하면 됩니다.",
    "출입 제한이 있으면 필요한 내용만 상담 중 설명해 주세요.",
    "안내문에 적힌 건물명과 메모를 대조해 주세요.",
    "서비스 공간에 관한 요청은 주소와 별도로 알려 주세요.",
    "민감한 주소 정보는 전화상담에서 직접 전달해 주세요.",
  ),
  "call-detail-order:p1:s1": second("candidate-customer-guidance",
    "연락받을 고객 번호에 오타가 없는지도 확인해 주세요.",
    "여러 명이 이용하면 정확한 인원을 함께 말해 주세요.",
    "개인 요청은 코스 이름과 구분해 따로 설명해 주세요.",
    "이용 인원이 바뀌면 통화를 마치기 전에 알려 주세요.",
    "연락받을 고객 번호와 서비스 주소는 다른 항목입니다.",
    "질문이 있으면 주소 전달을 마친 뒤 차례로 물어보세요.",
    "예약자와 이용자가 다르면 이용 인원을 정확히 알려 주세요.",
    "현재 연락받을 고객 번호를 상담 중 전달해 주세요.",
    "이용 인원과 원하는 코스는 각각 나누어 말해 주세요.",
    "결제 방식에 관한 질문도 통화 중 함께 확인할 수 있습니다.",
    "전화상담에 필요한 내용만 미리 짧게 적어 두세요.",
  ),
  "time-course-choice:p0:s1": second("verified-operating-fact",
    "가능한 시작 시각은 24시간 전화상담에서 확인합니다.",
    "당일 운영 여부는 문의한 시점의 통화에서 확인합니다.",
    "희망 시각의 가능 여부는 전화상담 답변으로 정해집니다.",
    "서비스 일정은 해당 주소와 시각을 확인한 뒤 정합니다.",
    "같은 날에도 가능한 시간은 통화 시점에 따라 달라질 수 있습니다.",
    "주소와 희망 시각의 서비스 가능 여부는 전화로 확인합니다.",
    "전화상담은 하루 24시간 운영합니다.",
    "원하는 시간대가 가능한지는 통화로 물어봐야 합니다.",
    "일정이 바뀌면 새 희망 시각의 가능 여부를 다시 확인합니다.",
    "시작 시각은 전화상담에서 운영 상황을 확인한 뒤 정합니다.",
    "당일 요청도 24시간 전화상담에서 가능 여부를 확인합니다.",
  ),
  "time-course-choice:p1:s1": second("candidate-customer-guidance",
    "60분, 90분, 120분 중 필요한 시간을 가격표에서 확인하세요.",
    "앞뒤 약속과 겹치지 않는 코스 시간을 고르세요.",
    "코스가 끝나는 시각까지 계산해 일정을 정해 주세요.",
    "이용 가능한 시간보다 긴 코스는 선택하지 마세요.",
    "코스 후보가 두 개라면 우선순위를 정해 알려 주세요.",
    "시각을 먼저 정했다면 그때 가능한 코스를 물어보세요.",
    "코스를 먼저 골랐다면 가능한 시작 시간을 확인하세요.",
    "선택한 시작 시간과 코스 길이는 상담에서 함께 확인합니다.",
    "시간 조정 범위가 있으면 가장 원하는 시각과 나누어 말해 주세요.",
    "앞뒤 일정이 짧다면 짧은 코스부터 확인하세요.",
    "코스별 소요 시간은 가격표에 분 단위로 적혀 있습니다.",
  ),
  "price-reference:p0:s1": second("verified-operating-fact",
    "타이마사지 기본 60분은 80,000원으로 표시됩니다.",
    "아로마마사지 시작 코스는 60분 90,000원입니다.",
    "힐링마사지의 기본 시간은 60분이며 금액은 100,000원입니다.",
    "스페셜마사지 첫 시간표는 60분 110,000원입니다.",
    "타이마사지 90분 코스의 표시 금액은 100,000원입니다.",
    "120분 타이마사지는 120,000원으로 적혀 있습니다.",
    "아로마마사지 90분 이용 금액은 110,000원입니다.",
    "장시간 아로마마사지 120분은 130,000원입니다.",
    "힐링마사지 90분 항목에는 120,000원이 표시됩니다.",
    "힐링마사지 최장 120분 코스는 140,000원입니다.",
    "스페셜마사지 120분의 가격은 150,000원입니다.",
  ),
  "price-reference:p1:s1": second("candidate-customer-guidance",
    "실제 이용 가능한 코스는 희망 시각과 함께 전화로 확인하세요.",
    "가격표에서 후보를 고른 뒤 당일 운영 여부를 물어보세요.",
    "원하는 코스 이름과 시간을 통화 중 정확히 말해 주세요.",
    "코스 선택이 어렵다면 이용 시간과 예산을 먼저 알려 주세요.",
    "표시 금액은 코스명과 분 단위를 기준으로 확인하세요.",
    "코스가 바뀌면 시간과 금액도 다시 살펴보세요.",
    "원하는 관리 방식에 맞는 코스를 전화상담에서 문의하세요.",
    "같은 코스도 이용 시간에 따라 금액이 다릅니다.",
    "결정한 코스의 이름과 분 단위를 메모해 두세요.",
    "예산이 정해져 있으면 해당 범위의 코스를 먼저 확인하세요.",
    "가격표 확인 뒤 서비스 주소와 희망 시각을 함께 알려 주세요.",
  ),
  "onsite-payment:p0:s1": second("verified-operating-fact",
    "비용은 서비스를 받은 뒤 현장에서 결제합니다.",
    "예약금이나 선입금은 받지 않습니다.",
    "서비스가 끝난 다음 비용을 지불합니다.",
    "이용 전에 비용을 송금할 필요가 없습니다.",
    "서비스 이용은 100% 현장 후불 기준입니다.",
    "사전 결제 없이 서비스를 받은 뒤 현장에서 정산합니다.",
    "사전 송금은 하지 않고 비용을 현장에서 결제합니다.",
    "통화에서 정한 금액은 서비스를 받은 뒤 지불합니다.",
    "예약 과정에서 선입금을 요구하지 않습니다.",
    "결제는 이용 전이 아니라 이용을 마친 뒤 진행합니다.",
    "현장 후불이 기본 결제 방식입니다.",
  ),
  "onsite-payment:p1:s1": second("verified-operating-fact",
    "현장에서는 카드로 결제할 수 있습니다.",
    "이용을 마친 뒤 카드 결제가 가능합니다.",
    "후불 정산에는 카드 사용이 가능합니다.",
    "카드 결제도 서비스가 끝난 뒤 진행합니다.",
    "현장 결제에는 카드 사용이 가능합니다.",
    "카드로 지불해도 결제 시점은 이용 후입니다.",
    "현장 정산 때 카드 결제를 선택할 수 있습니다.",
    "카드는 선입금 없이 이용 뒤 현장 정산에 쓸 수 있습니다.",
    "카드 결제를 원한다면 상담 중 미리 알려 주세요.",
    "현장 카드 결제를 원하면 통화에서 말해 주세요.",
    "서비스 후 결제할 때 카드 사용이 가능합니다.",
  ),
  "final-change-check:p0:s1": second("candidate-customer-guidance",
    "기존 메모를 고치고 현재 내용만 남겨 주세요.",
    "새 주소의 서비스 가능 여부를 전화로 다시 확인하세요.",
    "희망 시각이 달라지면 가능한 시간을 다시 물어보세요.",
    "코스를 바꿀 때는 새 이용 시간과 금액도 확인하세요.",
    "인원 변경이 생기면 상담 중 바로 알려 주세요.",
    "연락받을 고객 번호가 바뀌면 현재 번호를 전달해 주세요.",
    "기존 메모와 다른 부분만 다시 설명해 주세요.",
    "변경 전 정보와 변경 후 정보를 섞어 말하지 마세요.",
    "일정 변경은 서비스 시작 전 전화상담으로 확인하세요.",
    "주소가 달라지면 지역 선택부터 다시 확인해 주세요.",
    "카드 이용 계획이 달라졌다면 지불 방법도 알려 주세요.",
  ),
  "final-change-check:p1:s1": second("candidate-customer-guidance",
    "통화 말미에는 주소와 희망 시각을 다시 확인하세요.",
    "코스 이름과 이용 시간이 맞는지 마지막으로 보세요.",
    "현장 후불과 카드 결제 계획도 같이 확인하세요.",
    "최종 메모에는 현재 주소와 시각만 남겨 주세요.",
    "상담에서 확인한 코스와 금액을 메모해 두세요.",
    "네 가지 상담 항목을 확인한 뒤 통화를 마치세요.",
    "연락받을 고객 번호도 끝에 한 번 더 확인해 주세요.",
    "이용 인원과 코스가 통화 내용과 같은지 살펴보세요.",
    "필요한 상담 항목이 빠지지 않았는지 확인하세요.",
    "일정이 정해지면 확인한 내용만 따로 남겨 두세요.",
    "수정할 항목이 없다면 주소와 코스만 다시 읽으세요.",
  ),
};

const REGION_ORDINAL = new Map(ACTIVE_REGION_NODES.map((node, index) => [node.id, index]));
function ordinalFor(node: RegionNode): number {
  const ordinal = REGION_ORDINAL.get(node.id);
  if (ordinal === undefined) throw new Error(`FEELING_HOMETAI_CONTENT_NODE_NOT_ACTIVE:${node.id}`);
  return ordinal;
}

export const CURATED_REGIONAL_SENTENCE_BANKS: Record<
  CuratedRegionalSentenceFamily,
  ElevenRegionalSentences
> = {
  description: labeledBank(
    "{label} 필링홈타이의 코스 시간과 금액, 서비스 주소와 희망 시각을 전화로 확인하는 방법, 선입금 없는 현장 후불 및 카드 결제 기준을 안내하며 전화상담은 24시간 운영합니다",
    "{label} 필링홈타이 이용 전에 확인할 주소, 희망 시간, 코스별 금액과 지불 방법을 정리했으며 선입금은 받지 않고 현장 카드 결제가 가능합니다",
    "{label} 홈타이 문의에 필요한 도로명 주소, 이용 인원, 시작 시각과 코스 정보를 안내하며 가능 여부는 24시간 전화상담에서 확인하고 결제는 현장 후불로 진행합니다",
    "{label} 필링홈타이에서 서비스 주소, 일정, 코스 시간과 표시 금액을 확인할 수 있으며 비용은 미리 받지 않고 이용 후 현장에서 카드로도 결제할 수 있습니다",
    "{label} 홈타이 문의 시 전화로 알려 줄 항목과 코스별 가격을 정리했으며 전화상담은 24시간 운영하고 비용은 선입금 없이 현장에서 후불로 결제합니다",
    "{label} 필링홈타이의 서비스 장소, 시간 선택, 코스와 가격표, 현장 결제 기준을 안내하며 해당 주소의 운영 여부는 24시간 전화로 문의할 수 있습니다",
    "{label} 홈타이를 문의할 때 필요한 서비스 주소와 연락받을 고객 번호, 희망 시각, 코스 정보를 안내하며 결제는 선입금 없이 이용 후 현장에서 진행합니다",
    "{label} 필링홈타이 이용 절차와 코스별 시간·금액을 정리했으며 주소와 희망 시각의 가능 여부는 전화로 확인하고 현장 후불과 카드 결제를 지원합니다",
    "{label} 홈타이 문의 전 준비할 주소, 이용 인원, 시간과 코스를 안내하며 24시간 전화상담으로 운영 여부를 확인하고 서비스 후 현장에서 결제합니다",
    "{label} 필링홈타이의 지역 안내와 가격표, 전화상담에 필요한 정보를 확인할 수 있으며 예약금이나 선입금은 없고 현장에서 카드 결제가 가능합니다",
    "{label} 홈타이 코스 시간과 표시 금액, 서비스 요청에 필요한 주소와 희망 시각을 안내하며 상담은 24시간 가능하고 결제는 이용 후 현장에서 합니다",
  ),
  "hook:0:0": labeledBank(
    "{label} 상담에는 서비스 주소와 희망 시각, 코스, 이용 인원을 알려 주세요",
    "{label} 이용 전 도로명과 건물명, 원하는 시간을 확인해 주세요",
    "{label} 문의 전에 주소, 시작 시각, 코스 이름을 적어 두세요",
    "{label} 서비스 요청에는 정확한 주소와 연락받을 고객 번호가 필요합니다",
    "{label} 홈타이 상담 전 이용할 주소와 코스 시간을 정해 주세요",
    "{label} 문의에는 도로명 주소, 이용 인원, 희망 시간을 준비해 주세요",
    "{label} 서비스 주소와 출입 안내는 나누어 알려 주세요",
    "{label} 일정과 예산에 맞는 코스를 가격표에서 확인해 주세요",
    "{label} 상담 메모는 주소, 시간, 코스 순서로 적어 주세요",
    "{label} 이용 장소가 정해지면 건물명과 희망 시각을 확인해 주세요",
    "{label} 전화상담 전에 이용 인원과 코스 후보를 정해 주세요",
  ),
  "hook:1:0": labeledBank(
    "{label} 운영 여부는 24시간 전화상담에서 확인하며 결제는 이용 후 현장에서 합니다",
    "{label} 서비스 가능 시각은 전화로 확인하고 비용은 선입금 없이 후불로 결제합니다",
    "{label} 코스와 시작 시각은 상담에서 정하며 현장 카드 결제가 가능합니다",
    "{label} 주소와 시간의 가능 여부를 확인한 뒤 코스를 정해 주세요",
    "{label} 이용 비용은 미리 받지 않으며 서비스 후 현장에서 정산합니다",
    "{label} 당일 운영 시간은 통화로 확인하고 카드 결제 계획도 알려 주세요",
    "{label} 상담은 24시간 가능하며 선입금 없는 현장 후불로 이용합니다",
    "{label} 원하는 시간대와 코스가 가능한지는 전화상담에서 확인합니다",
    "{label} 가격표를 확인한 뒤 주소와 희망 시각을 전화로 알려 주세요",
    "{label} 서비스 일정은 요청 내용을 통화로 확인한 뒤 정해집니다",
    "{label} 결제는 이용 후 현장에서 하며 카드도 사용할 수 있습니다",
  ),
  "area-scope-check:p0:s0": regionalSentenceBank(
    (node, label) => node.kind === "representative" ? `${label} 서비스 주소는 도로명과 건물명까지 확인하세요` : `${label} 아래 목록에서 서비스 주소와 같은 지역을 고르세요`,
    (node, label) => node.kind === "representative" ? `${label} 상세 주소의 지역명과 도로명 표기를 확인하세요` : `${label} 하위 지역 중 주소에 적힌 이름을 선택하세요`,
    (node, label) => node.kind === "representative" ? `${label} 지역명만 쓰지 말고 전체 도로명 주소를 준비하세요` : `${label} 서비스 주소에 맞는 읍·면·동을 목록에서 찾으세요`,
    (node, label) => node.kind === "representative" ? `${label} 도로명과 건물명이 맞는지 먼저 살펴보세요` : `${label} 세부 지역은 건물 주소의 행정구역을 기준으로 고르세요`,
    (node, label) => node.kind === "representative" ? `${label} 상담 전에 서비스 주소의 오탈자를 확인하세요` : `${label} 주소에 적힌 하위 행정구역을 선택해 주세요`,
    (node, label) => node.kind === "representative" ? `${label} 건물 안내에 나온 주소를 상담 메모와 맞춰 보세요` : `${label} 목록에서 서비스 주소와 같은 지역명을 찾으세요`,
    (node, label) => node.kind === "representative" ? `${label} 도로명 주소와 건물 이름을 함께 준비하세요` : `${label} 같은 이름이 있으면 상위 지역까지 보고 선택하세요`,
    (node, label) => node.kind === "representative" ? `${label} 상세 주소는 전화상담에서 직접 알려 주세요` : `${label} 통칭이 아닌 주소의 행정구역을 기준으로 고르세요`,
    (node, label) => node.kind === "representative" ? `${label} 서비스 장소의 도로명 표기를 확인해 주세요` : `${label} 도로명 앞에 적힌 지역을 목록에서 찾으세요`,
    (node, label) => node.kind === "representative" ? `${label} 주소 변경 여부를 통화 전에 확인하세요` : `${label} 서비스 주소에 맞는 세부 지역을 선택하세요`,
    (node, label) => node.kind === "representative" ? `${label} 건물명과 동·호수는 나누어 메모하세요` : `${label} 하위 지역 선택 뒤 도로명과 건물명을 준비하세요`,
  ),
  "area-scope-check:p1:s0": labeledBank(
    "{label} 희망 시각과 코스 후보를 따로 정하세요", "{label} 이용 인원을 숫자로 적어 두세요", "{label} 다음 확인 항목은 시작 시간과 코스입니다", "{label} 연락받을 고객 번호를 준비하세요", "{label} 코스 시간과 예산을 함께 살펴보세요", "{label} 전화상담용 메모를 준비하세요", "{label} 원하는 시각의 우선순위를 정하세요", "{label} 이용할 코스의 분 단위를 고르세요", "{label} 결제 관련 질문을 따로 적으세요", "{label} 문의 전 이용 인원을 확인하세요", "{label} 현장 결제 방식을 확인하세요",
  ),
  "call-detail-order:p0:s0": labeledBank(
    "{label} 전화상담에서는 도로명과 건물명을 먼저 알려 주세요", "{label} 문의 시 서비스를 받을 정확한 주소를 말해 주세요", "{label} 상담 메모 첫 줄에는 도로명 주소를 적어 주세요", "{label} 서비스 주소는 건물명까지 전화로 전달해 주세요", "{label} 상담은 주소의 행정구역과 도로명을 말하는 데서 시작합니다", "{label} 이용 장소의 도로명과 건물명을 통화 중 알려 주세요", "{label} 주소가 길면 도로명과 건물명을 나누어 말해 주세요", "{label} 서비스 장소가 바뀌었다면 새 주소를 먼저 알려 주세요", "{label} 전화 문의에는 현재 서비스 주소를 사용해 주세요", "{label} 상담 전 지도에서 도로명 주소를 확인해 주세요", "{label} 건물명만 알면 도로명 주소도 함께 찾아 주세요",
  ),
  "call-detail-order:p1:s0": labeledBank(
    "{label} 상담에서 이용 인원과 코스 이름을 알려 주세요", "{label} 문의에는 희망 시각과 이용 인원을 포함해 주세요", "{label} 개인 요청은 코스와 나누어 말해 주세요", "{label} 이용 인원과 코스 이름을 통화 중 알려 주세요", "{label} 상담 전에 이용 인원을 확인하세요", "{label} 동행 인원은 정확한 숫자로 알려 주세요", "{label} 개인 요청은 기본 상담 항목 뒤에 말해 주세요", "{label} 문의 내용에는 시작 시각과 코스를 넣어 주세요", "{label} 전화상담 메모에 이용 인원도 적어 주세요", "{label} 코스 후보가 현재 일정에 맞는지 확인하세요", "{label} 주소 전달 뒤 코스와 인원을 알려 주세요",
  ),
  "time-course-choice:p0:s0": labeledBank(
    "{label} 희망 시작 시각과 조정 가능한 시간을 나누어 알려 주세요", "{label} 일정에서 가장 원하는 시작 시간을 먼저 정하세요", "{label} 문의 전에 오전과 오후를 구분해 시각을 적으세요", "{label} 일정이 여러 개면 희망 시각의 순서를 정해 주세요", "{label} 서비스 시작 시간은 전화상담에서 확인하세요", "{label} 당일 요청에는 원하는 시간대를 알려 주세요", "{label} 희망 시각이 바뀌면 새 시간을 상담에 알려 주세요", "{label} 이용 가능한 시간 범위를 통화 전에 정하세요", "{label} 시작 시각은 코스 시간과 함께 정해 주세요", "{label} 다른 일정과 겹치지 않는 시작 시간을 고르세요", "{label} 원하는 시작 시각을 정확한 숫자로 알려 주세요",
  ),
  "time-course-choice:p1:s0": labeledBank(
    "{label} 코스는 이용 가능한 시간 안에서 골라 주세요", "{label} 일정에 맞는 코스 길이를 가격표에서 확인하세요", "{label} 코스 시간을 정할 때 종료 시각도 계산하세요", "{label} 이용 시간과 예산에 맞는 코스를 선택하세요", "{label} 원하는 코스의 분 단위를 메모해 주세요", "{label} 코스 후보는 이용 시간 기준으로 줄여 보세요", "{label} 관리 방식과 소요 시간을 함께 확인하세요", "{label} 사용 가능한 시간이 적다면 짧은 코스를 먼저 보세요", "{label} 코스 길이와 희망 시각을 함께 알려 주세요", "{label} 다음 일정 전까지 가능한 코스를 고르세요", "{label} 가격표에서 코스별 이용 시간을 확인하세요",
  ),
  "price-reference:p0:s0": labeledBank(
    "{label} 가격표는 코스 이름, 이용 시간, 금액 순서로 확인하세요", "{label} 코스별 분 단위와 표시 금액을 함께 살펴보세요", "{label} 원하는 코스의 시간별 금액을 가격표에서 확인하세요", "{label} 가격은 같은 코스에서도 이용 시간에 따라 다릅니다", "{label} 코스 이름과 분 단위를 같이 보고 금액을 확인하세요", "{label} 예산 범위에 맞는 코스를 가격표에서 찾으세요", "{label} 코스 후보마다 이용 시간과 금액을 적어 두세요", "{label} 타이, 아로마, 힐링, 스페셜 코스를 비교하세요", "{label} 표시 금액은 선택한 코스 시간을 기준으로 봅니다", "{label} 코스 결정 전 시간과 가격을 다시 확인하세요", "{label} 가격표에서 원하는 코스의 금액을 찾아보세요",
  ),
  "price-reference:p1:s0": labeledBank(
    "{label} 선택한 코스와 희망 시각을 전화로 알려 주세요", "{label} 코스 후보의 당일 운영 여부를 확인하세요", "{label} 상담 시 코스 이름과 이용 시간을 말해 주세요", "{label} 코스를 정하기 어렵다면 예산을 먼저 알려 주세요", "{label} 최종 코스는 전화상담에서 가능 여부를 확인합니다", "{label} 가격표 확인 후 이용할 코스를 메모하세요", "{label} 원하는 코스가 가능한지 통화로 물어보세요", "{label} 코스 변경 시 표시 금액도 다시 확인하세요", "{label} 이용 시간과 코스 이름을 함께 전달해 주세요", "{label} 예산과 이용 시간에 맞는 코스를 상담하세요", "{label} 코스 문의에는 희망 시작 시각도 포함해 주세요",
  ),
  "onsite-payment:p0:s0": labeledBank(
    "{label} 이용은 선입금 없는 현장 후불로 진행됩니다", "{label} 서비스 비용은 이용 후 현장에서 지불합니다", "{label} 예약금 없이 서비스를 받은 뒤 결제합니다", "{label} 비용을 미리 보내지 않고 현장에서 정산합니다", "{label} 결제 시점은 서비스가 끝난 뒤입니다", "{label} 선결제 없이 이용 후 비용을 지불합니다", "{label} 현장 후불 기준에 따라 선입금을 받지 않습니다", "{label} 상담에서 확인한 금액은 이용 후 결제합니다", "{label} 이용 전 예약금이나 비용을 받지 않습니다", "{label} 서비스 완료 뒤 현장에서 비용을 정산합니다", "{label} 비용은 전액 현장 후불로 결제합니다",
  ),
  "onsite-payment:p1:s0": labeledBank(
    "{label} 현장 결제에는 카드를 사용할 수 있습니다", "{label} 이용 후 카드로 결제할 수 있습니다", "{label} 카드 결제도 현장에서 진행됩니다", "{label} 현장 후불 때 카드 사용이 가능합니다", "{label} 카드로 결제하려면 상담 중 알려 주세요", "{label} 현장에서 카드로 결제할 수 있습니다", "{label} 카드 결제 시점도 서비스 이용 후입니다", "{label} 현장에서 카드로 비용을 지불할 수 있습니다", "{label} 카드 결제 계획은 통화 중 말해 주세요", "{label} 서비스 후 현장 카드 결제가 가능합니다", "{label} 현장 정산 시 카드를 사용할 수 있습니다",
  ),
  "final-change-check:p0:s0": labeledBank(
    "{label} 서비스 주소나 희망 시각이 바뀌면 전화로 다시 알려 주세요", "{label} 일정 변경이 생기면 새 시간을 먼저 확인하세요", "{label} 코스를 바꾸려면 새 이용 시간도 함께 알려 주세요", "{label} 주소 변경 시 해당 지역의 운영 여부를 다시 확인하세요", "{label} 이용 인원이 달라지면 전화상담에 알려 주세요", "{label} 연락받을 고객 번호 변경도 통화로 전달해 주세요", "{label} 상담 메모가 달라지면 필요한 내용을 고쳐 주세요", "{label} 변경된 내용은 기존 메모와 구분해 주세요", "{label} 시작 시각 변경은 서비스 전에 확인하세요", "{label} 서비스 장소가 달라지면 주소부터 다시 알려 주세요", "{label} 지불 방법이 바뀌면 카드 결제 계획도 알려 주세요",
  ),
  "final-change-check:p1:s0": labeledBank(
    "{label} 상담 끝에는 주소와 시작 시각을 다시 확인하세요", "{label} 최종 코스 이름과 이용 시간을 확인해 주세요", "{label} 통화 말미에 현장 결제 방식을 다시 물어보세요", "{label} 마지막 메모에는 현재 주소만 남겨 주세요", "{label} 확인한 코스와 금액을 따로 적어 두세요", "{label} 주소, 시각, 코스, 결제 순서로 다시 보세요", "{label} 고객 연락 번호도 끝에 확인하세요", "{label} 최종 이용 인원과 코스를 살펴보세요", "{label} 상담 항목이 빠지지 않았는지 확인하세요", "{label} 통화에서 정한 일정만 최종 메모에 남기세요", "{label} 고칠 내용이 없다면 주소와 코스를 다시 읽으세요",
  ),
};

function curatedRegionalSentence(ordinal: number, salt: number, family: CuratedRegionalSentenceFamily, node: RegionNode, label: string): string {
  const bank = CURATED_REGIONAL_SENTENCE_BANKS[family];
  return `${bank[(ordinal + salt * 13) % bank.length](node, label)}.`;
}
function curatedSecondSentence(ordinal: number, salt: number, family: CuratedSecondSentenceFamily): string {
  const bank = CURATED_SECOND_SENTENCE_BANKS[family].sentences;
  return bank[(ordinal + salt * 13) % bank.length];
}
function curatedSeoCopy(ordinal: number, salt: number, bank: ElevenRegionalSeoTemplates, label: string): string {
  return bank[(ordinal + salt * 13) % bank.length](label);
}
function makeSection(id: string, heading: string, plans: readonly [ParagraphPlan, ParagraphPlan], ordinal: number, saltStart: number, node: RegionNode, label: string): ContentSection {
  return {
    id,
    heading,
    paragraphs: plans.map(([firstFamily, secondFamily], index) =>
      `${curatedRegionalSentence(ordinal, saltStart + index * 2, firstFamily, node, label)} ${curatedSecondSentence(ordinal, saltStart + index * 2 + 1, secondFamily)}`,
    ),
  };
}

export function createRegionContent(node: RegionNode): RegionContent {
  const ordinal = ordinalFor(node);
  const searchLabel = getSearchRegionLabel(node);
  const officialLabel = getOfficialRegionLabel(node);
  const section = (id: string, heading: string, salt: number): ContentSection => makeSection(
    id,
    heading,
    [[`${id}:p0:s0`, `${id}:p0:s1`], [`${id}:p1:s0`, `${id}:p1:s1`]] as unknown as readonly [ParagraphPlan, ParagraphPlan],
    ordinal,
    salt,
    node,
    officialLabel,
  );
  return {
    title: `${searchLabel}홈타이 ${searchLabel}출장마사지 | 필링홈타이`,
    description: curatedRegionalSentence(ordinal, 40, "description", node, searchLabel),
    keywords: KEYWORD_FAMILIES.map((family) => `${searchLabel}${family}`),
    h1: curatedSeoCopy(ordinal, 39, CURATED_H1_BANK, officialLabel),
    eyebrow: "FEELING HOMETAI · LOCAL INFO",
    hooks: [
      curatedRegionalSentence(ordinal, 41, "hook:0:0", node, officialLabel),
      curatedRegionalSentence(ordinal, 42, "hook:1:0", node, officialLabel),
    ],
    sections: [
      section("area-scope-check", node.kind === "representative" ? `${officialLabel} 주소 확인` : `${officialLabel} 하위 지역 확인`, 0),
      section("call-detail-order", `${officialLabel} 전화상담에 필요한 내용`, 4),
      section("time-course-choice", `${officialLabel} 시간과 코스 정하기`, 8),
      section("price-reference", `${officialLabel} 가격표 확인`, 12),
      section("onsite-payment", `${officialLabel} 현장 결제 기준`, 16),
      section("final-change-check", `${officialLabel} 변경 사항과 최종 확인`, 20),
    ],
    ctaLabels: [
      "전화상담",
      "가격표 보기",
      node.kind === "representative" ? "상위 지역 보기" : "하위 지역 보기",
    ],
  };
}
