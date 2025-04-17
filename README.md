# About Support SF Schools

Hello! Thanks for checking out Support SF Schools. We started this project in summer 2022 to solve a big problem in San Francisco. Schools need help. And people who live or work in SF want to support local schools, but they don’t know how. We are building a [website](https://supportsfschools.org/) to help solve that.

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

# Managing Environment Secrets with [SOPS](https://github.com/getsops/sops) + [age](https://github.com/FiloSottile/age)

This project uses environment variables to store sensitive information such as:

- Mapbox tokens
- PostgreSQL connection strings
- Google service account keys for accessing the Google Sheets & Drive APIs

To keep these secrets safe while still enabling collaboration, we use age and sops to encrypt and share a secure version of our `.env` file ([env.sops](/env.sops)).

## Step 1: Generate Your Keypair

First, make sure you’ve installed [age](https://github.com/FiloSottile/age). Then, generate your personal public/private keypair:

```sh
age-keygen -o age.key
```

- Keep your `age.key` file private — do not commit it to the repo.
- You can name it and store it anywhere on your system, but placing it in a secure, ignored folder is best.
- Your public key will be shown in the terminal output and is also included as a comment inside the `age.key` file.

## Step 2: Add Your Public Key to .sops.yaml

To give you access, an existing team member must add your public key to the repo’s `.sops.yaml` file:

```yaml
creation_rules:
  - path_regex: \.env
    encrypted_regex: ^[^#]+
    age: age1m8n8vl0vx5gz8guf8dkv6ckpdfp9snymenf3zmhyz54cswe32a9sc6jwnn,<new_member_public_key_here>
```

> 💡 Share your public key with another member on the dev team. A developer will then update and re-encrypt the env.sops file so you can decrypt it locally.

## Step 3: Re-Encrypting the [env.sops](/env.sops) File

When a new public key is added:

1. Ensure your local `.env` file has the correct and up-to-date values. If unsure, regenerate it from the current [env.sops](/env.sops):
   
   ```sh
   ./scripts/decrypt-env.sh <path-to-your-age.key>
   ```

2. Once the `.env` is verified and the `.sops.yaml` file has been updated with the new public key, re-encrypt:
   
   ```sh
   ./scripts/encrypt-env.sh
   ```

This regenerates the [env.sops](/env.sops) file using the updated key list, ensuring new developers can decrypt it with their own keys.

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

   - Alternatively, you can open [http://[LAN_IP]:3000](http://[LAN_IP]:3000) on another device, such as a phone on the same network. Replace `LAN_IP` with the IP address of your development server, which can be found inside of the "LAN url" part of the `npm run dev` log.

<br>

# Further Notes to help you out

Visit our [Notion](https://aquatic-magpie-a51.notion.site/Engineering-Guide-5cddd23f2ab0494cba2edcc93764f27f) for Engineers

## Gotchas

For Tailwind CSS, do not use `h-screen` as it is broken on mobile Safari. Instead, use our custom class `h-dvh-with-fallback` until which time the official `h-dvh` alone suffices (fallbacks are not needed).

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
