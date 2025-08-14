// Test file to verify connections
import { supabase } from './supabase';
import { EMAILJS_CONFIG } from './emailjs';

export const testConnections = async () => {
  console.log('Testing connections...');
  
  // Test Supabase connection
  try {
    const { data, error } = await supabase.from('orders').select('count').limit(1);
    if (error) {
      console.error('Supabase connection error:', error);
    } else {
      console.log('✅ Supabase connection successful');
    }
  } catch (err) {
    console.error('Supabase connection failed:', err);
  }
  
  // Test EmailJS configuration
  console.log('EmailJS Configuration:');
  console.log('Service ID:', EMAILJS_CONFIG.SERVICE_ID);
  console.log('Order Template ID:', EMAILJS_CONFIG.ORDER_TEMPLATE_ID);
  console.log('Contact Template ID:', EMAILJS_CONFIG.CONTACT_TEMPLATE_ID);
  console.log('Public Key:', EMAILJS_CONFIG.PUBLIC_KEY ? '✅ Set' : '❌ Missing');
  
  console.log('Connection test completed');
};
