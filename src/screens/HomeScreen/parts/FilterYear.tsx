import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

type FilterYearProps = {
  selectedYear: number;
  onSelectedYear: (year: number) => void;
};

const FilterYear = ({ selectedYear, onSelectedYear }: FilterYearProps) => {
  return (
    <>
      <Text style={styles.sectionTitle}>
        Select Year
      </Text>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {[2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013].map((year) => (
            <TouchableOpacity key={year} onPress={() => onSelectedYear(year)} style={[styles.yearButton, selectedYear === year && styles.yearButtonActive]}>
              <Text style={[styles.yearButtonText, selectedYear === year && styles.yearButtonTextActive]}>
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default FilterYear;
