import type { ReactNode } from "react";

type StepBoxProps = {
  stepNumber: number;
  title: string;
  description?: ReactNode;
  button?: ReactNode;
};

const StepBox = ({ stepNumber, title, description, button }: StepBoxProps) => {
  return (
    <div className="flex items-start gap-[clamp(1rem,2.2vw,1.5rem)]">
      <div className="flex h-[clamp(2.5rem,3.3vw,3rem)] w-[clamp(2.5rem,3.3vw,3rem)] shrink-0 items-center justify-center rounded-full bg-brand-sunglow">
        <span className="font-fredoka text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold leading-none tracking-[0.02em] text-brand-navy">
          {stepNumber}
        </span>
      </div>

      <div className="mt-2 flex flex-1 flex-col gap-[clamp(1rem,2.2vw,1.5rem)] rounded-2xl">
        <h3 className="font-fredoka text-[2rem] font-medium leading-none tracking-[0.02em] text-brand-azure">
          {title}
        </h3>
        {description && (
          <p className="font-lato text-[clamp(1rem,1.4vw,1.25rem)] font-normal leading-[1.6] tracking-[0.02em] text-brand-raisin">
            {description}
          </p>
        )}
        <div className="w-fit">{button}</div>
      </div>
    </div>
  );
};

export default StepBox;
