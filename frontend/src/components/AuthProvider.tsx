import { AuthContext } from "@/context/authContext";
import apiClient from "@/utils/apiClient";
import { AxiosError } from "axios";
import { useCallback, useMemo, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type LoginParams = {
  username: string;
  password: string;
};

export type SignupParams = {
  email: string;
  username: string;
  password: string;
};

export type User = {
  username: string;
  email: string;
  token: string;
  isAdmin: boolean;
  createdAt: string;
  lastUpdatedAt: string;
};

export type AuthProviderState = {
  user: User | null;
  isLoggedIn: boolean;
  login: (setError: (msg: string | null) => void, params: LoginParams) => void;
  logout: () => void;
  signup: (
    setError: (msg: string | null) => void,
    params: SignupParams,
  ) => void;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const getLoginErrorMessage = useCallback((status: number) => {
    switch (status) {
      case 401:
        return "Incorrect password";
      case 404:
        return "User not found";
      default:
        return "An error occurred, please try again later";
    }
  }, []);

  // TODO: duplicate username currently returns 400, change to 409
  const getSignupErrorMessage = useCallback((status: number) => {
    switch (status) {
      case 409:
        return "User already exists";
      default:
        return "An error occurred, please try again later";
    }
  }, []);

  const login = useCallback(
    async (
      setError: (msg: string | null) => void,
      { username, password }: LoginParams,
    ) => {
      try {
        setError(null);
        const response = await apiClient.post("/users/login", {
          username: username,
          password: password,
        });
        const fetchedUser = response.data as User;
        setUser(fetchedUser);
      } catch (e) {
        const error = e as AxiosError;
        const status = error.response?.status ?? 500;
        const errorMessage = getLoginErrorMessage(status);
        console.error(error);
        setError(errorMessage);
      }
    },
    [setUser, getLoginErrorMessage],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const signup = useCallback(
    async (
      setError: (msg: string | null) => void,
      { email, username, password }: SignupParams,
    ) => {
      try {
        setError(null);
        const response = await apiClient.post("/users/signup", {
          email,
          username,
          password,
        });
        const fetchedUser = response.data as User;
        setUser(fetchedUser);
      } catch (e) {
        const error = e as AxiosError;
        const status = error.response?.status ?? 500;
        const errorMessage = getSignupErrorMessage(status);
        console.error(error);
        setError(errorMessage);
      }
    },
    [setUser, getSignupErrorMessage],
  );

  const isLoggedIn = useMemo(() => !!user, [user]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
