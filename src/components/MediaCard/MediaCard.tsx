import React from "react";
import { cn } from "../../utils";
import { Icons } from "../Icons";

interface MediaCardProps {
  title: string;
  subtitle: string;
  thumb: string;
  active: boolean;
  showRemoveButton: boolean;
  onClick: () => void;
  onRemove: (title: string) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  subtitle,
  thumb,
  active,
  showRemoveButton,
  onClick,
  onRemove,
}) => (
  <div
    className={cn(
      "flex cursor-pointer items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-2 shadow",
      {
        "border-black": active,
      },
    )}
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="relative h-20 w-20">
        <img
          alt={title}
          src={thumb}
          className="h-full rounded-xl object-cover"
        />
      </div>
      <div className="ml-4">
        <h3 className="font-bold">{title}</h3>
        <h4 className="text-sm font-medium text-gray-400">{subtitle}</h4>
      </div>
    </div>

    {showRemoveButton && (
      <button
        className="flex items-center space-x-1 rounded bg-black p-2 text-sm font-medium text-white"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(title);
        }}
      >
        <Icons.Trash className="h-4 w-4" />
        <span>Remove</span>
      </button>
    )}
  </div>
);
