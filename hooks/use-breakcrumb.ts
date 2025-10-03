import { usePathname } from "next/navigation";

const useBreadcrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  const breadcrumbItems = pathnames.map((_, index) => {
    const href = "/" + pathnames.slice(0, index + 1).join("/");
    const name = pathnames[index].replace(/-/g, " ");
    return { href, name };
  });
  return breadcrumbItems;
};
export default useBreadcrumb;
