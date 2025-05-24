import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './src/context/AuthContext';
import ReactNavigation from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <ReactNavigation />
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default App;
