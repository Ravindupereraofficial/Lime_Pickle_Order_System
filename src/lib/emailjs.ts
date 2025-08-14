import emailjs from 'emailjs-com';

// EmailJS configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_loylxbw',
  ORDER_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID || 'template_u565g9w',
  CONTACT_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'template_u565g9w',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '00UOPjZ64lj9YNzvA'
};

// Business email from environment
export const BUSINESS_EMAIL = import.meta.env.VITE_BUSINESS_EMAIL || 'limepickle@email.com';

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

// Send order email
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
  const templateParams = {
    to_email: BUSINESS_EMAIL,
    from_name: orderData.fullName,
    order_id: orderData.orderId,
    full_name: orderData.fullName,
    address: orderData.address,
    delivery_address: orderData.deliveryAddress,
    whatsapp_number: orderData.whatsappNumber,
    quantity: orderData.quantity,
    number_of_bottles: orderData.numberOfBottles,
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

// Send contact email
export const sendContactEmail = async (contactData: {
  name: string;
  email: string;
  message: string;
}) => {
  const templateParams = {
    to_email: BUSINESS_EMAIL,
    from_name: contactData.name,
    from_email: contactData.email,
    message: contactData.message
  };

  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
    templateParams,
    EMAILJS_CONFIG.PUBLIC_KEY
  );
};
