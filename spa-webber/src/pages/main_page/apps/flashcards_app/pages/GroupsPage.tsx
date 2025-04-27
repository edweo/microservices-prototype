import ContentWithTopBar from "../../../components/ContentWithTopBar.tsx";
import WebberDynamicGrid from "../../../../../components/WebberDynamicGrid.tsx";
import GroupCard from "../components/GroupCard.tsx";
import {useFlashcardsAppStore} from "../stores/FlashcardsAppStore.ts";
import FlashcardGroupData from "../models/FlashcardGroupData.ts";
import fetchGetFlashcardGroups from "../http/fetchGetFlashcardGroups.ts";
import {useFetching} from "../../../../../hooks/useFetching.ts";
import {ReactElement} from "react";
import GroupCardSkeleton from "../components/GroupCardSkeleton.tsx";
import WebberButton from "../../../../../components/WebberButton.tsx";
import {NavigateFunction, useNavigate} from "react-router";

function GroupsPage() {
  const flashcardGroups: FlashcardGroupData[] = useFlashcardsAppStore(state => state.flashcardGroups)
  const setFlashcardGroups = useFlashcardsAppStore(state => state.setFlashcardsGroups)
  const [isLoading, error, data, refreshFetch] = useFetching<FlashcardGroupData[]>(
      fetchGetFlashcardGroups,
      (data) => setFlashcardGroups(data)
  )
  const navigate = useNavigate()

  return (
      <ContentWithTopBar title="Flashcards" styleChildrenContainer="overflow-scroll h-full">
        {(error === null) &&
          <WebberDynamicGrid>
            {!isLoading && _displayGroups(flashcardGroups, navigate)}
            {isLoading && _displayGroupSkeletons(9)}
          </WebberDynamicGrid>
        }
        {(error !== null) &&
          <div className="flex flex-1 flex-col h-full w-full justify-center items-center">
              {/*TODO create global error component message with retry fetch */}
              <h1>{error}</h1>
              <WebberButton text={"Try again"} onClick={refreshFetch} />
          </div>
        }
      </ContentWithTopBar>
  );
}

export default GroupsPage;

function _displayGroups(groups: FlashcardGroupData[], navigate: NavigateFunction): ReactElement[] {
  return groups.map((g, index) => {
    return <GroupCard key={index}
                      name={g.group_name}
                      count={g.count}
                      onClick={() => {
                        navigate(`/flashcards/groups/${g.group_name}`)
                      }} />
  })
}

function _displayGroupSkeletons(count: number): ReactElement[] {
  const skeletons: ReactElement[] = []
  for (let i = 0; i < count; i++) {
    skeletons[i] = <GroupCardSkeleton key={i} />
  }
  return skeletons
}