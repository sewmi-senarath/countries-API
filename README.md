# Country Explorer - React Frontend Application

## Overview
This project is a creative React-based frontend application, named "Country Explorer," leverages the REST Countries API to provide an interactive platform for exploring country data. It features a modern user interface built with Tailwind CSS, advanced React hooks, user session management with a custom backend, and robust testing. The application is hosted on a free platform and maintained with Git version control.


## Features
### Frontend Features
- **Country List**: Displays a dynamic list of all countries fetched from the REST Countries API (`/all` endpoint).
- **Search Functionality**: Allows users to search for countries by name using the `/name/{name}` endpoint.
- **Filter Options**: Filters countries by region or language using custom logic based on API data.
- **Country Details**: Shows detailed information (name, capital, region, population, flag, languages) for a selected country using the `/alpha/{code}` endpoint.
- **Map View**: Visualizes country locations using Leaflet integration.
- **Favorites**: Users can mark and view their favorite countries (requires login).
- **Compare Countries**: Compare up to three countries side-by-side.
- **Theme Toggle**: Switch between light and dark modes with persistent storage.
- **Responsive Design**: Fully responsive layout optimized for desktop and mobile devices.

### Backend Features
- **User Authentication**: Implements login, register, and logout functionality with JWT-based session management.
- **Protected Routes**: Secures access to features like favorites and country details.
- **API Endpoints**: Custom REST API for user management integrated with MongoDB.

### API Integration
The application utilizes the following REST Countries API endpoints:
- `GET /all`: Fetches the complete list of countries.
- `GET /name/{name}`: Searches for countries by name.
- `GET /alpha/{code}`: Retrieves detailed country information by code.
- Custom backend endpoints (`/api/auth/login`, `/api/auth/register`, `/api/auth/logout`, `/api/protected`) for user management.

## Technology Stack
- **Frontend**:
  - React (Functional Components with Hooks)
  - JavaScript (ES6+)
  - Tailwind CSS (for styling and responsiveness)
  - Leaflet (for map visualization)
  - Axios (for API requests)
  - React Router DOM (for navigation)
  - js-cookie (for cookie management)
- **Backend**:
  - Node.js with Express
  - MongoDB (via Mongoose)
  - JSON Web Token (JWT) for authentication
  - bcryptjs (for password hashing)
  - cors and cookie-parser (for cross-origin and cookie handling)
- **Testing**: Jest and React Testing Library
- **Hosting**: 
- **Version Control**: Git with GitHub

## Installation and Setup

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)
- MongoDB Atlas account (for backend database)
- Git (for version control)
