const emailParams = {
  email: 'ravindurandika2004@gmail.com',
  from_name: data.fullName,
  to_name: 'ravindurandika2004@gmail.com',
  recipient_email: 'ravindurandika2004@gmail.com',
  full_name: data.fullName,
  address: data.address,
  delivery_address: data.deliveryAddress,
  province: data.province,
  district: data.district,
  postal_code: data.postalCode,
  whatsapp_number: data.whatsappNumber,
  quantity: data.quantity,
  number_of_bottles: data.numberOfBottles,
  total_amount: totalAmount,
  order_date: new Date().toLocaleDateString(),
  message: `Order ID: ${orderId}
Customer Name: ${data.fullName}
Address: ${data.address}
Delivery Address: ${data.deliveryAddress}
Province: ${data.province}
District: ${data.district}
Postal Code: ${data.postalCode}
WhatsApp: ${data.whatsappNumber}
Quantity: ${data.quantity}
Number of Bottles: ${data.numberOfBottles}
Total Amount: ${totalAmount}
Order Date: ${new Date().toLocaleDateString()}`
};