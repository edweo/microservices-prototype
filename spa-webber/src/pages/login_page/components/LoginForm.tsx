import WebberInputField from "../../../components/WebberInputField.tsx";
import WebberButton from "../../../components/WebberButton.tsx";
import {useUserStore} from "../../../stores/UserStore.ts";
import {useState} from "react";
import {serverUrl} from '../../../global_variables.ts'

interface Props {
  showRegisterForm: () => void,
}

function LoginForm({showRegisterForm}: Props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const setUser = useUserStore(state => state.setUser)

  async function login() {
    if (username.length < 3) return
    if (password.length < 3) return

    let success = false
    try {
      success = await httpLogin(username, password)
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message)
    }

    if (success) {
      setUser(username)
    } else {
      setPassword("")
    }
  }

  async function httpLogin(username: string, password: string): Promise<boolean> {
    setIsFetching(true)
    const url: string = `${serverUrl}/auth/login`
    const body = {
      "username": username,
      "password": password
    }

    let response: Response
    try {
      response = await fetch(url, {
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(body)
      })
      if (response.status === 200) return true
      else throw new Error(await response.text())
    } catch (e: unknown) {
      setIsFetching(false)
      throw e
    }
  }

  return (
      <div className="flex flex-col p-4 bg-secondary rounded w-full">
        <h1 className="text-2xl mb-4 text-onSecondary">Login</h1>

        {error !== null &&
          <h1 className="text-red-400 text-center bg-red-100 rounded">{error}</h1>
        }
        <WebberInputField value={username}
                          setValue={(name: string) => setUsername(name)}
                          preventEvents={true}
                          label="Username"
        />
        <WebberInputField value={password}
                          setValue={(password: string) => setPassword(password)}
                          preventEvents={true}
                          label="Password"
                          className="mt-4"
                          type="password"
        />
        <WebberButton text="Login"
                      disabled={isFetching}
                      onClick={login}
                      styleContainer="bg-primary mt-4"
                      styleText="text-onSecondary"
        />
        <div className="flex mt-4 flex-col justify-between">
          <h3 className="text-onSecondary cursor-pointer" onClick={showRegisterForm}>
            Need an account?
          </h3>
        </div>
      </div>
  )
}

export default LoginForm;