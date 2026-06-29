import type { ReactNode } from "react";

type StepBoxMobileProps = {
  stepNumber: number;
  title: string;
  description?: string;
  button?: ReactNode;
};

const StepBoxMobile = ({
  stepNumber,
  title,
  description,
  button,
}: StepBoxMobileProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[25px] bg-white p-5">
      <div className="bg-brand-sunglow flex h-9 w-9 shrink-0 items-center justify-center gap-[10px] rounded-full p-[10px]">
        <span className="text-brand-navy font-fredoka text-[24px] font-semibold leading-none tracking-[0.02em]">
          {stepNumber}
        </span>
      </div>

      <div className="flex w-full flex-col gap-6">
        <h3 className="text-brand-azure text-center font-fredoka text-[24px] font-medium leading-none">
          {title}
        </h3>
        {description && description.length > 0 && (
          <p className="text-brand-raisin font-lato text-base font-normal leading-6 tracking-[0.02em]">
            {description}
          </p>
        )}
        {button && <div className="w-full">{button}</div>}
      </div>
    </div>
  );
};

export default StepBoxMobile;
