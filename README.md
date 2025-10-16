# 🔐 AuthGuard RBAC Angular

A **Role-Based Access Control (RBAC)** implementation in Angular using **AuthGuards** for route protection.  
This project demonstrates secure navigation control based on user roles such as *User*, *Admin*, and *Super Admin*.

---

## 🚀 Features

- 🔑 **Authentication & Authorization**
  - Login & logout with session management.
  - Role-based route protection using Angular Guards.
- 🧩 **Role-Based Views**
  - Pages are dynamically accessible depending on assigned user roles.
- ⚙️ **Angular Routing Integration**
  - Guarded routes to restrict access to sensitive components.
- 🧠 **Scalable Project Structure**
  - Clean, modular folder layout for easy extension.
- 🎨 **Responsive UI**
  - Simple and functional interface.

---

## 🏗️ Project Structure

authguard-rbac-angular/
│
├── .vscode/ # Editor settings
├── rbac-demo/ # Angular app root
│ ├── src/
│ │ ├── app/ # Core app logic & components
│ │ ├── index.html # Main HTML entry
│ │ ├── main.ts # App bootstrap
│ │ └── styles.scss # Global styles
│ ├── angular.json # Angular configuration
│ ├── package.json # Project dependencies
│ └── tsconfig.json # TypeScript configuration
├── .gitignore
└── README.md


---

## 🧰 Tech Stack

| Tool | Description |
|------|--------------|
| **Angular 20+** | Frontend framework |
| **TypeScript** | Primary language |
| **SCSS** | Styling |
| **Node.js & npm** | Dependency management |
| **VS Code** | Development environment |

---

## ⚙️ Installation & Setup

1️⃣ **Clone the Repository**
```bash

git clone https://github.com/keshavgandas/authguard-rbac-angular.git
| Role            | Access Level                                    |
| --------------- | ----------------------------------------------- |
| **User**        | Basic access to limited routes                  |
| **Admin**       | Access to admin dashboard and management routes |
| **Super Admin** | Full access to all components                   |


🧾 License

This project is licensed under the MIT License.
Feel free to modify and use it for your own applications.

👨‍💻 Author

Keshav Gandas
📧 keshavgandas1@gmail.com
