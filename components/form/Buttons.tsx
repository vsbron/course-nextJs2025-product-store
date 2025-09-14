"use client";

import { useFormStatus } from "react-dom";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuTrash2, LuPenSquare } from "react-icons/lu";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

// Type for Submit Button props and button sized
type btnSize = "default" | "lg" | "sm";
type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

// The Submit Button component
export function SubmitButton({ className, text, size }: SubmitButtonProps) {
  // Get the pending state of the form
  const { pending } = useFormStatus();

  // Returned JSX
  return (
    <Button
      type="submit"
      className={cn("capitalize", className)}
      size={size}
      disabled={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
