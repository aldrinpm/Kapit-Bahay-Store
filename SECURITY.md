# Security Notes

This MVP is a frontend demonstration, not a secure production commerce system.

- Never collect or store card numbers, CVVs, passwords, or other payment credentials.
- Treat all browser-provided and localStorage data as untrusted.
- Validate product IDs and quantities against the current catalog.
- Do not trust client-calculated totals as authoritative for future backend transactions.
- Avoid putting personal customer information in logs.
- Do not include secrets or API keys in frontend source code.
- Clearly disclose that checkout is simulated and does not submit a real order.
- A future production backend must independently validate prices, stock, identity, authorization, and order totals.
