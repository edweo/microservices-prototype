import AppWrapper from "../AppWrapper.tsx";
import ContentWithTopBar from "../components/ContentWithTopBar.tsx";
import {useDarkModeStore} from "../../../stores/DarkModeStore.ts";
import WebberSwitch from "../../../components/WebberSwitch.tsx";

function SettingsPage() {
  const toggleDarkMode = useDarkModeStore(state => state.toggleDarkMode)
  const isDarkMode = useDarkModeStore(state => state.isDarkMode)

  return(
      <AppWrapper>
        <ContentWithTopBar title="Settings"
                           styleChildrenContainer=""
        >
          <div className="flex flex-col gap-2 justify-center items-start">
            <WebberSwitch title="Dark Mode" checked={isDarkMode} onChange={toggleDarkMode} />
          </div>
        </ContentWithTopBar>
      </AppWrapper>
  )
}

export default SettingsPage