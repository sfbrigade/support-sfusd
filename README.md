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

3. Note the default public token you are given  

<br>

# Environment File

Create an environment file to pass your default public token from Mapbox

1. Create a new file, .env,  in the main directory (with the README.md file) 

2. Add your decault public token to your .env 
   ```sh
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_default_public_token
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

# Contact

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

