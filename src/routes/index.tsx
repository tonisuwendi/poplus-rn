import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, WelcomeScreen } from '../screens';

export type RootStackParamList = {
  Home: undefined;
};

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Welcome',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Welcome: WelcomeScreen,
    Home: HomeScreen,
  },
});

const ReactNavigation = createStaticNavigation(RootStack);

export default ReactNavigation;
