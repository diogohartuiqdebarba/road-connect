type Road = {
    spriteId: number,
    pos: { x: number, y: number },
    angle: number
}

type Level = {
    roads: Road[],
}

const levels: Level[] = [
    {
        roads:  [
            {
                spriteId: 1,
                pos: { x: -64, y: 0 },
                angle: 180
            },
            {
                spriteId: 1,
                pos: { x: 64, y: 0 },
                angle: 90
            },
            {
                spriteId: 1,
                pos: { x: -64, y: 128 },
                angle: -90
            },
            {
                spriteId: 1,
                pos: { x: 64, y: 128 },
                angle: 0
            },
        ]
    },
    {
        roads: [
            {
                spriteId: 1,
                pos: { x: -64, y: 0 },
                angle: 180
            },
            {
                spriteId: 0,
                pos: { x: 64, y: 0 },
                angle: 90
            },
            {
                spriteId: 1,
                pos: { x: -64, y: 128 },
                angle: 0
            },
            {
                spriteId: 1,
                pos: { x: 64, y: 128 },
                angle: 180
            },
            {
                spriteId: 0,
                pos: { x: 64, y: -128 },
                angle: 90
            },
        ]
    },
]

export default levels