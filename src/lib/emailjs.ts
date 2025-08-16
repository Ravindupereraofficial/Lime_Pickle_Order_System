import emailjs from 'emailjs-com';

// EmailJS configuration - Updated with working template
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_loylxbw',
  ORDER_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID || 'template_u565g9w', // Use the correct template ID
  CONTACT_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'template_u565g9w',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '00UOPjZ64lj9YNzvA'
};

// Business email from environment
export const BUSINESS_EMAIL = import.meta.env.VITE_BUSINESS_EMAIL || 'ravindurandika2004@gmail.com';

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

// Send order email with simplified template variables
export const sendOrderEmail = async (orderData: {
  fullName: string;
  address: string;
  deliveryAddress: string;
  whatsappNumber: string;
  quantity: string;
  numberOfBottles: number;
  totalAmount: number;
  orderId: string;
}) => {
  // Format the message for a simple template
  const orderMessage = `
New Order Received!

Order ID: ${orderData.orderId}
Customer Name: ${orderData.fullName}
Address: ${orderData.address}
Delivery Address: ${orderData.deliveryAddress}
WhatsApp: ${orderData.whatsappNumber}
Quantity: ${orderData.quantity}
Number of Bottles: ${orderData.numberOfBottles}
Total Amount: LKR ${orderData.totalAmount}
Order Date: ${new Date().toLocaleDateString()}

Please contact the customer via WhatsApp to confirm this order.
  `.trim();

  const templateParams = {
    email: BUSINESS_EMAIL,                    // Recipient email (works!)
    from_name: orderData.fullName,            // Customer name
    to_name: BUSINESS_EMAIL,                  // Recipient name
    recipient_email: BUSINESS_EMAIL,          // Alternative recipient email
    message: orderMessage,
    total_amount: orderData.totalAmount,
    order_date: new Date().toLocaleDateString()
  };

  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.ORDER_TEMPLATE_ID,
    templateParams,
    EMAILJS_CONFIG.PUBLIC_KEY
  );
};

// Send contact email with simplified template variables
export const sendContactEmail = async (contactData: {
  name: string;
  email: string;
  message: string;
}) => {
  const templateParams = {
    to_email: BUSINESS_EMAIL,
    from_name: contactData.name,
    from_email: contactData.email,
    message: contactData.message,
    subject: 'New Contact Form Submission'
  };

  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
    templateParams,
    EMAILJS_CONFIG.PUBLIC_KEY
  );
};
