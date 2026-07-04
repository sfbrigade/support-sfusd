import type { ReactNode } from "react";

type StepBoxProps = {
  stepNumber: number;
  title: string;
  description?: string;
  button?: ReactNode;
};

const StepBox = ({ stepNumber, title, description, button }: StepBoxProps) => {
  return (
    <div className="flex items-start gap-6">
      <div className="bg-brand-sunglow flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-4">
        <span className="text-brand-navy font-fredoka text-[36px] font-semibold leading-none tracking-[0.02em]">
          {stepNumber}
        </span>
      </div>

      <div className="mt-2 flex flex-1 flex-col gap-6 rounded-2xl">
        <h3 className="text-brand-azure font-fredoka text-[32px] font-medium leading-none tracking-[0.02em]">
          {title}
        </h3>
        {description && description.length > 0 && (
          <p className="text-brand-raisin font-lato text-xl font-normal leading-8 tracking-[0.02em]">
            {description}
          </p>
        )}
        <div className="w-fit">{button}</div>
      </div>
    </div>
  );
};

export default StepBox;
