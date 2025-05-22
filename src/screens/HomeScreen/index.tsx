import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { useState } from 'react';
import Header from './parts/Header';
import SearchForm from './parts/SearchForm';
import FilterYear from './parts/FilterYear';
import StateList from './parts/StateList';

const HomeScreen = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchForm />
          <FilterYear selectedYear={selectedYear} onSelectedYear={setSelectedYear} />
          <StateList />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
