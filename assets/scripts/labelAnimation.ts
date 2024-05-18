import { _decorator, Component, Enum, Label, tween, Vec3, CCInteger, CCString, CCFloat } from 'cc'
const { ccclass, property } = _decorator

enum LabelAnimationType {
    leftToRight = 1,
    rightToLeft = 2,
    scale = 3,
}

Enum(LabelAnimationType)
@ccclass('LabelAnimation')
export class LabelAnimation extends Component {
    @property(CCString)
    text: string = ''

    @property(CCInteger)
    x: number = 0

    @property(CCFloat)
    scale: number = 0

    @property({ type: LabelAnimationType })
    type: LabelAnimationType = LabelAnimationType.leftToRight

    start() {
        const label = this.node.getComponent(Label)
        label.string = this.text
        const pos = this.node.position
        pos.set(this.x, pos.y)
        if (this.type === LabelAnimationType.scale) {
            const scale = new Vec3(this.scale, this.scale, 1)
            tween(this.node)
            .set({ scale: new Vec3(0, 0, 1) })
            .to(0.5, { scale }, { easing: "quadInOut" })
            .start()
        } else {
            const position = new Vec3(0, pos.y, 0)
            tween(this.node)
            .to(0.5, { position }, { easing: "expoOut" })
            .start()
        }
    }
}
