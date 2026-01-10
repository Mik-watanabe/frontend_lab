import styles from "./Button.module.scss";

type Props = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<Props> = ({ label, onClick, type = "button" }) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
