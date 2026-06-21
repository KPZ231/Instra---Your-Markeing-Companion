import { verifySession } from "@/lib/auth/dal";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Image from "next/image";

/**
 * Dashboard shell — server component.
 * Calls verifySession() which redirects to /login when unauthenticated.
 * Renders a single top bar: logo · pill nav · actions, then full-width main content.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await verifySession();

  return (
    <div className="flex flex-col h-dvh overflow-hidden bg-[#000000]">
      {/* ── Top bar ── */}
      <header
        className="flex items-center gap-4 px-4 py-2 shrink-0 border-b"
        style={{
          background: "var(--color-surface-container-lowest)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <Image
          className="shrink-0 select-none"
          src="/images/logos/logo_white_No_Subtitle_Transparent_Wide.png"
          alt="Logo"
          width={120}
          height={32}
        />

        {/* Pill nav — centred, takes all remaining space */}
        <div className="flex flex-1 justify-center min-w-0">
          <DashboardSidebar role={user.role} />
        </div>

        {/* Actions: search · bell · avatar */}
        <DashboardHeader user={user} />
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
