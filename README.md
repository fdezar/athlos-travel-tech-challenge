# Athlos Travel Tech Challenge

## Description

This project is an API developed using [NestJS](https://nestjs.com/) to manage hotel information. It utilizes web scraping to fetch details from Booking.com and stores them in a database using TypeORM.

## Features

- **Data Scraping**: Fetch hotel data from Booking.com.
- **CRUD Operations**: Create, read, update, and delete hotel information.
- **API Documentation**: Integrated with Swagger for API documentation.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fdezar/athlos-travel-tech-challenge.git
   cd athlos-travel-tech-challenge
   ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

Create a .env file in the root directory and add the following:

    ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_DATABASE=your_db_name
    ```

Replace your_db_username, your_db_password, and your_db_name with your PostgreSQL credentials.

## Running the Application

To start the application, run:

    ```bash
    npm run start
    ```

The server will start at http://localhost:3000.

## API Endpoints

| Method | Endpoint             | Description                                      |
|--------|----------------------|--------------------------------------------------|
| POST   | /hotels/scrape       | Scrapes hotel data from Booking.com.             |
| GET    | /hotels              | Retrieves all hotels.                            |
| GET    | /hotels/:id          | Retrieves a specific hotel by ID.                |
| PUT    | /hotels/:id          | Updates a hotel by ID.                           |
| DELETE | /hotels/:id          | Deletes a hotel by ID.                           |

## Swagger API Documentation

API documentation is available using Swagger at:

```bash
http://localhost:3000/api/docs
```
