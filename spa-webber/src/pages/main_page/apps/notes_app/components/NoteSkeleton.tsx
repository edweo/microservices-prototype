interface Props {

}

function NoteSkeleton({}: Props) {
  return (
      <div
          className="bg-colorOther2/50 animate-pulse flex flex-col h-[295px] cursor-pointer w-full p-4 rounded drop-shadow-md">
        <div className="bg-primary/50 animate-pulse rounded block h-6 w-full"></div>
        <div className="bg-primary/50 animate-pulse flex flex-1 mt-2 rounded"></div>
      </div>
  );
}

export default NoteSkeleton;