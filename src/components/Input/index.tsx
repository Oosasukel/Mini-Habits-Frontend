import { useField } from '@unform/core';
import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ReactSVG } from 'react-svg';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input = ({ name, label, style, ...rest }: InputProps) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField<HTMLInputElement>({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  const togglePasswordIsVisible = useCallback(
    (event) => {
      event.preventDefault();
      setPasswordIsVisible(!passwordIsVisible);
    },
    [passwordIsVisible]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <div style={style} className={styles.container}>
      <label
        className={`${styles.label} ${
          error ? styles.error : isFocused ? styles.active : ''
        }`}
      >
        {label}
        <div className={styles.inputContainer}>
          <input
            {...rest}
            defaultValue={defaultValue}
            ref={inputRef}
            type={passwordIsVisible ? 'text' : 'password'}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <ReactSVG
            className={styles.icon}
            onMouseDown={togglePasswordIsVisible}
            src={
              passwordIsVisible ? '/icons/closeEye.svg' : '/icons/openEye.svg'
            }
            alt={passwordIsVisible ? 'Ocultar senha' : 'Mostrar senha'}
          />
        </div>
      </label>
      {error && <label className={styles.errorLabel}>{error}</label>}
    </div>
  );
};

export default Input;
