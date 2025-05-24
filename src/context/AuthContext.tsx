import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { RootStackParamList } from '../routes';
import supabase from '../services/supabase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (type: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signOutGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  setUser: () => {},
  setLoading: () => {},
  signInWithGoogle: async () => {},
  signOutGoogle: async () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '843995507168-qso7eo8o3op7qad5b3bncti6oflrr2n7.apps.googleusercontent.com',
  });

  const signInWithGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.data?.idToken) {
        setUser(userInfo.data);
        await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });
        navigation.navigate('Home');
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error: any) {
      Alert.alert('Something went wrong!', error?.message || 'Please try again.');
    }
  }, [navigation]);

  const getCurrentGoogleUser = async () => {
    try {
      const currentUser = await GoogleSignin.signInSilently();
      if (currentUser.data?.idToken) {
        await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: currentUser.data?.idToken,
        });
        setUser(currentUser.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      console.error('Error fetching current user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentGoogleUser();
  }, []);

  const signOutGoogle = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert('Something went wrong!', 'You failed to log out, please try again.');
      console.error('Sign-Out Error:', error);
    }
  }, [navigation]);

  const values = useMemo(
    () => ({
      user,
      loading,
      setUser,
      setLoading,
      signInWithGoogle,
      signOutGoogle,
    }),
    [user, loading, signInWithGoogle, signOutGoogle]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
