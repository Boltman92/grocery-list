# 🛒 Grocery List App (React Native + Expo)

A simple and functional Grocery List app built with **React Native** and **Expo**.  
Users can:

- 📝 Add, edit, and delete grocery lists
- 🛍️ Add items to lists with quantities
- ✅ Mark items as bought

This app is ideal as a starting point or proof of concept for a larger shopping list application.

---

## 📦 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- React Query
- [Gluestack UI](https://gluestack.io/)
- [json-server](https://github.com/typicode/json-server)

---

## 🚀 Getting Started

### 1. Clone the repository

bash

`git clone git@github.com:Boltman92/grocery-list.git`
`cd grocery-list`

### 2. Install dependencies

bash

`npm install`

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

    `# For iOS simulator EXPO_PUBLIC_BASE_URL=http://localhost:3000

     For Android emulator (using Android Studio) EXPO_PUBLIC_BASE_URL=http://10.0.2.2:3000

     For real devices (iOS or Android) EXPO_PUBLIC_BASE_URL=http://YOUR_LOCAL_IP:3000

> ⚠️ Make sure `json-server` is running at the specified address.

### 4. Start the app

bash

`npx expo start`

Use the Expo Go app or a simulator to view the app.

---

## 🧪 Features

- 🔘 Tab-based navigation
- ➕ Create new grocery lists
- ✏️ Edit lists
- 🗑️ Delete individual lists or items
- ✅ Mark items as “bought”
- ☁️ Data fetched from `json-server`

---

## 🛠 Backend Setup (json-server)

To run a local mock API server:

bash

`npm install -g json-server`
`json-server --watch db.json --port 3000`

> Use a `db.json` file in the root directory or customize as needed.
