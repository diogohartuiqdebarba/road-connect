import { _decorator, Component, AudioSource, AudioClip } from 'cc'
 const { ccclass, property } = _decorator

 @ccclass("AudioController")
 export class AudioController extends Component {
    @property(AudioClip)
    sfxDefaultClick: AudioClip = null

    @property(AudioClip)
    sfxShapeAppear: AudioClip = null

    @property(AudioClip)
    sfxRotateShape: AudioClip = null  

    @property(AudioClip)
    sfxLevelComplete: AudioClip = null  

    audioSource: AudioSource = null

    public playOneShot(clipName: string) {
        switch (clipName) {
            case 'defaultClick':
                this.audioSource.playOneShot(this.sfxDefaultClick, 5)
                break
            case 'shapeAppear':
                this.audioSource.playOneShot(this.sfxShapeAppear, 1)
                break
            case 'rotateShape':
                this.audioSource.playOneShot(this.sfxRotateShape, 1)
                break
            case 'levelComplete':
                this.audioSource.playOneShot(this.sfxLevelComplete, 1)
                break
        }
    }

    public playMusic() {
        this.audioSource.play()
    }

    public pauseMusic() {
        this.audioSource.pause()
    }

    onLoad() {
        const audioSource = this.node.getComponent(AudioSource)
        this.audioSource = audioSource
    }

    start() {
        this.playMusic()
    }
 }