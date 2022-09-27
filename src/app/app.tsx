import * as React from "react"
import Input from "../view/input"
import Painter from "../painter"
import { saveCanvas } from "../tool/file-saver"
import "./app.css"

export interface AppProps {
    className?: string
}

const PAINTER = new Painter()

export default function App(props: AppProps) {
    const refPainter = React.useRef(PAINTER)
    const [filename, setFilename] = React.useState("snapshot")
    const handlePaste = () => refPainter.current.paste()
    const initCanvas = (canvas: HTMLCanvasElement | null) => {
        if (canvas) refPainter.current.canvas = canvas
    }
    const handleDoubleClick = (evt: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = evt.target as HTMLElement
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = (evt.clientX - rect.left) / rect.width
        const y = (evt.clientY - rect.top) / rect.height
        refPainter.current.addPoint(x, y)
    }
    const handleSave = async () => {
        await saveCanvas(refPainter.current.canvas, `${filename}.webp`)
        await saveCanvas(refPainter.current.canvas, `${filename}.png`)
    }
    const handleRemoveLast = () => {
        refPainter.current.removeLastAnnotation()
    }
    return (
        <div className={getClassNames(props)}>
            <div className="body">
                <canvas
                    className="preview"
                    ref={initCanvas}
                    onDoubleClick={handleDoubleClick}
                ></canvas>
            </div>
            <menu>
                <button onClick={handlePaste}>Paste from clipboard</button>
                <hr />
                <div className="filename">
                    <Input
                        value={filename}
                        onChange={setFilename}
                        label="Filename"
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
                <hr />
                <button onClick={handleRemoveLast}>
                    Remove last annotation
                </button>
            </menu>
        </div>
    )
}

function getClassNames(props: AppProps): string {
    const classNames = ["custom", "App"]
    if (typeof props.className === "string") {
        classNames.push(props.className)
    }

    return classNames.join(" ")
}
