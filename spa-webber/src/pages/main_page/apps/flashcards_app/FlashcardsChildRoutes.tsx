import GroupsPage from "./pages/GroupsPage.tsx";
import {ChildRouteInfo} from "../../Apps.ts";
import FlashcardsPage from "./pages/FlashcardsPage.tsx";

function getFlashcardChildRoutes(): ChildRouteInfo[] {
  return [
    {path: "/", component: () => <GroupsPage />},
    {path: "/groups/:group_name", component: () => <FlashcardsPage />}
  ]
}

export default getFlashcardChildRoutes;