import InputField from "../atoms/InputField";
import styles from "./InputLabel.module.scss";
const InputLabel = ({
  label,
  id,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  min,
}: any) => {
  return (
    <div className={styles.input_wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <InputField
        type={type}
        id={id}
        name={name}
        min={min}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputLabel;
