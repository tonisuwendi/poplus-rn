import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  scrollContent: {
    marginTop: 10,
    paddingTop: 10,
  },
  noDataContainer: {
    marginTop: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
