import emailjs from 'emailjs-com';

// Initialize EmailJS
emailjs.init('00UOPjZ64lj9YNzvA');

// Test email function
export const testEmailJS = async () => {
  try {
    console.log('Testing EmailJS connection...');
    
    const testParams = {
      to_email: 'ravindurandika2004@gmail.com',
      from_name: 'Test Customer',
      order_id: 'TEST-123',
      full_name: 'Test Customer',
      address: '123 Test Street',
      delivery_address: '123 Test Street',
      whatsapp_number: '+1234567890',
      quantity: '500 g',
      number_of_bottles: 1,
      total_amount: 850,
      order_date: new Date().toLocaleDateString()
    };

    console.log('Test parameters:', testParams);

    const result = await emailjs.send(
      'service_loylxbw',
      'template_u565g9w',
      testParams,
      '00UOPjZ64lj9YNzvA'
    );

    console.log('✅ Test email sent successfully!', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Test email failed:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      text: error.text
    });
    return { success: false, error };
  }
};

// Simple test email with minimal parameters
export const testSimpleEmail = async () => {
  try {
    console.log('Testing simple email...');
    
    const simpleParams = {
      to_email: 'ravindurandika2004@gmail.com',
      from_name: 'Test User',
      message: 'This is a test message from the website.'
    };

    const result = await emailjs.send(
      'service_loylxbw',
      'template_u565g9w',
      simpleParams,
      '00UOPjZ64lj9YNzvA'
    );

    console.log('✅ Simple test email sent!', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Simple test email failed:', error);
    return { success: false, error };
  }
};

// Very simple test with minimal parameters
export const testMinimalEmail = async () => {
  try {
    console.log('Testing minimal email...');
    
    const minimalParams = {
      to_email: 'ravindurandika2004@gmail.com',
      from_name: 'Test User'
    };

    console.log('Minimal parameters:', minimalParams);

    const result = await emailjs.send(
      'service_loylxbw',
      'template_u565g9w',
      minimalParams,
      '00UOPjZ64lj9YNzvA'
    );

    console.log('✅ Minimal test email sent!', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Minimal test email failed:', error);
    console.error('Full error:', error);
    return { success: false, error };
  }
};
