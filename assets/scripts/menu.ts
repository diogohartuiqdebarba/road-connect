import { _decorator, Component, Node, Prefab, CCInteger, Label, SpriteFrame, Vec3, tween, instantiate } from 'cc'
import { createRoads } from './road'
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

    showLevelsMenu() {
        this.node.getParent().active = false
        this.gameNode.active = false
        this.levelsNode.active = true
    }

    playButtonAnimation() {
        const scale = new Vec3(1.1, 1.1, 1)
        tween(this.node)
        .to(0.5, { scale }, { easing: "expoOut"})
        .call(() => this.showLevelsMenu())
        .start()
    }

    playGame(level: number) {
        const title = this.gameNode.getComponentInChildren(Label)
        title.string = `Level ${level + 1}`
        this.gameNode.active = true
        this.levelsNode.active = false
        createRoads(this.gameRoads, level, this.roadSprites)
    }

    start() {
        this.levelsNode.active = false
        this.gameNode.active = false
        this.createLevelButtons()
        this.node.on("click", this.playButtonAnimation, this)
        this.menuButton.on("click", this.showLevelsMenu, this)
    }    
}


