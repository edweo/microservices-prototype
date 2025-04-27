import {ReactElement, useState} from "react";
import LoginForm from "./components/LoginForm.tsx";
import RegisterForm from "./components/RegisterForm.tsx";
import {Switch} from "@mui/material";
import {useDarkModeStore} from "../../stores/DarkModeStore.ts";

interface Props {

}

function LoginPage({}: Props) {
  const [isLogin, setIsLogin] = useState(true)
  const toggleDarkMode = useDarkModeStore(state => state.toggleDarkMode)
  const isDarkMode = useDarkModeStore(state => state.isDarkMode)

  let form: ReactElement
  if (isLogin) form = <LoginForm showRegisterForm={() => setIsLogin(false)} />
  else form = <RegisterForm showLoginForm={() => setIsLogin(true)} />

  return (
      <div className="flex flex-col h-screen w-full bg-primary">
        <div className="bg-secondary w-full h-12 flex justify-between items-center px-2 py-0.5">
          <h1 className="text-2xl ml-2 text-onSecondary">Webber</h1>
          <div className="flex">
            <Switch checked={isDarkMode} onChange={toggleDarkMode} />
          </div>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="w-11/12 sm:w-[400px] flex">
            {form}
          </div>
        </div>
      </div>
  );
}

export default LoginPage;