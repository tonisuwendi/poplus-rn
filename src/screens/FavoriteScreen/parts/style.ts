import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  boxItem: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  boxImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    objectFit: 'cover',
  },
  boxInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  boxStateName: {
    fontSize: 16,
    fontFamily: 'RalewayBold',
    color: '#222',
  },
  boxStatePopulation: {
    fontSize: 14,
    fontFamily: 'RalewayMedium',
    color: '#444',
  },
  boxStateHeart: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 50,
  },
  loadingContainer: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
