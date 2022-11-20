import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";

import { firebase } from "./initFirebase";

interface IContext {
  user: firebase.User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<IContext>({
  user: null,
  loading: false,
  logout: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setuser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged((u) => {
      setuser(u);
      setLoading(false);
    });

    return () => cancelAuthListener();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, logout: () => firebase.auth().signOut() }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
