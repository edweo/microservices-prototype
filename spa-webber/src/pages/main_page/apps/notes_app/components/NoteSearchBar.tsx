import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {NoteInfo} from "../NotesApp.tsx";
import {useEffect, useState} from "react";

interface Props {
  notes: NoteInfo[],
  setSearchResult: (notes: NoteInfo[] | null) => void,
  setSearchQuery?: (query: string) => void,
  pingRefresh?: boolean,
}

export default function NoteSearchBar({notes, setSearchQuery, setSearchResult, pingRefresh}: Props) {
  const [_searchQuery, _setSearchQuery] = useState<string>("")

  // TODO refactor setteers and so on!
  useEffect(() => {
    if (_searchQuery.length === 0) return
    handleSearch(_searchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes, pingRefresh]);

  function handleSearch(query: string) {
    if (inputEmpty(query)) return
    const lowerQuery = query.toLowerCase()
    setSearchResult(_search(lowerQuery, notes))
    updateSearchQuery(lowerQuery)
  }

  function resetSearch() {
    setSearchResult(null)
    updateSearchQuery("")
  }

  function inputEmpty(query: string): boolean {
    if (query.length === 0) {
      setSearchResult(null)
      updateSearchQuery("")
      return true
    }
    return false
  }

  function updateSearchQuery(query: string) {
    _setSearchQuery(query)
    if (setSearchQuery) setSearchQuery(query)
  }

  return (
      <div className="bg-primary flex justify-center items-center p-2 gap-2 rounded relative w-full">
        <SearchIcon className="text-onThird" fontSize={'small'}/>
        <input className="rounded px-2 bold w-full bg-third text-onSecondary placeholder:text-onSecondary/50 focus:outline-none"
               type="text"
               value={_searchQuery}
               placeholder="Search"
               onChange={(e) => handleSearch(e.target.value)}
        />

        {(_searchQuery !== "") &&
            <div className="absolute flex justify-center items-center inset-y-0 right-0 mr-3">
                <ClearIcon fontSize={'small'}
                           className="cursor-pointer"
                           onClick={resetSearch}
                />
            </div>
        }
      </div>
    )
  }

function _filterNote(lowerQuery: string, note: NoteInfo): boolean {
  if (note.description.toLowerCase().includes(lowerQuery)
      || note.title.toLowerCase().includes(lowerQuery)
  ) return true
  return false
}

function _search(lowerQuery: string, notes: NoteInfo[]): NoteInfo[] {
  return notes.filter(note => {
    if (_filterNote(lowerQuery, note)) return note
  })
}