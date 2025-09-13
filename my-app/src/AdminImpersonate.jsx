// AdminImpersonate.jsx
// Issues: insecure admin 'impersonate' button for convenience, stored admin token on client, authorization bypass, race condition.

import React, { useState } from "react";

export default function AdminImpersonate() {
  const [current, setCurrent] = useState({ id: null, role: "guest" });
  const [loading, setLoading] = useState(false);

  async function impersonate(userId) {
    setLoading(true);
    // Developer backdoor endpoint returns a token for any requested user if header "X-Dev: 1" is present.
    // This simulates a misconfigured dev-only endpoint enabled in production.
    const resp = await fetch("/api/dev/impersonate?uid=" + userId, {
      method: "POST",
      headers: {
        "X-Dev": "1",
      },
    });
    const tok = await resp.text();

    // Race condition: setCurrent immediately but token stored after another async op
    setCurrent({ id: userId, role: "admin" });
    localStorage.setItem("dev_token", tok);
    setLoading(false);
  }

  return (
    <div>
      <h2>Admin Tools (dangerous)</h2>
      <button onClick={()=>impersonate(42)} disabled={loading}>Impersonate user 42</button>
      <div>Current: {JSON.stringify(current)}</div>
    </div>
  );
}
