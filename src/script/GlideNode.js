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
    bullets : "Controls",
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
        this.glideCount = element.children.length;

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
        arrows : () => {
            const arrows = createElementFromHTML(`
                <div class="glide__arrows" data-glide-el="controls">
                    <button class="glide__arrow inner glide__arrow--left" data-glide-dir="<">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                    </button>
                    <button class="glide__arrow inner glide__arrow--right" data-glide-dir=">">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                    </button>
                </div>

            `);
            this.glideElement.appendChild(arrows);
        },
        bullets : () => {
            let bullets = '<div class="glide__bullets inner" data-glide-el="controls[nav]">';
            for (let i = 0; i < this.glideCount; i++)
                bullets += `<button class="glide__bullet" data-glide-dir="=${i}"></button>`;
            bullets += '</div>';
            bullets = createElementFromHTML(bullets);
            this.glideElement.appendChild(bullets);
        }
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
                if(this.#initModules[option])
                    this.#initModules[option]();
                modules.push(module);
            }
        };
        this.#options = options;
        this.#modules = modules;
    }
}