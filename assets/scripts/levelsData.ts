type Road = {
    spriteId: number,
    pos: number,
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
                pos: 5,
                angle: -90
            },
            {
                spriteId: 1,
                pos: 6,
                angle: 0
            },
            {
                spriteId: 1,
                pos: 9,
                angle: 180
            },
            {
                spriteId: 1,
                pos: 10,
                angle: 90
            },
        ]
    },
    {
        roads: [
            {
                spriteId: 1,
                pos: 5,
                angle: 0
            },
            {
                spriteId: 1,
                pos: 6,
                angle: 180
            },
            {
                spriteId: 1,
                pos: 9,
                angle: 180
            },
            {
                spriteId: 0,
                pos: 10,
                angle: 90
            },
            {
                spriteId: 0,
                pos: 14,
                angle: 90
            },
        ]
    },
]

export default levels