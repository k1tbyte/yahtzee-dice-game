# Yahtzee Dice Game

Demo implementation of a Yahtzee-inspired dice game with betting functionality, built with Vue.js and Express.

## Technologies Used

### Frontend
- Vue.js 3 with Composition API
- Tailwind CSS for styling
- TypeScript
- Vite for build tooling

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM for database operations
- SQLite for data storage
- TSyringe for dependency injection

## Project Structure

```
yahtzee-dice-game/
├── client/                 # Frontend Vue application
│   └── src/
│       ├── components/     # UI components
│       ├── composables/    # Reusable Vue composition functions
│       ├── services/       # API services
│       └── types/          # TypeScript interfaces
└── server/                 # Backend Express application
    ├── prisma/             # Database schema and migrations
    └── src/
        ├── config/         # Application configuration
        ├── controllers/    # API endpoints
        ├── services/       # Business logic
        ├── repositories/   # Data access
        ├── utils/          # Helper utilities
        └── scripts/        # Analysis tools
```

## Architecture

### Backend (Express)

The backend follows a layered architecture pattern:

1. **Controllers**: Handle HTTP requests and responses
   - `GameController`: Manages game-related endpoints (roll dice, get multipliers)
   - `TransactionController`: Manages transaction-related endpoints (balance, history)

2. **Services**: Contain business logic
   - `GameService`: Implements game mechanics, processes rolls, and checks combinations
   - `TransactionService`: Manages financial transactions and balance

3. **Repositories**: Provide data access
   - `TransactionRepository`: Handles CRUD operations for transactions using Prisma

4. **Utils**: Helper functions
   - `game-logic.ts`: Contains dice roll logic, combination detection, and RTP analysis

### Frontend (Vue.js)

The frontend follows a component-based architecture:

1. **Components**:
   - `DiceDisplay`: Renders dice with correct dot patterns
   - `PricesTable`: Shows payout multipliers for each combination
   - `BetControls`: Handles betting input and roll button
   - `BalanceDisplay`: Shows current balance and winnings

2. **Composables**:
   - `useGameState`: Centralizes game state management

3. **Services**:
   - `apiService`: Handles API communication with the backend

## RTP Analysis

The game includes a sophisticated Return To Player (RTP) analyzer in `server/src/scripts/rtp-analyzer.ts`. This tool:

1. Simulates millions of dice rolls to calculate the theoretical RTP
2. Dynamically adjusts payout multipliers to achieve a target RTP (default: 95%)
3. Saves optimized multipliers to a configuration file for persistence

When the server starts, it checks for a configuration file. If none exists, it runs the RTP analysis to generate optimal multiplier values. These values are then used for all game sessions until manually reset.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Bun](https://bun.sh/) for faster development experience (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/k1tbyte/yahtzee-dice-game.git
   cd yahtzee-dice-game
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   bun install

   # Install frontend dependencies
   cd ../client
   bun install
   ```

3. Set up the database:
   ```bash
   cd ../server
   bun run prisma:generate
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   bun run dev
   ```

2. Start the frontend development server (in a separate terminal):
   ```bash
   cd client
   bun run dev
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Running RTP Analysis Manually

To manually run the RTP analysis and generate new multipliers:

```bash
cd server
bun run analyze
```

## API Endpoints

- `GET /api/init`: Initialize the game and get starting balance
- `GET /api/balance`: Get current balance
- `POST /api/roll`: Place a bet and roll dice
- `GET /api/multipliers`: Get current payout multipliers
- `GET /api/transactions`: Get transaction history
