"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/links";

function AdminSidebar() {
  // Getting the current path
  const pathname = usePathname();

  // Returned JSX
  return (
    <aside>
      {adminLinks.map(({ href, label }) => (
        <Button
          asChild
          className="w-full mb-2 capitalize font-normal"
          variant={pathname === href ? "default" : "ghost"}
          key={href}
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </aside>
  );
}

export default AdminSidebar;
