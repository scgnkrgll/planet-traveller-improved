class KeyBinder {
    static LEFT = 37
    static UP = 38
    static RIGHT = 39
    static DOWN = 40
    static A = 65
    static D = 68
    static W = 87
    static S = 83

    static _pressed = {}

    static get pressed() {
        return this._pressed
    }

    static isDown(keyCode) {
        return this._pressed[keyCode]
    }

    static onKeydown(event) {
        this._pressed[event.keyCode] = true
    }

    static onKeyup(event) {
        delete this._pressed[event.keyCode]
    }
}

export default KeyBinder