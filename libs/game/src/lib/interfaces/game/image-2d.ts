export interface GameImage2D {
    name: string,
    element: HTMLImageElement,
    maskedElement?: HTMLImageElement,
    maskColor?: {
        red: number,
        green: number,
        blue: number
    },
    width: number,
    height: number,
    handle: {
        x: number,
        y: number
    },
    rotation: number
}
