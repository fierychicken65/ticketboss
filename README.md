# TicketBoss

TicketBoss is a robust Event Ticketing API designed to handle high-concurrency reservation requests with data integrity. It features Optimistic Concurrency Control to manage seat availability effectively.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
1.  **Clone the repository** 
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="file:./dev.db"
    ```

4.  **Database Setup**:
    Initialize the SQLite database and generate the Prisma client:
    ```bash
    npx prisma generate
    npx prisma db push
    ```
    *Note: A `seedEvent.js` script runs automatically on server start to ensure the default event exists.*

### Running the Application
To start the development server with hot-reloading:
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

To run in production mode:
```bash
npm start
```

---

## 📖 API Documentation

### Base URL
`http://localhost:3000`

### 1. Create a Reservation
Reserves seats for a partner.

-   **Endpoint**: `POST /reservations`
-   **Body Parameter**:
    ```json
    {
      "partnerId": "string", // Required
      "seats": "number"      // Required (1-10)
    }
    ```
-   **Success Response (201 Created)**:
    ```json
    {
      "reservationId": "c...123",
      "seats": 2,
      "status": "confirmed"
    }
    ```
-   **Error Responses**:
    -   `400`: Invalid input (e.g., missing partnerId, invalid seat count).
    -   `409`: Conflict (Not enough seats or optimistic lock failure).

### 2. Get Event Summary
Retrieves the current status of the event, including available seats.

-   **Endpoint**: `GET /reservations`
-   **Success Response (200 OK)**:
    ```json
    {
      "eventId": "node-meetup-2025",
      "name": "Node.js Meetup",
      "totalSeats": 100,
      "availableSeats": 98,
      "reservationCount": 1,
      "version": 1
    }
    ```

### 3. Cancel a Reservation
Cancels an existing reservation and releases the seats.

-   **Endpoint**: `DELETE /reservations/:reservationId`
-   **Success Response (204 No Content)**: *Empty body*
-   **Error Responses**:
    -   `404`: Reservation not found.

### 4. Debug: List All Reservations
(Internal/Debug use only) List all reservations in the system.

-   **Endpoint**: `GET /debug/reservations`

---

## 🛠 Technical Decisions & Architecture

### Architecture
The project follows a standard **Layered Architecture** to separate concerns:
-   **Routes** (`src/routes`): Handle HTTP request routing.
-   **Controllers** (`src/controllers`): Manage request/response logic and validaton.
-   **Services** (`src/services`): Contain core business logic.
-   **Data Access** (`src/db` & Prisma): Handle database interactions.

### Storage Method
-   **Database**: **SQLite** is used for simplicity and ease of local development.
-   **ORM**: **Prisma** is used for type-safe database access and schema management.

### Concurrency Control
To handle potential race conditions when multiple users try to book the last few seats simultaneously, the system implements **Optimistic Concurrency Control (OCC)**:
-   The `Event` model includes a `version` integer.
-   Updates to `availableSeats` are conditional, ensuring the `version` hasn't changed since the read.
-   If a version conflict occurs (another transaction updated the record first), the request fails safely (409 Conflict) rather than overbooking.

### Assumptions
-   **Single Event**: The system currently hardcodes operations to a single event ID: `"node-meetup-2025"`.
-   **Concurrency**: Optimized for high read/write concurrency on the `availableSeats` counter.

---
