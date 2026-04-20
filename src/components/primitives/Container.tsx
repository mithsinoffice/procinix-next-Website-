import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
  as?: "div" | "section" | "header" | "footer" | "main";
};

const sizeMap = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[1400px]",
} as const;

export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: Props) {
  return (
    <Tag
      className={clsx(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        sizeMap[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
