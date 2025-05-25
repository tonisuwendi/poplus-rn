import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Heart } from 'lucide-react-native';
import { IState } from '../../../types/state';
import supabase from '../../../services/supabase';
import { useAuthContext } from '../../../context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes';

export type StateListProps = {
  stateData: IState[];
  isLoading: boolean;
  onFavorite: (state: IState) => void;
}

const StateList = ({ stateData, isLoading, onFavorite }: StateListProps) => {
  const { user } = useAuthContext();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFavorite = async (state: IState) => {
    if (!user?.idToken) {
      Alert.alert('Oops!', 'You must be logged in to enter favorites.');
      return;
    }
    try {
      onFavorite(state);
      const isExist = await supabase.db.from('favorites').select('*').eq('user_id', user?.user.id).eq('state_id', state['ID State']).limit(1);
      if (isExist && isExist.data && isExist.data?.length > 0) {
        const { status } = await supabase.db.from('favorites').delete().eq('id', isExist?.data[0].id);
        if (status !== 204) {
          throw new Error('Failure occurs when deleting a favorite.');
        }
      } else {
        const { status } = await supabase.db.from('favorites').insert({
          user_id: user?.user?.id,
          state_id: state['ID State'],
        });
        if (status !== 201) {
          throw new Error('There is a failure when making a favorite.');
        }
      }
    } catch (error: any) {
      onFavorite({
        ...state,
        isFavorite: !state.isFavorite,
      });
      Alert.alert('Something went wrong!', error?.message);
    }
  };

  return (
    <>
      <Text style={styles.sectionTitle}>
        Population by State
      </Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        stateData.map((stateItem) => (
          <View key={stateItem['ID State']} style={styles.boxItem}>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { state: stateItem })}>
              <Image
                source={{ uri: stateItem.image }}
                width={500}
                height={300}
                style={styles.boxImage}
              />
            </TouchableOpacity>
            <View style={styles.boxInfo}>
              <TouchableOpacity onPress={() => navigation.navigate('Detail', { state: stateItem })}>
                <Text style={styles.boxStateName}>
                  {stateItem.State}
                </Text>
                <Text style={styles.boxStatePopulation}>
                  Population: {stateItem.Population.toLocaleString('en-US')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boxStateHeart} onPress={() => handleFavorite(stateItem)}>
                <Heart size={20} color="#f00" fill={stateItem.isFavorite ? 'red' : '#f9f9f9'} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </>
  );
};

export default StateList;
