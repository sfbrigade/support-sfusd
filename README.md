# About Support SFUSD

Hello! Thanks for checking out Support SFUSD. We started this project in summer 2022 to solve a big problem in San Francisco. Schools need help. And people who live or work in SF want to support local schools, but they don’t know how. We are building a [website](https://support-sfusd.vercel.app/) to help solve that.

<br>

# Tech Stack

[![Next.js][next.js]][nextjs-url]
[![Typescript][typescript.js]][typescript-url]
[![React][react.js]][react-url]
[![Tailwind CSS][tailwind.js]][tailwind-url]
[![HTML][html.js]][html-url]
[![CSS][css.js]][css-url]

<br>

# Mapbox

You need to sign up for Mapbox to run the project locally.

1. Goto https://www.mapbox.com and sign up

2. It will ask you for billing information, but it is pay as you go. You have 500 instances before you are charged.


<br>

# Prisma

We're using Prisma as our ORM. If you're unsure of what it is or what it does here is a [link](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma#how-does-prisma-orm-work) to the prisma documentation regarding how it works and why its used

### Model changes 
[Prisma documentation on prototyping schema](https://www.prisma.io/docs/orm/prisma-migrate/workflows/prototyping-your-schema)
- If you want to make changes to any model in prisma, the schema file within the prisma folder is where those changes will take place
- Once you have made the changes to a model you're going to run this command in your terminal
   - The CLI will ask if you want to continue knowing that you will lose data, because we are seeding data and there is no user changes being made to our data this is completely acceptable
   ```sh
      npx prisma db push
   ```

- This will execute the changes required to make the vercel postgres database schema reflect the state of our prisma schema

### Seeding 
- After running `npx prisma db push` we lose all the data so we need to seed our database with all the school information, run this command in your terminal after making changes to the model
   - it should be noted that if you're making changes to the model the seed script will also need to be updated to account for the new fields that were added

   ```sh
      npx prisma db seed
   ```
<br>

# Environment File

Create an environment file to pass your default public token from Mapbox

1. Create a new file, `.env`, in the main directory (with the README.md file)

2. Add your default public token to your `.env`
   ```sh
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_default_public_token
   ```

3. For the prisma configuration you're going to need the vercel postgres URL, add both of these to your `.env` file
   ```sh
   POSTGRES_PRISMA_URL="postgres://default:1Na6IcVJvdRK@ep-shy-scene-a6ofl045-pooler.us-west-2.aws.neon.tech/verceldb?pgbouncer=true&connect_timeout=15&sslmode=require"
   POSTGRES_URL_NON_POOLING="postgres://default:1Na6IcVJvdRK@ep-shy-scene-a6ofl045.us-west-2.aws.neon.tech/verceldb?sslmode=require"
   ```

<br>

# Get Started

To run this project locally, please perform the following steps:

1. Clone the repository
   ```sh
   git clone https://github.com/sfbrigade/support-sfusd.git
   ```
2. Install dependencies at the root directory

   ```sh
   npm install
   ```

3. Run the development server

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

<br>

# Further Notes to help you out

Visit our [Notion](https://aquatic-magpie-a51.notion.site/Engineering-Guide-5cddd23f2ab0494cba2edcc93764f27f) for Engineers

<!-- References and Icons -->

[html.js]: https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css.js]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript.js]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[tailwind.js]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[nextjs-url]: https://nextjs.org/
[notion-url]: https://www.notion.so/Engineering-Start-5cddd23f2ab0494cba2edcc93764f27f?pvs=4
