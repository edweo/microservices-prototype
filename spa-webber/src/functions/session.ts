import {serverUrl} from "../global_variables.ts";

export async function isUserLoggedIn(): Promise<string| null> {
  try {
    const url: string = `${serverUrl}/auth/login`
    const res = await fetch(url, {
      credentials: "include"
    })
    if (res.status == 200) return await res.text()
    else return null
  } catch (e) {
    return null
  }
}