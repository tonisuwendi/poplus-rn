import { Image, StatusBar, Text, View } from 'react-native';
import { styles } from './syles';
import LinearGradient from 'react-native-linear-gradient';
import ButtonDark from './parts/ButtonDark';

const WelcomeScreen = () => {
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Image
        source={require('../../assets/images/welcome-banner.jpg')}
        width={100}
        height={100}
        style={styles.bannerImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
        style={styles.bgGradient}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/logo-poplus-circle.png')}
          width={100}
          height={100}
          style={styles.logo}
        />
        <Text style={styles.title}>
          Welcome To Insight
        </Text>
        <Text style={styles.title}>
          Explore With Ease
        </Text>
        <View style={styles.actionContent}>
          <ButtonDark imageSource={require('../../assets/images/logo-google.png')} text="Sign In With Google" />
          <ButtonDark imageSource={require('../../assets/images/logo-facebook.png')} text="Sign In With Facebook" />
          <Text style={styles.buttonTextLight}>
            Continue as Guest
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
