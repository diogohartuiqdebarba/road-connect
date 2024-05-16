import { _decorator, CCString, Component, director, Node, instantiate, Prefab, CCInteger, Label } from 'cc'
const { ccclass, property } = _decorator

@ccclass('startGame')
export class startGame extends Component {
    @property(CCInteger)
    maxLevels = 1

    @property(Node)
    levelsNode: Node = null

    @property(Prefab)
    levelButtonPrefab: Prefab = null

    onButtonClick() {
        this.node.getParent().active = false
        this.levelsNode.active = true
    }

    start() {
        this.levelsNode.active = false
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
            prefabInstance.on("click", () => console.log(i))
        }
    }    

    onLoad() {
        this.node.on("click", this.onButtonClick, this)
    }
}


