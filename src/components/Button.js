function Button({ children, onClick, type = 'button', variant = 'primary' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant === 'primary' ? 'button-primary' : 'button-secondary'}`}
    >
      {children}
    </button>
  );
}

export default Button;