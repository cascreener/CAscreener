# CAscreener.ai API

Free JSON API for **CAscreener.ai good catches**: Solana memecoins the otter scored 70+ after checking bundles, snipers, developer history, holder spread and security. You can also buy **boosts** from code for 0.15 SOL.

- Docs: https://cascreener.ai/api-docs
- Base URL: `https://cascreener.ai/api/public/v1`
- No key, JSON, CORS open

## Endpoints

| Method | Path | What it returns |
|---|---|---|
| GET | `/catches` | All current good catches with score breakdown, market data and Otter Verdict |
| GET | `/coin/{address}` | One good catch (404 if it isn't in the pond; no new scans) |
| GET | `/boosts` | Active boosts and their end times |
| POST | `/boosts/order` | `{ mint, asset: "SOL" }` → fee wallet, amount, Solana Pay link, reference, expiry (7 min) |
| POST | `/boosts/verify` | `{ order_id, signature }` → confirms payment and switches the boost on |
| GET | `/boosts/order/{id}` | Order status |

## Limits

| Bucket | Limit |
|---|---|
| Reads | 15 / minute / IP |
| Boost orders | 2 / 5 minutes / IP, 300 / day total |
| Payment checks | 10 / minute / IP, 500 / day total |

Over the limit you get **HTTP 429** with a `Retry-After` header.

## Boost flow

1. `POST /boosts/order`. Only clean coins already in the pond qualify.
2. Pay through the returned `solana_pay_url`. It carries a unique reference so we can match your payment.
3. `POST /boosts/verify` with the transaction signature, or poll `GET /boosts/order/{id}`.

The safety check runs again when the payment lands. Boosts never change a coin's score.

## Examples

- [`examples/curl`](examples/curl)
- [`examples/javascript`](examples/javascript) (Node 18+, no dependencies)
- [`examples/python`](examples/python) (needs `requests`)

## Disclaimer

Research data, not financial advice. Missing evidence means unknown, not safe.

## License

MIT
