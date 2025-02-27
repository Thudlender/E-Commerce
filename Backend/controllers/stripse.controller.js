const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckPutSession = async (req, res) => {
    const cartitems = req.body.cart;
    const products = cartItems.map((item) => {
        return {
            productId: item.productId,
            quantity: item.quantity,
        };
    });
    // customer info
    const customer = await stripe.customers.create({
        metadata: {
            email: req.body.email.toString(),
            cart: JSON.stringify(products),
        },
    });

    const line_items = cartitems.map((item) => {
        return {
            price_data:{
                currency:"thb",
                product_data:{
                    name:item.name,
                    image:[item.image],
                    description: item.name,
                    metadata: {
                        id: item.price * 100,
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        };
    });
    const session = await stripe.checkout.session.create({
      payment_method_types: ["card", "promptpay"], //payment method
      shipping_address_collection: {
        allowed_countries: ["TH"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "thb",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 4500,
              currency: "thb",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      customer: customer.id,
      mode: "payment",
      success_url: `${proccess.env.BASE_URL}/checkout-success`,
      cancel_url: `${proccess.env.BASE_URL}/cart`,
    });

    res.send({ url: session.url });
};