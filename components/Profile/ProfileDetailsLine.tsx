import { cloneElement, ReactElement } from "react";

// Props type
type ProfileDetailsLineProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
  icon: ReactElement<{ className?: string }>;
  column?: boolean;
  wide?: boolean;
};

// The component
function ProfileDetailsLine({
  label,
  children,
  className,
  icon,
  column = false,
  wide = false,
}: ProfileDetailsLineProps) {
  // Clone the icon and apply a class
  const styledIcon = icon
    ? cloneElement(icon, { className: "w-4.5 h-4.5" })
    : null;

  // Returned JSX
  return (
    <div
      className={[
        "flex max-xs:items-start max-xs:mb-1",
        column ? "flex-col" : "items-start",
        !wide && "max-xs:flex-col",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-x-1.5">
        {styledIcon}
        <span className={`font-bold ${wide ? "w-36" : "w-30"}`}>{label}:</span>
      </div>
      <span className={!wide ? "max-xs:pl-6 max-xs:leading-5" : undefined}>
        {children}
      </span>
    </div>
  );
}

export default ProfileDetailsLine;
