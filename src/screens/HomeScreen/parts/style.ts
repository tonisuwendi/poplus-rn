import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants';

export const styles = StyleSheet.create({
  header: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerBoxHeart: {
    backgroundColor: '#dddd',
    padding: 10,
    borderRadius: 50,
  },
  headerGreeting: {
    fontSize: 14,
    fontFamily: 'RalewayMedium',
    color: '#444',
  },
  headerName: {
    fontSize: 14,
    fontFamily: 'RalewaySemiBold',
    color: '#222',
    marginTop: 4,
  },
  photoProfile: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: '#c9c9c9',
  },
  searchContainer: {
    position: 'relative',
    marginHorizontal: 20,
  },
  searchInput: {
    backgroundColor: '#f7f7f7',
    borderRadius: 30,
    height: 50,
    paddingRight: 16,
    paddingLeft: 44,
    fontSize: 14,
    fontFamily: 'RalewayMedium',
    borderWidth: 1,
    borderColor: '#d7d7d7',
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: '-50%' }],
    left: 16,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'RalewayBold',
    color: '#222',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  yearButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginRight: 12,
  },
  yearButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  yearButtonText: {
    fontSize: 14,
    paddingBottom: 4,
    fontFamily: 'RalewaySemiBold',
    color: '#444',
  },
  yearButtonTextActive: {
    color: 'white',
  },
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
  modalContent: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalBody: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 'auto',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'RalewayBold',
  },
  modalDesc: {
    fontSize: 14,
    fontFamily: 'RalewayMedium',
    marginTop: 6,
  },
  modalButton: {
    borderWidth: 1,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 48,
    marginTop: 16,
    position: 'relative',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'RalewaySemiBold',
  },
  loadingContainer: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
