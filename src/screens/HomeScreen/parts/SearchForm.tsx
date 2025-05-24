import { TextInput, View } from 'react-native';
import { styles } from './style';
import { Search } from 'lucide-react-native';

type SearchFormProps = {
  value: string;
  onSearch: (keyword: string) => void;
};

const SearchForm = ({ value, onSearch }: SearchFormProps) => {
  return (
    <View style={styles.searchContainer}>
      <Search size={20} color="#333" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={value}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default SearchForm;
