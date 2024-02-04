import { MouseEvent } from "react";

/**
 * Buttons following design system
 *
 * style: selects a specific design style of button listed in our figma
 * text: content of the button
 * disabled: sets the button to disabled
 * href: hyperlink to navigate to
 * className: adding any other classes to the element
 * onClick: custom click Handler
 * rest: allows you to apply other button attributes as you would with a regular button element
 */

interface ButtonProps {
  style?: "Primary" | "Secondary" | "Tertiary" | "Error" | "Success";
  text: string;
  disabled?: boolean;
  href?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  style,
  text,
  disabled,
  href,
  onClick,
  className = "",
  ...rest
}) => {
  var styleClass =
    className +
    " rounded-md px-4 h-10 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-25 disabled:grayscale ";

  switch (style) {
    case "Secondary":
      styleClass += "border-2 border-blue-500 ";
    case "Tertiary":
      styleClass += "text-blue-500 ";
      if (!disabled) {
        styleClass +=
          "hover:bg-slate-100 hover:border-blue-600 hover:text-blue-600 active:bg-slate-100 focus:bg-slate-100";
      }
      break;
    case "Error":
      styleClass += "border-2 border-rose-600 text-rose-600 ";
      if (!disabled) {
        styleClass +=
          "hover:bg-rose-50 active:border-red-800 active:text-red-800 active:bg-rose-50 focus:border-red-800 focus:text-red-800 focus:bg-rose-50";
      }
      break;
    case "Success":
      styleClass += "border-2 border-green-500 text-green-500 ";
      if (!disabled) {
        styleClass +=
          "hover:bg-green-50 active:border-green-800 active:text-green-800 active:bg-green-50 focus:border-green-800 focus:text-green-800 focus:bg-green-50";
      }
      break;
    case "Primary":
      styleClass += "bg-blue-500 text-white ";
      if (!disabled) {
        styleClass +=
          "hover:drop-shadow-md hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-600";
      }
      break;
    default:
      styleClass += "text-blue-500 ";
      if (!disabled) {
        styleClass +=
          "hover:text-blue-400 focus:text-blue-400 active:text-blue-600";
      }
      break;
  }

  function onButtonClick(event: MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      onClick(event);
    }
    if (href) {
      window.open(href, rest.target || "_self");
    } else {
    }
  }

  return (
    <button
      onClick={onButtonClick}
      disabled={disabled}
      className={styleClass}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
