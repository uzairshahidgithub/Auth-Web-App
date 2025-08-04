
![](https://github.com/uzairshahidgithub/Auth-Web-App/blob/main/auth-web-app.png?raw=true)
## **Auth-Web-App** is a lightweight authentication based web application built for cybersecurity learning and vulnerability testing. This project is designed to simulate basic authentication flows while allowing penetration testers, ethical hackers, and security learners to practice bypass techniques in a controlled environment.

### Current Features
- JWT-based authentication
- Bcrypt-secured password handling
- Login interface with basic session simulation
- Ready-to-hack endpoints for educational use
- Dark and light mode toggle after login
- Custom JWT authentication
- Dark/Light mode UI support
- User login with bcrypt password hashing
- Real-world middleware logic for testing
- Multiple vulnerable patterns for testing common web attacks

### Technologies Used
- Frontend: HTML, CSS (Dark/Light Toggle)
- Backend: Node.js, Express.js
- Middleware: Custom-built for auth validation
- Authentication: JWT, Bcrypt
- Environment Management: `.env` config

## Getting Started 
> **Note:** JWT secret must be configured manually for the app to function.

### Prerequisites
- Node.js v16+ installed
- Code editor (VS Code recommended)

## Setup Instructions
![](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dzZhYXFvZDFvaXM4ajRzdHFzN2c4enp6NGg2NHpoYzA3aXp2eDB2eCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MD0svLSDeudszrNrp0/giphy.gif)

### 1. Configure JWT Key
Go to the official JWT.io site and generate a valid token secret. In your project, locate the `.env` file and set the following:

> **Tip:** If you need help generating or configuring JWT, consider joining technical communities such as [Codemo Teams](https://www.linktree.com/codemoteams) for free guidance.

### 2. Install dependencies 
In the root of the project:
```bash 
npm install
```
If errors occur, try clearing node_modules and reinstalling.

### 3. Start the backend server
Navigate to the server folder and run:
```bash 
cd ./server
npm run dev
```
### 4. Start middleware service
```bash 
cd ./server/middleware
npm run dev
```

### 5. Test the app
Open the browser and navigate to the local server path printed in terminal by port with http link if the port is busy try to edit port so may be fixed if port issue accured. Then app should load the login screen.




## Authors

- [Muhammad Uzair](https://www.github.com/uzairshahidgithub)


## Support

For support, email uzairrshahid@gmail.com or join our Slack channel.
