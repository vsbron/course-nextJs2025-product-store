"use client";
import { useState } from "react";

import { Button } from "../ui/button";
import { COMMENT_EXPAND_LIMIT } from "@/utils/constants";

function Comment({ comment }: { comment: string }) {
  // Create state for expanded comment
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Expand comment toggle
  const toggleExpanded = () => {
    setIsExpanded((e) => !e);
  };

  // Set the short and long comment variations
  const longComment = comment.length > COMMENT_EXPAND_LIMIT;
  const displayComment =
    longComment && !isExpanded
      ? `${comment.slice(0, COMMENT_EXPAND_LIMIT)}...`
      : comment;

  // Returned JSX
  return (
    <div>
      <p className="text-sm">{displayComment}</p>
      {longComment && (
        <Button
          variant="link"
          className="pl-0 text-muted-foreground"
          onClick={toggleExpanded}
        >
          {isExpanded ? "Show less..." : "Show more..."}
        </Button>
      )}
    </div>
  );
}

export default Comment;
