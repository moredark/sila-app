<p align="center">
  <img src="https://github.com/user-attachments/assets/6e402a46-1e74-47c1-9fdf-d673b890bd34" alt="logo" width="30%" style=""/>
</p>

Sila is a mobile web application designed to simplify tracking and analyzing workout progress. It helps users log their strength metrics and analyze growth dynamics. The app is ideal for both beginners and experienced athletes aiming to efficiently manage their training and achieve new heights.

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies](#technologies)
  - [Frontend](#frontend-technologies)
  - [Backend](#backend-technologies)
- [Installation](#installation)
- [Usage](#usage)
  - [Installing as a PWA](#installing-as-a-pwa)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About the Project

Sila-App is a comprehensive solution for athletes and trainers to manage and optimize their workout routines. Key features include:

- **Google OAuth2 Authentication**: Secure and easy login using Google accounts.
- **Workout Management**: Create, edit, and track workouts and exercises.
- **Progress Tracking**: Monitor strength metrics and visualize growth over time.
- **Role-Based Access**: Different access levels for administrators, trainers, and regular users.
- **API Documentation**: Interactive API docs available via Swagger.
- **Dockerized Deployment**: Simplified setup and deployment using Docker and Docker Compose.
- **Progressive Web App (PWA)**: Installable on mobile devices for a native app-like experience.

## Technologies

### Frontend Technologies

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for production.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **OpenAPI Fetch**: A type-safe fetch client that pulls in your OpenAPI schema.
- **React Query**: Data-fetching library for React.
- **Zustand**: A small, fast, and scalable bearbones state-management solution.
- **Shad UI**: A modern UI component library for React.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Hook Form**: Build forms in React, without the tears.
- **i18next**: Internationalization framework.

### Backend Technologies

- **Go (Golang)**: A statically typed, compiled programming language designed at Google.
- **Fiber**: An Express-inspired web framework for Go.
- **GORM**: An ORM library for Golang.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **OAuth2**: Protocol for authorization.
- **JWT**: JSON Web Tokens for secure authentication.
- **Swagger**: API documentation and testing tool.

## Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the Repository**

   ```
   git clone https://github.com/your_username/sila-app.git
   cd sila-app
   ```
2. Create Environment Variables

Copy the example environment variables and fill in your own values.

```
cp .env.example .env
```

Edit the .env file and set the required variables:

```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET_KEY=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REDIRECT_URL=https://yourdomain.com/api/auth/google/callback
```

Build and Run Docker Containers

```
docker-compose up -d
```

## Usage

1. **Access the Application**

   Open your browser and navigate to [https://sila-danila.ru](https://sila-danila.ru).

2. **Login with Google**

   Click on the "Login with Google" button to authenticate using your Google account.

3. **Manage Workouts**

   - **Create Workout**: Navigate to the "Create Workout" section to set up a new workout routine.
   - **Track Progress**: View your logged workouts and track your progress over time.
   - **Workout History**: Look and analyze your training history.

4. **API Documentation**

   Access the interactive API documentation via Swagger at [https://sila-danila.ru/api/swagger/index.html](https://sila-danila.ru/api/swagger/index.html) to explore available endpoints and test API calls.

### Installing as a PWA

Sila-App is a Progressive Web App (PWA), which means you can install it on your device for a more native app-like experience. Here's how to install it:

#### On Mobile Devices (iOS and Android)

1. **Open the Application in Your Browser**

Navigate to [https://sila-danila.ru](https://sila-danila.ru) using your mobile browser (Safari for iOS or Chrome for Android).

2. **Access the Browser Menu**

- iOS (Safari): 
  - Tap the Share button at the bottom of the screen.
- Android (Chrome):
  - Tap the Menu (three dots) button in the top-right corner.

3. **Add to Home Screen**

- iOS (Safari):
  - Scroll down and tap Add to Home Screen.

- Android (Chrome):
  - Tap Install **Sila** or Add to Home Screen.

4. **Confirm Installation**

- Enter a name for the app if prompted and confirm the addition.

5. **Launch the App**

- An icon for **Sila** will appear on your home screen. Tap it to launch the app in a standalone window, similar to a native application.

## Deployment

Сertbot is essential for securing your application with SSL certificates from Let's Encrypt. It automates the process of obtaining, renewing, and managing these certificates, ensuring that your application remains secure without manual intervention.

## Contributing

Contributions are welcome! Please follow the [Contributing Guidelines](https://github.com/moredark/sila-app/CONTRIBUTING.md) to get started.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Daniil Sakmarkin - sakmarkin01@gmail.com

Telegram - [@moredarkie](https://t.me/moredarkie)

