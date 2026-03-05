# Investment Decision Game

A web-based multiplayer game that demonstrates how individual investment decisions can influence collective financial outcomes.

## Application Description

This web application is a simple multiplayer investment decision game designed to illustrate how individual investment choices can influence collective outcomes. Each player receives a fixed budget of $100 and must decide how to allocate it between two assets. After all players submit their allocations, the application calculates the pooled investment outcome and displays the final payouts for each player.

## Assumptions

- The game supports 2 to 4 players as specified in the requirements.
- Each player must allocate exactly $100 between Asset A and Asset B.
- Only whole number values are allowed for investments.
- The total amount invested in Asset B by all players is increased by 50% before being distributed equally among all players.

## Question 2

### 1. Learning Design
The design requires each player to allocate a fixed $100 between a safe individual asset and a shared growth asset, allowing learners to directly observe how collective investment decisions affect total returns. By comparing final payouts, players understand the trade-off between individual certainty and cooperative gain.

### 2. Deployment Approach
If deployed for students via a web browser, the application would use HTTPS to encrypt communication between frontend and backend. CORS would be restricted to trusted frontend domains to prevent unauthorized cross-origin requests. Since the application does not store sensitive personal data, lightweight security measures are sufficient. These practices ensure secure communication while keeping the system simple and appropriate for an educational game.

### 3. Scaling & Multiple Session
To support multiplayer sessions with state persistence, each game would be assigned a unique session ID stored in a backend database. Player inputs and results would be stored per session, ensuring isolation between games. For real-time multiplayer, WebSockets could be implemented to synchronize player actions instantly. This approach ensures reliability, persistence, and scalability across multiple concurrent sessions.