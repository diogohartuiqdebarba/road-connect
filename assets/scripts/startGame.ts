import { _decorator, Component, Node, instantiate, Prefab, CCInteger, Label, Sprite, SpriteFrame, Vec3, tween, Button, Tween } from 'cc'
import levels from './levelsData'
const { ccclass, property } = _decorator

@ccclass('startGame')
export class startGame extends Component {
    @property(CCInteger)
    maxLevels = 1

    @property(Node)
    levelsNode: Node = null

    @property(Prefab)
    levelButtonPrefab: Prefab = null

    @property(Node)
    gameNode: Node = null

    @property(Node)
    gameRoads: Node = null

    @property(Node)
    menuButton: Node = null

    @property([SpriteFrame])
    roadSprites: SpriteFrame[] = []

    roadAnimation(node: Node, scale: number, invert = false) {
        const initialScale = new Vec3(0.1, 0.1, 1)
        const finalScale = new Vec3(scale, scale, 1)
        tween(node)
        .set({ scale: invert ? finalScale : initialScale})
        .to(0.2, { scale: invert ? initialScale : finalScale }, { easing: "quadIn"})
        .start()
    }

    roadRotate(node: Node) {
        Tween.stopAllByTarget(node)
        let currentAngle = node.angle
        let angle = currentAngle + 90
        if (angle % 90 !== 0) {
            angle = Math.round(angle / 90) * 90
        }
        tween(node)
        .to(0.15, { angle }, { easing: "quadIn"})
        .start()
    }

    createRoads(level: number) {
        const levelRoads = levels[level].roads
        const scale = 0.75
        const gridPosX = 48
        const gridPosY = 0
        const max = 4
        const initialPosX = -256 * scale
        const initialPosY = 256 * scale
        const offset = 128 * scale
        this.gameRoads.removeAllChildren()
        levelRoads.forEach((road, i) => {
            const index = road.pos
            const row = Math.floor(index / max)
            const column = index % max
            const posX = (initialPosX + gridPosX) + (column * offset)
            const posY = (initialPosY + gridPosY) - (row * offset)
            const node = new Node(`Road_${level}_${i}`)
            const sprite = node.addComponent(Sprite)
            node.addComponent(Button)
            sprite.spriteFrame = this.roadSprites[road.spriteId]
            const roadPosition = new Vec3(posX, posY, 0)
            node.position.set(roadPosition)
            node.angle = road.angle
            this.roadAnimation(node, scale)
            node.setParent(this.gameRoads)
            node.on("click", () => this.roadRotate(node))
        })
    }

    levelsMenu() {
        this.node.getParent().active = false
        this.gameNode.active = false
        this.levelsNode.active = true
    }

    playGame(level: number) {
        const title = this.gameNode.getComponentInChildren(Label)
        title.string = `Level ${level + 1}`
        this.gameNode.active = true
        this.levelsNode.active = false
        this.createRoads(level)
    }

    createLevelButtons() {
        const initialPosX = -145
        const initialPosY = 180
        const offsetX = 72
        const offsetY = 78
        const maxLevelsPerRow = 4
        for (let i = 0; i < this.maxLevels; i++) {
            const prefabInstance = instantiate(this.levelButtonPrefab)
            const row = Math.floor(i / maxLevelsPerRow)
            const column = i % maxLevelsPerRow
            const posX = initialPosX + (column * offsetX)
            const posY = initialPosY - (row * offsetY)
            prefabInstance.setPosition(posX, posY, 0)
            prefabInstance.setParent(this.levelsNode)
            const level = (i + 1).toString()
            prefabInstance.getComponentInChildren(Label).string = level
            prefabInstance.active = true
            prefabInstance.on("click", () => this.playGame(i))
        }
    }

    start() {
        this.levelsNode.active = false
        this.gameNode.active = false
        this.createLevelButtons()
        this.node.on("click", this.levelsMenu, this)
        this.menuButton.on("click", this.levelsMenu, this)
    }    
}


