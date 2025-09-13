// App.jsx
// Simple app that mounts forms. Contains one small readability problem: huge component imports and inline JSX.

import React from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ContactForm from "./components/ContactForm";
import FileUploadForm from "./components/FileUploadForm";
import AdminImpersonate from "./components/AdminImpersonate";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Sample Forms (Insecure examples)</h1>
      <hr />
      <LoginForm />
      <hr />
      <RegisterForm />
      <hr />
      <ContactForm />
      <hr />
      <FileUploadForm />
      <hr />
      <AdminImpersonate />
    </div>
  );
}
