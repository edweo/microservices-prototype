import {SvgIconComponent} from "@mui/icons-material";
import {LazyExoticComponent, ReactElement} from "react";
import SvgElementMui from "../components/SvgElementMui.tsx";
import LazyComponent from "../components/LazyComponent.tsx";
import SvgElementAsset from "../components/SvgElementAsset.tsx";

export function convertMuiIcon(svg: SvgIconComponent): () => ReactElement {
  return () => SvgElementMui(svg)
}

export function convertSvgAsset(svg: string, alt: string, className?: string): () => ReactElement {
  return () => SvgElementAsset({icon: svg, alt: alt, className: className})
}

export function lazyApp(lazyComp:  LazyExoticComponent<() => JSX.Element>): () => ReactElement {
  return () => LazyComponent({component: lazyComp})
}