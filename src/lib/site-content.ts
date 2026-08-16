import { COURSE_SCORES, formatWon } from "@/lib/business";

export const SERVICE_STEPS = [
  ["01", "주소 확인", "서비스를 받을 도로명 주소와 건물명을 확인합니다."],
  ["02", "상담 문의", "희망 날짜·시각과 이용 인원을 전화로 전달합니다."],
  ["03", "코스 결정", "가격표를 보고 코스와 이용 시간을 정한 뒤 실제 가능 여부를 확인합니다."],
  ["04", "이용 후 결제", "서비스가 끝나면 현금 또는 카드로 현장에서 결제합니다."],
] as const;

export const SERVICE_FAQS = [
  ["예약금을 먼저 보내야 하나요?", "아니요. 선입금 없이 서비스가 끝난 뒤 현장에서 결제합니다."],
  ["지역별 가능 여부는 어떻게 확인하나요?", "서비스를 받을 주소와 희망 날짜·시각을 전화로 알려주시면 확인할 수 있습니다."],
  ["상담 전에 무엇을 정해야 하나요?", "이용 인원, 희망 코스와 시간, 서비스 주소를 정리해 주세요."],
  ["카드로 결제할 수 있나요?", "네. 현장에서 무선 카드 단말기로 결제할 수 있습니다."],
  ["두 명이 함께 신청할 수 있나요?", "네. 커플·부부를 위한 2인 동시 관리 프로그램을 운영합니다."],
  ["밤이나 새벽에도 문의할 수 있나요?", "네. 전화상담은 365일 24시간 운영합니다."],
  ["비품과 소독 기준이 있나요?", "일회용 비품을 사용하며 관리 전후 소독 원칙을 지킵니다."],
] as const;

export const NOTICE_ITEMS = [
  {
    slug: "phone-consultation",
    title: "전화상담 운영 시간",
    summary: "0508-202-3906 전화상담은 연중무휴 24시간 운영합니다.",
  },
  {
    slug: "consultation-details",
    title: "상담 시 확인하는 항목",
    summary: "서비스 주소, 희망 날짜·시각, 이용 인원, 코스와 시간을 전화로 확인합니다.",
  },
  {
    slug: "onsite-payment",
    title: "결제 시점 안내",
    summary: "예약금을 미리 받지 않으며 서비스 종료 후 현장에서 결제합니다.",
  },
  {
    slug: "card-payment",
    title: "카드 결제 안내",
    summary: "현장에서 무선 카드 단말기를 이용할 수 있습니다.",
  },
] as const;

export const COURSE_GROUPS = [...new Set(COURSE_SCORES.map((item) => item.course))].map(
  (course) => ({
    course,
    options: COURSE_SCORES.filter((item) => item.course === course).map((item) => ({
      minutes: item.minutes,
      price: formatWon(item.price),
    })),
  }),
);
