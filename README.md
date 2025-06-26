# Laravel 12 + React Starter Kit

A modern, full-stack web application starter kit built with Laravel 12 and React 19, featuring a comprehensive admin panel with role-based permissions, user management, and a beautiful UI built with Tailwind CSS and Radix UI components.

## 🚀 Features

### Backend (Laravel 12)
- **Authentication System**: Complete auth flow with login, registration, password reset, and email verification
- **User Management**: Full CRUD operations for users with role assignments
- **Role & Permission System**: Powered by Spatie Laravel Permission package
- **Menu Management**: Dynamic menu system with hierarchical structure
- **Profile Management**: User profile settings with password change functionality
- **API Integration**: RESTful API endpoints with proper validation
- **Database**: SQLite by default (easily configurable for MySQL/PostgreSQL)
- **Queue System**: Background job processing
- **File Storage**: Configurable file storage system

### Frontend (React 19)
- **Modern React**: Built with React 19 and TypeScript
- **Inertia.js**: Seamless SPA experience without API complexity
- **UI Components**: Beautiful components built with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for client-side state management
- **Form Handling**: Robust form validation and error handling
- **Responsive Design**: Mobile-first responsive design
- **Dark/Light Theme**: Built-in theme switching
- **Data Tables**: Advanced data tables with sorting, filtering, and pagination
- **Drag & Drop**: Menu reordering with drag-and-drop functionality

### Development Experience
- **TypeScript**: Full TypeScript support for type safety
- **Hot Reload**: Vite-powered development with instant updates
- **Code Quality**: ESLint, Prettier, and Laravel Pint for code formatting
- **Testing**: PHPUnit and Pest for backend testing
- **Build Tools**: Optimized build process with Vite

## 📋 Requirements

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite (default) or MySQL/PostgreSQL

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd laravel12-react-starterkit
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Node.js Dependencies
```bash
npm install
```

### 4. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database (if using SQLite)
touch database/database.sqlite
```

### 5. Database Setup
```bash
# Run migrations
php artisan migrate

# Seed the database (optional)
php artisan db:seed
```

### 6. Build Assets
```bash
# For development
npm run dev

# For production
npm run build
```

## 🚀 Development

### Start Development Server
```bash
# Start all services (Laravel server, queue worker, and Vite)
composer run dev
```

This command will start:
- Laravel development server on `http://localhost:8000`
- Queue worker for background jobs
- Vite development server for hot reloading

### Alternative: Start Services Separately
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Queue worker
php artisan queue:work

# Terminal 3: Vite dev server
npm run dev
```

## 📁 Project Structure

```
├── app/
│   ├── Http/Controllers/          # Laravel controllers
│   │   ├── Auth/                  # Authentication controllers
│   │   ├── Settings/              # Settings controllers
│   │   └── ...
│   ├── Models/                    # Eloquent models
│   └── Http/Requests/             # Form request validation
├── database/
│   ├── migrations/                # Database migrations
│   ├── seeders/                   # Database seeders
│   └── factories/                 # Model factories
├── resources/
│   ├── js/                        # React frontend
│   │   ├── components/            # Reusable React components
│   │   ├── pages/                 # Page components
│   │   ├── layouts/               # Layout components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── stores/                # Zustand stores
│   │   └── types/                 # TypeScript type definitions
│   ├── css/                       # Stylesheets
│   └── views/                     # Blade templates
├── routes/
│   ├── web.php                    # Web routes
│   ├── auth.php                   # Authentication routes
│   └── settings.php               # Settings routes
└── public/                        # Public assets
```

## 🎨 UI Components

The project includes a comprehensive set of UI components built with Radix UI:

- **Forms**: Input, Label, Button, Select, Checkbox
- **Navigation**: Dropdown Menu, Navigation Menu, Breadcrumbs
- **Layout**: Dialog, Sheet, Accordion, Collapsible
- **Feedback**: Alert Dialog, Toast notifications
- **Data Display**: Avatar, Badge, Table, Tooltip
- **Theme**: Dark/Light mode toggle

## 🔐 Authentication & Authorization

### Authentication Features
- User registration and login
- Password reset via email
- Email verification
- Remember me functionality
- Secure session management

### Authorization System
- Role-based access control
- Permission-based restrictions
- Middleware protection
- Dynamic menu visibility based on permissions

## 🗄️ Database Schema

### Core Tables
- `users` - User accounts
- `roles` - User roles
- `permissions` - System permissions
- `permission_groups` - Permission organization
- `menus` - Dynamic navigation menus
- `model_has_roles` - User-role relationships
- `role_has_permissions` - Role-permission relationships

## 🧪 Testing

```bash
# Run PHP tests
composer test
# or
php artisan test

# Run with coverage
php artisan test --coverage

# Type checking
npm run types

# Linting
npm run lint
```

## 🚀 Deployment

### Build for Production
```bash
# Install dependencies
composer install --optimize-autoloader --no-dev
npm ci

# Build assets
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Configuration
Update your `.env` file for production:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database configuration
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-password

# Mail configuration
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
# ... other mail settings
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## 🙏 Acknowledgments

- [Laravel](https://laravel.com) - The PHP framework
- [React](https://reactjs.org) - The JavaScript library
- [Inertia.js](https://inertiajs.com) - The modern monolith
- [Tailwind CSS](https://tailwindcss.com) - The utility-first CSS framework
- [Radix UI](https://radix-ui.com) - Low-level UI primitives
- [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission) - Role and permission management
