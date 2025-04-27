import NoteSearchBar from "./NoteSearchBar.tsx";
import WebberButton from "../../../../../components/WebberButton.tsx";
import AddIcon from "@mui/icons-material/Add";
import {NoteInfo} from "../NotesApp.tsx";
import {useMobileModeStore} from "../../../../../stores/MobileModeStore.ts";

interface Props {
  notes: NoteInfo[],
  searchResult: NoteInfo[] | null,
  pingRefresh: boolean,
  setSearchResult: (notes: NoteInfo[] | null) => void,
  setDialogCreateOpen: (enable: boolean) => void,
  isLoadingNotes: boolean,
}

export default function TopBar({notes, searchResult, pingRefresh, setSearchResult, setDialogCreateOpen, isLoadingNotes}: Props) {
  const isMobileMode = useMobileModeStore(state => state.isMobileMode)
  const searchBar = <NoteSearchBar notes={notes} setSearchResult={(notes) => setSearchResult(notes)} pingRefresh={pingRefresh}/>

  return(
      <>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl text-onPrimary bold select-none">
              {!isLoadingNotes &&
                <>
                  {((searchResult !== null) ? searchResult.length : notes.length)} Notes
                </>
              }
              {isLoadingNotes && "Loading..."}
            </h1>
            <div className="flex gap-2">
              {!isMobileMode && searchBar}
              <WebberButton text="NEW"
                            icon={() => <AddIcon className="text-onThird"/>}
                            onClick={() => setDialogCreateOpen(true)}
                            styleContainer="bg-primary"
                            styleText="text-onThird"
              />
            </div>
          </div>
          {isMobileMode && searchBar}
        </div>
        <div className="w-full bg-onSecondary h-0.5 mt-4"></div>
      </>
  )
}