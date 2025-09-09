import { cn } from "@/lib/utils";

// Type for the container component
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// The Container component
function Container({ children, className }: ContainerProps) {
  // Returned JSX
  return (
    <div className={cn("mx-auto max-w-6xl xl:max-w-7xl px-8", className)}>
      {children}
    </div>
  );
}

export default Container;
