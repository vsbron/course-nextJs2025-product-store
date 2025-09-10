import { cn } from "@/lib/utils";

// Empty List type
type EmptyListProps = {
  heading?: string;
  className?: string;
};

// The Empty List component
function EmptyList({ heading = "No items found.", className }: EmptyListProps) {
  // Returned JSX
  return <h2 className={cn("text-xl", className)}>{heading}</h2>;
}

export default EmptyList;
