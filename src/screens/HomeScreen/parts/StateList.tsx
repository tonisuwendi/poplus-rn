import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Heart } from 'lucide-react-native';

const StateList = () => {
  return (
    <>
      <Text style={styles.sectionTitle}>
        Population by State
      </Text>
      <View style={styles.boxItem}>
        <Image
          source={require('../../../assets/images/state/alabama.jpg')}
          width={500}
          height={300}
          style={styles.boxImage}
        />
        <View style={styles.boxInfo}>
          <View>
            <Text style={styles.boxStateName}>
              Alabama
            </Text>
            <Text style={styles.boxStatePopulation}>
              Population: 5,024,279
            </Text>
          </View>
          <TouchableOpacity style={styles.boxStateHeart}>
            <Heart size={20} color="#f00" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.boxItem}>
        <Image
          source={require('../../../assets/images/state/alabama.jpg')}
          width={500}
          height={300}
          style={styles.boxImage}
        />
        <View style={styles.boxInfo}>
          <View>
            <Text style={styles.boxStateName}>
              Alabama
            </Text>
            <Text style={styles.boxStatePopulation}>
              Population: 5,024,279
            </Text>
          </View>
          <TouchableOpacity style={styles.boxStateHeart}>
            <Heart size={20} color="#f00" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.boxItem}>
        <Image
          source={require('../../../assets/images/state/alabama.jpg')}
          width={500}
          height={300}
          style={styles.boxImage}
        />
        <View style={styles.boxInfo}>
          <View>
            <Text style={styles.boxStateName}>
              Alabama
            </Text>
            <Text style={styles.boxStatePopulation}>
              Population: 5,024,279
            </Text>
          </View>
          <TouchableOpacity style={styles.boxStateHeart}>
            <Heart size={20} color="#f00" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default StateList;
