import styles from "./InputField.module.scss";

const InputField = ({
    id,
    name,
    type="text",
    value,
    placeholder,
    onChange,
    min
}: any) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      min={min}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={styles.input}
    />
  );
};

export default InputField;
