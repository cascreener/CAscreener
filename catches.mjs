// node catches.mjs: print current good catches
const BASE = "https://cascreener.ai/api/public/v1";
const res = await fetch(`${BASE}/catches`);
if (res.status === 429) throw new Error(`Rate limited, retry in ${res.headers.get("retry-after")}s`);
const { catches } = await res.json();
for (const c of catches) console.log(`${c.symbol ?? c.mint}  score ${c.score}  fdv ${c.fdv_usd ?? "?"}`);
