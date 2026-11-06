import AuthForm from "../../components/AuthForm.jsx";

export default function LoginPage({ message, onSubmit }) {
  return (
    <AuthForm
      title="Welcome back"
      buttonText="Log in"
      message={message}
      onSubmit={onSubmit}
      fields={[
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
      ]}
      footer={
        <>
          <p>
            New to StreamBox? <a href="#/signup">Create an account</a>
          </p>
          <p>
            <a href="#/admin-login">Admin login</a>
          </p>
        </>
      }
    />
  );
}
