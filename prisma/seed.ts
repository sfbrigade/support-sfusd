import { MetricCategory, PrismaClient, ProgramCategory } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const schools = [
    {
      name: "Balboa High School",
      address: "1000 Cayuga Ave, San Francisco, CA",
      neighborhood: "Excelsior",
      priority: false,
      img: "balboa.png",
      latitude: "37.722",
      longitude: "-122.44041",
      profile: {
        create: {
          about: `Balboa ("Bal") is a unique high school with a rich history and tradition.`,
          about_bp: [
            `Bal was the first high school in SFUSD to organize into small learning communities called Pathways.`,
            `In their Pathways, students build relationships with teachers, while engaging in rigorous academic, athletic, and artistic pursuits.`,
            `The five Pathways at BAL are: CAST (Creative Arts for Social Transformation), GDA (Game Design Academy), Law Academy, PULSE (Peers United for Leadership, Service and Equity) and WALC (Wilderness, Art, and Literacy Collaborative)`,
            `Bal is the only SFUSD high school with an on-campus teen health clinic.`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/e/1FAIpQLSd5ZGgHnefy4wTZ4Iasus5MV8H9SM5XxccdBxIgy2R0qVEHFg/viewform",
          donation_text: `Mail a check made out to Balboa High School and mail it to: Balboa High School 1000 Cayuga Avenue San Francisco, CA 94112`,
          testimonial: `"We are the only high school to have an on-campus clinic. I find it really convenient, because my doctor is like across town from where I live, and I have to miss a whole day of school when I'm sick. Our clinic is COMPLETELY free, counselors, medicine, sex ed."`,
          principal: "Dr. Catherine Arenson",
          instagram_url: "http://www.instagram.com/balboahs",
          facebook_url:
            "https://www.facebook.com/pages/Balboa-High-School-California/140869085980447 ",
          website_url: "https://www.sfusd.edu/school/balboa-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 1278,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 59,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 21,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 15,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 94,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English Proficiency",
              value: 43,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math Proficiency",
              value: 60,
              unit: "%",
              category: MetricCategory.outcome,
            },
          ],
          skipDuplicates: true,
        },
      },
      programs: {
        createMany: {
          data: [
            {
              name: "Career-based Mentoring",
              details: `All of Bal's Pathway programs need career-based mentoring, such as being a guest speaker`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Tutoring",
              details: `Provide one-on-one academic support to students on a range of topics`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Event Volunteers",
              details: `Provide support for school-sponsored events such as shows and field trips`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Donors Choose",
              details: ``,
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/balboa-high-school/4391",
              category: ProgramCategory.donate,
            },
            {
              name: "PTSA",
              details: ``,
              url: "https://www.sfusd.edu/school/balboa-high-school/ptsa/cash-appeal",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    {
      name: "Burton High School",
      address: "400 Mansell St, San Francisco, CA",
      neighborhood: "Portola",
      priority: true,
      img: "burton.png",
      latitude: "37.72126",
      longitude: "-122.4063",
      profile: {
        create: {
          about: `Burton High School was established in 1984 as a result of a Consent Decree between the City of San Francisco and the NAACP, and is named after Phillip Burton, a member of the California Assembly who championed the civil rights of others. Burton also:`,
          about_bp: [
            `Is a “wall-to-wall” academy school, offering specialized career and technical education in Arts & Media, Engineering, Health Sciences, and Performing Arts to students in the form of project-based learning classes`,
            `Has a student body that represents every ethnicity, socio-economic group, and neighborhood of San Francisco`,
            `Has an extensive partnership with the Bayview YMCA, and offers college classes by City College on Saturdays as well as after-school tutoring`,
            `Offers after-school program called P.A.C.E (Pumas’ Academics, College & Career, and Enrichments) offers academic, community service based and skill building activities`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/1xqB69hsheJEHtUcfcrAlqRYxCv7EsYpDgdqmktWxAWo/viewform",
          donation_text: `TBD-- awaiting school input`,
          testimonial: `"I like my teachers because they really care about me and they’re always willing to go an extra mile for me when I need it."`,
          testimonial_author: "Daniela Simental, student",
          testimonial_video:
            "https://www.youtube.com/embed/jwMX9zSxaA0?si=ch5T8GWlPJCxJHGz&amp;start=192",
          principal: "Suniqua Thomas",
          instagram_url: "https://www.instagram.com/burtonpumas/",
          facebook_url: "https://www.facebook.com/burtonpumas/",
          website_url:
            "https://www.sfusd.edu/school/phillip-and-sala-burton-academic-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 1060,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 64,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 23,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 18,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 95,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English Proficiency",
              value: 59,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math Proficiency",
              value: 18,
              unit: "%",
              category: MetricCategory.outcome,
            },
          ],
          skipDuplicates: true,
        },
      },
      programs: {
        createMany: {
          data: [
            {
              name: "Tutoring",
              details: `Provide one-on-one academic support to students on a range of topics`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Event Volunteer",
              details: `Provide support for school-sponsored events`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Career Prep and Mentoring",
              details: `Provide students with mentoring, career insight and readiness`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Donors Choose",
              details: ``,
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/philip-sala-burton-high-school/4390",
              category: ProgramCategory.donate,
            },
            {
              name: "Food Pantry",
              details: ``,
              url: "https://www.gofundme.com/f/j7awn-burton-high-school-food-pantry",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    {
      name: "Downtown High School",
      address: "693 Vermont St, San Francisco, CA",
      neighborhood: "Potrero Hill",
      priority: false,
      img: "downtown.png",
      latitude: "37.761565",
      longitude: "-122.40394",
    },
    {
      name: "Galileo Academy of Science & Technology",
      address: "1150 Francisco St, San Francisco, CA",
      neighborhood: "Russian Hill",
      priority: false,
      img: "galileo.png",
      latitude: "37.80379",
      longitude: "-122.424145",
    },
    {
      name: "Ida B. Wells High School",
      address: "1099 Hayes St, San Francisco, CA",
      neighborhood: "Lower Haight",
      priority: false,
      img: "idabwells.png",
      latitude: "37.7751",
      longitude: "-122.433985",
    },
    {
      name: "Independence High School",
      address: "1350 7th Ave, San Francisco, CA",
      neighborhood: "Inner Sunset",
      priority: false,
      img: "independence.png",
      latitude: "37.76309",
      longitude: "-122.46388",
    },
    {
      name: "SF International High School",
      address: "655 De Haro St, San Francisco, CA",
      neighborhood: "Potrero Hill",
      priority: false,
      img: "international.png",
      latitude: "37.76169",
      longitude: "-122.40082",
    },
    {
      name: "June Jordan School for Equity",
      address: "325 La Grande Ave, San Francisco, CA",
      neighborhood: "Excelsior",
      priority: true,
      img: "junejordan.png",
      latitude: "37.7195",
      longitude: "-122.42539",
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
          donation_url: "https://smallschoolsforequity.org/donate/",
          donation_text:
            "Donate to June Jordan on the Small Schools for Equity website. All of your donation goes directly to programs benefitting teachers and youth!",
          testimonial: `"June Jordan is a breath of fresh air myself and many others. There is a strong and immediate sense of community and family. The school is aimed towards helping students, specifically of Latinx or African American descent, thrive in all aspects of a academic scholar. Most schools are tied strictly towards academics but June Jordan has a different approach. They acknowledge the fact that a single being and their destiny should not be overlooked by a grade book. We build leaders at this school, we build demonstrators, organizers, and creators."`,
          principal: "Amanda Chui",
          instagram_url: "https://www.instagram.com/officialjjse",
          facebook_url: "https://www.facebook.com/JuneJordanSchoolforEquity",
          website_url: "https://www.sfusd.edu/school/june-jordan-school-equity",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 215,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 64,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 48,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 28,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 85,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English proficiency",
              value: 19,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 8,
              unit: "%",
              category: MetricCategory.outcome,
            },
          ],
          skipDuplicates: true,
        },
      },
      programs: {
        createMany: {
          data: [
            {
              name: "Tutoring",
              details: `Provide one-on-one academic support to students on a range of topics`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Event Volunteer",
              details: `Provide support for school-sponsored events`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Career Prep and Mentoring",
              details: `Provide students with mentoring, career insight and readiness`,
              url: "",
              category: ProgramCategory.volunteer,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    {
      name: "Lincoln High School",
      address: "2162 24th Ave, San Francisco, CA",
      neighborhood: "Parkside/Sunset",
      priority: false,
      img: "lincoln.png",
      latitude: "37.74729",
      longitude: "-122.48109",
    },
    {
      name: "Lowell High School",
      address: "1101 Eucalyptus Dr, San Francisco, CA",
      neighborhood: "Lakeshore",
      priority: false,
      img: "lowell.png",
      latitude: "37.73068",
      longitude: "-122.48392",
    },
    {
      name: "Mission High School",
      address: "3750 18th St, San Francisco, CA",
      neighborhood: "Mission",
      priority: true,
      img: "mission.png",
      latitude: "37.7616",
      longitude: "-122.42698",
    },
    {
      name: "John O'Connell Technical High School",
      address: "2355 Folsom St, San Francisco, CA",
      neighborhood: "Mission",
      priority: true,
      img: "johnoconnell.png",
      latitude: "37.75956",
      longitude: "-122.41454",
    },
    {
      name: "Ruth Asawa School of the Arts (SOTA)",
      address: "555 Portola Dr, San Francisco, CA",
      neighborhood: "Diamond Heights",
      priority: false,
      img: "ruthasawa.png",
      latitude: "37.74538",
      longitude: "-122.44965",
    },
    {
      name: "The Academy",
      address: "550 Portola Dr #250, San Francisco, CA",
      neighborhood: "Diamond Heights",
      priority: false,
      img: "theacademy.png",
      latitude: "37.745499",
      longitude: "-122.451563",
    },
    {
      name: "Thurgood Marshall High School",
      address: "45 Conkling St, San Francisco, CA",
      neighborhood: "Bayview",
      priority: true,
      img: "thurgood.png",
      latitude: "37.73609",
      longitude: "-122.40211",
    },
    {
      name: "Wallenberg High School",
      address: "40 Vega St, San Francisco, CA",
      neighborhood: "Western Addition",
      priority: false,
      img: "wallenberg.png",
      latitude: "37.780365",
      longitude: "-122.44621",
    },
    {
      name: "George Washington High School",
      address: "600 32nd Ave, San Francisco, CA",
      neighborhood: "Richmond",
      priority: false,
      img: "washington.png",
      latitude: "37.77784",
      longitude: "-122.49174",
    },
  ];

  for (const school of schools) {
    await prisma.school.create({
      data: school,
    });
  }
  // await prisma.school.createMany({
  //   data: [
  //     {
  //       name: "Balboa High School",
  //       address: "1000 Cayuga Ave, San Francisco, CA",
  //       neighborhood: "Excelsior",
  //       students: 1278,
  //       frl: 59,
  //       ell: 21,
  //       ssn: 15,
  //       priority: false,
  //       img: "balboa.png",
  //       latitude: "37.722",
  //       longitude: "-122.44041",
  //     },
  //     {
  //       name: "Burton High School",
  //       address: "400 Mansell St, San Francisco, CA",
  //       neighborhood: "Portola",
  //       students: 1060,
  //       frl: 64,
  //       ell: 23,
  //       ssn: 18,
  //       priority: true,
  //       img: "burton.png",
  //       latitude: "37.72126",
  //       longitude: "-122.4063",
  //     },
  //     {
  //       name: "Downtown High School",
  //       address: "693 Vermont St, San Francisco, CA",
  //       neighborhood: "Potrero Hill",
  //       students: 144,
  //       frl: 76,
  //       ell: 21,
  //       ssn: 22,
  //       priority: false,
  //       img: "downtown.png",
  //       latitude: "37.761565",
  //       longitude: "-122.40394",
  //     },
  //     {
  //       name: "Galileo Academy of Science & Technology",
  //       address: "1150 Francisco St, San Francisco, CA",
  //       neighborhood: "Russian Hill",
  //       students: 1900,
  //       frl: 57,
  //       ell: 23.6,
  //       ssn: 11.5,
  //       priority: false,
  //       img: "galileo.png",
  //       latitude: "37.80379",
  //       longitude: "-122.424145",
  //     },
  //     {
  //       name: "Ida B. Wells High School",
  //       address: "1099 Hayes St, San Francisco, CA",
  //       neighborhood: "Lower Haight",
  //       students: 183,
  //       frl: 67,
  //       ell: 23,
  //       ssn: 27,
  //       priority: false,
  //       img: "idabwells.png",
  //       latitude: "37.7751",
  //       longitude: "-122.433985",
  //     },
  //     {
  //       name: "Independence High School",
  //       address: "1350 7th Ave, San Francisco, CA",
  //       neighborhood: "Inner Sunset",
  //       students: 162,
  //       frl: 48,
  //       ell: 3,
  //       ssn: 22,
  //       priority: false,
  //       img: "independence.png",
  //       latitude: "37.76309",
  //       longitude: "-122.46388",
  //     },
  //     {
  //       name: "SF International High School",
  //       address: "655 De Haro St, San Francisco, CA",
  //       neighborhood: "Potrero Hill",
  //       students: 275,
  //       frl: 76,
  //       ell: 88,
  //       ssn: 3,
  //       priority: false,
  //       img: "international.png",
  //       latitude: "37.76169",
  //       longitude: "-122.40082",
  //     },
  //     {
  //       name: "June Jordan School for Equity",
  //       address: "325 La Grande Ave, San Francisco, CA",
  //       neighborhood: "Excelsior",
  //       students: 215,
  //       frl: 64,
  //       ell: 48,
  //       ssn: 28,
  //       priority: true,
  //       img: "junejordan.png",
  //       latitude: "37.7195",
  //       longitude: "-122.42539",
  //     },
  //     {
  //       name: "Lincoln High School",
  //       address: "2162 24th Ave, San Francisco, CA",
  //       neighborhood: "Parkside/Sunset",
  //       students: 1997,
  //       frl: 48,
  //       ell: 16,
  //       ssn: 14,
  //       priority: false,
  //       img: "lincoln.png",
  //       latitude: "37.74729",
  //       longitude: "-122.48109",
  //     },
  //     {
  //       name: "Lowell High School",
  //       address: "1101 Eucalyptus Dr, San Francisco, CA",
  //       neighborhood: "Lakeshore",
  //       students: 2632,
  //       frl: 29,
  //       ell: 4.6,
  //       ssn: 6.9,
  //       priority: false,
  //       img: "lowell.png",
  //       latitude: "37.73068",
  //       longitude: "-122.48392",
  //     },
  //     {
  //       name: "Mission High School",
  //       address: "3750 18th St, San Francisco, CA",
  //       neighborhood: "Mission",
  //       students: 1041,
  //       frl: 56,
  //       ell: 38,
  //       ssn: 20,
  //       priority: true,
  //       img: "mission.png",
  //       latitude: "37.7616",
  //       longitude: "-122.42698",
  //     },
  //     {
  //       name: "John O'Connell Technical High School",
  //       address: "2355 Folsom St, San Francisco, CA",
  //       neighborhood: "Mission",
  //       students: 506,
  //       frl: 65,
  //       ell: 29,
  //       ssn: 24,
  //       priority: true,
  //       img: "johnoconnell.png",
  //       latitude: "37.75956",
  //       longitude: "-122.41454",
  //     },
  //     {
  //       name: "Ruth Asawa School of the Arts (SOTA)",
  //       address: "555 Portola Dr, San Francisco, CA",
  //       neighborhood: "Diamond Heights",
  //       students: 700,
  //       frl: 17,
  //       ell: 1.8,
  //       ssn: 11.1,
  //       priority: false,
  //       img: "ruthasawa.png",
  //       latitude: "37.74538",
  //       longitude: "-122.44965",
  //     },
  //     {
  //       name: "The Academy",
  //       address: "550 Portola Dr #250, San Francisco, CA",
  //       neighborhood: "Diamond Heights",
  //       students: 360,
  //       frl: 53,
  //       ell: 14.4,
  //       ssn: 24.9,
  //       priority: false,
  //       img: "theacademy.png",
  //       latitude: "37.745499",
  //       longitude: "-122.451563",
  //     },
  //     {
  //       name: "Thurgood Marshall High School",
  //       address: "45 Conkling St, San Francisco, CA",
  //       neighborhood: "Bayview",
  //       students: 457,
  //       frl: 66,
  //       ell: 62,
  //       ssn: 11,
  //       priority: true,
  //       img: "thurgood.png",
  //       latitude: "37.73609",
  //       longitude: "-122.40211",
  //     },
  //     {
  //       name: "Wallenberg High School",
  //       address: "40 Vega St, San Francisco, CA",
  //       neighborhood: "Western Addition",
  //       students: 549,
  //       frl: 43,
  //       ell: 10.9,
  //       ssn: 21.3,
  //       priority: false,
  //       img: "wallenberg.png",
  //       latitude: "37.780365",
  //       longitude: "-122.44621",
  //     },
  //     {
  //       name: "George Washington High School",
  //       address: "600 32nd Ave, San Francisco, CA",
  //       neighborhood: "Richmond",
  //       students: 2070,
  //       frl: 46,
  //       ell: 12,
  //       ssn: 11,
  //       priority: false,
  //       img: "washington.png",
  //       latitude: "37.77784",
  //       longitude: "-122.49174",
  //     },
  //   ],
  //   skipDuplicates: true,
  // });

  // const juneJordan = await prisma.school.findFirstOrThrow({
  //   where: {
  //     name: "June Jordan School for Equity",
  //   },
  // });

  // await prisma.school.update({
  //   where: {
  //     id: juneJordan.id,
  //   },
  //   data: {
  //     profile: {
  //       create: {
  //         about: `June Jordan is a small alternative high school named after activist June Jordan. The school was founded through community organizing by a group of teachers, parents, and youth.`,
  //         about_bp: [
  //           `As a school for Social Justice serving primarily working class communities of color, the mission of JJSE is not just to prepare students for college but to also be positive agents of change in the world.`,
  //           `The school's three pillars are Community, Social Justice, and Independent Thinking.`,
  //           `June Jordan offers a Motorcycle Mechanics class.`,
  //         ],
  //         volunteer_form_url:
  //           "https://docs.google.com/forms/d/1hVYScQ93TU03a5qh3pyoxVYFp2_xmkAj3-xGH20qNrg/viewform?edit_requested=true",
  //         donation_url: "https://smallschoolsforequity.org/donate/",
  //         donation_text:
  //           "Donate to June Jordan on the Small Schools for Equity website. All of your donation goes directly to programs benefitting teachers and youth!",
  //         testimonial: `"June Jordan is a breath of fresh air myself and many others. There is a strong and immediate sense of community and family. The school is aimed towards helping students, specifically of Latinx or African American descent, thrive in all aspects of a academic scholar. Most schools are tied strictly towards academics but June Jordan has a different approach. They acknowledge the fact that a single being and their destiny should not be overlooked by a grade book. We build leaders at this school, we build demonstrators, organizers, and creators."`,
  //         testimonial_video:
  //           "https://www.youtube.com/embed/PfHdxukonSg?si=yGxhrzexDrUPzTw4&amp;start=225",
  //         testimonial_author: "Jackson Tran",
  //         // testimonial_img:
  //         //   "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
  //         principal: "Amanda Chui",
  //         instagram_url: "https://www.instagram.com/officialjjse",
  //         facebook_url: "https://www.facebook.com/JuneJordanSchoolforEquity",
  //         website_url: "https://www.sfusd.edu/school/june-jordan-school-equity",
  //       },
  //     },
  //   },
  // });

  // await prisma.school.update({
  //   where: {
  //     id: juneJordan.id,
  //   },
  //   data: {
  //     metrics: {
  //       createMany: {
  //         data: [
  //           {
  //             name: "High School Graduation Rate",
  //             percentage: 85,
  //             category: "outcome",
  //           },
  //           {
  //             name: "SBAC English proficiency",
  //             percentage: 19,
  //             category: "outcome",
  //           },
  //           {
  //             name: "SBAC Math proficiency",
  //             percentage: 8,
  //             category: "outcome",
  //           },
  //         ],
  //         skipDuplicates: true,
  //       },
  //     },
  //   },
  // });

  // await prisma.school.update({
  //   where: {
  //     id: juneJordan.id,
  //   },
  //   data: {
  //     programs: {
  //       createMany: {
  //         data: [
  //           {
  //             name: "Tutoring",
  //             details: `Provide one-on-one academic support to students on a range of topics`,
  //             url: "",
  //             category: "volunteer",
  //           },
  //           {
  //             name: "Event Volunteer",
  //             details: `Provide support for school-sponsored events`,
  //             url: "",
  //             category: "volunteer",
  //           },
  //           {
  //             name: "Career Prep and Mentoring",
  //             details: `Provide students with mentoring, career insight and readiness`,
  //             url: "",
  //             category: "volunteer",
  //           },
  //           {
  //             name: "Donate",
  //             details: `You can donate directly to June Jordan on the Small
  //             Schools for Equity website.`,
  //             url: "",
  //             category: "donate",
  //           },
  //           {
  //             name: "JJSE Moto Shop",
  //             details: `June Jordan has the only motorcycle repair class in the
  //             country.`,
  //             url: "",
  //             category: "donate",
  //           },
  //           {
  //             name: "Intersession",
  //             details: `JJSE's Intersession is comprised of three weeks of
  //             experiential learning courses where students learn by doing and
  //             actively engage in a variety of real-world experiences that
  //             challenge them physically, emotionally, intellectually, and
  //             spiritually.`,
  //             url: "",
  //             category: "donate",
  //           },
  //           {
  //             name: "Student Activities",
  //             details: `Although JJSE is a small school and therefore does not
  //             offer the same breadth of courses as larger high schools, we do
  //             have a rich series of elective courses students may choose from.`,
  //             url: "",
  //             category: "donate",
  //           },
  //           {
  //             name: "Advisory",
  //             details: `All students are part of an advisory: a small and
  //             intimate group of students with 1-2 teachers who serve as their
  //             support system at school.`,
  //             url: "",
  //             category: "enrichment",
  //           },
  //           {
  //             name: "Extended Day Program",
  //             details: `The June Jordan Extended-Day Program (EDP)
  //             provides a wide array of opportunities for our students to develop
  //              the essential skills needed for both academic success and
  //              personal growth.`,
  //             url: "",
  //             category: "enrichment",
  //           },
  //           {
  //             name: "Sports",
  //             details: `Jaguar Athletics is a small but strong program where
  //             students can come together to develop themselves as
  //             scholar-athletes. Students from our neighboring school City Arts
  //             and Tech High School play on Jaguar teams along with June Jordan
  //             students.`,
  //             url: "",
  //             category: "enrichment",
  //           },
  //         ],
  //         skipDuplicates: true,
  //       },
  //     },
  //   },
  // });
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
