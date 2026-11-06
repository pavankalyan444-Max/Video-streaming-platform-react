export default function AuthForm({
  title,
  buttonText,
  fields,
  footer,
  message,
  onSubmit,
}) {
  return (
    <main className="form-page">
      <form className="form-card" onSubmit={onSubmit}>
        <a className="brand" href="#/welcome">
          StreamBox
        </a>
        <h1>{title}</h1>
        {fields.map((field) => (
          <label key={field.name}>
            {field.label}
            <input
              name={field.name}
              type={field.type}
              minLength={field.type === "password" ? 4 : undefined}
              required
            />
          </label>
        ))}
        <p className="message" role="status">
          {message}
        </p>
        <button className="button primary full" type="submit">
          {buttonText}
        </button>
        <div className="form-footer">{footer}</div>
      </form>
    </main>
  );
}
