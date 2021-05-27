import styles from './styles.module.scss';
import { useRouter } from 'next/router';

import React, { useRef } from 'react';
import InputComponent from '../../../../components/Input';
import api from '../../../../services/api';

const NewPassword = () => {
  const router = useRouter();
  const { requestId, requestSecret } = router.query;

  const inputPassword = useRef<HTMLInputElement>(null);
  const inputPasswordConfirm = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    const password = inputPassword.current.value;
    const confirmPassword = inputPasswordConfirm.current.value;

    if (!password) {
      console.log('A senha deve ser preenchida');
      return;
    }

    if (password !== confirmPassword) {
      console.log('as senhas devem ser iguais');
      return;
    }

    api
      .post('/api/new-password', {
        requestId,
        requestSecret,
        password,
      })
      .then((response) => {
        console.log('deu certo');
        console.log(response);
      })
      .catch((error) => {
        console.log('deu erro no Backend');
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        title="Logo"
        src="/images/logo.png"
        alt="Logo"
      />
      <h1>Digite uma nova senha</h1>

      <InputComponent
        inputRef={inputPassword}
        placeholder="Senha"
        label="Senha"
      />

      <InputComponent
        inputRef={inputPasswordConfirm}
        placeholder="Confirmar senha"
        label="Confirmar senha"
      />

      <button className="button" onClick={handleConfirm}>
        Confirmar
      </button>
    </div>
  );
};

export default NewPassword;
