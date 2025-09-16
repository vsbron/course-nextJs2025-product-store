"use client";
import { useState } from "react";
import Image from "next/image";

import { SubmitButton } from "./Buttons";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { Button } from "../ui/button";
import { type actionFunction } from "@/utils/types";

// Type for Image Input Container props
type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

// The Image Input Container component
function ImageInputContainer(props: ImageInputContainerProps) {
  // Destructuring the props
  const { image, name, action, text } = props;

  // Setting state for form visibility
  const [isUpdateFormVisible, setIsUpdateFormVisible] =
    useState<boolean>(false);

  // Returned JSX
  return (
    <div className="mb-8">
      <Image
        src={image}
        width={200}
        height={200}
        className="rounded object-cover mb-4 w-[200px] h-[200px]"
        alt={name}
        priority
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsUpdateFormVisible((v) => !v)}
      >
        {text}
      </Button>
      {isUpdateFormVisible && (
        <div className="max-w-md mt-4">
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton size="sm" text={text} />
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default ImageInputContainer;
