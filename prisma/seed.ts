import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.school.createMany({
    data: [
      {
        name: "Balboa High School",
        address: "1000 Cayuga Ave, San Francisco, CA",
        sf_district: "Cayuga Terrace",
        students: 1230,
        free_reduced_lunch: "59",
        ell: "20.9",
        color: "#3986ff",
        img: "img/balboa.png",
        latitude: "37.722",
        longitude: "-122.44041",
      },
      {
        name: "Burton High School",
        address: "400 Mansell St, San Francisco, CA",
        sf_district: "Portola",
        students: 1175,
        free_reduced_lunch: "64",
        ell: "22.4",
        color: "#3986ff",
        img: "img/burton.png",
        latitude: "37.72126",
        longitude: "-122.4063",
      },
      {
        name: "Downtown High School",
        address: "693 Vermont St, San Francisco, CA",
        sf_district: "Potrero Hill",
        students: 134,
        free_reduced_lunch: "75",
        ell: "17.8",
        color: "#3986ff",
        img: "img/downtown.png",
        latitude: "37.761565",
        longitude: "-122.40394",
      },
      {
        name: "Galileo Academy of Science & Technology",
        address: "1150 Francisco St, San Francisco, CA",
        sf_district: "Russian Hill",
        students: 1840,
        free_reduced_lunch: "61",
        ell: "21.2",
        color: "#3986ff",
        img: "img/galileo.png",
        latitude: "37.80379",
        longitude: "-122.424145",
      },
      {
        name: "Ida B. Wells High School",
        address: "1099 Hayes St, San Francisco, CA",
        sf_district: "Alamo Square",
        students: 1540,
        free_reduced_lunch: "65",
        ell: "15.5",
        color: "#3986ff",
        img: "img/idabwells.png",
        latitude: "37.7751",
        longitude: "-122.433985",
      },
      {
        name: "Independence High School",
        address: "1350 7th Ave, San Francisco, CA",
        sf_district: "Inner Sunset",
        students: 2434,
        free_reduced_lunch: "47",
        ell: "3",
        color: "#3986ff",
        img: "img/independence.png",
        latitude: "37.76309",
        longitude: "-122.46388",
      },
      {
        name: "International High School",
        address: "655 De Haro St, San Francisco, CA",
        sf_district: "Potrero Hill",
        students: 420,
        free_reduced_lunch: "66",
        ell: "86",
        color: "#3986ff",
        img: "img/international.png",
        latitude: "37.76169",
        longitude: "-122.40082",
      },
      {
        name: "June Jordan School for Equity",
        address: "325 La Grande Ave, San Francisco, CA",
        sf_district: "Excelsior",
        students: 324,
        free_reduced_lunch: "65",
        ell: "48",
        color: "#3986ff",
        img: "img/junejordan.png",
        latitude: "37.7195",
        longitude: "-122.42539",
      },
      {
        name: "Lincoln High School",
        address: "2162 24th Ave, San Francisco, CA",
        sf_district: "Parkside",
        students: 1990,
        free_reduced_lunch: "48",
        ell: "14.9",
        color: "#3986ff",
        img: "img/lincoln.png",
        latitude: "37.74729",
        longitude: "-122.48109",
      },
      {
        name: "Lowell High School",
        address: "1101 Eucalyptus Dr, San Francisco, CA",
        sf_district: "Lakeshore",
        students: 2786,
        free_reduced_lunch: "39.7",
        ell: "1.9",
        color: "#3986ff",
        img: "img/lowell.png",
        latitude: "37.73068",
        longitude: "-122.48392",
      },
      {
        name: "Mission High School",
        address: "3750 18th St, San Francisco, CA",
        sf_district: "Mission Dolores",
        students: 1040,
        free_reduced_lunch: "56",
        ell: "33.4",
        color: "#3986ff",
        img: "img/mission.png",
        latitude: "37.7616",
        longitude: "-122.42698",
      },
      {
        name: "John O'Connell Technical High School",
        address: "2355 Folsom St, San Francisco, CA",
        sf_district: "Mission",
        students: 525,
        free_reduced_lunch: "65",
        ell: "31.3",
        color: "#3986ff",
        img: "img/johnoconnell.png",
        latitude: "37.75956",
        longitude: "-122.41454",
      },
      {
        name: "Ruth Asawa School of the Arts (SOTA)",
        address: "555 Portola Dr, San Francisco, CA",
        sf_district: "Glen Park",
        students: 795,
        free_reduced_lunch: "17",
        ell: "1.5",
        color: "#3986ff",
        img: "img/ruthasawa.png",
        latitude: "37.74538",
        longitude: "-122.44965",
      },
      {
        name: "The Academy",
        address: "550 Portola Dr, San Francisco, CA",
        sf_district: "Glen Park",
        students: 360,
        free_reduced_lunch: "55",
        ell: "16.4",
        color: "#3986ff",
        img: "img/theacademy.png",
        latitude: "37.745499",
        longitude: "-122.451563",
      },
      {
        name: "Thurgood Marshall High School",
        address: "45 Conkling St, San Francisco, CA",
        sf_district: "Silver Terrace",
        students: 525,
        free_reduced_lunch: "62",
        ell: "58.7",
        color: "#3986ff",
        img: "img/thurgoodmarshall.png",
        latitude: "37.73609",
        longitude: "-122.40211",
      },
      {
        name: "Wallenberg High School",
        address: "40 Vega St, San Francisco, CA",
        sf_district: "Anza Vista",
        students: 659,
        free_reduced_lunch: "44.8",
        ell: "71",
        color: "#3986ff",
        img: "img/wallenberg.png",
        latitude: "37.780365",
        longitude: "-122.44621",
      },
      {
        name: "George Washington High School",
        address: "600 32nd Ave, San Francisco, CA",
        sf_district: "Richmond",
        students: 2070,
        free_reduced_lunch: "46",
        ell: "11.7",
        color: "#3986ff",
        img: "img/washington.png",
        latitude: "37.77784",
        longitude: "-122.49174",
      },
    ],
    skipDuplicates: true,
  })

  const juneJordan = await prisma.school.findFirstOrThrow({
    where: {
      name: "June Jordan School for Equity"
    }
  });

  await prisma.school.update({
    where: {
      id: juneJordan.id
    },
    data: {
      profile: {
        create: {
          about:`Alternative school by choice in San Francisco&#39;s Excelsior
          neighborhood.\n
          Named after activist June Jordan, the school&#39;s three pillars are
          Community, Social Justice, and Independent Thinkers.\n
          Founded through community organizing by a group of teachers, parents,
          and youth.\n
          Engages with southeast San Francisco communities, aligned with social
          justice movement.\n
          Aims to prepare students for college while preserving community
          traditions.`,
          mission: `As a school for Social Justice serving predominantly
          working class communities of color, the mission of JJSE is not just
          to prepare students for college but also to prepare our graduates to
          be agents of positive change in the world. Our mission and vision
          is to prepare young people in three key areas: community, social
          justice, and independent thinkers.`,
          testimonial:`&quot;As a student at June Jordan High School, my
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
          x_url: "",
          instagram_url: "",
          facebook_url: "",
          website_url: "",
        }
      }
    }
  });

  await prisma.school.update({
    where: {
      id: juneJordan.id
    },
    data: {
      metrics: {
        createMany: {
          data:[
            {
              name: "Students with Special Needs",
              percentage: 28,
              category: "demographic",
            },
            {
              name: "High School Graduation Rate",
              percentage: 83,
              category: "outcome",
            },
            {
              name: "Accepted into 4-year colleges",
              percentage: 56,
              category: "outcome",
            },
            {
              name: "Accepted into 2-year colleges",
              percentage: 68,
              category: "outcome",
            },
            {
              name: "SBAC English proficiency",
              percentage: 11,
              category: "outcome",
            },
            {
              name: "SBAC Math proficiency",
              percentage: 0,
              category: "outcome",
            },
          ],
          skipDuplicates: true,
        }
      }
    }
  });


  await prisma.school.update({
    where: {
      id: juneJordan.id
    },
    data: {
      programs: {
        createMany: {
          data:[
            {
              name: "Remote Friendly Tasks",
              details: "Volunteer from home!",
              url: "",
              category: "volunteer",
            },
            {
              name: "Math Tutors",
              details: `Our students need help in this subject now more than
              ever before. A strong commitment can make a huge lifetime change.
              Learn more`,
              url: "",
              category: "volunteer",
            },
            {
              name: "Event volunteers",
              details: `Participate in community gatherings which cultivate joy
              and a positive school culture`,
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
              name: "Volunteer",
              details: `June Jordan values community volunteers and has
              volunteer needs and opportunities throughout the school year. You
              can sign up to volunteer through the San Francisco Ed Fund or fill
              out this form to connect directly with the school.`,
              url: "",
              category: "volunteer",
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
        }
      }
    }
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
