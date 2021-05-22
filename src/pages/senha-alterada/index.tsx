import styles from './styles.module.scss';
import Lottie from 'react-lottie';
import logoAnimation from '../../assets/lotties/Logo.json';

const PasswordUpdated = () => {
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

      <h1>Sua senha foi alterada!</h1>

      <p>Agora você já pode entrar com sua conta no nosso app :D</p>
    </div>
  );
};

export default PasswordUpdated;
