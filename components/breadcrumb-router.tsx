"use client";
import useBreadcrumb from "@/hooks/use-breakcrumb";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";

const BreadcrumbRouter = () => {
  const breadcrumbItems = useBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Songs Manager</BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbItems.map((item) => (
          <Fragment key={item.href}>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <Link className="capitalize" href={item.href}>
                {item.name}
              </Link>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbRouter;
