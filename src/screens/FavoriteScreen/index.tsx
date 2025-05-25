import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import SearchForm from '../HomeScreen/parts/SearchForm';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import { IState } from '../../types/state';
import { useAuthContext, useFavoriteContext } from '../../context';
import { usaApiUrl } from '../../services/datausa';
import supabase from '../../services/supabase';
import StateList from './parts/StateList';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';

const FavoriteScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [stateData, setStateData] = useState<IState[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const { user } = useAuthContext();
  const { deletedFavoriteIds, setDeletedFavoriteIds } = useFavoriteContext();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGetState = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(usaApiUrl);
      const jsonData = await response.json();
      if (jsonData) {
        const { data: favorites, status } = await supabase.db.from('favorites').select('*').eq('user_id', user?.user.id);
        if (status !== 200) {
          throw new Error('Failed to get favorite data.');
        }

        const favoriteData = favorites || [];

        const newFavoriteData = favoriteData.map((fav) => {
          const selectedState = jsonData.data.find((item: IState) => item['ID State'] === fav.state_id);
          return {
            ...selectedState,
            image: `https://ikbwcgqloycayignsopk.supabase.co/storage/v1/object/public/states//${selectedState['Slug State']}.jpg`,
          };
        });

        setStateData(newFavoriteData);
      }
    } catch (error: any) {
      Alert.alert('Error!', error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.user.id]);

  const handleRemoveFavorite = (state: IState) => {
    setStateData((prevState) => prevState.filter((item) => item['ID State'] !== state['ID State']));
    setDeletedFavoriteIds([...deletedFavoriteIds, state['ID State']]);
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate('Welcome');
      return;
    }
    handleGetState();
    return () => {
      setStateData([]);
    };
  }, [handleGetState, navigation, user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleGetState();
    setRefreshing(false);
  };

  const filteredState = stateData.filter((stateItem) => stateItem.State.toLowerCase().includes(searchKeyword.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <SearchForm value={searchKeyword} onSearch={setSearchKeyword} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {filteredState.length === 0 && !isLoading ? (
          <View style={styles.noDataContainer}>
            <Image
              source={require('../../assets/images/empty.png')}
              width={150}
              height={150}
              resizeMode="contain"
              style={styles.noDataImage}
            />
            <Text style={styles.noDataText}>
              {stateData.length === 0 ? 'No favorite states found.' : 'No states match your search criteria.'}
            </Text>
          </View>
        ) : (
          <StateList
            stateData={filteredState}
            isLoading={isLoading}
            onRemoveFavorite={handleRemoveFavorite}
            onCancelRemoveFavorite={onRefresh}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriteScreen;
