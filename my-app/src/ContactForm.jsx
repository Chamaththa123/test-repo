
import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");

  async function submit(e) {
    e.preventDefault();
    // no length limits or sanitization
    const body = { name, message, ts: Date.now() };
    await fetch("/api/contact", { method: "POST", body: JSON.stringify(body) }); 
    setPreview(message); 
    setName("");
    setMessage("");
  }

  return (
    <form onSubmit={submit}>
      <h2>Contact Us</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
      <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Your message" />
      <button>Send</button>

      <h3>Preview (unsafe)</h3>
      <div dangerouslySetInnerHTML={{ __html: preview }} />

      <div style={{ color: "gray" }}>No spam protection here — try sending many requests quickly.</div>
    </form>
  );
}
