# BookMyShow Clone Admin Panel 💻

An admin panel for managing the BookMyShow Clone application, built using Next.js and TypeScript.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Dashboard for managing movies, theaters, and bookings.
- Authentication and role-based access control.
- Movie and showtime management.
- User management and analytics.
- Responsive UI for desktop and mobile.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/i-m-Gaurav/bookmyshow-clone-admin.git
   cd bookmyshow-clone-admin
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database:**

   - Ensure PostgreSQL is installed and running.
   - Create a `.env` file in the root directory and add your database connection string:

     ```env
     DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
     ```

   - Run Prisma migrations:

     ```bash
     npx prisma migrate dev --name init
     ```

4. **Configure authentication:**

   - Add the necessary environment variables for NextAuth.js in your `.env` file:

     ```env
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your_secret
     ```

### Usage

1. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

---

*Note: This README is based on the typical structure and features of an admin panel for a BookMyShow clone project. Please adjust the sections as per the actual functionalities and configurations of your project.*

