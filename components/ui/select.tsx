import React from "react";
import { cn } from "@/lib/utils";

// Replaced 'any' with a more specific type for better type safety.
const Select: React.FC<{
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}> = ({ value, onValueChange, className, children }) => {
  return (
    <div className={cn("relative inline-block w-full", className)}>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<{ value: string; onValueChange: (value: string) => void }>(child) &&
          (child.type as { displayName?: string }).displayName === "SelectContent"
        ) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "w-full text-left bg-white border rounded px-3 py-2 focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Removed unused 'value' from SelectContent props and its usage.
const SelectContent: React.FC<{
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onValueChange, className, children }) => {
  const handleItemClick = (child: React.ReactNode) => {
    if (
      React.isValidElement<{ value: string }>(child) &&
      child.props.value &&
      onValueChange
    ) {
      onValueChange(child.props.value);
    }
  };

  return (
    <div
      className={cn(
        "absolute z-10 mt-1 w-full bg-white border rounded shadow-lg",
        className
      )}
    >
      {React.Children.map(children, (child) => (
        <div onClick={() => handleItemClick(child)}>{child}</div>
      ))}
    </div>
  );
};

SelectContent.displayName = "SelectContent";

// Updated SelectItem to utilize the 'value' prop.
const SelectItem: React.FC<{
  value: string;
  className?: string;
  children: React.ReactNode;
}> = ({ value, className, children }) => {
  return (
    <div
      className={cn("px-3 py-2 hover:bg-gray-100 cursor-pointer", className)}
      data-value={value} // Added data attribute to use the 'value' prop.
    >
      {children}
    </div>
  );
};

SelectItem.displayName = "SelectItem";

const SelectValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, children, ...props }) => {
  return (
    <span className={cn("block truncate", className)} {...props}>
      {children}
    </span>
  );
};

// Added SelectGroup component to group SelectItems.
const SelectGroup: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <div className="py-2">
      <div className="px-3 py-1 text-sm font-medium text-gray-500">{label}</div>
      <div>{children}</div>
    </div>
  );
};

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup };