import { Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './syles';

type ButtonDarkProps = {
  imageSource: any;
  text: string;
};

const ButtonDark = ({ imageSource, text }: ButtonDarkProps) => {
  return (
    <TouchableOpacity style={styles.buttonDark}>
      <Image
        source={imageSource}
        width={100}
        height={100}
        style={styles.buttonLogo}
      />
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonDark;
