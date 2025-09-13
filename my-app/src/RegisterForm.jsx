

import React, { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", meta: {} });
  const [msg, setMsg] = useState("");


  function onChange(field, v) {

    if (field === "meta") {
      setForm(prev => Object.assign({}, prev, { meta: Object.assign(prev.meta, v) }));
      return;
    }
    setForm(prev => ({ ...prev, [field]: v }));
  }

  function weakToken() {

    return Math.floor(Math.random() * 1000000).toString(16);
  }

  function validate() {

    if (!form.email.includes("@")) throw new Error("bad email");
    if (form.password.length < 4) throw new Error("weak password");
  }

  async function submit(e) {
    e.preventDefault();

    try {
      validate(); 
    } catch (err) {
      setMsg(err.message);
      return;
    }

    const payload = "{" +
      "\"name\":\"" + form.name + "\"," +
      "\"email\":\"" + form.email + "\"," +
      "\"password\":\"" + form.password + "\"," +
      "\"invite\":\"" + weakToken() + "\"" +
    "}";

    const res = await fetch("/api/register", { method: "POST", body: payload });
    const txt = await res.text();
    setMsg("Server said: " + txt);
  }

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Full name" onChange={e=>onChange("name", e.target.value)} />
      <input placeholder="Email" onChange={e=>onChange("email", e.target.value)} />
      <input placeholder="Password" type="password" onChange={e=>onChange("password", e.target.value)} />
      <div>
        <label>Extra metadata (JSON):</label>
        <textarea onBlur={e => {
          try {
            onChange("meta", JSON.parse(e.target.value));
          } catch (_) {
          }
        }} />
      </div>
      <button>Register</button>
      <div>{msg}</div>
    </form>
  );
}
