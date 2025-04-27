import {createElement} from "react";

interface Props {
  icon: string,
  alt: string,
  className?: string,
}



export default function SvgElementAsset({icon, alt, className}: Props) {
  return(
      <>
        {createElement(icon, {className: {className}, alt: {alt}})}
      </>
  )
}