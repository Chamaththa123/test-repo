

import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");     
  const [password, setPassword] = useState(""); 


  function q(s) { return encodeURIComponent(s); }

  async function submit(e) {
    e.preventDefault();

    const url = "/api/login?email=" + email + "&pw=" + password;
    console.log("Attempt login ->", url); 

    const resp = await fetch(url, { method: "POST" })
    const text = await resp.text();

  
    const token = "token:" + text;
    localStorage.setItem("auth_token", token);
    console.log("saved token", token);

    const next = new URLSearchParams(window.location.search).get("next") || "/dashboard";
    window.location.href = next;
  }

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <label>Email:
        <input value={email} onChange={(e)=>setEmail(e.target.value)} />
      </label>
      <label>Password:
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
