"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

function NavSearch() {
  // Get the search params and router function
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Create state value for search input text
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );

  // Handle search function (uses a delay of 300ms)
  const handleSearch = useDebouncedCallback((value: string) => {
    // Guard clause
    if (value.length < 3) return;

    // The logic
    const params = new URLSearchParams(searchParams);
    if (value) {
      // Set new params if something typed
      params.set("search", value);
    } else {
      // Clear the params otherwise
      params.delete("search");
    }
    // Redirect to products page with new params
    replace(`/products?${params.toString()}`);
  }, 300);

  // useEffect function that clears the state if there's no search params
  useEffect(() => {
    if (!searchParams.get("search")) setSearch("");
  }, [searchParams]);

  // Returned JSX
  return (
    <Input
      type="search"
      className="max-w-xs dark:bg-muted"
      placeholder="Search product..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}

export default NavSearch;
