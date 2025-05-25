import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './src/context/AuthContext';
import ReactNavigation from './src/routes';
import { FavoriteContextProvider } from './src/context';

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <FavoriteContextProvider>
          <ReactNavigation />
        </FavoriteContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default App;
