const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // ใช้แบบนี้แทน new Stripe()
const OrderModel = require("../models/Order");
const CartModel = require("../models/Cart");

exports.createCheckoutSession = async (req, res) => {
  try {
    const cartItems = req.body.cart;
    const products = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    // Create customer
    const customer = await stripe.customers.create({
      metadata: {
        email: req.body.email.toString(),
        cart: JSON.stringify(products),
      },
    });

    const line_items = cartItems.map((item) => ({ // แก้จาก cartitems เป็น cartItems
      price_data: {
        currency: "thb",
        product_data: {
          name: item.name,
          images: [item.image], // แก้จาก image เป็น images
          description: item.name,
          metadata: {
            id: item.id, // ควรใช้ item.id แทน item.price
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({ // แก้จาก session เป็น sessions
      payment_method_types: ["card", "promptpay"],
      shipping_address_collection: { allowed_countries: ["TH"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "thb" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 4500, currency: "thb" },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 1 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      line_items,
      customer: customer.id,
      mode: "payment",
      success_url: `${process.env.BASE_URL}/checkout-success`,
      cancel_url: `${process.env.BASE_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Helper functions
const clearCart = async (email) => {
  try {
    await CartModel.deleteMany({ email });
    console.log("Cart cleared successfully");
  } catch (error) {
    console.error("Clear Cart Error:", error);
    throw error; // Throw error แทนการใช้ res
  }
};

const createOrder = async (customer, data) => {
  try {
    const products = JSON.parse(customer.metadata.cart);
    const newOrder = await OrderModel.create({
      email: customer.metadata.email,
      customerId: customer.id, // แก้จาก Id เป็น id
      products,
      subtotal: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });
    return newOrder;
  } catch (error) {
    console.error("Create Order Error:", error);
    throw error;
  }
};

exports.webhook = async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent( // แก้จาก webhook เป็น webhooks
      req.rawBody || req.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      try {
        const customer = await stripe.customers.retrieve(data.customer); // แก้จาก customer เป็น customers
        await createOrder(customer, data);
        await clearCart(customer.metadata.email);
      } catch (error) {
        console.error("Webhook Processing Error:", error);
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};