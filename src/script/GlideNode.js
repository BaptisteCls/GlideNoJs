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
        element.classList.add("glide");
        const slides = this.#initSlides();
        slides.append(element.childNodes);
        element.innerHTML = '';
        element.appendChild(slides);
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

    #initSlides () {
        const slides = document.createElement('div');
        slides.classList.add('glide_slides');
        slides.appendChild(this.#initTrack);
        return slides;
    }

    #initTrack () {
        const track = document.createElement('div');
        track.classList.add('glide__track');
        track.setAttribute('data-glide-el', 'track');
        return track;
    }
}