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
    <div className="flex flex-col items-center gap-4 rounded-[25px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center gap-[10px] rounded-full bg-brand-sunglow p-[10px]">
        <span className="font-fredoka text-[24px] font-semibold leading-none tracking-[0.02em] text-brand-navy">
          {stepNumber}
        </span>
      </div>

      <div className="flex w-full flex-col gap-6">
        <h3 className="text-center font-fredoka text-[24px] font-medium leading-none text-brand-azure">
          {title}
        </h3>
        {description && description.length > 0 && (
          <p className="font-lato text-base font-normal leading-6 tracking-[0.02em] text-brand-raisin">
            {description}
          </p>
        )}
        {button && <div className="w-full">{button}</div>}
      </div>
    </div>
  );
};

export default StepBoxMobile;
