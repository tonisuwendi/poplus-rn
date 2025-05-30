import { StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bgGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  content: {
    zIndex: 10,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 36,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 26,
  },
  title: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'RalewayBold',
  },
  actionContent: {
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 16,
  },
  buttonTextLight: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'RalewaySemiBold',
    marginTop: 8,
  },
});
