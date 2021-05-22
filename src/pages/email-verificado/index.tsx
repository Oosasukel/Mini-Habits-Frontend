import styles from './styles.module.scss';
import Lottie from 'react-lottie';
import logoAnimation from '../../assets/lotties/Logo.json';

const VerifiedEmail = () => {
  return (
    <div className={styles.container}>
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

      <h1>Seu email foi confirmado!</h1>

      <p>Agora você já pode entrar com sua conta no nosso app :D</p>
    </div>
  );
};

export default VerifiedEmail;
