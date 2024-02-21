import { Children, MouseEvent, ReactNode } from "react";

/**
 * Buttons following design system
 *
 * style: selects a specific design style of button listed in our figma
 * children: content of the button
 * disabled: sets the button to disabled
 * destructive: sets the button in the state of destructive
 * href: hyperlink to navigate to
 * className: adding any other classes to the element
 * onClick: custom click Handler
 * rest: allows you to apply other button attributes as you would with a regular button element
 */

interface ButtonProps {
  style?: "Primary" | "Secondary" | "Tertiary" | "Customize";
  children?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  href?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  style,
  children,
  disabled,
  destructive,
  href,
  onClick,
  className = "",
  ...rest
}) => {
  var styleClass =
    "rounded-full px-4 p-2 text-md disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale ";

  switch (style) {
    case "Customize":
      break;
    case "Secondary":
      styleClass += "border-2 border-blue-500 ";
    case "Tertiary":
      styleClass += "text-blue-500 ";
      if (!disabled) {
        if (destructive) {
          styleClass +=
            "text-red-600 border-red-600 hover:text-red-800 focus:text-red-800 active:text-red-800 hover:border-red-800 focus:border-red-800 active:border-red-800";
        } else {
          styleClass +=
            "hover:border-blue-900 hover:text-blue-900 active:border-blue-900 active:text-blue-900 focus:border-blue-900 focus:text-blue-900";
        }
      } else {
        styleClass += "disabled:opacity-100";
      }
      break;
    case "Primary":
    default:
      styleClass += "bg-blue-500 ";

      if (!disabled) {
        if (destructive) {
          styleClass +=
            "bg-red-600 text-white hover:bg-red-800 focus:bg-red-800 activce:bg-red-800";
        } else {
          styleClass +=
            "hover:bg-blue-900 focus:bg-blue-900 active:bg-blue-900 text-white";
        }
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
      className={styleClass + " " + className}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
