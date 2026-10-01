import { requireAdmin } from "@/lib/server-auth";
import { DashboardFrame } from "@/components/dashboard/DashboardFrame";
export default async function DashboardLayout({children}:{children:React.ReactNode}){await requireAdmin();return <DashboardFrame>{children}</DashboardFrame>}
