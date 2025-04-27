import AppWrapper from "../AppWrapper.tsx";
import ContentWithTopBar from "../components/ContentWithTopBar.tsx";
import {useUserStore} from "../../../stores/UserStore.ts";

function ProfilePage() {
  const user: string | null = useUserStore(state => state.user)
  return(
      <AppWrapper>
        <ContentWithTopBar title={user!}>
          <div>
            Hello profile
          </div>
        </ContentWithTopBar>
      </AppWrapper>
  )
}

export default ProfilePage