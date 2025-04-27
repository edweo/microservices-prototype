import {useEffect} from "react";
import {isUserLoggedIn} from "../functions/session.ts";
import {useUserStore} from "../stores/UserStore.ts";

export function useInitSession(cb?: () => void) {
  const setUser = useUserStore.getState().setUser
  useEffect(() => {
    isUserLoggedIn()
        .then(user => {
          if (cb) cb()
          setUser(user)
        })
        .catch(() => {
          // TODO maybe service is down even though cookie is available - needs fix
          if (cb) cb()
          setUser(null)
        })
  }, [])
 }

