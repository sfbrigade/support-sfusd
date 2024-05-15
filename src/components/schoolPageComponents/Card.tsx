const Card = (props: any) => {
  const { title, description } = props;
  return (
    <div className="rounded-lg ">
      <div className="h-48 rounded-t-lg border-2 border-black ">card pic</div>
      <div className="p-2">
        <h1 className="font-medium">{title}</h1>
        <p className="... line-clamp-4 overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
