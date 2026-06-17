import { verifySession } from "@/lib/auth/dal";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

/**
 * Dashboard shell — server component.
 * Calls verifySession() which redirects to /login when unauthenticated.
 * Passes user role to sidebar for conditional admin link display.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await verifySession();

  return (
    <div className="flex h-dvh overflow-hidden bg-[#000000]">
      <DashboardSidebar role={user.role} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
