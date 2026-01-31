# SyncTicket

Professional, role-aware helpdesk for modern teams — fast, secure, and extensible.

## Project Overview
SyncTicket is a full‑stack ticketing system built to simplify support workflows for organizations of any size. It centralizes the ticket lifecycle (create, triage, assign, resolve), enforces role‑based access control, and provides threaded internal communication inside each ticket. The frontend is implemented with React + TypeScript (Vite) and integrates with a REST API backend using JWT for secure authentication.

## Key Features
- ✅ **Role-Based Access (RBAC):** Admin, Agent, and Customer roles with tailored permissions.
- 📨 **Full Ticket CRUD:** Create, read, update, delete tickets with status and priority controls.
- 🔁 **Lifecycle & Assignment:** Status transitions, priority levels, and agent assignment.
- 💬 **Nested Comments:** Threaded internal comments/chat per ticket for team collaboration.
- ⚡ **Real-time Filtering:** Live search and filters by status, priority, and assignee.
- 🎨 **Modern UI:** Dark mode, responsive layout, custom Sidebar and Navbar using MUI.
- 🔐 **JWT Authentication:** Secure login with tokens managed in React Context.
- 🧩 **Modular Architecture:** Reusable components and a dedicated service layer for API calls.

## Architecture
### Client — Server Flow
- The React frontend calls the REST API via a centralized service layer in [`src/services`](src/services), which handles HTTP configuration, error handling, and authentication headers.
- Typical endpoints expected from the backend: `/auth`, `/tickets`, `/users`, `/comments`.
- The UI uses protected routes and role checks to gate feature access.

### JWT Authentication
- Authentication state is managed by `src/context/AuthContext.tsx`.
- After login, the backend issues a JWT; the frontend attaches it to outgoing requests as `Authorization: Bearer <token>` (handled in the service layer).
- Protected routes are enforced client-side by the `ProtectedRoute` component; backend endpoints must also verify token validity and role claims.

### Security Notes
- Prefer storing refresh tokens in httpOnly cookies and keeping access tokens short‑lived.
- Implement server‑side token rotation / refresh endpoints for improved security.
- Always validate role claims server-side before performing privileged operations.

## Tech Stack
- **Frontend:** React (Vite), TypeScript, Material UI (MUI)
- **Backend:** REST API with JWT authentication (backend implementation is pluggable)
- **Tools:** Vite, ESLint, TypeScript, axios/fetch, Prettier (optional)

## Folder Structure (high level)
- [`src/Components`](src/Components) — Reusable UI components and views
  - [`src/Components/Dashboard.tsx`](src/Components/Dashboard.tsx "src/Components/Dashboard.tsx")
  - [`src/Components/Login.tsx`](src/Components/Login.tsx "src/Components/Login.tsx")
  - [`src/Components/ProtectedRoute.tsx`](src/Components/ProtectedRoute.tsx "src/Components/ProtectedRoute.tsx")
  - [`src/Components/Ticket`](src/Components/Ticket) — Ticket-specific components:
    - [`src/Components/Ticket/TicketCard.tsx`](src/Components/Ticket/TicketCard.tsx "src/Components/Ticket/TicketCard.tsx")
    - [`src/Components/Ticket/TicketFilterBar.tsx`](src/Components/Ticket/TicketFilterBar.tsx "src/Components/Ticket/TicketFilterBar.tsx")
    - [`src/Components/Ticket/TicketsList.tsx`](src/Components/Ticket/TicketsList.tsx "src/Components/Ticket/TicketsList.tsx")
- [`src/context`](src/context) — App-level contexts
  - [`src/context/AuthContext.tsx`](src/context/AuthContext.tsx "src/context/AuthContext.tsx")
- [`src/Models`](src/Models) — Type definitions and domain models
  - [`src/Models/Ticket.ts`](src/Models/Ticket.ts "src/Models/Ticket.ts")
  - [`src/Models/User.ts`](src/Models/User.ts "src/Models/User.ts")
  - [`src/Models/Comment.ts`](src/Models/Comment.ts "src/Models/Comment.ts")
