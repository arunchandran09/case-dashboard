import * as React from "react";

interface ComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Combobox({ value, onValueChange, children }: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        className="w-full border rounded px-3 py-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select an option"}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
          {React.Children.map(children, (child) => {
            if (React.isValidElement<ComboboxItemProps>(child)) {
              return React.cloneElement(child, {
                onClick: (val: string) => {
                  onValueChange(val);
                  setIsOpen(false);
                },
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
}

interface ComboboxItemProps {
  value: string;
  onClick?: (value: string) => void;
  children: React.ReactNode;
}

export function ComboboxItem({ value, onClick, children }: ComboboxItemProps) {
  return (
    <div
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick && onClick(value)}
    >
      {children}
    </div>
  );
}

export function ComboboxInput({ placeholder }: { placeholder: string }) {
  return <input className="w-full border rounded px-3 py-2" placeholder={placeholder} />;
}

export function ComboboxContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}