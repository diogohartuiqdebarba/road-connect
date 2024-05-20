import { _decorator, Component, Node, Prefab, CCInteger, Label, SpriteFrame, Vec3, tween, instantiate, Tween } from 'cc'
import { createRoads, hideRoadsAnimation } from './roads'
import { AudioController } from './audioController'
import { t } from './translations'
const { ccclass, property } = _decorator

@ccclass('startGame')
export class startGame extends Component {
    @property(CCInteger)
    maxLevels = 1

    @property(Node)
    levelsNode: Node = null

    @property(Node)
    levelTitle: Node = null

    @property(Prefab)
    levelButtonPrefab: Prefab = null

    @property(Node)
    gameNode: Node = null

    @property(Node)
    gameRoads: Node = null

    @property(Node)
    menuButton: Node = null

    @property(Label)
    levelsMenuLabel: Label = null

    @property([SpriteFrame])
    roadSprites: SpriteFrame[] = []

    @property(AudioController)
    audioController: AudioController = null

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
            prefabInstance.on("click", () => {
                this.audioController.playOneShot('defaultClick')
                this.playGame(i)
            })
        }
    }

    showLevelsMenu() {
        hideRoadsAnimation(this.audioController, this.gameRoads)
        this.audioController.playOneShot('defaultClick')
        tween(this.node)
        .delay(0.5)
        .call(() => {
            this.node.getParent().active = false
            this.gameNode.active = false
            this.levelsNode.active = true
        })
        .start()
    }

    playButtonAnimation() {
        const scale = new Vec3(1.1, 1.1, 1)
        tween(this.node)
        .to(0.5, { scale }, { easing: "expoOut" })
        .call(() => this.showLevelsMenu())
        .start()
    }

    playGame(level: number, isNext = false) {
        if (level < this.maxLevels) {
            this.gameNode.active = true
            this.levelsNode.active = false
            createRoads(
                this.audioController, 
                this.node, 
                this.levelTitle, 
                this.gameRoads, 
                level, 
                this.roadSprites, 
                isNext
            )
        } else {
            this.showLevelsMenu()
        }
    }

    start() {
        const playButtonLabel = this.node.getComponent(Label)
        playButtonLabel.string = t('play')
        this.levelsMenuLabel.string = t('levelSelect')
        this.levelsNode.active = false
        this.gameNode.active = false
        this.createLevelButtons()
        this.node.once("click", this.playButtonAnimation, this)
        this.menuButton.on("click", this.showLevelsMenu, this)
        this.node.on("NextLevel", (level: number) => {
            Tween.stopAll()
            this.audioController.playOneShot('levelComplete')
            this.playGame(level, true)
        })
    }    
}


