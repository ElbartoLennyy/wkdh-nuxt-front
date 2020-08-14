const stripe = require('stripe')(process.env.STRIPE_SK)
const firebase = require('./firebase')

async function createCheckoutSession(product, uId) {
  const sessionCode = await firebase.createSessionCode(uId)

  const productName = `Reparatur ${product.defects.join()} - ${product.brand} ${product.phone}`

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'ideal', 'giropay'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: productName,
        },
        unit_amount: (product.price * 100).toFixed(0),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `https://wirkaufendeinhandy.shop/rUser/${uId}?success=true&&sessionCode=${sessionCode}`,
    cancel_url: `https://wirkaufendeinhandy.shop/rUser/${uId}?success=false&&sessionCode=${sessionCode}`,
  })

  return session.id
}

module.exports = { createCheckoutSession }
