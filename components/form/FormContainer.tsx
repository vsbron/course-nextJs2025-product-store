"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { actionFunction } from "@/utils/types";

// Setting the initial state for message
const initialState = {
  message: "",
};

// Type for Form Container props
type FormContainerProps = {
  action: actionFunction;
  children: React.ReactNode;
};

// The Form Container component
function FormContainer({ action, children }: FormContainerProps) {
  // Getting the state and form action from the hook
  const [state, formAction] = useActionState(action, initialState);

  // Use effect that gets the message every time state is changed
  useEffect(() => {
    if (state.message) {
      toast("", { description: state.message });
    }
  }, [state]);

  // Returned JSX
  return <form action={formAction}>{children}</form>;
}

export default FormContainer;
