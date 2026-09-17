import Image from "next/image";

export default function OurMission() {
	return (
		<section
			className="flex w-full items-center bg-[#E6F8FC] pb-[60px] min-[810px]:min-h-dvh-with-fallback min-[810px]:pb-[80px]"
			style={{
				paddingTop: "calc(var(--navbar-top-offset, 0px) + clamp(5.5rem, 12vh, 7.5rem))",
			}}
		>
			<div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10 max-[809px]:max-w-[350px] max-[809px]:px-0 min-[810px]:max-[1199px]:max-w-[730px] min-[810px]:max-[1199px]:px-0 min-[1440px]:px-[72px] min-[1920px]:px-[88px] min-[2560px]:px-[96px]">
				<div className="hidden items-end gap-8 min-[1200px]:flex lg:gap-10 xl:gap-14">
					<div className="w-full max-w-[660px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[880px]">
						<Image
							src="/home-page/our-mission.svg"
							alt="Illustration showing a school and community members"
							width={750}
							height={460}
							className="h-auto w-full"
							priority={false}
						/>
					</div>

          <div className="w-full rounded-[26px] bg-white p-8 lg:p-10 xl:p-12 2xl:p-14">
            <h2 className="text-[48px] font-medium leading-none text-[#357BE8] lg:text-[52px] xl:text-[60px] min-[1440px]:text-[64px] min-[1920px]:text-[72px] min-[2560px]:text-[80px]">
              Our Mission
            </h2>

            <p className="mt-5 text-[24px] leading-[1.38] text-[#2A2A2A] lg:mt-6 lg:text-[26px] xl:text-[28px] min-[1440px]:text-[20px] min-[1920px]:text-[22px] min-[2560px]:text-[24px]">
              We believe public schools can be at the heart of every community
              and neighborhood. When more people give their time and talents,
              students thrive, schools flourish, and neighborhoods become
              stronger.
            </p>

            <p className="mt-8 text-[24px] leading-[1.38] text-[#2A2A2A] lg:mt-9 lg:text-[26px] xl:text-[28px] min-[1440px]:text-[20px] min-[1920px]:text-[22px] min-[2560px]:text-[24px]">
              Our goal is to connect community members with meaningful
              volunteer opportunities that support public schools and create
              lasting impact.
            </p>
          </div>
        </div>

        <div className="min-[1200px]:hidden">
          <h2 className="text-center text-[32px] font-medium leading-none text-[#357BE8] min-[810px]:text-[56px]">
            Our Mission
          </h2>

          <p className="mt-6 text-[14px] leading-[1.5] text-[#2A2A2A] min-[810px]:mt-8 min-[810px]:text-[16px]">
            We believe public schools can be at the heart of every community
            and neighborhood. When more people give their time and talents,
            students thrive, schools flourish, and neighborhoods become
            stronger.
          </p>

          <p className="mt-7 text-[14px] leading-[1.5] text-[#2A2A2A] min-[810px]:mt-4 min-[810px]:text-[16px]">
            Our goal is to connect community members with meaningful
            volunteer opportunities that support public schools and create
            lasting impact.
          </p>

          <div className="mt-8">
            <Image
              src="/home-page/our-mission.svg"
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
