import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Heart } from 'lucide-react-native';
import { IState } from '../../../types/state';
import supabase from '../../../services/supabase';
import { useAuthContext } from '../../../context';

export type StateListProps = {
  stateData: IState[];
  isLoading: boolean;
  onRemoveFavorite: (state: IState) => void;
  onCancelRemoveFavorite: () => void;
}

const StateList = ({ stateData, isLoading, onRemoveFavorite, onCancelRemoveFavorite }: StateListProps) => {
  const { user } = useAuthContext();

  const handleRemoveFavorite = async (state: IState) => {
    try {
      onRemoveFavorite(state);
      const { status } = await supabase.db.from('favorites').delete().eq('state_id', state['ID State']).eq('user_id', user?.user.id);
      if (status !== 204) {
        throw new Error('Failure occurs when deleting a favorite.');
      }
    } catch (error: any) {
      onCancelRemoveFavorite();
      Alert.alert('Something went wrong!', error?.message);
    }
  };

  const handleConfirmRemoveFavorite = (state: IState) => {
    Alert.alert(
      'Removed from Favorites?',
      `Are you sure you want to remove ${state.State} from your favorites?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleRemoveFavorite(state),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        stateData.map((stateItem) => (
          <View key={stateItem['ID State']} style={styles.boxItem}>
            <Image
              source={{ uri: stateItem.image }}
              width={500}
              height={300}
              style={styles.boxImage}
            />
            <View style={styles.boxInfo}>
              <View>
                <Text style={styles.boxStateName}>
                  {stateItem.State}
                </Text>
                <Text style={styles.boxStatePopulation}>
                  Population: {stateItem.Population.toLocaleString('en-US')}
                </Text>
              </View>
              <TouchableOpacity style={styles.boxStateHeart} onPress={() => handleConfirmRemoveFavorite(stateItem)}>
                <Heart size={20} color="#f00" fill="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </>
  );
};

export default StateList;
