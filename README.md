# Mantis 

**Mantis** is an issue tracker built with Next.js, Typescript, Tailwindcss, and RadixUI. The initial codebase was from a course by Mosh Hamedani.

![Example](https://github.com/ZiyadBoshima/Mantis/assets/137479354/fb5b8214-7ae1-4a4e-91c1-f2a0520795a2)

## Prerequisites

Make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (version 21.5.0)
- [npm](https://www.npmjs.com/) (version 10.2.4)
- [MySQL](https://www.mysql.com/) (version 8.2.0)
- [Git](https://git-scm.com/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/ZiyadBoshima/Mantis
```

### Install Dependencies

```bash
cd Mantis
npm install
```
### Configure the .env file

1. Create a MySQL database for your project.
2. Copy the .env.example file to .env and update the database connection details.

```bash
cp .env.example .env
```

Open the .env file and update the following:

```dotenv
DATABASE_URL=""
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

For now, you will need to acquire a google client id in order to login to the dashboard with a google account. This variable will become optional soon. For the secrets, add any string of your choice.

### Run Migrations
Run Prisma migrations to create database tables.

```bash
npx prisma migrate dev
```

Start the Development Server

```bash
npm run dev
```

Your Next.js app should now be running at http://localhost:3000.
