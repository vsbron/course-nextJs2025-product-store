import { Separator } from "@/components/ui/separator";
import AdminSidebar from "./Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Returned JSX
  return (
    <>
      <h2 className="text-2xl pl-4 mb-2">Dashboard</h2>
      <Separator className="mb-12" />
      <section className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-2">
          <AdminSidebar />
        </div>
        <div className="lg:col-span-10 px-4">{children}</div>
      </section>
    </>
  );
}

export default DashboardLayout;
