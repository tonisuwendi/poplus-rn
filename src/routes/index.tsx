import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailScreen, FavoriteScreen, HomeScreen, WelcomeScreen } from '../screens';
import { useAuthContext } from '../context';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { IState } from '../types/state';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Favorite: undefined;
  Detail: { state: IState };
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
      <Stack.Screen
        name="Favorite"
        options={{ headerShown: true, headerTitle: 'Favorites' }}
        component={FavoriteScreen}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
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
