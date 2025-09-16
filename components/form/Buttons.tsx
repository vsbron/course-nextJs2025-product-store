"use client";
import { useFormStatus } from "react-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { RxReload } from "react-icons/rx";
import { LucidePenSquare } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

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
          <RxReload className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

// Setting possible values for action type
type actionButtonType = "edit" | "delete";

// The Icon button component
export const IconButton = ({
  actionType,
}: {
  actionType: actionButtonType;
}) => {
  // Get the current form status
  const { pending } = useFormStatus();

  // Rendering icon function
  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LucidePenSquare />;
      case "delete":
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  // Returned JSX
  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <RxReload className="animate-spin" /> : renderIcon()}
    </Button>
  );
};

// Fave button for logged out users
export const CardSignInButton = () => {
  // Returned JSX
  return (
    <SignInButton mode="modal">
      <Button
        type="submit"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

// Fave button for logged in users
export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  // Get the form state
  const { pending } = useFormStatus();

  // Returned JSX
  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <RxReload className="animate-spin" />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};
