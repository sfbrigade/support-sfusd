import Link from "next/link";
import StepBox from "@/components/HowItWorks/StepBox";

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
            className="bg-brand-sunglow text-brand-navy inline-flex items-center gap-[10px] rounded-lg px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] transition-opacity hover:opacity-90"
          >
            Take the Volunteer Survey
          </Link>
        }
      />

      <StepBox
        stepNumber={2}
        title="Explore Schools"
        description="Browse schools on the map and find one that's right for you."
        button={
          <Link
            href="/map"
            className="bg-brand-sunglow text-brand-navy inline-flex items-center gap-[10px] rounded-lg px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] transition-opacity hover:opacity-90"
          >
            Explore Schools
          </Link>
        }
      />

      <StepBox
        stepNumber={3}
        title="No button variant"
        description="This step has no CTA button."
      />
    </main>
  );
}
