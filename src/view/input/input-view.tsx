import * as React from "react"
import { prototype } from "events"
import "./input-view.css"

export interface InputViewProps {
    className?: string
    label: string
    value: string
    onChange(this: void, value: string): void
}

export default function InputView(props: InputViewProps) {
    const handlechange = (evt: React.FormEvent<HTMLInputElement>) => {
        props.onChange((evt.target as HTMLInputElement).value)
    }
    return (
        <div className={getClassNames(props)}>
            <label>{props.label}</label>
            <input value={props.value} onChange={handlechange} />
        </div>
    )
}

function getClassNames(props: InputViewProps): string {
    const classNames = ["custom", "view-InputView"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }

    return classNames.join(" ")
}
