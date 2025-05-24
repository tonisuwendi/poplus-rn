import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Heart } from 'lucide-react-native';
import Modal from 'react-native-modal';
import { styles } from './style';
import { useAuthContext } from '../../../context';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes';

const Header = () => {
  const [isVisibleProfile, setIsVisibleProfile] = useState(false);
  const { user, signOutGoogle } = useAuthContext();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {return 'Good Morning 👋';}
    if (hour >= 12 && hour < 17) {return 'Good Afternoon 👋';}
    if (hour >= 17 && hour < 21) {return 'Good Evening 👋';}
    return 'Good Night 👋';
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerGreeting}>
          {getGreeting()}
        </Text>
        <Text style={styles.headerName}>
          {user ? user.user.name : 'Guest'}
        </Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.headerBoxHeart}
          onPress={() => {
            if (user) {
              navigation.navigate('Favorite');
            } else {
              Alert.alert('Sign In Required', 'You need to sign in to access favorites.');
            }
          }}
        >
          <Heart size={18} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsVisibleProfile(true)}>
          <Image
            source={user ? { uri: user.user.photo } : require('../../../assets/images/user.png')}
            width={50}
            height={50}
            style={styles.photoProfile}
          />
        </TouchableOpacity>
      </View>
       <Modal
        isVisible={isVisibleProfile}
        swipeDirection="down"
        onBackdropPress={() => setIsVisibleProfile(false)}
        onSwipeComplete={() => setIsVisibleProfile(false)}
        style={styles.modalContent}
      >
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>
            {user ? 'Logging out?' : 'Want to sign in?'}
          </Text>
          <Text style={styles.modalDesc}>
            {user ? 'Are you sure you want to log out?' : 'Do you want to sign in your account?'}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              if (user) {
                signOutGoogle();
              } else {
                navigation.navigate('Welcome');
              }
              setIsVisibleProfile(false);
            }}
          >
            <Text style={styles.modalButtonText}>
              {user ? 'Sign Out' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Header;
