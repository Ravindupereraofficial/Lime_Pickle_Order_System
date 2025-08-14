# Lime Pickle Business Website

A complete responsive website for Lime Pickle business built with React, TypeScript, and modern web technologies.

## Features

- **Multi-page Website**: Home, About, Products, Order, Contact, and Thank You pages
- **Order Management**: Complete order form with live bill calculation
- **Database Integration**: Convex database for storing orders
- **Email Integration**: EmailJS for order confirmations and contact form
- **Responsive Design**: Optimized for mobile and desktop devices
- **Form Validation**: Comprehensive validation with error handling

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Convex
- **Email Service**: EmailJS
- **Form Handling**: React Hook Form
- **Routing**: React Router
- **Icons**: Lucide React

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Convex
```bash
npx convex dev
```
Follow the prompts to create a new Convex project.

### 3. Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Update the environment variables:
- `VITE_CONVEX_URL`: Your Convex deployment URL
- EmailJS configuration (service ID, template ID, public key)

### 4. EmailJS Setup
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create email templates for:
   - Order confirmations
   - Contact form messages
3. Update the template IDs in the environment variables

### 5. Run Development Server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation component
│   └── Footer.tsx          # Footer component
├── pages/
│   ├── Home.tsx           # Landing page
│   ├── About.tsx          # About page
│   ├── Products.tsx       # Products catalog
│   ├── Order.tsx          # Order form
│   ├── Contact.tsx        # Contact form
│   └── ThankYou.tsx       # Order confirmation
convex/
├── schema.ts              # Database schema
└── orders.ts              # Order mutations/queries
```

## Order Process

1. Customer fills out order form
2. Live bill calculation based on selection
3. Order saved to Convex database
4. Email sent to business via EmailJS
5. Customer redirected to thank you page
6. Business contacts customer via WhatsApp

## Price List

- 300 g - LKR 650/=
- 500 g - LKR 850/=
- 1 kg - LKR 1450/=

## Customization

### Colors
The website uses a lime green and orange color scheme. Update the Tailwind classes in components to change colors.

### Business Information
Update business details in:
- Footer component
- Contact page
- EmailJS templates

### Images
Replace stock images with actual product photos in the image URLs throughout the components.

## Deployment

1. Build the project: `npm run build`
2. Deploy Convex functions: `npx convex deploy`
3. Deploy the built files to your hosting provider

## Support

For technical support or customization requests, contact the development team.