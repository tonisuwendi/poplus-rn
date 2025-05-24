import { Alert, Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { useCallback, useEffect, useState } from 'react';
import Header from './parts/Header';
import SearchForm from './parts/SearchForm';
import FilterYear from './parts/FilterYear';
import StateList from './parts/StateList';
import supabase from '../../services/supabase';
import { usaApiUrl } from '../../services/datausa';
import { IState } from '../../types/state';
import { useAuthContext } from '../../context';

const HomeScreen = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [refreshing, setRefreshing] = useState(false);
  const [stateData, setStateData] = useState<IState[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const { user } = useAuthContext();

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

        const stateWithFavorite: IState[] = jsonData.data.map((item: IState) => {
          const isFavorite = favoriteData.some((fav) => fav.state_id === item['ID State']);
          return {
            ...item,
            image: `https://ikbwcgqloycayignsopk.supabase.co/storage/v1/object/public/states//${item['Slug State']}.jpg`,
            isFavorite,
          };
        });

        setStateData(stateWithFavorite);
      }
    } catch (error: any) {
      Alert.alert('Error!', error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.user.id]);

  const handleFavorite = (state: IState) => {
    const newStateData = stateData.map((_state) => {
      if (_state['ID State'] === state['ID State']) {
        return {
          ..._state,
          isFavorite: !state.isFavorite,
        };
      }
      return _state;
    });
    setStateData(newStateData);
  };

  useEffect(() => {
    handleGetState();
    return () => {
      setSelectedYear(2023);
      setStateData([]);
    };
  }, [handleGetState]);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleGetState();
    setRefreshing(false);
  };

  const filteredState = stateData
    .filter((stateItem) => Number(stateItem.Year) === selectedYear)
    .filter((stateItem) => stateItem.State.toLowerCase().includes(searchKeyword.toLowerCase()));

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <SearchForm value={searchKeyword} onSearch={setSearchKeyword} />
          <FilterYear selectedYear={selectedYear} onSelectedYear={setSelectedYear} />
          { filteredState.length === 0 && !isLoading ? (
            <View style={styles.noDataContainer}>
              <Image
                source={require('../../assets/images/empty.png')}
                width={150}
                height={150}
                resizeMode="contain"
                style={styles.noDataImage}
              />
              <Text style={styles.noDataText}>No data found for the search keyword.</Text>
            </View>
          ) : (
            <StateList
              stateData={filteredState}
              isLoading={isLoading}
              onFavorite={handleFavorite}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
