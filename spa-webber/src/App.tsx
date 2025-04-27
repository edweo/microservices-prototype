import {useInitDarkMode} from "./hooks/useInitDarkMode.ts";
import MainPage from "./pages/main_page/MainPage.tsx";
import {useInitMobileMode} from "./hooks/useInitMobileMode.ts";
import {useUserStore} from "./stores/UserStore.ts";
import {ReactElement, useState} from "react";
import LoginPage from "./pages/login_page/LoginPage.tsx";
import {useInitSession} from "./hooks/useInitSession.ts";

function App() {
  const user: string | null = useUserStore(state => state.user)
  const [checkingSession, setCheckingSession] = useState(true)

  useInitDarkMode()
  useInitMobileMode()
  useInitSession(() => setCheckingSession(false))

  let page: ReactElement
  if (checkingSession) {
    page = <div>CHECKING SESSION</div>
  } else if (user !== null) {
    page = <MainPage />
  } else {
    page = <LoginPage />
  }

  return page
}

export default App
