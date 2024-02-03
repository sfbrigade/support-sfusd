const Button = (props: any) => {
  const { fill, text } = props;
  var styleClass = "rounded-md w-36 h-10 text-white text-sm font-medium";
  if (fill) {
    styleClass += " bg-blue-500";
  } else {
    styleClass += " border-2 border-blue-500 text-blue-500";
  }
  return <button className={styleClass}>{text}</button>;
};
export default Button;
