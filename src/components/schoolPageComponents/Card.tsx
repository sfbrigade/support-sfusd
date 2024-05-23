import Image from "next/image";

const Card = (props: any) => {
  const { title, description, img, index } = props;

  return (
    <div className="rounded-lg">
      <Image
        src={img ? img : `/volunteer_img/stock${index + 1}.png`}
        alt="volunteer image"
        className="h-48 rounded-lg object-cover"
        width={1000}
        height={1000}
      />
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
