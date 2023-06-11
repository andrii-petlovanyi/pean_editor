import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setAuthenticated } from "../redux/slice/user.slice";

interface UseLocalStorageReturn {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  isExpired: boolean;
  setIsExpired: Dispatch<SetStateAction<boolean>>;
}

export function useLocalStorage(key: string): UseLocalStorageReturn {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(localStorage.getItem(key));
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem(key, token);
      dispatch(setAccessToken(token));
      dispatch(setAuthenticated(true));
    } else {
      localStorage.removeItem(key);
      dispatch(setAccessToken(null));
      dispatch(setAuthenticated(false));
    }
  }, [key, token, dispatch]);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(key);

    if (storedAccessToken) {
      if (isExpired) {
        localStorage.removeItem(key);
        dispatch(setAccessToken(null));
        dispatch(setAuthenticated(false));
      } else {
        // TODO: at this place can add refresh token logic
      }
    }
  }, [key, isExpired, dispatch]);

  return { token, setToken, isExpired, setIsExpired };
}
