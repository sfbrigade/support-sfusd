import type { ReactNode } from "react";

type StepBoxMobileProps = {
  stepNumber: number;
  title: string;
  description?: ReactNode;
  button?: ReactNode;
};

const StepBoxMobile = ({
  stepNumber,
  title,
  description,
  button,
}: StepBoxMobileProps) => {
  return (
    <div className="relative flex flex-col items-center gap-4 rounded-[25px] bg-white p-5 pb-8 pt-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="absolute left-1/2 top-0 flex h-[54px] w-[54px] shrink-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[10px] rounded-full bg-brand-sunglow p-[10px]">
        <span className="font-fredoka text-[36px] font-semibold leading-none tracking-[0.02em] text-brand-navy">
          {stepNumber}
        </span>
      </div>

      <div className="flex w-full flex-col gap-6">
        <h3 className="text-center font-fredoka text-[24px] font-medium leading-none text-brand-azure">
          {title}
        </h3>
        {description && (
          <p className="font-lato text-base font-normal leading-6 tracking-[0.034em] text-brand-raisin">
            {description}
          </p>
        )}
        {button && <div className="w-full">{button}</div>}
      </div>
    </div>
  );
};

export default StepBoxMobile;
