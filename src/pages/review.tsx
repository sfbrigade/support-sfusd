import Card from "@/components/schoolPageComponents/Card";
import Link from "next/link";

const review = () => {
  return (
    <div className="relative mx-auto flex flex-col gap-10 p-6 pt-2 md:py-20 lg:w-4/5 2xl:w-2/3">
      <div className="text-5xl text-blue-500 mt-10">Stock Image Review</div>
      <div className="flex flex-col gap-10">
        <div className="relative grid gap-8 sm:grid-cols-3">
          <Link href="/review/K5" className="hover:shadow-2xl hover:shadow-blue-600">
            <Card
              title="K-5 Stock Images"
              description="Review the elementary school stock volunteer images."
              img="/stock-images/K5/event/pexels-artempodrez-8088096.webp"
              index={1}
            />
          </Link>

          <Link href="/review/MS" className="hover:shadow-2xl hover:shadow-blue-600">
            <Card
              title="Middle School Stock Images"
              description="Review the middle school stock volunteer images."
              img="/stock-images/MS/event/pexels-rdne-8500302.webp"
              index={2}
            />
          </Link>

          <Link href="/review/HS" className="hover:shadow-2xl hover:shadow-blue-600">
            <Card
              title="High School Stock Images"
              description="Review the high school stock volunteer images."
              img="/stock-images/HS/tutoring/pexels-mart-production-8472987.webp"
              index={3}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default review;
