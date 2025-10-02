import DashboardLayout from "@/components/Layouts/dashboard-layout";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
export default Layout;
