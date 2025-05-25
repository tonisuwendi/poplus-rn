import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 10,
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  boxImage: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    objectFit: 'cover',
  },
  stateName: {
    fontSize: 20,
    fontFamily: 'RalewaySemiBold',
    marginTop: 8,
    marginBottom: 4,
  },
  population: {
    fontSize: 16,
    fontFamily: 'RalewayRegular',
    color: '#222',
  },
});
