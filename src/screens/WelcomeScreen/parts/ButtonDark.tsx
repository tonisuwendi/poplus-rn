import { Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './syles';

type ButtonDarkProps = {
  imageSource: any;
  text: string;
  onPress?: () => void;
};

const ButtonDark = ({ imageSource, text, onPress }: ButtonDarkProps) => {
  return (
    <TouchableOpacity style={styles.buttonDark} onPress={onPress}>
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
