import { Node, Vec3, tween, Button, Sprite, SpriteFrame, Label } from 'cc'
import levels from './levelsData'

let canRotate = true
const ROAD_SCALE = 0.75
const ROAD_ANIMATION_DELAY = 0.25

function getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min
}

function roadAnimation(node: Node, scale: number, invert = false) {
    const initialScale = Vec3.ZERO
    const finalScale = new Vec3(scale, scale, 1)
    tween(node)
    .set({ scale: invert ? finalScale : initialScale})
    .delay(invert ? 0 : getRandomNumber(0.25, 0.75))
    .to(0.25, { scale: invert ? initialScale : finalScale }, { easing: "quadInOut"})
    .start()
}

function clampAngle(angle: number) {
    if (angle % 90 !== 0) {
        angle = Math.round(angle / 90) * 90
    }
    return angle
}

function checkTargetAngles(menu: Node, level: number, roadsParent: Node) {
    const levelRoads = levels[level].roads
    const levelComplete = roadsParent.children.every(road => {
        const angle = (Math.abs(clampAngle(road.angle))) % 360
        const index = road.name.split('_')[2]
        const targetAngle = levelRoads[index].targetAngle
        return angle === targetAngle
    })
    if (levelComplete) {
        const nextLevel = level + 1
        canRotate = false
        menu.emit('NextLevel', nextLevel)
    }
    return levelComplete
}
  
function roadRotate(menu: Node, node: Node, level: number, roadsParent: Node) {
    if (canRotate) {
        const angle = clampAngle(node.angle - 90)
        tween(node)
        .to(0.15, { angle }, { easing: "quadIn"})
        .delay(ROAD_ANIMATION_DELAY)
        .call(() => checkTargetAngles(menu, level, roadsParent))
        .start()
    }
}

function createRoadNodes(menu: Node, roadsParent: Node, level: number, roadSprites: SpriteFrame[]) {
    const scale = ROAD_SCALE
    const levelRoads = levels[level].roads
    const gridPosX = 48
    const gridPosY = 0
    const max = 4
    const initialPosX = -256 * scale
    const initialPosY = 256 * scale
    const offset = 128 * scale
    levelRoads.forEach((road, i) => {
        const index = road.pos
        const row = Math.floor(index / max)
        const column = index % max
        const posX = (initialPosX + gridPosX) + (column * offset)
        const posY = (initialPosY + gridPosY) - (row * offset)
        const node = new Node(`Road_${level}_${i}`)
        const sprite = node.addComponent(Sprite)
        node.addComponent(Button)
        sprite.spriteFrame = roadSprites[road.spriteId]
        const roadPosition = new Vec3(posX, posY, 0)
        node.position.set(roadPosition)
        node.angle = -road.angle
        roadAnimation(node, scale)
        node.setParent(roadsParent)
        node.on("click", () => roadRotate(menu, node, level, roadsParent))
    })
}

function setLevelTitle(levelTitle: Node, level: number) {
    const title = levelTitle.getComponent(Label)
    title.string = `Level ${level + 1}`
}

function animateTitleLevel(levelTitle: Node, level: number) {
    const pos = levelTitle.position
    const center = new Vec3(0, pos.y, 0)
    const oldFinal = new Vec3(-600, pos.y, 0)
    const newInitial = new Vec3(600, pos.y, 0)
    tween(levelTitle)
    .to(0.5, { position: oldFinal }, { easing: "quadInOut" })
    .delay(0.5)
    .set({ position: newInitial })
    .call(() => setLevelTitle(levelTitle, level))
    .to(0.5, { position: center }, { easing: "expoOut" })
    .start()
}

export function hideRoadsAnimation(roadsParent: Node) {
    canRotate = false
    roadsParent.children.forEach((road: Node) => {
        roadAnimation(road, ROAD_SCALE, true)
    })
}

export function createRoads(menu: Node, levelTitle: Node, roadsParent: Node, level: number, roadSprites: SpriteFrame[]) {
    if (level > 0) {
        hideRoadsAnimation(roadsParent)
        animateTitleLevel(levelTitle, level)
        tween(roadsParent)
        .delay(ROAD_ANIMATION_DELAY)
        .call(() => {
            roadsParent.removeAllChildren()
            createRoadNodes(menu, roadsParent, level, roadSprites)
            canRotate = true
        })
        .start()
    } else {
        setLevelTitle(levelTitle, level)
        roadsParent.removeAllChildren()
        createRoadNodes(menu, roadsParent, level, roadSprites)
        canRotate = true
    }
}
