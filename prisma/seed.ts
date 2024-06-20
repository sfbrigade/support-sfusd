import { MetricCategory, PrismaClient, ProgramCategory } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const schools = [
    // Balboa
    {
      name: "Balboa High School",
      address: "1000 Cayuga Ave, San Francisco, CA",
      neighborhood: "Excelsior",
      priority: false,
      img: "balboa.jpeg",
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
          donation_text: `Mail a check made out to Balboa High School and mail it to:\nBalboa High School\n1000 Cayuga Avenue\nSan Francisco, CA 94112`,
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
              img: "/volunteer_img/stock3.png",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Tutoring",
              details: `Provide one-on-one academic support to students on a range of topics`,
              url: "",
              img: "/volunteer_img/stock5.png",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Event Volunteers",
              details: `Provide support for school-sponsored events such as shows and field trips`,
              url: "",
              img: "/volunteer_img/stock2.png",
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
    // Burton
    {
      name: "Burton High School",
      address: "400 Mansell St, San Francisco, CA",
      neighborhood: "Portola",
      priority: true,
      img: "burton.jpeg",
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
          noteable_video:
            "https://www.youtube.com/embed/jwMX9zSxaA0?si=bL4VMGrxRQ_xipUf",
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
    // Downtown
    {
      name: "Downtown High School",
      address: "693 Vermont St, San Francisco, CA",
      neighborhood: "Potrero Hill",
      priority: false,
      img: "downtown.jpeg",
      latitude: "37.761565",
      longitude: "-122.40394",
      profile: {
        create: {
          about: `Downtown High School (DHS) is one of two continuation schools in SFUSD, dedicated to serving students whose success was limited in the district's comprehensive and charter high schools.`,
          about_bp: [
            `DHS represents a second chance for students to succeed and a chance to graduate from high school.`,
            `DHS meets the need of these at-risk students by offering an educational experience that enables them to re-engage with school, find meaning in learning, achieve academic success, and graduate.`,
            `DHS offers project-based learning with the following five projects: Acting for Critical Transformations (ACT), Get Out and Learn (GOAL), Making, Advocating and Designing for Empowerment (MADE), Music and Academics Resisting the System (MARS), and Wilderness Arts and Literacy Collaborative (WALC).`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/e/1FAIpQLSecfLxlYgdHcs4vZLtW-V8CKVT38kY4rc7qqb5ocj-X9J3jLQ/viewform",
          donation_text: `Mail a check made out to Downtown High School and mail it to:\nDowntown High School\n693 Vermont St.\nSan Francisco, CA 94107`,
          principal: "Todd Williams",
          instagram_url: "www.instagram.com/downtown_hs",
          website_url: "https://www.sfusd.edu/school/downtown-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 144,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 76,
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
              value: 22,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 45,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English Proficiency",
              value: 46,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math Proficiency",
              value: 34,
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
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/downtown-alternative-cont-high-school/4386",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // Galileo
    {
      name: "Galileo Academy of Science & Technology",
      address: "1150 Francisco St, San Francisco, CA",
      neighborhood: "Russian Hill",
      priority: false,
      img: "galileo.jpeg",
      latitude: "37.80379",
      longitude: "-122.424145",
      profile: {
        create: {
          about: `Galileo Academy of Science and Technology ("Galileo") is committed to providing equal access to all of their educational programs.`,
          about_bp: [
            `Galileo offers three career technical Academic pathways: 1) Biotechnology, Environmental Science, Health Sciences, 2) Information Technology, Media, Arts, and 3) Hospitality, Travel and Tourism.`,
            `Galileo provides servies that meet diverse learning needs, including extensive Honors, Advanced Placement (AP) courses, English Language Development (ELD), and Special Education Services.`,
            `Galileo aims to provide support for their students for life, college, and beyond through programs like AVID with additional academic counseling for college prepation, the Wellness Center, and their Futurama after-school program with sports, arts, enrichment, and tutoring.`,
          ],
          volunteer_form_url: "https://forms.gle/H89nowxGSMLoBqTaA",
          donation_text: `Donate to Galileo's PTSA. Donations support teacher/classroom stipends, educational enrichment grants, community events, World Party, and student leadership.`,
          donation_url: "https://www.galileoptsa.org/donation-form",
          testimonial: `"I like my teachers because they're very understanding and very supportive. I take some cool classes such as health academy, which is very interesting because we got to learn a lot of things related to medical field ... and we get to visit hospitals."`,
          testimonial_author: "Senior in 2021 - Romaissa Khaldi",
          testimonial_video:
            "https://www.youtube.com/embed/KkDW52FEdsg?si=MCUnI9xwh_PhhchA&amp;start=170",
          noteable_video:
            "https://www.youtube.com/embed/KkDW52FEdsg?si=lsyO4inn548P7bTE",
          principal: "Ambar Panjabi",
          instagram_url: "https://www.instagram.com/galileoasb/",
          facebook_url: "https://www.facebook.com/GalileoAcademy/",
          website_url:
            "https://www.sfusd.edu/school/galileo-academy-science-technology",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 1900,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 57,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 23.6,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 11.5,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 89,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English Proficiency",
              value: 71,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math Proficiency",
              value: 50,
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
              name: "Academic After-School Tutors (Futurama)",
              details: `Help students at Galileo with afterschool Math,
              Science, English, Social Studies tutoring.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Remote Graphic Design (w/ PTSA)",
              details: `Support Galileo's online PTSA presence through remote-friendly design tasks!`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Event Volunteer (with PTSA) ",
              details: `Help Galileo's PTSA organize Galileo-unique events like World Party and with projects for school beautification.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Donors Choose",
              details: ``,
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/galileo-academy-science-tech/4398",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // Ida B. Wells
    {
      name: "Ida B. Wells High School",
      address: "1099 Hayes St, San Francisco, CA",
      neighborhood: "Lower Haight",
      priority: false,
      img: "idabwells.jpeg",
      latitude: "37.7751",
      longitude: "-122.433985",
      profile: {
        create: {
          about: `Ida B. Wells (IBW) is one of two continuation schools in SFUSD, dedicated to serving students whose success was limited in the district's comprehensive and charter high schools.`,
          about_bp: [
            `IBW represents a second chance for students who are 16+ to succeed and a chance to graduate from high school.`,
            `IBW meets the need of these at-risk students by offering an educational experience that enables them to re-engage with school, find meaning in learning, achieve academic success, and graduate.`,
            `IBW's special programs include Culinary Arts, Drama, Computer Applications and Robotics, Ceramics, and Surfing.`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/e/1FAIpQLSf71Z-9hmWL13xOeIDiVP2atl3Wj4BHMnsOrowM9XAFycvIhg/viewform",
          donation_text: `Mail a check made out to Ida B. Wells High School and mail it to:\nIda B. Wells\n1099 Hayes St.\nSan Francisco, CA 94117`,
          testimonial: `"I love this school the teachers are awesome and the students are great!!! I graduated from here on time!! And I was behind like 150 credits and caught up within a year!! Thank you Ida b wells"`,
          testimonial_author: "Reyanna L.",
          principal: "Katie Pringle",
          instagram_url: "https://www.instagram.com/sf_idabwellshs",
          facebook_url:
            "https://www.facebook.com/pages/Ida-B-Wells-Continuation-High-School/1920936394824346",
          website_url: "https://www.sfusd.edu/school/ida-b-wells-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 183,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 67,
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
              value: 27,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 59,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English Proficiency",
              value: 18,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math Proficiency",
              value: 0,
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
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/ida-b-wells-high-school/4385",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // Independence
    {
      name: "Independence High School",
      address: "1350 7th Ave, San Francisco, CA",
      neighborhood: "Inner Sunset",
      priority: false,
      img: "independence.jpeg",
      latitude: "37.76309",
      longitude: "-122.46388",
      profile: {
        create: {
          about: `Independence is a small alternative high school in SFUSD.`,
          about_bp: [
            `Independence serves students who have significant obligations outside of school, including family and employment.`,
            `Independence creates a custom schedule for each student to meet their needs.`,
            `The school offers a unique hexamester system to maximize opportunities for students.`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/e/1FAIpQLScCyflGm6ePuNRFLQ4rCYYgHwzxWzBLkDtJjf1bgziWwwy7bg/viewform",
          donation_text: `Mail a check made out to Independence High School and mail it to:\nIndependence High School\n1350 7th Ave\nSan Francisco, CA 94122\n`,
          testimonial: `"I've met some of the most amazing, resilient people, grown, and had an amazing time all in all----this school is truly a hidden gem in the school system."`,
          principal: "Anastasia (Anna) Klafter",
          instagram_url: "https://www.instagram.com/sfindependence/",
          facebook_url: "https://www.facebook.com/sfindependence/",
          website_url: "https://www.sfusd.edu/school/independence-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 162,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 48,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 3,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 22,
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
              name: "SBAC English Proficiency",
              value: 46,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math Proficiency",
              value: 34,
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
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/independence-high-school/4388",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // SF International
    {
      name: "SF International High School",
      address: "655 De Haro St, San Francisco, CA",
      neighborhood: "Potrero Hill",
      priority: false,
      img: "international.jpeg",
      latitude: "37.76169",
      longitude: "-122.40082",
      profile: {
        create: {
          about: `SF International is a small public high school that offers a unique program designed for recent immigrant students.`,
          about_bp: [
            `All subjects teach English development through meaningful projects that keep students motivated and connected to their learning.`,
            `SF International offers programs every day until 6:00 PM for all students.`,
            `Community volunteers interested in supporting SF International should go through nonprofit RIT (Refugee & Immigrant Transitions).`,
          ],
          volunteer_form_url: "https://www.tfaforms.com/5026463",
          donation_text: `Mail a check made out to SF Interntional High School and mail it to:\nSF International High School\n655 De Haro St.\nSan Francisco, CA 94107\n`,
          testimonial: `"I like everything about my school, we all have the same experience that makes us be a good community, we are all English learners with big goals. Our school is small and we receive a lot of attention from the teachers that every day pushes us to be a great student."`,
          principal: "Nick Chan",
          instagram_url: "http://www.instagram.com/sfihuskies",
          website_url:
            "https://www.sfusd.edu/school/san-francisco-international-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 275,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 76,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 88,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 3,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 48,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English Proficiency",
              value: 12,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math Proficiency",
              value: 13,
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
              name: "Daytime classroom support",
              details: `Academic support for students during class`,
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
              name: "Career Prep and Mentoring",
              details: `Provide students with mentoring, career insight and readiness`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Donors Choose",
              details: ``,
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/san-francisco-int-l-high-school/98266",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // June Jordan
    {
      name: "June Jordan School for Equity",
      address: "325 La Grande Ave, San Francisco, CA",
      neighborhood: "Excelsior",
      priority: true,
      img: "junejordan.jpeg",
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
    // Lincoln
    {
      name: "Lincoln High School",
      address: "2162 24th Ave, San Francisco, CA",
      neighborhood: "Parkside/Sunset",
      priority: false,
      img: "lincoln.jpeg",
      latitude: "37.74729",
      longitude: "-122.48109",
      profile: {
        create: {
          about: `Lincoln is one of the three largest high schools in SFUSD. The school features:`,
          about_bp: [
            `Partnerships with 14 different community agencies`,
            `Four CTE (Career Technical Education) funded multi-year Academy Programs: CTE Business Academy, CTE Digital Media Design Academy, CTE Green Academy, and CTE Teacher Academy`,
            `Two pathways: Art & Architecture Pathway (Formerly ACE Architecture, Construction, Engineering) and the Biotechnology Pathway`,
            `Services for special education (severely and non-severely impaired) students`,
            `A student newspaper called the "Lincoln Log"`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/1iO_ex9OJK81xD9EQ8D4SZHjhJDhgyLcdb2IQq5u4rDg/edit",
          donation_url:
            "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=RHY6FMNAJX8EE&source=url&ssrt=1713743821077",
          donation_text: "Donate to Lincoln's PTSA.",
          testimonial: `"Here at Lincoln you've got tons of supportive staff and also you'll be open to major student leadership opportunities."`,
          testimonial_author: "Kelly Wong, student",
          testimonial_video:
            "https://www.youtube.com/embed/PfHdxukonSg?si=RvM3VjT_SAPSI0Sb&amp;start=225",
          noteable_video:
            "https://www.youtube.com/embed/PfHdxukonSg?si=Q3d3ieVn2fdtD_Ka",
          principal: "Sharimar Manalang",
          instagram_url: "https://www.instagram.com/alhsgreenacademy/",
          facebook_url: "https://www.facebook.com/groups/191813114254895/",
          website_url:
            "https://www.sfusd.edu/school/abraham-lincoln-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 1997,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 48,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 16,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 14,
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
              name: "SBAC English proficiency",
              value: 55,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 34,
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
              name: "Alumni Association",
              details: `Support the association in their efforts to raise funds for a variety of school and student needs`,
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
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/abraham-lincoln-high-school/4399",
              category: ProgramCategory.donate,
            },
            {
              name: "Lincoln High School Alumni Association",
              details: ``,
              url: "https://lincolnalumni.com/donations/",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // Lowell
    {
      name: "Lowell High School",
      address: "1101 Eucalyptus Dr, San Francisco, CA",
      neighborhood: "Lakeshore",
      priority: false,
      img: "lowell.jpeg",
      latitude: "37.73068",
      longitude: "-122.48392",
      profile: {
        create: {
          about: `Established in 1856, Lowell High School is the oldest public high school west of Mississippi, recognized as one of California's highest-performing public high scools.`,
          about_bp: [
            `They have been honored as a National Blue Ribbon school 4 times, and a California Distinguished School 8 times and ranked #1 in the Western region for the number of Advanced Placement (AP) exams offered (31).`,
            `With a wide range of academic opportunities, Lowell has the largest Visual and Performing Arts Department in the city and a World Language Department with instruction in eight languages.`,
            `Lowell aims to connect PTSA and Alumni meaningfully within its community.`,
            `One of the only SFUSD schools with an established journalism program and student-run publication, The Lowell.`,
          ],
          volunteer_form_url: "https://forms.gle/PWzEnLfgVWxcMDRz5",
          donation_url:
            "https://secure.givelively.org/donate/pta-california-congress-of-parents-teachers-students-inc-san-francisco-ca-8431854/lowell-ptsa-2023-2024-fundraising",
          donation_text:
            "Donate to Lowell's PTSA. Your donation will fund grants for student organizations, clubs, and teachers. It will also fund college readiness, diversity and inclusion, wellness, and hospitality programs. Any remainder at the end of the school year will go into our rainy day fund for next year.",
          noteable_video:
            "https://www.youtube.com/embed/c4BiiF55SvU?si=9XB3PhXZAP3ooIZn",
          principal: "Michael Jones",
          instagram_url: "https://www.instagram.com/lowellhs/?hl=en",
          facebook_url:
            "https://www.facebook.com/pages/Lowell-High-School-San-Francisco/109617595723992",
          website_url: "https://www.sfusd.edu/school/lowell-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 2632,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 29,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 4.6,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 6.9,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 99,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English proficiency",
              value: 93,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 83,
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
              name: "College Readiness Workshops",
              details: `Help support the PTSA's college readiness workshops for Lowell, providing essay writing advice, college-picking advice, and workshops.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Event Volunteer",
              details: `Join a Lowell PTSA committee event as a community volunteer to help with occasional events (Beautification Day, Graduation, Dances) or even sign up to routinely help with Lowell's on campus bookstore!`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Remote (Website, Social Media, Newsletter)",
              details: `Help the PTSA maintain their online presence through remote social media, website, and newsletter maintenace!`,
              url: "https://docs.google.com/forms/d/e/1FAIpQLSd_ZykYI3GM9GZOVtnq2x4cnN6GmEwo0rBKhI3nfWwBexl65A/viewform",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Donors Choose",
              details: ``,
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/lowell-high-school/4400",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // Mission
    {
      name: "Mission High School",
      address: "3750 18th St, San Francisco, CA",
      neighborhood: "Mission",
      priority: true,
      img: "mission.jpeg",
      latitude: "37.7616",
      longitude: "-122.42698",
      profile: {
        create: {
          about: `Mission High is the oldest comprehensive public school in San Francisco founded in 1890. The school:`,
          about_bp: [
            `Is one of the most diverse schools in the San Francisco public school district, and beginning in the Fall of the 2007/08 school year, the Mission faculty collectively created a working definition of Anti-Racist/Equity education`,
            `Offers six Career and Tech Ed pathways: Environmental Science, Fire Science and EMS Academy, Media Arts, Peer Resources, Public Health, and Urban Agriculture`,
            `Has a majority of its students learning English as a second language (or perhaps as third or fourth language)`,
            `Has its own museum, founded in 1995 by a former science teacher, for the purpose of preserving and displaying the rich history of Mission High School`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/1oene039Zn-fBGxjI2iS2B9n0O-U2BhtDZl-td9M0hNs",
          donation_url: "https://missionhigh.org/ways-to-give/",
          donation_text:
            "Donate to the Mission High Foundation. The foundation supports educator grants, the Annual College Trip, the food and agriculture program, college preparation, and student wellness.",
          testimonial: `"I have never seen in other schools' teachers that worry a lot about the student...That’s the difference about Mission, the teachers genuinely want their students to succeed."`,
          testimonial_author: "Nathaly Perez",
          testimonial_video:
            "https://www.youtube.com/embed/cmNvxruXUG8?si=dpNJPOM768R3skBM",
          principal: "Valerie Forero",
          instagram_url: "https://www.instagram.com/missionhighfoundation/",
          facebook_url: "https://www.facebook.com/sfmissionhs/",
          website_url: "https://www.sfusd.edu/school/mission-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 1041,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 56,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 38,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 20,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 80,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English proficiency",
              value: 26,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 11,
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
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/mission-high-school/4401",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // John O'Connell
    {
      name: "John O'Connell Technical High School",
      address: "2355 Folsom St, San Francisco, CA",
      neighborhood: "Mission",
      priority: true,
      img: "johnoconnell.jpeg",
      latitude: "37.75956",
      longitude: "-122.41454",
      profile: {
        create: {
          about: `JOCHS is a small, academic-focused high school with several career pathways. The school provides:`,
          about_bp: [
            `Four integrated Pathways for grades 11-12: Building and Construction Trades, Entrepreneurship and Culinary Arts, Health and Behavioral Sciences, and Public Service. During this time students are assigned professional internships to give them real world experience`,
            `For grades 9-10, “house” classes that lead into Pathways when upperclassmen: Humanities and Social Justice, Science, Communication and Sustainability, and Liberation and Resistance Studies`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/1SEjtZpA_mx6p-7PnUujdyL-skjRQtn07KBgXV0tPo-w",
          donation_text: `Mail a check made out to John O'Connell High School to:\nJohn O'Connell High School\n2355 Folsom St.\nSan Francisco, CA, 94110`,
          testimonial: `“A few of the clubs that I participate in are: Black Student Union, Student Body, Yearbook, and a couple more. I really love my school. I really love how they support us unconditionally…”`,
          testimonial_author: "Lonnie, student",
          testimonial_video:
            "https://www.youtube.com/embed/dHSG-DS_Vko?si=xSmHawJ6IbiQX-rr&amp;start=231",
          noteable_video:
            "https://www.youtube.com/embed/dHSG-DS_Vko?si=xlpYHFmZIBAkh4yd",
          principal: "Amy Abero & Susan Ryan (Co-Principals)",
          instagram_url: "https://www.instagram.com/oc_youknow/?hl=en",
          facebook_url: "https://www.facebook.com/OChighschoolSFUSD/",
          website_url: "https://www.sfusd.edu/school/john-oconnell-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 506,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 65,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 29,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 24,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 90,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English proficiency",
              value: 37,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 6,
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
              name: "Healthy Eating Physical Activity (HEPA)",
              details: `Support workshops and activities that promote health`,
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
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/john-o-connell-high-school/4402",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // Ruth Asawa
    {
      name: "Ruth Asawa School of the Arts (SOTA)",
      address: "555 Portola Dr, San Francisco, CA",
      neighborhood: "Diamond Heights",
      priority: false,
      img: "ruthasawa.jpeg",
      latitude: "37.74538",
      longitude: "-122.44965",
      profile: {
        create: {
          about: `Ruth Asawa School of the Arts (SOTA) is named after renowned sculptor Ruth Asawa who was a passionate advocate for arts in education.`,
          about_bp: [
            `SOTA is an audition-based, alternative high school committed to fostering equity and excelling in both arts and academics.`,
            `Rooted in its vision of artistic excellence, SOTA offers a unique educational experience emphasizing arts, with 6 specialized programs to reflect San Francisco's cultural diversity: DANCE: Conservatory Dance, World Dance, MUSIC: Band, Orchestra, Guitar, Piano, Vocal, and World Music, MEDIA & FILM, THEATRE: Acting, Musical Theatre, THEATER TECHNOLOGY: Costumes, Stagecraft, VISUAL: Drawing & Painting, Architecture & Design.`,
            `To integrate arts and academics, all SOTA students have art blocks every afternoon, and uniquely, they have an Artists-In-Residence Program partly funded through donations.`,
            `Co-located with The Academy`,
          ],
          volunteer_form_url: "https://forms.gle/bRnDEhzXYDD8mhcB6",
          donation_url: "https://app.arts-people.com/index.php?donation=rasa",
          donation_text: `Donate to SOTA's PTSA, which funds artists in residence on campus.`,
          testimonial: `"We have specialized departments ... So it's the perfect school for any aspiring artist."`,
          testimonial_author: "Ava, Student",
          testimonial_video:
            "https://www.youtube.com/embed/gouN1t1GxE0?si=ovResdGqAYsklGlF",
          noteable_video:
            "https://www.youtube.com/embed/zXcnXNEvjoo?si=7-tJ7DywSRThJMw8",
          principal: "Stella Kim",
          instagram_url: "https://www.instagram.com/ruthasawasota/",
          facebook_url: "https://www.facebook.com/AsawaSOTA/",
          website_url:
            "https://www.sfusd.edu/school/ruth-asawa-san-francisco-school-arts",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 700,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 17,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 1.8,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 11.1,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 97,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English proficiency",
              value: 84,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 53,
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
              details: `Help tutor SOTA students in STEM subjects.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Staff Appreciation Event Volunteer",
              details: `Support the PTSA show appreciation for staff and Artists-In-Residents both with in person distribution or remote video editing support!`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Audition Day Volunteer",
              details: `Support budding students, faculty, and parents during the SOTA audition process through physical audition day volunteering.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Donors Choose",
              details: ``,
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/academy-of-arts-sciences/4393",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // The Academy
    {
      name: "The Academy",
      address: "550 Portola Dr #250, San Francisco, CA",
      neighborhood: "Diamond Heights",
      priority: false,
      img: "theacademy.jpeg",
      latitude: "37.745499",
      longitude: "-122.451563",
      profile: {
        create: {
          about: `The Academy fosters one of the smallest school learning environments, where teachers can closely engage with students, hands-on administrators, and families for a stronger, supportive community.`,
          about_bp: [
            `With a focus on individualized support, every Academy student receives college counseling through their four years with 2 full-time academic and dedicated college counselors.`,
            `They offer a range of extracurricular activities including academic tutoring, enrichment activities, and arts instruction in unique disciplines such as visual arts, modern rock band, photography, and theatre.`,
            `The Academy aims for a holistic educational experience with comprehensive athletics program and various student support services, including counseling and health and wellness resources.`,
            `Co-located with Ruth Asawa School of the Arts, on the first floor of the former McAteer Main Building.`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/1px5HE5JPNp5b5emzPVhadVDh6lRy2r_DWLbXxNvzNrA/edit",
          donation_url:
            "https://www.paypal.com/paypalme/AcademySFatMcateer?country_x=US&locale_x=en_US",
          donation_text: `Donate to the Academy's PTSA. Your donation is used to support teacher classroom needs, and student events like prom and field trips.`,
          noteable_video:
            "https://drive.google.com/file/d/1GdVL6l4z1dCBDBfnwaRlIVvr9o_KxTLe/preview",
          principal: "Hollie Mack",
          instagram_url: "http://www.instagram.com/academywolvessf",
          facebook_url: "https://www.facebook.com/AcademyWolvesSF",
          website_url:
            "https://www.sfusd.edu/school/academy-san-francisco-mcateer",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 360,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 53,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 14.4,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 24.9,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 92,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English proficiency",
              value: 42,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 13,
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
              details: `Support Academy students with STEM subjects with their afterschool program on a regular or ad-hoc basis.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Culinary & Arts Mentor Volunteer",
              details: `Help provide real life skills to Academy students with culinary mentorship and creative expression within their afterschool program.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Remote Coding Teacher",
              details: `Help host afterschool, remote coding classes for The Academy students.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Donors Choose",
              details: ``,
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/school-of-the-arts-high-school/99136",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // Thurgood Marshall
    {
      name: "Thurgood Marshall High School",
      address: "45 Conkling St, San Francisco, CA",
      neighborhood: "Bayview",
      priority: true,
      img: "thurgood.jpeg",
      latitude: "37.73609",
      longitude: "-122.40211",
      profile: {
        create: {
          about: `Thurgood Marshall High School was founded in 1994, and is located in the southeastern part of San Francisco. The school offers:`,
          about_bp: [
            `A refurbished and expanded College & Career Center, a fully staffed Wellness Center, a Peer Resources Program, and a daily after-school tutoring program`,
            `A special program for recent immigrants and newcomers.`,
            `Health, housing, immigration, financial support resources for families`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/1TlrrJZZWcKXeZdAKuF2CQkAmTtRXTmGEe3NkRTFYBNE",
          donation_url:
            "https://thurgood-marshall-academic-high-school-pto.square.site/",
          donation_text: `Donate to Thurgood Marshall's PTSA`,
          testimonial: `“I liked this project because we got to practice English and the other person I was working with got to practice her Spanish.” - Darlin on the “Empathy Project” where native English speakers and English learners practice languages and learn from each other`,
          testimonial_author: "Darlin",
          testimonial_video:
            "https://www.youtube.com/embed/nUIBNpi3VTA?si=2mdebQexdqQuB-Ke",
          noteable_video:
            "https://www.youtube.com/embed/NclnGjU3zJM?si=g9bnDzFsl3mvGRgM",
          principal: "Sarah Ballard-Hanson",
          instagram_url: "https://www.instagram.com/marshallphoenix/?hl=en",
          facebook_url: "https://www.facebook.com/groups/20606012934/",
          website_url:
            "https://www.sfusd.edu/school/thurgood-marshall-academic-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 457,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 66,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 62,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 11,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 72,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English proficiency",
              value: 12,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 5,
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
              name: "Career Prep and Mentoring",
              details: `Provide students with mentoring, career insight and readiness`,
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
              name: "Family Services",
              details: `Help ensure student families have access to basic services`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Donors Choose",
              details: ``,
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/thurgood-marshall-academic-high-school/4394",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // Wallenberg
    {
      name: "Wallenberg High School",
      address: "40 Vega St, San Francisco, CA",
      neighborhood: "Western Addition",
      priority: false,
      img: "wallenberg.jpeg",
      latitude: "37.780365",
      longitude: "-122.44621",
      profile: {
        create: {
          about: `Founded in 1981, the Raoul Wallenberg Traditional High School (or "Wallenberg") honors the renowned Swedist diplomat, guided by personal responsibility, compassion, honesty, and integrity for equitable educational outcomes that enhance creativity, self-discipline, and citizenship.`,
          about_bp: [
            `Wallenberg provides a rigorous educational program designed to prepare its diverse student body for success in college, careers, and life, including through diagnostic counseling, and college prep (including the AVID program).`,
            `Wallenberg has three future-focused pathways: Biotechnology, Computer Science (SIM - Socially Inclusive Media), and Environmental Science, Engineering, and Policy (ESEP)`,
            `Wallenberg focuses on close student-staff relations to foster a culture of support and service that encourages ongoing interaction, assessment, and feedback to promote high achievement and the joy of learning. Parents are actively encouraged to engage with the school community.`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/e/1FAIpQLSdlALlSlZCTko4qBryLTunuIVcZGKmVeUl2MA-OPbnoOG15Lg/viewform",
          donation_url:
            "https://www.paypal.com/donate/?hosted_button_id=NX4GK2S6GQAWN",
          donation_text: `Donate to Wallenberg's PTSA. The PTSA aims to fund programs and events that benefit all Wallenberg students and teachers: building community, inclusion, and tolerance, sponsoring the Reflections Arts Program and Wallapalooza Art Festival, supporting technology and athletic programs, and honoring our teachers by providing them with stipends.`,
          testimonial: `"I really like my teachers because they always want you to perform at your best ... I feel like Wallenberg is a great school for students who want to be in a small community where everyone knows each other and where students and teachers have greater relationships"`,
          testimonial_author: "Ryan",
          testimonial_video:
            "https://www.youtube.com/embed/rtSYrHOxN28?si=rEoQTInfas1UBk44",
          noteable_video:
            "https://www.youtube.com/embed/rtSYrHOxN28?si=binBgRGAemfDKbzb",
          principal: "Tanya Harris",
          instagram_url: "https://www.instagram.com/wallenberghs/",
          facebook_url:
            "https://www.facebook.com/pages/Raoul-Wallenberg-Traditional-High-School/113129858701251",
          website_url:
            "https://www.sfusd.edu/school/raoul-wallenberg-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 549,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 43,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 10.9,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 21.3,
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
              name: "SBAC English proficiency",
              value: 73,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 37,
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
              name: "Campus Cleanup",
              details: `Help create a better environment for incoming and current Wallenberg students through cleaning up the gardens and picking up trash.`,
              url: "https://www.wallenbergpta.org/blog/categories/volunteers-needed",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Orientation and Community Day Volunteers",
              details: `Support incoming Wallenberg students by volunteering your time to the Wallenberg PTA.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "STEM tutor",
              details: `Support Wallenberg students through afterschool tutoring.`,
              url: "",
              category: ProgramCategory.volunteer,
            },
            {
              name: "Donors Choose",
              details: ``,
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/raoul-wallenberg-trad-high-school/4389",
              category: ProgramCategory.donate,
            },
            {
              name: "Zelle to the email wallenbergptsa@gmail.com",
              details: ``,
              url: "",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
    // Washington
    {
      name: "George Washington High School",
      address: "600 32nd Ave, San Francisco, CA",
      neighborhood: "Richmond",
      priority: false,
      img: "washington.jpeg",
      latitude: "37.77784",
      longitude: "-122.49174",
      profile: {
        create: {
          about: `Washington is one of the largest high schools in SFUSD, opened in 1936.`,
          about_bp: [
            `Students can choose from more than 100 course offerings, with 52 sections of honors and AP classes.`,
            `Students can also choose from over 50 campus clubs and student groups and a full inter-scholastic athletic program, with 22 teams in 15 sports.`,
            `Washington has an active Richmond Neighborhood program, Wellness Center, Parent Teacher Student Association, and Alumni Association.`,
            `Washington offers a sweeping view of the Golden Gate Bridge from its athletic fields.`,
          ],
          volunteer_form_url:
            "https://docs.google.com/forms/d/1nEVr6vgTdrHEWnmQvoMXWS6eDxRx20imWMNh7pBUT1Y/edit",
          donation_url: "https://www.gwhsptsa.com/donate",
          donation_text: `Donate to the the school's PTSA`,
          testimonial: `"I went from a 2.8 student to a 3.7 student because teachers believed in me and I in them. Washington was one of the best schools for academics, sports, and overall community."`,
          principal: "John Schlauraff",
          instagram_url: "http://www.instagram.com/gwhsofficial",
          facebook_url:
            "https://www.facebook.com/profile.php?id=100067738675467",
          website_url:
            "https://www.sfusd.edu/school/george-washington-high-school",
        },
      },
      metrics: {
        createMany: {
          data: [
            {
              name: "Students Enrolled",
              value: 2070,
              unit: "",
              category: MetricCategory.about,
            },
            {
              name: "Free/Reduced Lunch",
              value: 46,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "English Language Learners",
              value: 12,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "Students with Special Needs",
              value: 11,
              unit: "%",
              category: MetricCategory.about,
            },
            {
              name: "High School Graduation Rate",
              value: 93,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC English proficiency",
              value: 74,
              unit: "%",
              category: MetricCategory.outcome,
            },
            {
              name: "SBAC Math proficiency",
              value: 57,
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
              url: "https://www.donorschoose.org/schools/california/san-francisco-unified-school-district/george-washington-high-school/4403#projects",
              category: ProgramCategory.donate,
            },
          ],
          skipDuplicates: true,
        },
      },
    },
  ];

  for (const school of schools) {
    await prisma.school.create({
      data: school,
    });
  }
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
