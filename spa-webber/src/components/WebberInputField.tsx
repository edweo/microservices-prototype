import {ChangeEvent} from "react";

interface Props {
  value: string,
  setValue: (value: string) => void,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  label?: string,
  placeholder?: string,
  preventEvents?: boolean,
  className?: string,
  type?: string,
}

export default function WebberInputField({value, setValue, onChange, placeholder, preventEvents, label, className, type}: Props) {
  return (
      <div className={"flex flex-col w-full " + className}>
        {label !== null &&
          <label className="text-onPrimary ">{label}</label>
        }
        <input
            className="rounded p-2 bold w-full h-full bg-secondary border-2 border-third text-onSecondary placeholder:text-onSecondary/50 focus:outline-none"
            type={type ?? "text"}
            value={value}
            placeholder={placeholder ?? ""}
            onChange={(e) => {
              if (preventEvents) {
                e.stopPropagation()
                e.preventDefault()
              }
              setValue(e.target.value)
              if (onChange) onChange(e)
            }}
        />
      </div>
  )
}
