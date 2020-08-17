const paypal = require('@paypal/checkout-server-sdk')
const payPalClient = require('./payPalClient.js')

async function createCheckoutSession(product, uId) {
  const request = new paypal.orders.OrdersCreateRequest()

  const productName = `Reparatur ${product.defects.join()} - ${product.brand} ${product.phone}`

  request.prefer('return=representation')
  request.requestBody({
    intent: 'CAPTURE',
    application_context: {
      return_url: `https://wirkaufendeinhandy.shop/rUser/${uId}?success=true`,
      cancel_url: `https://wirkaufendeinhandy.shop/rUser/${uId}?success=false`,
      brand_name: 'Wirkaufendeinhandy GbR',
      locale: 'de-DE',
      landing_page: 'BILLING',
      shipping_preference: 'NO_SHIPPING',
      user_action: 'CONTINUE',
    },
    purchase_units: [{
      reference_id: uId,
      description: productName,
      amount: {
        currency_code: 'EUR',
        value: product.price,
      },
    }],
  })
  let order
  try {
    order = await payPalClient.client().execute(request)
  } catch (err) {
    // 4. Handle any errors from the call
    console.error(err)
    return false
  }

  // 5. Return a successful response to the client with the order ID
  return {
    orderID: order.result.id,
  }
}

async function capturePayPalTransaction(orderID, repair) {
// 2a. Get the order ID from the request body

  // 3. Call PayPal to get the transaction details
  const request = new paypal.orders.OrdersGetRequest(orderID)

  let order
  try {
    order = await payPalClient.client().execute(request)
  } catch (err) {
  // 4. Handle any errors from the call
    console.error(err)
    return false
  }

  // 5. Validate the transaction details are as expected
  if (order.result.purchase_units[0].amount.value !== (repair.repairData.price).toString()) {
    return false
  }

  // 6. Save the transaction in your database
  // await database.saveTransaction(orderID);

  // 7. Return a successful response to the client
  return true
}

module.exports = { createCheckoutSession, capturePayPalTransaction }
