import AuthForm from "../../components/AuthForm.jsx";

export default function AdminLoginPage({ message, onSubmit }) {
  return (
    <AuthForm
      title="Admin login"
      buttonText="Log in as admin"
      message={message}
      onSubmit={onSubmit}
      fields={[
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
      ]}
      footer={
        <>
          <p className="hint">Demo: admin@gmail.com / admin123</p>
          <p>
            <a href="#/login">Back to user login</a>
          </p>
        </>
      }
    />
  );
}
