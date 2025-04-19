# Laravel 12 + React + Inertia.js + Vite + Flowbite + ShadCN + Spatie Permission
A modern full-stack boilerplate built with Laravel 12 and React via Inertia.js, featuring component libraries **Flowbite-React** and **ShadCN**, powered by **Vite**, and integrated with **Spatie Laravel-Permission** for robust role and permission management.
---
## 🚀 Tech Stack

- **Laravel 12** – Backend framework (PHP)
- **React** – Frontend (via Inertia.js)
- **Tailwind CSS** with Flowbite-React components  
- **Inertia.js** – SPA without API layer
- **Vite** – Fast frontend build tool
- **Flowbite-React** – UI components using Tailwind
- **ShadCN UI** – Accessible and beautiful headless components
- **Spatie Laravel-Permission** – Role & permission handling

---

## 🛠️ Installation

### 1. Clone & Setup Project

```bash
git clone https://gitlab.com/anupamsahoo/laravel-12-react-inertia.git
cd laravel-12-react-inertia

```

### 2. Install backend dependencies

```bash
composer install
cp .env.example .env
php artisan key:generate
```
***Update Database credentials***
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_react
DB_USERNAME=database_user
DB_PASSWORD=database_password
```
### 3. Configure your .env

- Set database credentials
- (Optional) Set mail or queue configs

### 4. Install frontend dependencies
```bash
npm install
npm run dev
```

## 🧠 Spatie Laravel-Permission

- This project includes [Spatie Laravel-Permission](https://github.com/spatie/laravel-permission).

**⚠️ NOTE:** Make sure **Spatie Laravel-Permission** is installed before executing the command below. 
### 5. Migrate and seed the database
```bash
php artisan migrate
```

### 6. Seed Database
```bash
php artisan db:seed --class=PermissionTableSeeder
php artisan db:seed --class=CreateAdminUserSeeder
```

## 🔄 Usage
Start the Laravel server:

```bash
php artisan serve
```

Visit your app at:
http://localhost:8000

## ✨ UI Components

- Flowbite-React: Prebuilt components using Tailwind CSS
- ShadCN: Customizable, accessible, and headless components
You can use both libraries side-by-side depending on your UI design preferences.

## 📚 Documentation
- [Laravel](https://laravel.com/docs)
- [React](https://reactjs.org/)
- [Inertia.js](https://inertiajs.com/)
- [Vite](https://vitejs.dev/)
- [Flowbite-React](https://flowbite-react.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Spatie Permission Docs](https://github.com/spatie/laravel-permission)

## ⚙️ Build for Production
```bash
npm run build
php artisan optimize
```

## 🙌 Contributing
Pull requests are welcome!

For major changes, open an issue first to discuss what you’d like to change.

## 📄 License
This project is open-source and available under the MIT License.
