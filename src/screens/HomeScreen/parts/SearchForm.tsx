import { TextInput, View } from 'react-native';
import { styles } from './style';
import { Search } from 'lucide-react-native';

const SearchForm = () => {
  return (
    <View style={styles.searchContainer}>
      <Search size={20} color="#333" style={styles.searchIcon} />
      <TextInput style={styles.searchInput} placeholder="Search" />
    </View>
  );
};

export default SearchForm;
