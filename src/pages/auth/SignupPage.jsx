import AuthForm from "../../components/AuthForm.jsx";

export default function SignupPage({ message, onSubmit }) {
  return (
    <AuthForm
      title="Create your account"
      buttonText="Sign up"
      message={message}
      onSubmit={onSubmit}
      fields={[
        { name: "name", label: "Full name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
      ]}
      footer={
        <p>
          Already registered? <a href="#/login">Log in</a>
        </p>
      }
    />
  );
}
