import { _decorator, Component, Node, instantiate, Prefab, CCInteger, Label, Sprite, SpriteFrame, Vec3 } from 'cc'
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
    menuButton: Node = null

    @property([SpriteFrame])
    roadSprites: SpriteFrame[] = []

    createRoads(level: number) {
        const levelRoads = levels[level].roads
        levelRoads.forEach((road, i) => {
            const node = new Node(`Road_${level}_${i}`)
            const sprite = node.addComponent(Sprite)
            sprite.spriteFrame = this.roadSprites[road.spriteId]
            const roadPosition = new Vec3(road.pos.x, road.pos.y, 0)
            node.position.set(roadPosition)
            node.angle = road.angle
            node.setParent(this.gameNode)
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
        const offsetY = 78
        const maxLevelsPerRow = 4
        for (let i = 0; i < this.maxLevels; i++) {
            const prefabInstance = instantiate(this.levelButtonPrefab)
            const row = Math.floor(i / maxLevelsPerRow)
            const column = i % maxLevelsPerRow
            const posX = initialPosX + (column * 72)
            const posY = 180 - (row * offsetY)
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


