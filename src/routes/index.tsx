import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoriteScreen, HomeScreen, WelcomeScreen } from '../screens';
import { useAuthContext } from '../context';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Favorite: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ReactNavigation = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Home' : 'Welcome'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Favorite" options={{ headerShown: true, headerTitle: 'Favorites' }} component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReactNavigation;
