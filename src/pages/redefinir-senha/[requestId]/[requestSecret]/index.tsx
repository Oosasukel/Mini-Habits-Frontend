import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie';
import { Form } from '@unform/web';
import * as yup from 'yup';

import React, { useRef, useState } from 'react';
import Input from '../../../../components/Input';
import api from '../../../../services/api';
import Button from '../../../../components/Button';
import logoAnimation from '../../../../assets/lotties/Logo.json';

interface NewPasswordData {
  password: string;
  confirmPassword: string;
}

const NewPassword = () => {
  const router = useRouter();
  const { requestId, requestSecret } = router.query;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async ({
    password,
    confirmPassword,
  }: NewPasswordData) => {
    setError('');
    setLoading(true);
    formRef.current.setErrors({});

    const schema = yup.object().shape({
      password: yup.string().required('Senha é obrigatória.'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais.')
        .required('Senha é obrigatória'),
    });

    try {
      await schema.validate(
        { password, confirmPassword },
        {
          abortEarly: false,
        }
      );
    } catch (error) {
      const validationErrors = {};

      if (error instanceof yup.ValidationError) {
        error.inner.forEach((currentError) => {
          validationErrors[currentError.path] = currentError.message;
        });
        formRef.current.setErrors(validationErrors);
      }

      setLoading(false);
      return;
    }

    api
      .post('/api/new-password', {
        requestId,
        requestSecret,
        password,
      })
      .then(() => {
        router.push('/senha-alterada');
      })
      .catch((error) => {
        const currentStatus = error.response.status;
        const expectedErrorsStatus = [400, 401, 404];

        if (expectedErrorsStatus.includes(currentStatus)) {
          setError('Requisição inválida.');
        } else {
          setError('Algo inesperado aconteceu. Tente novamente mais tarde.');
        }

        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.animationContainer}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: logoAnimation,
            }}
            isClickToPauseDisabled={true}
          />
        </div>

        <h1>Digite uma nova senha</h1>

        <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Input
            name="password"
            placeholder="Senha"
            label="Senha"
            style={{ marginBottom: '1rem' }}
          />

          <Input
            name="confirmPassword"
            placeholder="Confirmar senha"
            label="Confirmar senha"
            style={{ marginBottom: '1rem' }}
          />

          {error && <p className={styles.error}>{error}</p>}

          <Button loading={loading} style={{ marginTop: '1rem' }}>
            Confirmar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewPassword;
