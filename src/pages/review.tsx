import Card from "@/components/schoolPageComponents/Card";
import Link from "next/link";

const review = () => {
  return (
    <div className="relative mx-auto flex flex-col gap-10 p-6 pt-2 md:py-20 lg:w-4/5 2xl:w-2/3">
      <div className="text-4xl text-blue-500">Stock Image Review</div>
      <div className="flex flex-col gap-10">
        <div className="relative grid gap-8 sm:grid-cols-3">
          <Link href="/review/K5">
            <Card
              title="K-5"
              description="Elementary School Images"
              img="/stock-images/K5/event/pexels-artempodrez-8088096.jpg"
              index={1}
            />
          </Link>

          <Link href="/review/MS">
            <Card
              title="Middle School"
              description="Middle School Images"
              img="/stock-images/MS/event/pexels-rdne-8500302.jpg"
              index={2}
            />
          </Link>

          <Link href="/review/HS">
            <Card
              title="High School"
              description="High School Images"
              img="/stock-images/HS/tutoring/pexels-mart-production-8472987.jpg"
              index={3}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default review;
