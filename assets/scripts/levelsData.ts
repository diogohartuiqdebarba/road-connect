type SpriteId = 0 | 1 | 2 | 3 | 4 | 5 | 6
type Angle = 0 | 90 | 180 | 270
type Grid4x4Pos = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

type Road = {
    spriteId: SpriteId,
    pos: Grid4x4Pos,
    angle: Angle,
    targetAngles: Angle[],
}

type Level = {
    roads: Road[],
}

const FULL: Angle[] = [0, 90, 180, 270]

const level1: Level = {
    roads: [
        {
            spriteId: 1,
            pos: 5,
            angle: 90,
            targetAngles: [0]
        },
        {
            spriteId: 1,
            pos: 6,
            angle: 0,
            targetAngles: [90]
        },
        {
            spriteId: 1,
            pos: 9,
            angle: 180,
            targetAngles: [270]
        },
        {
            spriteId: 1,
            pos: 10,
            angle: 270,
            targetAngles: [180]
        },
    ]
}

const level2: Level = {
    roads: [
        {
            spriteId: 1,
            pos: 5,
            angle: 0,
            targetAngles: [0],
        },
        {
            spriteId: 1,
            pos: 6,
            angle: 180,
            targetAngles: [90],
        },
        {
            spriteId: 1,
            pos: 9,
            angle: 180,
            targetAngles: [270],
        },
        {
            spriteId: 0,
            pos: 10,
            angle: 90,
            targetAngles: [0, 180],
        },
        {
            spriteId: 0,
            pos: 14,
            angle: 90,
            targetAngles: [0, 180],
        },
    ]
}

const level3: Level = {
    roads: [
        {
            spriteId: 1,
            pos: 5,
            angle: 90,
            targetAngles: [0]
        },
        {
            spriteId: 6,
            pos: 6,
            angle: 90,
            targetAngles: [180]
        },
        {
            spriteId: 1,
            pos: 9,
            angle: 180,
            targetAngles: [270]
        },
        {
            spriteId: 2,
            pos: 10,
            angle: 270,
            targetAngles: [90]
        },
        {
            spriteId: 6,
            pos: 13,
            angle: 0,
            targetAngles: [0]
        },
        {
            spriteId: 2,
            pos: 14,
            angle: 90,
            targetAngles: [180]
        },
    ]
}

const level4: Level = {
    roads: [
        {
            spriteId: 6,
            pos: 1,
            angle: 0,
            targetAngles: [90]
        },
        {
            spriteId: 6,
            pos: 2,
            angle: 180,
            targetAngles: [90]
        },
        {
            spriteId: 2,
            pos: 4,
            angle: 0,
            targetAngles: [0]
        },
        {
            spriteId: 5,
            pos: 5,
            angle: 90,
            targetAngles: [180]
        },
        {
            spriteId: 5,
            pos: 6,
            angle: 90,
            targetAngles: [0]
        },
        {
            spriteId: 2,
            pos: 7,
            angle: 90,
            targetAngles: [90]
        },
        {
            spriteId: 4,
            pos: 8,
            angle: 90,
            targetAngles: FULL
        },
        {
            spriteId: 3,
            pos: 9,
            angle: 0,
            targetAngles: FULL
        },
        {
            spriteId: 3,
            pos: 10,
            angle: 0,
            targetAngles: FULL
        },
        {
            spriteId: 4,
            pos: 11,
            angle: 90,
            targetAngles: FULL
        },
        {
            spriteId: 2,
            pos: 12,
            angle: 180,
            targetAngles: [270]
        },
        {
            spriteId: 2,
            pos: 13,
            angle: 270,
            targetAngles: [180]
        },
        {
            spriteId: 2,
            pos: 14,
            angle: 180,
            targetAngles: [270]
        },
        {
            spriteId: 2,
            pos: 15,
            angle: 270,
            targetAngles: [180]
        },
    ]
}

export const levels: Level[] = [
    level1,
    level3,
    level2,
    level4,
]

export const levelsLength = levels.length
