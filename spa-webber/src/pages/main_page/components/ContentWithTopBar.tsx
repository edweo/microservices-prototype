import {ReactElement} from "react";

interface Props {
  title: string,
  children: React.ReactNode,
  styleChildrenContainer?: string,
  rightContent?: ReactElement,
}

function ContentWithTopBar({title, children, styleChildrenContainer, rightContent}: Props) {
  return (
      <>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl text-onPrimary bold select-none">
              {title}
            </h1>
            {(rightContent !== null) &&
              <>
                {rightContent}
              </>
            }
          </div>
        </div>

        <div className="w-full bg-onSecondary h-0.5 mt-4"></div>

        <div className={`rounded mt-4 ${styleChildrenContainer}`}>
          {children}
        </div>
      </>
  )
}

export default ContentWithTopBar;