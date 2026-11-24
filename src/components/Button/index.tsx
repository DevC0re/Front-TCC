import s from "./button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  type = "submit",
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={s.button}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}