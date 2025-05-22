import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Heart } from 'lucide-react-native';
import { styles } from './style';

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerGreeting}>
          Good Night 👋
        </Text>
        <Text style={styles.headerName}>
          Shani Indira Natio
        </Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerBoxHeart}>
          <Heart size={24} color="#333" />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/user.png')}
          width={50}
          height={50}
          style={styles.photoProfile}
        />
      </View>
    </View>
  );
};

export default Header;
