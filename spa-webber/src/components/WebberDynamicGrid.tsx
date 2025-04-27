interface Props {
  children: React.ReactNode
  className?: string
}

function WebberDynamicGrid({children, className}: Props) {
  return (
      <div className={className}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {children}
        </div>
      </div>
  );
}

export default WebberDynamicGrid;