import Image from "next/image";
import { blurDataURL } from "@/lib/imageConfig";

const Card = (props: any) => {
  const { title, description, img, index } = props;

  return (
    <div className="rounded-lg">
      <div className="relative aspect-[16/9] rounded-lg">
        <Image
          src={img ? img : `/volunteer/event/stock${index + 1}.png`}
          alt="volunteer image"
          className="rounded-lg object-cover"
          fill
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="p-2">
        <h1 className="font-medium">{title}</h1>
        <p className="line-clamp-4 overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
