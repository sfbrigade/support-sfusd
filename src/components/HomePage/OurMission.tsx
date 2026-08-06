import Image from "next/image";

export default function OurMission() {
  return (
    <section className="flex min-h-dvh-with-fallback w-full items-center bg-[#E6F8FC] py-6 md:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="hidden items-end gap-8 md:flex lg:gap-10">
          <div className="w-full max-w-[660px]">
            <Image
              src="/home-page/Our-Mission.png"
              alt="Illustration showing a school and community members"
              width={750}
              height={460}
              className="h-auto w-full"
              priority={false}
            />
          </div>

          <div className="w-full rounded-[26px] bg-white p-8 lg:p-10">
            <h2 className="text-[48px] font-medium leading-none text-[#357BE8]">
              Our Mission
            </h2>

            <p className="mt-5 text-[24px] leading-[1.38] text-[#2A2A2A]">
              Our goal is to strengthen communities and neighborhoods by
              <span className="font-bold"> connecting people with their local schools.</span>
            </p>

            <p className="mt-8 text-[24px] leading-[1.38] text-[#2A2A2A]">
              We believe San Franciscans can be part of a school community,
              even if they aren&apos;t parents of current students.
            </p>
          </div>
        </div>

        <div className="md:hidden">
          <h2 className="text-center text-[64px] font-medium leading-none text-[#357BE8]">
            Our Mission
          </h2>

          <p className="mt-6 text-[20px] leading-[1.2] text-black">
            Our goal is to
            <span className="text-[#357BE8]"> strengthen communities and neighborhoods</span>
            <span> by connecting people with their local schools.</span>
          </p>

          <p className="mt-7 text-[20px] leading-[1.2] text-black">
            We believe
            <span className="text-[#357BE8]"> San Franciscans can be part of a school community,</span>
            <span> even if they aren&apos;t parents of current students.</span>
          </p>

          <div className="mt-8">
            <Image
              src="/home-page/Our-Mission.png"
              alt="Illustration showing a school and community members"
              width={900}
              height={900}
              className="h-auto w-full"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
