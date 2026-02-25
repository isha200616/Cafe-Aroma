const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

// Use your Stripe secret key
const stripe = Stripe("sk_test_51Nxxxxxxxxxxxxxxxxxxxxxxxxx"); // 👈 REPLACE with your key

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // in paise
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

module.exports = router;
