const Card = (props: any) => {
  const { title, description } = props;
  return (
    <div className="rounded-lg col-span-2 ">
      <div className="rounded-t-lg border-2 border-black h-48 ">card pic</div>
      <div className="p-2">
        <h1 className="font-medium">{title}</h1>
        <p className="line-clamp-4 text-ellipsis overflow-hidden ...">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
