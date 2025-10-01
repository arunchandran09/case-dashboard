# Case Dashboard

The **Case Dashboard** is a web application built with [Next.js](https://nextjs.org) that provides an interface for managing and viewing case histories, case details, and user information. It is designed to streamline case management processes with an intuitive UI and efficient data handling.

## Features

- **Case History**: View detailed history of cases, including hearing dates, purposes, and associated documents.
- **Case Details**: Access specific details about individual cases.
- **User Management**: Manage user data with forms and tables.
- **Responsive Design**: Optimized for various screen sizes.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v16 or higher)
- pnpm (preferred package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arunkumar-servicenow/case-dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd case-dashboard
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Development Server

Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To build the application for production:
```bash
pnpm build
```

Start the production server:
```bash
pnpm start
```

## API Endpoints

- **`/api/case-history`**: Fetch case history data.
- **`/api/case-details`**: Fetch details of a specific case.
- **`/api/cases`**: Fetch a list of all cases.

## Folder Structure

- `app/`: Contains the main application pages and layouts.
- `components/`: Reusable UI components.
- `db/`: Database schema and configuration.
- `lib/`: Utility functions.
- `server/`: Server-side logic and API handlers.
- `public/`: Static assets like images and icons.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
