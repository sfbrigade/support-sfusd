import Link from "next/link";
import StepBox from "@/components/HowItWorks/StepBox";
import StepBoxMobile from "@/components/HowItWorks/StepBoxMobile";

export default function StepBoxPreviewPage() {
  return (
    <main className="mx-auto max-w-xl space-y-6 bg-[#E9FAFC] p-10">
      <h1 className="font-fredoka text-3xl font-semibold">StepBox Preview</h1>

      <StepBox
        stepNumber={1}
        title="Take the Volunteer Survey"
        description="You can take our Volunteer Survey to find the best match for your interests. Or Explore Schools on your own."
        button={
          <Link
            href="/survey"
            className="inline-flex items-center gap-[10px] rounded-lg bg-brand-sunglow px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] text-brand-navy transition-opacity hover:opacity-90"
          >
            Take the Volunteer Survey
          </Link>
        }
      />

      <StepBox
        stepNumber={2}
        title="We Match You with Opportunities"
        description="Based on your responses we will connect you with our recommendation from our growing list of partner organizations, to set up a volunteer placement:"
      />

      <StepBox stepNumber={3} title="Partner Organizations" />

      <h2 className="pt-6 font-fredoka text-2xl font-semibold">
        Mobile Variant
      </h2>

      <div className="flex w-[392px] flex-col gap-4 bg-white px-[15px] py-[11px]">
        <StepBoxMobile
          stepNumber={1}
          title="Take the Volunteer Survey"
          description="You can take our Volunteer Survey to find the best match for your interests. Or Explore Schools on your own."
          button={
            <Link
              href="/survey"
              className="inline-flex w-full items-center justify-center gap-[10px] rounded-lg bg-brand-azure px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] text-white transition-opacity hover:opacity-90"
            >
              Take the Volunteer Survey
            </Link>
          }
        />

        <StepBoxMobile
          stepNumber={2}
          title="We Match You with Opportunities"
          description="Based on your responses we will connect you with our recommendation from our growing list of partner organizations, to set up a volunteer placement:"
        />

        <StepBoxMobile stepNumber={3} title="Partner Organizations" />
      </div>
    </main>
  );
}
