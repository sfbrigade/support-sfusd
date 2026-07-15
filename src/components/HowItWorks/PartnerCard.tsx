import Image from "next/image";

type PartnerCardProps = {
  logoSrc: string;
  logoAlt: string;
  name: string;
  description: string;
};

const PartnerCard = ({
  logoSrc,
  logoAlt,
  name,
  description,
}: PartnerCardProps) => {
  return (
    <div className="flex items-center gap-[clamp(1rem,2vw,1.5rem)] rounded-2xl border border-gray-200 bg-white p-[clamp(1rem,1.6vw,1.25rem)] md:border-0 md:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <Image
        src={logoSrc}
        alt={logoAlt}
        width={85}
        height={85}
        className="hidden h-[clamp(3.5rem,6vw,85px)] w-[clamp(3.5rem,6vw,85px)] shrink-0 md:block"
      />
      <div className="flex flex-col gap-1">
        <h4 className="font-fredoka text-[clamp(1.125rem,1.6vw,1.375rem)] font-medium leading-tight tracking-[0.02em] text-brand-navy">
          {name}
        </h4>
        <p className="font-lato text-[clamp(0.9375rem,1.2vw,1.0625rem)] font-normal leading-6 tracking-[0.02em] text-brand-raisin">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PartnerCard;
