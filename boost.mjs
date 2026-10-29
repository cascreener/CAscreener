// node boost.mjs <mint>: create an order, then poll until paid or expired
const BASE = "https://cascreener.ai/api/public/v1";
const mint = process.argv[2];
if (!mint) throw new Error("usage: node boost.mjs <mint>");
const order = await (await fetch(`${BASE}/boosts/order`, {
  method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mint, asset: "SOL" }),
})).json();
if (!order.order_id) throw new Error(order.message);
console.log("Pay with:", order.solana_pay_url, "before", order.expires_at);
for (;;) {
  await new Promise((r) => setTimeout(r, 15_000));
  const { order: o } = await (await fetch(`${BASE}/boosts/order/${order.order_id}`)).json();
  console.log("status:", o.status);
  if (o.status !== "awaiting_payment" && o.status !== "verifying") break;
}
