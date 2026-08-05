import React from "react";
import { Button } from "@/components/ui/button";

interface ViewMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function ViewMoreButton({ onClick, isLoading }: ViewMoreButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full text-[11px] text-muted-foreground hover:text-foreground py-1.5 h-auto mt-2 cursor-pointer"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "View More"}
    </Button>
  );
}
