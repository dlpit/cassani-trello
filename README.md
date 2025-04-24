# Casani Trello

<div align="center">
  <img src="/src/assets/casani.svg" alt="Casani Logo" width="200" />
  <p><i>A modern Trello-inspired project management application</i></p>
</div>

## 📋 Overview

Casani Trello is a collaborative project management application built with React, Redux, and Material-UI. It provides a Kanban-style board interface for tracking tasks, managing projects, and collaborating with team members in real-time.

## ✨ Features

### 📊 Board Management

- ✨ Create and manage multiple boards
- 🔄 Real-time updates via Socket.IO
- 🔒 Public/private board visibility settings
- 🔍 Search and filter boards

### 📝 Cards & Columns

- 🖇️ Create customizable columns (To Do, In Progress, Done, etc.)
- 📝 Add detailed cards with descriptions
- 📌 Drag and drop functionality for cards and columns
- 📅 Set due dates and priorities

### 👥 Collaboration

- 👤 User invitations to boards
- 🔔 Real-time notifications
- 💬 Comment on cards
- 👁️ Activity tracking

### 🎨 User Experience

- 🌓 Light/Dark mode support
- 📱 Responsive design for all devices
- ✅ Markdown support for card descriptions
- ⚙️ Customizable user profiles

## 🛠️ Technologies Used

| Category             | Technologies                          |
| -------------------- | ------------------------------------- |
| **Frontend**         | React, Material UI, React Router      |
| **State Management** | Redux, Redux Toolkit, React Hook Form |
| **Communication**    | Socket.IO, Axios                      |
| **Development**      | Vite, ESLint                          |
| **Styling**          | MUI Theming, Custom CSS               |
| **Notifications**    | React Toastify                        |

## 📋 Prerequisites

Before installing, make sure you have:

- Node.js (v14 or higher recommended)
- npm or yarn package manager
- Modern web browser

## 🚀 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/cassani-trello.git
   cd cassani-trello
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration:**

   The project uses environment variables for API configuration:

   - Development API: `http://localhost:8017`
   - Production API: `https://cassani-api.onrender.com`

## 🏃‍♂️ Running the Application

**Start the development server:**

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📦 Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📂 Project Structure

```
src/
├── apis/           # API endpoints and mock data
├── assets/         # Images, SVGs, and other static assets
├── components/     # Reusable UI components
├── customHooks/    # Custom React hooks
├── customLibraries/# Extended libraries functionality
├── pages/          # Application pages and routes
├── redux/          # Redux store, slices, and actions
└── utilities/      # Helper functions and constants
```

## 📘 Usage Guide

### 🔐 Authentication

| Feature      | Description                            |
| ------------ | -------------------------------------- |
| Register     | Create account with email and password |
| Login        | Access your boards and cards           |
| Verification | Verify account via email link          |

### 📋 Boards Management

| Action       | How to                              |
| ------------ | ----------------------------------- |
| Create Board | Click "+" button on dashboard       |
| Edit Board   | Click settings icon on board header |
| Delete Board | Board settings → Delete option      |
| Invite Users | Click "Share" button on board       |

### 📊 Cards and Columns

| Action          | How to                               |
| --------------- | ------------------------------------ |
| Add Column      | Click "Add Column" on board          |
| Add Card        | Click "+" in column header           |
| Move Card       | Drag and drop to desired column      |
| Edit Card       | Click on card to open detailed view  |
| Add Description | Open card details → Edit description |

## 🚀 Deployment

### Vercel Deployment

The repository includes a [`vercel.json`](vercel.json) file for easy deployment on Vercel's platform.

**Steps to deploy:**

1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy

## 🔧 Troubleshooting

**Common issues:**

- **API Connection Issues**: Ensure the correct API URL is set in the environment variables
- **Socket Connection**: Check that WebSocket connections are allowed in your network
- **Build Failures**: Make sure all dependencies are installed correctly

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Credits

Developed with ❤️ by DlPIT

---

<div align="center">
  <p>© 2025 Casani Trello</p>
</div>
