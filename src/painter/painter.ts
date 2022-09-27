const MARGIN = 40
const POINT_RADIUS = 16

interface Point {
    x: number
    y: number
    index: number
}

export default class Painter {
    private points: Point[] = []
    private _canvas: HTMLCanvasElement = document.createElement("canvas")
    private image: HTMLImageElement | null = null

    get canvas() {
        return this._canvas
    }
    set canvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas
        this.paint()
    }

    removeLastAnnotation() {
        this.points.pop()
        this.paint()
    }

    /**
     * Paste image from clipboard.
     */
    async paste() {
        try {
            await askForPermission()
            const data = await navigator.clipboard.read()
            for (const item of data) {
                if (!item.types.includes("image/png")) continue

                const blob = await item.getType("image/png")
                const url = URL.createObjectURL(blob)
                this.image = await loadImage(url)
                URL.revokeObjectURL(url)
                this.points = []
                this.paint()
            }
        } catch (ex) {
            console.error(ex)
        }
    }

    /**
     * Add annotation point on (x,y).
     * @param x Percentage of the image width (between 0 and 1).
     * @param y Percentage of the image height (between 0 and 1).
     */
    addPoint(x: number, y: number) {
        const { canvas } = this
        const realX = x * canvas.width
        if (realX < MARGIN || realX > canvas.width - MARGIN) return

        const realY = y * canvas.height
        if (realY < MARGIN || realY > canvas.height - MARGIN) return

        this.points.push({ x: realX, y: realY, index: this.points.length + 1 })
        this.paint()
    }

    private paint() {
        const { canvas, image } = this
        if (!canvas || !image) return

        canvas.width = image.width + 2 * MARGIN
        canvas.height = image.height + 2 * MARGIN
        canvas.style.width = `${canvas.width}px`
        canvas.style.height = `${canvas.height}px`
        canvas.style.transform = `scale(${getScale(canvas)})`
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, MARGIN, MARGIN)

        const slots: {
            left: Point[]
            top: Point[]
            right: Point[]
            bottom: Point[]
        } = {
            left: [],
            top: [],
            right: [],
            bottom: [],
        }
        this.points.forEach((point, index) => {
            const { x, y } = point
            const left = x
            const top = y
            const right = canvas.width - x
            const bottom = canvas.height - y
            const sides = [
                [left, slots.left],
                [top, slots.top],
                [right, slots.right],
                [bottom, slots.bottom],
            ] as Array<[number, Point[]]>
            sides.sort(([dis1], [dis2]) => dis1 - dis2)
            const [nearest] = sides
            const [_, slot] = nearest
            slot.push(point)
        })
        slots.left.sort((p1, p2) => p1.y - p2.y)
        slots.left.forEach((point, index, array) => {
            const x = POINT_RADIUS
            const y =
                MARGIN +
                ((canvas.height - 2 * MARGIN) * (index + 1)) /
                    (array.length + 1)
            this.paintAnnotation(ctx, x, y, point)
        })
        slots.right.sort((p1, p2) => p1.y - p2.y)
        slots.right.forEach((point, index, array) => {
            const x = canvas.width - POINT_RADIUS
            const y =
                MARGIN +
                ((canvas.height - 2 * MARGIN) * (index + 1)) /
                    (array.length + 1)
            this.paintAnnotation(ctx, x, y, point)
        })
        slots.top.sort((p1, p2) => p1.x - p2.x)
        slots.top.forEach((point, index, array) => {
            const x =
                MARGIN +
                ((canvas.width - 2 * MARGIN) * (index + 1)) / (array.length + 1)
            const y = POINT_RADIUS
            this.paintAnnotation(ctx, x, y, point)
        })
        slots.bottom.sort((p1, p2) => p1.x - p2.x)
        slots.bottom.forEach((point, index, array) => {
            const x =
                MARGIN +
                ((canvas.width - 2 * MARGIN) * (index + 1)) / (array.length + 1)
            const y = canvas.height - POINT_RADIUS
            this.paintAnnotation(ctx, x, y, point)
        })
    }

    private paintAnnotation(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        point: Point
    ) {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(point.x, point.y)
        ctx.lineWidth = 5
        ctx.strokeStyle = "#fff4"
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x - POINT_RADIUS, y)
        ctx.rect(
            x - POINT_RADIUS,
            y - POINT_RADIUS,
            POINT_RADIUS * 2,
            POINT_RADIUS * 2
        )
        ctx.fillStyle = "#fff4"
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(point.x, point.y)
        ctx.lineWidth = 2
        ctx.strokeStyle = "#000"
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x - POINT_RADIUS, y)
        ctx.rect(
            x - POINT_RADIUS + 2,
            y - POINT_RADIUS + 2,
            POINT_RADIUS * 2 - 4,
            POINT_RADIUS * 2 - 4
        )
        ctx.fillStyle = "#000"
        ctx.fill()
        const fontSize = POINT_RADIUS * 1.2
        ctx.font = `bold ${fontSize}px sans-serif`
        ctx.fillStyle = "#fff"
        const txt = `${point.index}`
        ctx.fillText(txt, x - ctx.measureText(txt).width / 2, y + fontSize / 2)
        ctx.restore()
    }
}

async function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve(img)
        img.onerror = reject
    })
}

async function askForPermission() {
    try {
        const permission = await navigator.permissions.query({
            name: "clipboard-read" as PermissionName,
        })
        if (permission.state === "denied") {
            throw new Error("Not allowed to read clipboard.")
        }
    } catch (ex) {
        // Can fail in firefox...
        console.error(ex)
    }
}

function getScale(canvas: HTMLCanvasElement): number {
    const parent = canvas.parentElement
    if (!parent) return 1

    const w = parent.clientWidth - MARGIN
    const h = parent.clientHeight - MARGIN
    const scaleW = w / canvas.width
    const scaleH = h / canvas.height
    const scale = Math.min(scaleW, scaleH)
    return scale
}
