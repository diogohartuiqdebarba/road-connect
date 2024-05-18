import { Node, Vec3, tween, Button, Sprite, SpriteFrame } from 'cc'
import levels from './levelsData'

let canRotate = true

function getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min
}

function roadAnimation(node: Node, scale: number, invert = false) {
    const initialScale = Vec3.ZERO
    const finalScale = new Vec3(scale, scale, 1)
    tween(node)
    .set({ scale: invert ? finalScale : initialScale})
    .delay(getRandomNumber(0.25, 0.75))
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
        .delay(0.15)
        .call(() => checkTargetAngles(menu, level, roadsParent))
        .start()
    }
}

export function createRoads(menu: Node, roadsParent: Node, level: number, roadSprites: SpriteFrame[]) {
    const levelRoads = levels[level].roads
    const scale = 0.75
    const gridPosX = 48
    const gridPosY = 0
    const max = 4
    const initialPosX = -256 * scale
    const initialPosY = 256 * scale
    const offset = 128 * scale
    roadsParent.removeAllChildren()
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
    canRotate = true
}
