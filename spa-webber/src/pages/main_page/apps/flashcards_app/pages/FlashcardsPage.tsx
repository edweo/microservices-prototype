import ContentWithTopBar from "../../../components/ContentWithTopBar.tsx";
import { useParams } from "react-router";
import {ReactElement, useEffect, useState} from "react";
import FlashcardData from "../models/FlashcardData.ts";
import FlashcardRow from "../components/FlashcardRow.tsx";
import {useFlashcardsAppStore} from "../stores/FlashcardsAppStore.ts";
import {useFetching} from "../../../../../hooks/useFetching.ts";
import fetchGetFlashcardsForGroup from "../http/fetchGetFlashcardsForGroup.ts";
import EditFlashcardDialog from "../dialogs/EditFlashcardDialog.tsx";
import WebberButton from "../../../../../components/WebberButton.tsx";
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import {SvgIcon} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateFlashcardDialog from "../dialogs/CreateFlashcardDialog.tsx";
import fetchWrapper from "../../../../../functions/fetchWrapper.ts";
import fetchDeleteFlashcard from "../http/fetchDeleteFlashcard.ts";

enum PageDialog {
  EDIT_FLASHCARD,
  CREATE_FLASHCARD
}

interface DialogInfo {
  isOpen: boolean,
  id: PageDialog
}

interface Params {
  group_name: string
}

function FlashcardsPage() {
  // @ts-expect-error no error
  const {group_name}: Params = useParams();
  const [dialog, setDialog] = useState<DialogInfo>({isOpen: false, id: PageDialog.EDIT_FLASHCARD})

  // App global state
  const flashcards = useFlashcardsAppStore(state => state.flashcardsCurrentGroup)
  const setFlashcards = useFlashcardsAppStore(s => s.setFlashcardsCurrentGroup)
  const setCurrentFlashcardGroup = useFlashcardsAppStore(s => s.setCurrentFlashcardGroup)
  const currentlySelectedFlashcard = useFlashcardsAppStore(s => s.currentlySelectedFlashCard)
  const setCurrentlySelectedFlashcard = useFlashcardsAppStore(s => s.setCurrentlySelectedFlashcard)

  // HTTP proxies
  const [isLoading, error, data, refresh] = useFetching(
      () => fetchGetFlashcardsForGroup(group_name),
      (data) => setFlashcards(data)
  )

  useEffect(() => {
    setCurrentFlashcardGroup(group_name)

    // Clean up before unmounting component
    return () => {
      setFlashcards([])
      setCurrentFlashcardGroup(null)
    }
  }, []);

  function deleteFlashcard(f: FlashcardData, group: string) {
    fetchWrapper<void>(
        () => fetchDeleteFlashcard(group, f),
        (data: void) => {
          const newFlashcards = flashcards.filter(card => card.id !== f.id)
          setFlashcards(newFlashcards)
        },
        (e: Error) => {
          console.log("Some error occurred DELETING card")
          console.log(e.message)
        }
    )
  }

  return (
      <>
        <ContentWithTopBar title={group_name}
                           styleChildrenContainer="overflow-scroll"
                           rightContent={_rightContent(isLoading, error,
                               flashcards.length,
                               () => setDialog({isOpen: true, id: PageDialog.CREATE_FLASHCARD}))}
        >
          {(error === null) &&
            <div className="flex justify-center items-center flex-col gap-2 w-full overflow-y-scroll">
              {!isLoading && _displayFlashcardRows(
                  flashcards,
                  (card) => {
                    setCurrentlySelectedFlashcard(card)
                    setDialog({isOpen: true, id: PageDialog.EDIT_FLASHCARD})
                  },
                  (f: FlashcardData) => deleteFlashcard(f, group_name)
                )
              }
              {/*TODO ADD SKELETON LOADING*/}
            </div>
          }
          {(error !== null) &&
              <div className="flex flex-1 flex-col h-full w-full justify-center items-center">
                {/*TODO create global error component message with retry fetch */}
                  <h1>{error}</h1>
                  <WebberButton text={"Try again"} onClick={refresh}/>
              </div>
          }
        </ContentWithTopBar>

        {dialog.isOpen &&
            <>
              {_handleDialog(dialog,
                  () => {setDialog({...dialog, isOpen: false})},
                  currentlySelectedFlashcard)
              }
            </>
        }
      </>
  );
}

export default FlashcardsPage;

function _handleDialog(dialog: DialogInfo,
                       onClose: () => void,
                       selectedFlashcard: FlashcardData|null): ReactElement {
  return (() => {
    switch (dialog.id) {
      case PageDialog.EDIT_FLASHCARD:
        if (selectedFlashcard === null) throw Error("Flashcard not selected when opening dialog")
        return <EditFlashcardDialog flashcard={selectedFlashcard} open={dialog.isOpen} onClose={onClose} />
      case PageDialog.CREATE_FLASHCARD:
        return <CreateFlashcardDialog open={dialog.isOpen} onClose={onClose} />
      default:
        return <div>Error in selecting dialog</div>
    }
  })()
}

function _displayFlashcardRows(flashcards: FlashcardData[],
                               onClick: (flashcard: FlashcardData) => void,
                               deleteFlashcard: (f: FlashcardData) => void
): ReactElement[] {
  return flashcards.map((f, index) => {
    return <FlashcardRow flashcard={f}
                         key={index}
                         onClick={() => onClick(f)}
                         onClickDelete={() => deleteFlashcard(f)}
    />
  })
}

function _rightContent(isLoading: boolean,
                       error: string|null,
                       count: number,
                       openCreateDialog: () => void,
): ReactElement {
  return (
      <>
        {(error === null && !isLoading) &&
          <div className="flex gap-2 justify-center items-center">
              <div className="rounded px-2 flex gap-1 justify-center items-center">
                  <h1 className="text-onSecondary text-lg">{count}</h1>
                  <SvgIcon component={CropLandscapeIcon} className="text-onSecondary" fontSize={"medium"} />
              </div>
                  {/*<WebberButton text={"ADD"} onClick={() => {}} />*/}
              <SvgIcon component={AddIcon}
                       className="bg-colorOther hover:bg-colorOther/70 rounded-full p-2 cursor-pointer "
                       fontSize={"large"}
                       onClick={openCreateDialog}
              />
          </div>
        }
      </>
  )
}