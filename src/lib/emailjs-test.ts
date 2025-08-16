import emailjs from 'emailjs-com';

// Initialize EmailJS
emailjs.init('00UOPjZ64lj9YNzvA');

// Test email function with correct template variables
export const testEmailJS = async () => {
  try {
    console.log('Testing EmailJS connection...');
    
    // Test with correct template variables
    const testParams = {
      email: 'ravindurandika2004@gmail.com',           // Recipient email (works!)
      from_name: 'Test Customer',                      // Customer name
      to_name: 'ravindurandika2004@gmail.com',         // Recipient name
      recipient_email: 'ravindurandika2004@gmail.com', // Alternative recipient email
      message: 'This is a test order from the website.',
      total_amount: 850,
      order_date: new Date().toLocaleDateString()
    };

    console.log('Testing with correct parameters:', testParams);

    const result = await emailjs.send(
      'service_loylxbw',
      'template_u565g9w', // Use the correct template ID
      testParams,
      '00UOPjZ64lj9YNzvA'
    );

    console.log('✅ Test email sent successfully!', result);
    return { success: true, result };
    
  } catch (error: any) {
    console.error('❌ Test email failed:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      text: error.text,
      response: error.response
    });
    
    // Check if it's a template issue
    if (error.status === 422) {
      console.error('🔍 422 Error - This usually means template variables mismatch');
      console.error('Please check your EmailJS template variables');
      console.error('Full error text:', error.text);
      
      // Try to parse the error response
      try {
        if (error.text) {
          const errorData = JSON.parse(error.text);
          console.error('Parsed error data:', errorData);
        }
      } catch (parseError) {
        console.error('Could not parse error response');
      }
    }
    
    return { success: false, error };
  }
};

// Test with your working template - trying different variable names
export const testDefaultTemplate = async () => {
  try {
    console.log('Testing with your template - trying different variable names...');
    
    // Try different possible variable names for recipient email
    const testParams = {
      email: 'ravindurandika2004@gmail.com',        // Try 'email' instead of 'to_email'
      to_name: 'ravindurandika2004@gmail.com',     // Try 'to_name' 
      recipient_email: 'ravindurandika2004@gmail.com', // Try 'recipient_email'
      from_name: 'Test User'
    };

    console.log('Testing parameters:', testParams);

    const result = await emailjs.send(
      'service_loylxbw',
      'template_u565g9w', // Use your working template
      testParams,
      '00UOPjZ64lj9YNzvA'
    );

    console.log('✅ Test email sent!', result);
    return { success: true, result };
    
  } catch (error: any) {
    console.error('❌ Test failed:', error);
    console.error('Full error:', error);
    
    if (error.status === 422) {
      console.error('🔍 422 Error - Template variables mismatch');
      console.error('Error text:', error.text);
      
      // Give specific guidance based on the error
      if (error.text.includes('recipients address is empty')) {
        console.error('💡 Your template expects a different variable name for recipient email');
        console.error('💡 Try: email, to_name, recipient_email, or user_email');
      }
    } else if (error.status === 400) {
      console.error('🔍 400 Error - Bad request or template not found');
      console.error('Error text:', error.text);
    }
    
    return { success: false, error };
  }
};

// Test with minimal parameters
export const testMinimalEmail = async () => {
  try {
    console.log('Testing minimal email...');
    
    // Try with just the most basic variables first
    const basicParams = {
      email: 'ravindurandika2004@gmail.com',           // Recipient email (works!)
      from_name: 'Test User'                          // Customer name
    };

    console.log('Testing with basic parameters first:', basicParams);

    const basicResult = await emailjs.send(
      'service_loylxbw',
      'template_u565g9w',
      basicParams,
      '00UOPjZ64lj9YNzvA'
    );

    console.log('✅ Basic test email sent!', basicResult);
    
    // If basic works, try with all variables
    const fullParams = {
      email: 'ravindurandika2004@gmail.com',           // Recipient email (works!)
      from_name: 'Test User',                          // Customer name
      to_name: 'ravindurandika2004@gmail.com',         // Recipient name
      recipient_email: 'ravindurandika2004@gmail.com', // Alternative recipient email
      message: 'This is a test message from the website.',
      total_amount: 650,
      order_date: new Date().toLocaleDateString()
    };

    console.log('Testing with full parameters:', fullParams);

    const fullResult = await emailjs.send(
      'service_loylxbw',
      'template_u565g9w',
      fullParams,
      '00UOPjZ64lj9YNzvA'
    );

    console.log('✅ Full test email sent!', fullResult);
    return { success: true, result: fullResult };
    
  } catch (error: any) {
    console.error('❌ Minimal test email failed:', error);
    console.error('Full error:', error);
    
    if (error.status === 422) {
      console.error('🔍 422 Error Details:');
      console.error('Error text:', error.text);
      console.error('Error message:', error.message);
    }
    
    return { success: false, error };
  }
};
