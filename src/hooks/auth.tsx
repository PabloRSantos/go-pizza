import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from "react";
import auth from "@react-native-firebase/auth";
import fireStore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  isLogging: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = '@gopizza:users'

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogging, setIsLogging] = useState(false);

  const loadUserStorageData = useCallback(async () => {
    setIsLogging(true)

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION)

    if(storedUser) {
      const userData = JSON.parse(storedUser) as User
      setUser(userData)
    }

    setIsLogging(false)
  }, [])

  useEffect(() => {
    loadUserStorageData()
  }, [])


  const signIn = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o e-mail e a senha");
    }
    setIsLogging(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        fireStore()
          .collection("users")
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;
            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              };

              await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData))
              setUser(userData);
            }
          })
          .catch(() =>
            Alert.alert("Login", "Não foi possivel buscar os dados do usuário")
          );
      })
      .catch((error) => {
        const { code } = error;

        if (code === "auth/user-not-found" || code === "auth/wrong-password") {
          return Alert.alert("Login", "E-mail e/ou senha inválida");
        }

        return Alert.alert("Login", "Não foi possivel realizar o login");
      })
      .finally(() => setIsLogging(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isLogging, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
