# Migration Summary: Convex to Supabase + EmailJS

## What Was Removed

### Convex Dependencies
- `convex` package from `package.json`
- `convex.json` configuration file
- `convex/` directory and all its contents:
  - `_generated/` folder with auto-generated files
  - `auth.config.js`
  - `orders.ts`
  - `schema.ts`
- `dev:convex` script from package.json

### Convex Code
- `ConvexProvider` and `ConvexReactClient` from `App.tsx`
- `useMutation` hooks from `Order.tsx`
- Convex API imports and mutations

## What Was Added

### New Dependencies
- `@supabase/supabase-js` for database operations

### New Configuration Files
- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/emailjs.ts` - EmailJS configuration and helper functions
- `supabase-schema.sql` - Database schema for Supabase
- `env.template` - Environment variables template
- `SETUP.md` - Complete setup instructions
- `MIGRATION_SUMMARY.md` - This migration summary

### Updated Files
- `src/App.tsx` - Removed Convex provider wrapper
- `src/pages/Order.tsx` - Replaced Convex mutations with Supabase operations
- `src/pages/Contact.tsx` - Added Supabase storage for contact messages
- `package.json` - Updated dependencies

## Database Changes

### From Convex Schema to Supabase Tables
- **Orders**: Stored in `orders` table with proper SQL schema
- **Contact Messages**: Stored in `contact_messages` table
- **Security**: Row Level Security (RLS) enabled with appropriate policies

### Table Structure
```sql
-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL,
  address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  quantity TEXT NOT NULL,
  number_of_bottles INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## EmailJS Integration

### Configuration
- Service ID: `service_loylxbw`
- Template ID: `template_u565g9w`
- Public Key: `00UOPjZ64lj9YNzvA`

### Functions
- `sendOrderEmail()` - Sends order confirmation emails
- `sendContactEmail()` - Sends contact form notifications

### Template Variables
- Order emails include all order details (name, address, quantity, etc.)
- Contact emails include sender name, email, and message

## Environment Variables

The following environment variables are now required:
```env
VITE_SUPABASE_URL=https://nhxtnqtcmjrzpgdqdeze.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_EMAILJS_SERVICE_ID=service_loylxbw
VITE_EMAILJS_ORDER_TEMPLATE_ID=template_u565g9w
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_u565g9w
VITE_EMAILJS_PUBLIC_KEY=00UOPjZ64lj9YNzvA
VITE_BUSINESS_EMAIL=limepickle@email.com
```

## Benefits of Migration

1. **Cost**: Supabase has a generous free tier
2. **Performance**: Direct SQL database with better query performance
3. **Flexibility**: More control over database schema and queries
4. **Scalability**: Better suited for production applications
5. **Email Integration**: Professional email notifications via EmailJS

## Next Steps

1. **Create `.env` file** with the provided credentials
2. **Run SQL schema** in Supabase dashboard
3. **Test connections** using the test file
4. **Verify EmailJS templates** are configured correctly
5. **Test order and contact functionality**

## Testing

Use the `src/lib/test-connection.ts` file to verify:
- Supabase database connection
- EmailJS configuration
- Environment variables are loaded correctly

## Support

- Supabase documentation: https://supabase.com/docs
- EmailJS documentation: https://www.emailjs.com/docs/
- Check browser console for connection errors
- Verify environment variables are loaded correctly
