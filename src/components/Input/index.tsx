import { InputHTMLAttributes, LegacyRef, useState } from "react";
import { ReactSVG } from "react-svg";
import styles from "./styles.module.scss";

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputRef: LegacyRef<HTMLInputElement>;
}

const InputComponent = ({ label, inputRef, ...rest }: InputComponentProps) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordIsVisible = (event) => {
    event.preventDefault();
    setPasswordIsVisible(!passwordIsVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className={styles.container}>
      <p className={isFocused ? styles.active : ""}>{label}</p>
      <div className={styles.inputContainer}>
        <input
          {...rest}
          ref={inputRef}
          type={passwordIsVisible ? "text" : "password"}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <ReactSVG
          className={styles.icon}
          onMouseDown={togglePasswordIsVisible}
          src={passwordIsVisible ? "/icons/closeEye.svg" : "/icons/openEye.svg"}
          alt={passwordIsVisible ? "Ocultar senha" : "Mostrar senha"}
        />
      </div>
    </div>
  );
};

export default InputComponent;
