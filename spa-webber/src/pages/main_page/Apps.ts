import {RoutePaths} from "./RoutePaths.ts";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from '@mui/icons-material/Dashboard';
import StyleIcon from '@mui/icons-material/Style';
import EditNoteIcon from '@mui/icons-material/EditNote';
// @ts-expect-error no error
import ChessSVG from '../../assets/chess.svg?react'
import {lazy, ReactElement} from "react";
import {convertMuiIcon, convertSvgAsset, lazyApp} from "../../functions/utils.ts";
import getFlashcardChildRoutes from "./apps/flashcards_app/FlashcardsChildRoutes.tsx";

const HomeAppLazy = lazy(() => import('./apps/HomeApp.tsx'))
const NotesAppLazy = lazy(() => import('./apps/notes_app/NotesApp.tsx'))
const FlashcardsAppLazy = lazy(() => import('./apps/flashcards_app/FlashcardsApp.tsx'))
const FileDriveAppLazy = lazy(() => import('./apps/FileDriveApp.tsx'))
const FileEditorAppLazy = lazy(() => import('./apps/FileEditorApp.tsx'))
const SpeedTypingAppLazy = lazy(() => import('./apps/SpeedTypingApp.tsx'))
const ChessAppLazy = lazy(() => import('./apps/ChessApp.tsx'))
const MusicAppLazy = lazy(() => import('./apps/MusicApp.tsx'))
const VideosAppLazy = lazy(() => import('./apps/VideosApp.tsx'))
const ChatAppLazy = lazy(() => import('./apps/ChatApp.tsx'))

export interface AppInfo {
  name: string,
  path: string,
  icon: () => ReactElement,
  component:  () => ReactElement,
  childRoutes?: () => ChildRouteInfo[]
}

export interface ChildRouteInfo {
  path: string,
  component: () => ReactElement
}

export const appsInfo: AppInfo[] = [
  // {name: "Overview", path: RoutePaths.HOME, icon: convertMuiIcon(DashboardIcon), component: lazyApp(HomeAppLazy)},
  {name: "Notes", path: RoutePaths.NOTES, icon: convertMuiIcon(EditNoteIcon), component: lazyApp(NotesAppLazy)},
  {name: "Flashcards",
    path: RoutePaths.FLASHCARDS,
    icon: convertMuiIcon(StyleIcon),
    component: lazyApp(FlashcardsAppLazy),
    childRoutes: getFlashcardChildRoutes
  },
  // {name: "File Drive", path: RoutePaths.FILE_DRIVE, icon: convertMuiIcon(FolderIcon), component: lazyApp(FileDriveAppLazy)},
  // {name: "File Editor", path: RoutePaths.FILE_EDITOR, icon: convertMuiIcon(InsertDriveFileIcon), component: lazyApp(FileEditorAppLazy)},
  // {name: "Speed Typing", path: RoutePaths.SPEED_TYPING, icon: convertMuiIcon(KeyboardIcon), component: lazyApp(SpeedTypingAppLazy)},
  // {name: "Chess", path: RoutePaths.CHESS, icon: convertSvgAsset(ChessSVG, 'Chess', "fill-red-400"), component: lazyApp(ChessAppLazy)},
  // {name: "Music", path: RoutePaths.MUSIC, icon: convertMuiIcon(MusicNoteIcon), component: lazyApp(MusicAppLazy)},
  // {name: "Videos", path: RoutePaths.VIDEOS, icon: convertMuiIcon(OndemandVideoIcon), component: lazyApp(VideosAppLazy)},
  // {name: "Chat", path: RoutePaths.CHAT, icon: convertMuiIcon(ChatIcon), component: lazyApp(ChatAppLazy)},
]
