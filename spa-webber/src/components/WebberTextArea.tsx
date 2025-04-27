import {ChangeEvent} from "react";

interface Props {
  value: string,
  setValue: (value: string) => void,
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  label?: string,
  placeholder?: string,
  preventEvents?: boolean,
  className?: string,
  rows?: number,
}

export default function WebberTextArea({value, setValue, onChange, placeholder, preventEvents, label, className, rows}: Props) {
  return (
      <div className={"flex flex-col w-full " + className}>
        {label !== null &&
            <label className="text-onPrimary ">{label}</label>
        }
        <textarea
            className="rounded p-2 bold w-full h-full border-third border-2 bg-secondary text-onSecondary placeholder:text-onSecondary/50 focus:outline-none"
            value={value}

            rows={rows ?? 1}
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
