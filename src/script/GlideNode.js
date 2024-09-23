const configurableOptions = [
    "type",
    "startAt",
    "perView",
    "focusAt",
    "gap",
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

const customOptions = {
    autoplay : "Autoplay",
    arrows : "Controls",
    swipe : "Swipe",
    keyboard : "Keyboard",
}

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

export default class GlideNode {
    static glideNumber = 0;
    #glideClass;
    #options;
    #modules;

    constructor(element) {
        this.glideElement = element;

        this.#glideClass = `glide-${GlideNode.glideNumber++}`;
        element.classList.add(this.#glideClass);
        element.classList.add('glide')

        const track = this.#initTrack();
        element.appendChild(track);

        this.#initOptions();
    }

    getGlideClass() {
        return this.#glideClass;
    }

    getOptions() {
        return this.#options;
    }

    getCustomModules() {
        return this.#modules;
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
        slides.classList.add('glide__slides');
        while (this.glideElement.childElementCount > 0) {
            this.glideElement.firstElementChild.classList.add('glide__slide');
            slides.appendChild(this.glideElement.firstElementChild);
        }
        return slides;
    }

    #initTrack () {
        const track = document.createElement('div');
        track.classList.add('glide__track');
        track.setAttribute('data-glide-el', 'track');
        track.appendChild(this.#initSlides());
        return track;
    }

    #initModules = {
        Controls : () => {
            const arrows = createElementFromHTML(`
                <div class="glide__arrows" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"/></svg>
                    </button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"/></svg>
                    </button>
                </div>
            `);
            this.glideElement.appendChild(arrows);
        },
    }

    #initOptions () {
        const options = {};
        configurableOptions.forEach( option=> {
            const htmlOption = `glide-${option.replace(/[A-Z]/g, str => '-' + str.toLowerCase())}`;
            const value = this.glideElement.getAttribute(htmlOption);
            if (value) options[option] = value;
        });
        const modules = [];
        for (const [option, module] of Object.entries(customOptions)) {
            const htmlOption = `glide-${option.replace(/[A-Z]/g, str => '-' + str.toLowerCase())}`;
            const value = this.glideElement.getAttribute(htmlOption);
            if (value && value.toLowerCase() === 'true') {
                console.log(this.#initModules['Controls'])
                if(this.#initModules[module])
                    this.#initModules[module]();
                modules.push(module);
            }
        };
        this.#options = options;
        this.#modules = modules;
    }
}