import {Switch, switchClasses} from '@mui/base/Switch';
import { styled } from '@mui/system';


interface Props {
  title: string,
  checked: boolean,
  onChange: () => void,
  style?: string,
}

function WebberSwitch({title, checked, onChange, style}: Props) {
  return (
      <div className={`bg-third flex justify-between rounded px-3 py-1 items-center w-full ${style}`}>
        <h1 className="text-onThird">{title}</h1>
        <Switch slots={{root: Root,}} onChange={onChange} checked={checked} />
      </div>
  );
}

export default WebberSwitch;

const Root = styled('span')(() => `
  box-sizing: border-box;
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  margin: 10px;
  cursor: pointer;

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchClasses.track} {
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 24px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  }

  &:hover .${switchClasses.track} {
    
  }

  &.${switchClasses.focusVisible} .${switchClasses.track} {
  }

  & .${switchClasses.thumb} {
    background-color: var(--color-primary);
    box-sizing: border-box;
    display: block;
    width: 16px;
    height: 16px;
    top: 4px;
    left: 4px;
    border-radius: 16px;
    position: relative;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  }

  &.${switchClasses.checked} {
    .${switchClasses.thumb} {
      left: 24px;
      background-color: #FFFFFF;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.3);
    }

    .${switchClasses.track} {
      border: none;
      background: var(--color-primary);
    }
  }

  &:hover .${switchClasses.checked} .${switchClasses.track} {
    background: var(--color-primary);
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
);