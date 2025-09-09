import Link from "next/link";
import { VscCode } from "react-icons/vsc";

import { Button } from "@/components/ui/button";

function Logo() {
  // Returned JSX
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <VscCode className="w-8 h-8" />
      </Link>
    </Button>
  );
}

export default Logo;
