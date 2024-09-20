const configurableOptions = [
    "type",
    "startAt",
    "perView",
    "focusAt",
    "gap",
    "autoplay",
    "autoplay",
    "hoverpause",
    "keyboard",
    "bound",
    "swipeThreshold",
    "dragThreshold",
    "perSwipe",
    "touchRatio",
    "touchAngle",
    "animationDuration",
    "rewind",
    "rewindDuration",
    "animationTimingFunc",
    "waitForTransition",
    "throttle",
    "direction",
    "peek",
    "cloningRatio",
]

export default class GlideNode {
    constructor(element) {
        this.name = element;
    }

    getOptions() {
        const options = {};
        Object.keys(configurableOptions).forEach( option => {
            const htmlOption = `glide-${option.replace(/[A-Z]/g, str => '-' + str.toLowerCase())}`;
            const value = glideElement.getAttribute(htmlOption);
            if (value) options[option] = value;
        })
        return options;
    }

    static getAllNodes() {
        const result = [];
        const sliderElements = document.querySelectorAll('[glide-type="slider"], [glide-type="carousel"]');
        sliderElements.forEach( sliderElement => {
            result.push(new GlideNode(sliderElement));
        })
        return result;
    }
}