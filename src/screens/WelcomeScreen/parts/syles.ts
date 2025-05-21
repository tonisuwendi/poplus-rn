import { StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
  buttonDark: {
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: 'black',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 48,
    position: 'relative',
  },
  buttonLogo: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'RalewaySemiBold',
  },
});
