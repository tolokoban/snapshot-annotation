const NOT_FOUND = -1

/**
 * @returns The extension of a file name.
 * ```
 * getFileExtension("picture.jpg") === "jpg"
 * ```
 */
export function getFileExtension(filename: string) {
    const dotPosition = filename.lastIndexOf(".")
    if (dotPosition === NOT_FOUND) return filename
    return filename.substring(dotPosition + 1)
}

/**
 * @returns A filename without the path.
 * ```
 * getBasename("/home/picwick/cell.png") === "cell.png"
 * ```
 */
export function getBasename(path: string): string {
    const lastSlashPos = path.lastIndexOf("/")
    if (lastSlashPos === NOT_FOUND) return path
    return path.substring(lastSlashPos + 1)
}

/**
 * @returns A filename without its extension.
 * ```
 * removeExtension("foo.txt") === "foo"
 * ```
 */
export function removeExtension(filename: string): string {
    const lastSlashDot = filename.lastIndexOf(".")
    if (lastSlashDot === NOT_FOUND) return filename
    return filename.substring(0, lastSlashDot)
}
