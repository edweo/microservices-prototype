import Header from "./components/Header.tsx";
import {BrowserRouter} from "react-router";
import MainPageRoutes from "./MainPageRoutes.tsx";

export default function MainPage() {
  return (
      <div className="flex flex-col md:flex-row h-screen w-full">
        <BrowserRouter>
          <Header />
          <div className="flex flex-1 mt-[--header-height] sm:mt-0">
            <div className="flex w-full bg-secondary h-[--main-page-height] md:h-full">
              <MainPageRoutes />
            </div>
          </div>
        </BrowserRouter>
      </div>
  )
}

