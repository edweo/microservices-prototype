import {useEffect} from "react";
import AppWrapper from "../../AppWrapper.tsx";
import {Outlet} from "react-router";

function FlashcardsApp() {

  useEffect(() => {
    console.log('Initiated flashcards app!')

    return () => {
      console.log('Unmounting FlashCArdsApp')
    }
  }, [])

  return(
      <AppWrapper>
        <Outlet />
      </AppWrapper>
  )
}

export default FlashcardsApp