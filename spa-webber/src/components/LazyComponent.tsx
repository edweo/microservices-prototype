import {createElement, LazyExoticComponent, Suspense} from "react";

interface Props {
  component: LazyExoticComponent<() => JSX.Element>
}

// TODO add error fallback and CSS styling

export default function LazyComponent({component}: Props) {
  return(
      <Suspense fallback={<div>Loading lazy comp</div>}>
        {createElement(component)}
      </Suspense>
  )
}