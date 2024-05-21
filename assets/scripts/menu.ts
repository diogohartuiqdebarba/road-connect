import { _decorator, Component, Node, Prefab, Label, SpriteFrame, Vec3, tween, instantiate, Tween, UIOpacity, view, macro } from 'cc'
import { createRoads, hideRoadsAnimation } from './roads'
import { AudioController } from './audioController'
import { t } from './translations'
import { levelsLength } from './levelsData'
const { ccclass, property } = _decorator

@ccclass('startGame')
export class startGame extends Component {
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

    @property(Node)
    endGameLabel: Node = null

    createLevelButtons() {
        const initialPosX = -136
        const initialPosY = 168
        const offsetX = 88
        const offsetY = 78
        const maxLevelsPerRow = 4
        for (let i = 0; i < levelsLength; i++) {
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

    showEndGame(level: number) {
        hideRoadsAnimation(this.audioController, this.gameRoads, this.levelTitle, level, true)
        const uiOpacity = this.endGameLabel.getComponent(UIOpacity)
        tween(uiOpacity)
        .delay(0.25)
        .to(1, { opacity: 255 }, { easing: "linear" })
        .start()
    }

    resetEndGameLabelOpacity() {
        const uiOpacity = this.endGameLabel.getComponent(UIOpacity)
        uiOpacity.opacity = 0
    }

    resetLevelTitlePosition() {
        const pos = this.levelTitle.position
        this.levelTitle.setPosition(new Vec3(0, pos.y, 0))
        const uiOpacity = this.levelTitle.getComponent(UIOpacity)
        uiOpacity.opacity = 255
    }

    playGame(level: number, isNext = false) {
        this.resetEndGameLabelOpacity()
        this.resetLevelTitlePosition()
        if (level < levelsLength) {
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
            this.showEndGame(level)
        }
    }

    start() {
        const playButtonLabel = this.node.getComponent(Label)
        playButtonLabel.string = t('play')
        this.levelsMenuLabel.string = t('levelSelect')
        this.endGameLabel.getComponent(Label).string = t('allLevelsCleared')
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

    onResize() {
        const gameDiv = document.getElementById('GameDiv')
        const isLandscape = window.innerWidth > window.innerHeight
        const width = isLandscape ? 640 : 360
        const height = isLandscape ? 360 : 640
        gameDiv.style.width = `${width}px`
        gameDiv.style.height = `${height}px`
        const orientation = isLandscape ? macro.ORIENTATION_LANDSCAPE :  macro.ORIENTATION_PORTRAIT
        view.setOrientation(orientation)
    }

    onLoad() {
        window.addEventListener('resize', this.onResize.bind(this))
        this.onResize()
    }
}


