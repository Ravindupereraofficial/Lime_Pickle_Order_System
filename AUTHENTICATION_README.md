# Authentication System Implementation

This document describes the authentication system implemented for the Lime Pickle Hub application.

## Features

### 1. User Registration (Signup)
- Users can create accounts with:
  - Email (unique)
  - Password (minimum 6 characters)
  - Password confirmation
- Passwords are hashed using SHA-256 before storing
- Duplicate email prevention
- Form validation with error messages

### 2. User Login
- Email and password authentication
- Secure password verification
- Automatic redirect to intended destination
- Session persistence using localStorage

### 3. Protected Routes
- Order page is protected and requires authentication
- Unauthenticated users are redirected to login
- After login, users are redirected to their intended destination

### 4. User Session Management
- Automatic session restoration on page refresh
- Secure logout functionality
- User information displayed in navigation

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Orders Table (Updated)
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  province TEXT NOT NULL,
  district TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT NOT NULL,
  address_district TEXT NOT NULL,
  delivery_address_line1 TEXT NOT NULL,
  delivery_address_line2 TEXT NOT NULL,
  delivery_address_district TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  quantity TEXT NOT NULL,
  number_of_bottles INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Features

### Password Security
- Passwords are hashed using SHA-256 (consider bcrypt for production)
- No plain text passwords stored in database
- Password validation (minimum length, confirmation)

### Row Level Security (RLS)
- Orders table has RLS enabled
- Users can only insert orders with valid user_id
- Users can only view their own orders

### Session Security
- User sessions stored in localStorage
- Password hashes never exposed to frontend
- Automatic session cleanup on logout

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # React context for auth state
├── lib/
│   └── auth.ts                  # Authentication utilities
├── components/
│   ├── ProtectedRoute.tsx       # Route protection component
│   ├── AuthModal.tsx            # Login/Signup modal
│   └── Navbar.tsx               # Navigation with auth status
└── pages/
    ├── Login.tsx                # Login page
    ├── Signup.tsx               # Signup page
    └── Order.tsx                # Protected order page
```

## Usage

### Authentication Context
```tsx
import { useAuth } from '../contexts/AuthContext';

const { user, isAuthenticated, login, signup, logout } = useAuth();
```

### Protected Routes
```tsx
import ProtectedRoute from '../components/ProtectedRoute';

<Route path="/order" element={
  <ProtectedRoute>
    <Order />
  </ProtectedRoute>
} />
```

### Authentication Check
```tsx
if (!isAuthenticated) {
  // Redirect to login or show auth modal
}
```

## Setup Instructions

1. **Update Database Schema**
   - Run the updated `supabase-schema.sql` to create/update tables
   - Ensure RLS policies are in place

2. **Install Dependencies**
   - All required dependencies are already included

3. **Environment Variables**
   - Ensure Supabase configuration is properly set in `src/lib/supabase.ts`

## Security Considerations

### Production Recommendations
- Use bcrypt or Argon2 for password hashing instead of SHA-256
- Implement rate limiting for login attempts
- Add email verification for new accounts
- Use HTTP-only cookies instead of localStorage for sessions
- Implement CSRF protection
- Add input sanitization and validation

### Current Implementation
- Basic password hashing (SHA-256)
- Form validation
- Session management
- Protected routes
- Database-level security policies

## Testing

### Test Cases
1. User registration with valid data
2. User registration with duplicate email
3. User login with correct credentials
4. User login with incorrect credentials
5. Access to protected routes when authenticated
6. Access to protected routes when not authenticated
7. User logout functionality
8. Session persistence across page refreshes

### Manual Testing
1. Navigate to `/signup` and create a new account
2. Navigate to `/login` and sign in
3. Try to access `/order` without authentication (should redirect to login)
4. Access `/order` after authentication (should work)
5. Test logout functionality
6. Verify session persistence

## Troubleshooting

### Common Issues
1. **Authentication not working**: Check Supabase configuration
2. **Protected routes not working**: Ensure AuthProvider wraps the app
3. **Session not persisting**: Check localStorage permissions
4. **Database errors**: Verify schema and RLS policies

### Debug Steps
1. Check browser console for errors
2. Verify Supabase connection
3. Check localStorage for user data
4. Verify authentication context state

## Important Notes

### User Information Collection
- **During Signup**: Only email and password are collected
- **During Order**: Full name, WhatsApp number, and delivery details are collected
- This approach ensures users provide delivery-specific information when needed while keeping signup simple

### Data Flow
1. User signs up with email/password only
2. User logs in and gains access to order page
3. User provides delivery information (name, phone, address) during order placement
4. Order is linked to user account via user_id
