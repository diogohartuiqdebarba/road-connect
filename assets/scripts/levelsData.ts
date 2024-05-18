type Road = {
    spriteId: number,
    pos: number,
    angle: number,
    targetAngle: number,
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
                angle: 90,
                targetAngle: 0
            },
            {
                spriteId: 1,
                pos: 6,
                angle: 0,
                targetAngle: 90
            },
            {
                spriteId: 1,
                pos: 9,
                angle: 180,
                targetAngle: 270
            },
            {
                spriteId: 1,
                pos: 10,
                angle: 270,
                targetAngle: 180
            },
        ]
    },
    {
        roads: [
            {
                spriteId: 1,
                pos: 5,
                angle: 0,
                targetAngle: 0,
            },
            {
                spriteId: 1,
                pos: 6,
                angle: 180,
                targetAngle: 90,
            },
            {
                spriteId: 1,
                pos: 9,
                angle: 180,
                targetAngle: 270,
            },
            {
                spriteId: 0,
                pos: 10,
                angle: 90,
                targetAngle: 180,
            },
            {
                spriteId: 0,
                pos: 14,
                angle: 90,
                targetAngle: 180,
            },
        ]
    },
]

export default levels