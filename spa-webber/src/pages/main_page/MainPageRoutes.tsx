import {AppInfo, appsInfo, ChildRouteInfo} from "./Apps.ts";
import {ReactElement} from "react";
import {Navigate, Route, Routes} from "react-router";
import {RoutePaths} from "./RoutePaths.ts";
import ProfilePage from "./apps/ProfilePage.tsx";
import SettingsPage from "./apps/SettingsPage.tsx";

export default function MainPageRoutes() {
  return(
      <Routes>
        <Route path="/*" element={<Navigate to="/" replace />} />
        {_initRoutes(appsInfo)}

        <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
        <Route path={RoutePaths.SETTINGS} element={<SettingsPage />} />
      </Routes>
  )
}

function _initRoutes(appsInfo: AppInfo[]): ReactElement[] {
  return appsInfo.map(((item, index) => {
    return (
        // TODO NOTES APP config with route and associated component - if only 1 route, there are no sub-routes/child-routes
        // TODO add <AppWrapper/> with OUTLET in ELEMENT if component has child routes
        <Route path={item.path} key={index} element={item.component()}>
          {/* TODO add child routes if present */}
          {_initChildRoutes(item.path, item.childRoutes)}
        </Route>
    )
  }))
}

function _initChildRoutes(parentPath: string, routes?: () => ChildRouteInfo[]): ReactElement[] {
  if (routes === null || routes === undefined) return []
  if (routes().length < 1) return []

  return routes().map((child, index) => {
    return (
        <Route path={parentPath+child.path} key={index} element={child.component()} />
    )
  })
}