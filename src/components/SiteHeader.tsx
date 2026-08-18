"use client";

import Link from "@/components/SiteLink";
import { useEffect, useState } from "react";
import { RegionSearch } from "@/components/RegionSearch";
import { PHONE_HREF } from "@/lib/business";

const NAV = [
  ["/areas/", "지역 찾기"],
  ["/pricing/", "코스 가격"],
  ["/guide/", "이용 방법"],
  ["/notice/", "운영 공지"],
  ["/blog/", "이용 정보"],
] as const;

function MenuButton({
  mobile = false,
  open,
  onOpen,
}: {
  mobile?: boolean;
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      aria-expanded={open}
      aria-label="전체 메뉴 열기"
      className={`menu-button ${mobile ? "menu-button--mobile" : "menu-button--desktop"}`}
      onClick={onOpen}
      type="button"
    >
      <span /><span /><span />
    </button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="header-top page-width">
          <Link className="brand" href="/" aria-label="필링홈타이 홈">
            <img
              className="brand-mark"
              src="/images/feeling-hometai-brand/v1/feeling-hometai-mark-openai-v1.png"
              alt=""
              width="48"
              height="48"
              aria-hidden="true"
            />
            <span>필링홈타이</span>
          </Link>

          <RegionSearch className="search-form search-form--header" />
          <MenuButton mobile open={open} onOpen={() => setOpen(true)} />
        </div>

        <nav className="header-nav" aria-label="주요 메뉴">
          <div className="nav-inner page-width">
            <MenuButton open={open} onOpen={() => setOpen(true)} />
            {NAV.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
            <a className="nav-phone" href={PHONE_HREF}>전화 문의</a>
          </div>
        </nav>
      </header>

      <button
        aria-label="메뉴 닫기"
        className={`drawer-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        type="button"
      />
      <aside className={`menu-drawer${open ? " is-open" : ""}`} aria-hidden={!open} aria-label="전체 메뉴">
        <div className="drawer-head">
          <p className="drawer-title">필링홈타이 메뉴</p>
          <button className="drawer-close" type="button" aria-label="메뉴 닫기" onClick={() => setOpen(false)}>×</button>
        </div>
        <RegionSearch className="search-form search-form--drawer" onNavigate={() => setOpen(false)} />
        <div className="drawer-links">
          <Link href="/" onClick={() => setOpen(false)}>홈</Link>
          {NAV.map(([href, label]) => <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
        </div>
        <div className="drawer-card">
          <span>24H CONSULTATION</span>
          <p className="drawer-card-title">서비스 주소와 희망 일정을 알려 주세요.</p>
          <p>이용 인원, 코스와 시간도 전화 문의에서 확인합니다.</p>
          <a href={PHONE_HREF}>전화 문의</a>
        </div>
      </aside>
    </>
  );
}
