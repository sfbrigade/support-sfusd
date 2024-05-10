import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.school.createMany({
    data: [
      {
        name: "Balboa High School",
        address: "1000 Cayuga Ave, San Francisco, CA",
        neighborhood: "Cayuga Terrace",
        students: 1278,
        frl: 59,
        ell: 21,
        ssn: 15,
        priority: false,
        img: "balboa.png",
        latitude: "37.722",
        longitude: "-122.44041",
      },
      {
        name: "Burton High School",
        address: "400 Mansell St, San Francisco, CA",
        neighborhood: "Portola",
        students: 1060,
        frl: 64,
        ell: 23,
        ssn: 18,
        priority: true,
        img: "burton.png",
        latitude: "37.72126",
        longitude: "-122.4063",
      },
      {
        name: "Downtown High School",
        address: "693 Vermont St, San Francisco, CA",
        neighborhood: "Potrero Hill",
        students: 144,
        frl: 76,
        ell: 21,
        ssn: 22,
        priority: false,
        img: "downtown.png",
        latitude: "37.761565",
        longitude: "-122.40394",
      },
      {
        name: "Galileo Academy of Science & Technology",
        address: "1150 Francisco St, San Francisco, CA",
        neighborhood: "Russian Hill",
        students: 1900,
        frl: 57,
        ell: 23.6,
        ssn: 11.5,
        priority: false,
        img: "galileo.png",
        latitude: "37.80379",
        longitude: "-122.424145",
      },
      {
        name: "Ida B. Wells High School",
        address: "1099 Hayes St, San Francisco, CA",
        neighborhood: "Lower Haight",
        students: 183,
        frl: 67,
        ell: 23,
        ssn: 27,
        priority: false,
        img: "idabwells.png",
        latitude: "37.7751",
        longitude: "-122.433985",
      },
      {
        name: "Independence High School",
        address: "1350 7th Ave, San Francisco, CA",
        neighborhood: "Inner Sunset",
        students: 2434,
        frl: 47,
        ell: 3,
        priority: false,
        img: "independence.png",
        latitude: "37.76309",
        longitude: "-122.46388",
      },
      {
        name: "International High School",
        address: "655 De Haro St, San Francisco, CA",
        neighborhood: "Potrero Hill",
        students: 420,
        frl: 66,
        ell: 66,
        priority: false,
        img: "international.png",
        latitude: "37.76169",
        longitude: "-122.40082",
      },
      {
        name: "June Jordan School for Equity",
        address: "325 La Grande Ave, San Francisco, CA",
        neighborhood: "Excelsior",
        students: 324,
        frl: 65,
        ell: 48,
        ssn: 28,
        priority: true,
        img: "junejordan.png",
        latitude: "37.7195",
        longitude: "-122.42539",
      },
      {
        name: "Lincoln High School",
        address: "2162 24th Ave, San Francisco, CA",
        neighborhood: "Parkside/Sunset",
        students: 1997,
        frl: 48,
        ell: 16,
        ssn: 14,
        priority: false,
        img: "lincoln.png",
        latitude: "37.74729",
        longitude: "-122.48109",
      },
      {
        name: "Lowell High School",
        address: "1101 Eucalyptus Dr, San Francisco, CA",
        neighborhood: "Lakeshore",
        students: 2632,
        frl: 29,
        ell: 4.6,
        ssn: 6.9,
        priority: false,
        img: "lowell.png",
        latitude: "37.73068",
        longitude: "-122.48392",
      },
      {
        name: "Mission High School",
        address: "3750 18th St, San Francisco, CA",
        neighborhood: "Castro/Upper Market",
        students: 1041,
        frl: 56,
        ell: 38,
        ssn: 20,
        priority: true,
        img: "mission.png",
        latitude: "37.7616",
        longitude: "-122.42698",
      },
      {
        name: "John O'Connell Technical High School",
        address: "2355 Folsom St, San Francisco, CA",
        neighborhood: "Mission",
        students: 506,
        frl: 65,
        ell: 29,
        ssn: 24,
        priority: true,
        img: "johnoconnell.png",
        latitude: "37.75956",
        longitude: "-122.41454",
      },
      {
        name: "Ruth Asawa School of the Arts (SOTA)",
        address: "555 Portola Dr, San Francisco, CA",
        neighborhood: "Diamond Heights",
        students: 700,
        frl: 17,
        ell: 1.8,
        ssn: 11.1,
        priority: false,
        img: "ruthasawa.png",
        latitude: "37.74538",
        longitude: "-122.44965",
      },
      {
        name: "The Academy",
        address: "550 Portola Dr, San Francisco, CA",
        neighborhood: "Diamond Heights",
        students: 360,
        frl: 53,
        ell: 14.4,
        ssn: 24.9,
        priority: false,
        img: "theacademy.png",
        latitude: "37.745499",
        longitude: "-122.451563",
      },
      {
        name: "Thurgood Marshall High School",
        address: "45 Conkling St, San Francisco, CA",
        neighborhood: "Bayview",
        students: 457,
        frl: 66,
        ell: 62,
        ssn: 11,
        priority: true,
        img: "thurgood.png",
        latitude: "37.73609",
        longitude: "-122.40211",
      },
      {
        name: "Wallenberg High School",
        address: "40 Vega St, San Francisco, CA",
        neighborhood: "Western Addition",
        students: 549,
        frl: 43,
        ell: 10.9,
        ssn: 21.3,
        priority: false,
        img: "wallenberg.png",
        latitude: "37.780365",
        longitude: "-122.44621",
      },
      {
        name: "George Washington High School",
        address: "600 32nd Ave, San Francisco, CA",
        neighborhood: "Richmond",
        students: 2070,
        priority: false,
        img: "washington.png",
        latitude: "37.77784",
        longitude: "-122.49174",
      },
    ],
    skipDuplicates: true,
  });

  const juneJordan = await prisma.school.findFirstOrThrow({
    where: {
      name: "June Jordan School for Equity",
    },
  });

  await prisma.school.update({
    where: {
      id: juneJordan.id,
    },
    data: {
      profile: {
        create: {
          about: `June Jordan is a small alternative high school named after activist June Jordan. The school was founded through community organizing by a group of teachers, parents, and youth.`,
          about_bp: [
            `As a school for Social Justice serving primarily working class communities of color, the mission of JJSE is not just to prepare students for college but to also be positive agents of change in the world.`,
            `The school's three pillars are Community, Social Justice, and Independent Thinking.`,
            `June Jordan offers a Motorcycle Mechanics class.`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/1hVYScQ93TU03a5qh3pyoxVYFp2_xmkAj3-xGH20qNrg/viewform?edit_requested=true",
          testimonial: `&quot;As a student at June Jordan High School, my
          educational journey has been nothing short of transformative. The
          supportive environment and dedicated teachers have empowered me to
          explore my passions and excel academically. The diverse and
          inclusive community at June Jordan fosters a sense of belonging,
          making each day an opportunity for growth and collaboration. I
          appreciate the emphasis on critical thinking and real-world skills
          that will undoubtedly prepare me for future success. June Jordan
          High School isn&apos;t just a place of learning; it&apos;s a place
          where I&apos;ve discovered my potential and built lasting
          connections.&quot; - Jorge Rodriguez`,
          principal: "Amanda Chui",
          instagram_url: "https://www.instagram.com/officialjjse",
          facebook_url: "https://www.facebook.com/JuneJordanSchoolforEquity",
          website_url: "https://www.sfusd.edu/school/june-jordan-school-equity",
        },
      },
    },
  });

  await prisma.school.update({
    where: {
      id: juneJordan.id,
    },
    data: {
      metrics: {
        createMany: {
          data: [
            {
              name: "High School Graduation Rate",
              percentage: 85,
              category: "outcome",
            },
            {
              name: "SBAC English proficiency",
              percentage: 19,
              category: "outcome",
            },
            {
              name: "SBAC Math proficiency",
              percentage: 8,
              category: "outcome",
            },
          ],
          skipDuplicates: true,
        },
      },
    },
  });

  await prisma.school.update({
    where: {
      id: juneJordan.id,
    },
    data: {
      programs: {
        createMany: {
          data: [
            {
              name: "Tutoring",
              details: `Provide one-on-one academic support to students on a range of topics`,
              url: "",
              category: "volunteer",
            },
            {
              name: "Event Volunteer",
              details: `Provide support for school-sponsored events`,
              url: "",
              category: "volunteer",
            },
            {
              name: "Career Prep and Mentoring",
              details: `Provide students with mentoring, career insight and readiness`,
              url: "",
              category: "volunteer",
            },
            {
              name: "Donate",
              details: `You can donate directly to June Jordan on the Small
              Schools for Equity website.`,
              url: "",
              category: "donate",
            },
            {
              name: "JJSE Moto Shop",
              details: `June Jordan has the only motorcycle repair class in the
              country.`,
              url: "",
              category: "donation_funded",
            },
            {
              name: "Intersession",
              details: `JJSE's Intersession is comprised of three weeks of
              experiential learning courses where students learn by doing and
              actively engage in a variety of real-world experiences that
              challenge them physically, emotionally, intellectually, and
              spiritually.`,
              url: "",
              category: "donation_funded",
            },
            {
              name: "Student Activities",
              details: `Although JJSE is a small school and therefore does not
              offer the same breadth of courses as larger high schools, we do
              have a rich series of elective courses students may choose from.`,
              url: "",
              category: "donation_funded",
            },
            {
              name: "Advisory",
              details: `All students are part of an advisory: a small and
              intimate group of students with 1-2 teachers who serve as their
              support system at school.`,
              url: "",
              category: "enrichment",
            },
            {
              name: "Extended Day Program",
              details: `The June Jordan Extended-Day Program (EDP)
              provides a wide array of opportunities for our students to develop
               the essential skills needed for both academic success and
               personal growth.`,
              url: "",
              category: "enrichment",
            },
            {
              name: "Sports",
              details: `Jaguar Athletics is a small but strong program where
              students can come together to develop themselves as
              scholar-athletes. Students from our neighboring school City Arts
              and Tech High School play on Jaguar teams along with June Jordan
              students.`,
              url: "",
              category: "enrichment",
            },
          ],
          skipDuplicates: true,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
