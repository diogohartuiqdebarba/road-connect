import { Node, Vec3, tween, Tween, Button, Sprite, SpriteFrame } from 'cc'
import levels from './levelsData'

function getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export function roadAnimation(node: Node, scale: number, invert = false) {
    const initialScale = Vec3.ZERO
    const finalScale = new Vec3(scale, scale, 1)
    tween(node)
    .set({ scale: invert ? finalScale : initialScale})
    .delay(getRandomNumber(0.25, 0.75))
    .to(0.25, { scale: invert ? initialScale : finalScale }, { easing: "quadInOut"})
    .start()
}

export function roadRotate(node: Node) {
    Tween.stopAllByTarget(node)
    let currentAngle = node.angle
    let angle = currentAngle - 90
    if (angle % 90 !== 0) {
        angle = Math.round(angle / 90) * 90
    }
    tween(node)
    .to(0.15, { angle }, { easing: "quadIn"})
    .start()
}

export function createRoads(container: Node, level: number, roadSprites: SpriteFrame[]) {
    const levelRoads = levels[level].roads
    const scale = 0.75
    const gridPosX = 48
    const gridPosY = 0
    const max = 4
    const initialPosX = -256 * scale
    const initialPosY = 256 * scale
    const offset = 128 * scale
    container.removeAllChildren()
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
        node.angle = road.angle
        roadAnimation(node, scale)
        node.setParent(container)
        node.on("click", () => roadRotate(node))
    })
}
