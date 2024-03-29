"use client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { decodeToken } from "react-jwt";
import { API } from "../Services/client";
import Router from "next/router";
interface IUser {
  id: string;
  username: string;
  type: boolean;
}
interface IAuthData {
  user: IUser;
  acessToken: string;
  refreshToken: string;
}
interface IAuthParams {
  email: string;
  password: string;
}
interface IAuthContext {
  signIn: ({ email, password }: IAuthParams) => Promise<void>;
  signOut: () => void;
  authData: IAuthData | null | undefined;
}
interface IAuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({
  children,
}: IAuthContextProviderProps) => {
  const [authData, setAuthData] = useState<IAuthData | null | undefined>(
    undefined
  );
  const navigate = useRouter();

  const _saveInStorage = (data: IAuthData) => {
    const authDataformattedInString = JSON.stringify(data);

    localStorage.setItem("@user", authDataformattedInString);
  };
  const _removeInStorage = () => {
    localStorage.removeItem("@user");
  };
  const _decodedToken = (token: string) => {
    const decodedData = decodeToken(token);

    return decodedData;
  };
  const _readInStorage = useCallback(() => {
    const authData = localStorage.getItem("@user");

    if (authData) {
      const authDataformattedInJson = JSON.parse(authData) as IAuthData;

      setAuthData(authDataformattedInJson);
    } else {
      setAuthData(null);
    }
  }, []);

  const signIn = useCallback(async ({ email, password }: IAuthParams) => {
    try {
      const response = await API.post("/auth/signin", {
        username: email,
        password,
      });
      const data = response.data;

      if (data.signin) {
        const acessToken = data.acetoken;
        const refreshToken = data.reftoken;

        const decodeDataAcess = _decodedToken(acessToken) as IUser;
        const decodeDataRefress = _decodedToken(refreshToken) as IUser;

        const authDataFormatter: IAuthData = {
          refreshToken: refreshToken,
          acessToken: acessToken,
          user: decodeDataAcess,
        };

        _saveInStorage(authDataFormatter);
        setAuthData(authDataFormatter);
        navigate.push(`/Settings`);
        Router.reload();
      } else {
        setAuthData(null);
      }
    } catch (err) {
      setAuthData(null);
      console.log(err);
    }
  }, []);

  const signOut = useCallback(() => {
    setAuthData(null);
    _removeInStorage();
    navigate.push("/");
  }, [navigate]);

  useEffect(() => {
    _readInStorage();
  }, [_readInStorage]);

  const value = useMemo(
    () => ({ signIn, signOut, authData }),
    [signIn, signOut, authData]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
