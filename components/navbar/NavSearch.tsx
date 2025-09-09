import { Input } from "@/components/ui/input";

function NavSearch() {
  // Returned JSX
  return (
    <Input
      type="search"
      className="max-w-xs dark:bg-muted"
      placeholder="Search product..."
    />
  );
}

export default NavSearch;
