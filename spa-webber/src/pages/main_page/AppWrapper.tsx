import * as React from "react";

interface Props {
  children: React.ReactNode;
}

function AppWrapper({children}: Props) {
  return (
      <div className="flex h-full w-full flex-col p-4">
        {children}
      </div>
  );
}

export default AppWrapper;