- [`src/services`](src/services) — API service layer and HTTP utilities
  - [`src/services/authService.tsx`](src/services/authService.tsx "src/services/authService.tsx")
  - [`src/services/ticketService.ts`](src/services/ticketService.ts "src/services/ticketService.ts")
- Project entry & config
  - [`vite.config.ts`](vite.config.ts "vite.config.ts")
  - [`src/main.tsx`](src/main.tsx "src/main.tsx")
  - [`src/App.css`](src/App.css "src/App.css")

## Installation
1. Clone the repository:
```bash
git clone <repo-url>
cd helpdesk-project
```
2. Install dependencies:
```bash
npm install
```
3. Backend Setup (Required):
   This frontend requires the backend server to be running. 
   - Clone the backend from: [https://github.com/yehudit-alfa/react-helpdesk-backend](https://github.com/yehudit-alfa/react-helpdesk-backend)
   - Follow the instructions in the backend README to start the server on port 4000.

4. Environment Variables:
   Create a `.env` file at the project root and point it to the local backend:
   ```env
   VITE_API_URL=http://localhost:4000
   VITE_API_TIMEOUT=10000
```
5. Run the development server:
   ```bash
   npm run dev
```
6.Build for production
   npm run build
   


The application will be available locally at: [http://localhost:5173/](http://localhost:5173/)

## Default Seeded Users
For testing purposes, you can use the following credentials:

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | password | admin |
| agent@example.com | password | agent |
| customer1@example.com | password | customer |

## Environment Variables
- `VITE_API_URL` — Base URL for the backend REST API (required).
- `VITE_API_TIMEOUT` — Optional: request timeout (ms).

## Usage & Common Flows
- **Authentication:**
  - Login via the `/auth/login` endpoint; store access token and user role in the auth context.
  - Use `ProtectedRoute` to guard private routes.
- **Ticket lifecycle:**
  - Create tickets via `/tickets` (POST).
  - Read/list tickets via `/tickets` (GET) with query parameters for filtering/sorting.
  - Update ticket details and status via `/tickets/:id` (PUT/PATCH).
  - Delete tickets via `/tickets/:id` (DELETE).
- **Comments:**
  - Nested/internal comments managed under `/tickets/:id/comments`.

## Developer Notes
- Centralize all HTTP logic in [`src/services`](src/services) to ensure auth headers and error handling behave consistently.
- Keep UI concerns in [`src/Components`](src/Components); share global auth state via [`src/context/AuthContext.tsx`](src/context/AuthContext.tsx).
- Components are intentionally small and focused (e.g., `TicketCard`, `TicketFilterBar`, `TicketsList`) to improve testability and reusability.
- Consider adding a refresh-token flow and server-sent events or WebSocket support for real‑time updates.

## Testing & CI (Suggestions)
- Add unit tests for key components and services (Jest + React Testing Library).
- Add E2E tests for critical flows (Cypress or Playwright): login, create ticket, assign ticket, comment.
- Add CI pipeline to run linting, type checks, and tests on PRs.

## Contribution
- Open issues for bugs or feature requests.
- Use feature branches and open a pull request with a clear description and changelog.
- Follow existing code style; run linting and type checks before submitting.

## References
- Project config: [`vite.config.ts`](vite.config.ts "vite.config.ts")
- App entry: [`src/main.tsx`](src/main.tsx "src/main.tsx")
- Auth context: [`src/context/AuthContext.tsx`](src/context/AuthContext.tsx "src/context/AuthContext.tsx")
- Example services: [`src/services/ticketService.ts`](src/services/ticketService.ts "src/services/ticketService.ts")

## License
Add an appropriate open source license (e.g., MIT) in a `LICENSE` file if you plan to publish this repository.

---

