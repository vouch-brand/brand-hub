"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

function sectionIcon(src: string, alt: string) {
  return function Icon() {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className="w-5 h-5 rounded-md shrink-0 object-contain" />;
  };
}

const NAV = [
  {
    label: null,
    items: [{ label: "Home", href: "/", icon: HomeIcon }],
  },
  {
    label: "ASSETS",
    items: [
      { label: "Logo", href: "/logo", icon: sectionIcon("/assets/section-icons/logo.svg", "Logo") },
      { label: "Colours", href: "/colours", icon: sectionIcon("/assets/section-icons/colour-palette.svg", "Colours") },
      { label: "Typography", href: "/typography", icon: sectionIcon("/assets/section-icons/typography.svg", "Typography") },
      { label: "Visual Language", href: "/visual-graphics", icon: sectionIcon("/assets/section-icons/visual-graphics.svg", "Visual Language") },
      { label: "Iconography", href: "/iconography", icon: sectionIcon("/assets/section-icons/iconography.svg", "Iconography") },
      { label: "Photography", href: "/photography", icon: sectionIcon("/assets/section-icons/photography.svg", "Photography") },
    ],
  },
  {
    label: "BRAND STRATEGY",
    items: [
      { label: "Brand Overview", href: "/brand-overview", icon: sectionIcon("/assets/section-icons/brand-overview.svg", "Brand Overview") },
      { label: "Brand Voice & Messaging", href: "/brand-voice", icon: sectionIcon("/assets/section-icons/voice-messaging.svg", "Voice & Messaging") },
    ],
  },
  {
    label: "FUNCTIONAL",
    items: [
      { label: "Brand Application", href: "/brand-application", icon: sectionIcon("/assets/section-icons/brand-application.svg", "Brand Application") },
      { label: "Packaged Assets", href: "/assets", icon: sectionIcon("/assets/section-icons/packaged-assets.svg", "Packaged Assets") },
    ],
  },
];

function NavItems({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 px-2 py-3 space-y-4 overflow-y-auto">
      {NAV.map((section, si) => (
        <div key={si}>
          {section.label && (
            <p className="px-2 mb-1 text-[10px] font-body uppercase tracking-widest text-white/50 font-medium">
              {section.label}
            </p>
          )}
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (pathname === "/" && item.href === "/") {
                        e.preventDefault();
                        window.location.href = "/";
                        return;
                      }
                      onNavigate?.();
                    }}
                    className={`flex items-center gap-2.5 px-2 py-2 rounded text-sm font-body transition-all ${
                      active
                        ? "bg-white/10 text-white border-l-2 border-sea-blue-mid pl-[6px]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Mobile full-screen overlay
  if (mobileOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-sea-blue-dark flex flex-col md:hidden">
        {/* Header */}
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <Link href="/" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.location.href = "/"; } else { onMobileClose?.(); } }}>
            <Image
              src="/assets/logo/Vouch not white.svg"
              alt="Vouch"
              width={80}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>
          <button
            onClick={onMobileClose}
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Close navigation"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <NavItems pathname={pathname} onNavigate={onMobileClose} />

        <div className="border-t border-white/10 px-2 py-3 shrink-0">
          <a
            href="mailto:ian@vouchfor.com?subject=Brand Hub Feedback"
            className="flex items-center gap-2.5 px-2 py-2 rounded text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all font-body"
          >
            <FeedbackIcon className="w-4 h-4" />
            <span>Share Feedback</span>
          </a>
          <div className="px-2 pt-2 text-[10px] text-white/25 font-body">
            Last updated: May 2026 — v.1
          </div>
        </div>
      </div>
    );
  }

  // Desktop collapsed state
  if (collapsed) {
    return (
      <div className="hidden md:flex w-12 bg-sea-blue-dark flex-col items-center py-4 shrink-0 h-screen sticky top-0">
        <button
          onClick={() => setCollapsed(false)}
          className="text-white/60 hover:text-white transition-colors"
          title="Expand sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    );
  }

  // Desktop expanded state
  return (
    <aside className="hidden md:flex w-56 bg-sea-blue-dark flex-col shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/10">
        <Link href="/" className="block" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.location.href = "/"; } }}>
          <Image
            src="/assets/logo/Vouch not white.svg"
            alt="Vouch"
            width={80}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[10px] text-white/50 font-body leading-snug">The single source of truth for the Vouch brand.</span>
        </div>
      </div>

      <NavItems pathname={pathname} />

      {/* Footer */}
      <div className="border-t border-white/10 px-2 py-3 space-y-0.5">
        <a
          href="mailto:ian@vouchfor.com?subject=Brand Hub Feedback"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all font-body"
        >
          <FeedbackIcon className="w-4 h-4" />
          <span>Share Feedback</span>
        </a>
        <button
          onClick={() => setCollapsed(true)}
          className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all font-body"
        >
          <CollapseIcon className="w-4 h-4" />
          <span>Collapse</span>
        </button>
        <div className="px-2 pt-2 text-[10px] text-white/25 font-body">
          Last updated: May 2026 — v.1
        </div>
      </div>
    </aside>
  );
}

// Icons
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M2 6.5L8 2l6 4.5V14H10v-3H6v3H2V6.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

function FeedbackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M2 2h12v10H9l-3 2v-2H2V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

function CollapseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M10 3H3v10h7M10 5l-3 3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
