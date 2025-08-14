# Project Setup Guide

This project has been migrated from Convex to Supabase with EmailJS integration.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- EmailJS account

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://nhxtnqtcmjrzpgdqdeze.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeHRucXRjbWpyenBnZHFkZXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODgwNTEsImV4cCI6MjA3MDc2NDA1MX0.LjOpufteyB1KzNtNuGT0nJwBl5v28imD9G3TTwKphkc

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_loylxbw
VITE_EMAILJS_ORDER_TEMPLATE_ID=template_u565g9w
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_u565g9w
VITE_EMAILJS_PUBLIC_KEY=00UOPjZ64lj9YNzvA

# Business Email
VITE_BUSINESS_EMAIL=limepickle@email.com
```

## Supabase Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL commands from `supabase-schema.sql` to create the required tables:
   - `orders` table for storing order information
   - `contact_messages` table for storing contact form submissions

## EmailJS Template Setup

1. Log in to your EmailJS account
2. Create or update your email templates with the following variables:

### Order Template Variables:
- `to_email`: Recipient email
- `from_name`: Customer's full name
- `order_id`: Order ID from database
- `full_name`: Customer's full name
- `address`: Customer's address
- `delivery_address`: Delivery address
- `whatsapp_number`: Customer's WhatsApp number
- `quantity`: Selected quantity (300g, 500g, 1kg)
- `number_of_bottles`: Number of bottles ordered
- `total_amount`: Total order amount
- `order_date`: Order date

### Contact Template Variables:
- `to_email`: Recipient email
- `from_name`: Contact person's name
- `from_email`: Contact person's email
- `message`: Contact message

## Running the Project

1. Start the development server:
```bash
npm run dev
```

2. Build for production:
```bash
npm run build
```

## Features

- **Order Management**: Customers can place orders for lime pickle products
- **Contact Form**: Visitors can send messages through the contact form
- **Email Notifications**: Automatic email notifications for orders and contact messages
- **Database Storage**: All data is stored securely in Supabase
- **Responsive Design**: Mobile-friendly interface

## Database Schema

### Orders Table
- `id`: Unique identifier (UUID)
- `full_name`: Customer's full name
- `address`: Customer's address
- `delivery_address`: Delivery address
- `whatsapp_number`: WhatsApp contact number
- `quantity`: Product quantity (300g, 500g, 1kg)
- `number_of_bottles`: Number of bottles
- `total_amount`: Total order amount
- `created_at`: Order creation timestamp

### Contact Messages Table
- `id`: Unique identifier (UUID)
- `name`: Contact person's name
- `email`: Contact person's email
- `message`: Contact message
- `created_at`: Message creation timestamp

## Security

- Row Level Security (RLS) is enabled on all tables
- Anonymous users can insert and select data (configure as needed)
- Environment variables are used for sensitive configuration

## Troubleshooting

1. **EmailJS errors**: Check your service ID, template ID, and public key
2. **Supabase connection issues**: Verify your project URL and anon key
3. **Database errors**: Ensure the tables are created with the correct schema
4. **Environment variables**: Make sure your `.env` file is in the root directory

## Support

For issues related to:
- **Supabase**: Check the [Supabase documentation](https://supabase.com/docs)
- **EmailJS**: Check the [EmailJS documentation](https://www.emailjs.com/docs/)
- **Project-specific issues**: Check the console for error messages
