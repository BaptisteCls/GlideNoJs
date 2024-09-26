import Splide from "../base/splide.esm.js";
import splideOptions from "./splideOptions.js";

export default class SplideNode {
    static splideNumber = 0;
    #splideClass;
    #options;

    constructor(element) {
        this.splideElement = element;
        this.splideCount = element.children.length;

        this.#splideClass = `splide-${SplideNode.splideNumber++}`;
        element.classList.add(this.#splideClass);
        element.classList.add('splide')

        const track = this.#initTrack();
        element.appendChild(track);

        this.#initOptions();
    }

    getSplideClass() {
        return this.#splideClass;
    }

    getOptions() {
        return this.#options;
    }

    static getAllNodes() {
        const result = [];
        const sliderElements = document.querySelectorAll('[splide-type="slide"], [splide-type="loop"], [splide-type="fade"]');
        sliderElements.forEach( sliderElement => {
            result.push(new SplideNode(sliderElement));
        })
        return result;
    }

    mount() {
        const slider = new Splide("." + this.getSplideClass(), this.getOptions());
        slider.mount();
        return slider;
    }

    static mountAllNodes() {
        this.getAllNodes().forEach(node => node.mount());
    }

    #initSlides () {
        const slides = document.createElement('div');
        slides.classList.add('splide__list');
        while (this.splideElement.childElementCount > 0) {
            this.splideElement.firstElementChild.classList.add('splide__slide');
            slides.appendChild(this.splideElement.firstElementChild);
        }
        return slides;
    }

    #initTrack () {
        const track = document.createElement('div');
        track.classList.add('splide__track');
        track.appendChild(this.#initSlides());
        return track;
    }

    #initOptions () {
        const options = {};
        splideOptions.forEach( option=> {
            const htmlOption = `splide-${option.replace(/[A-Z]/g, str => '-' + str.toLowerCase())}`;
            const value = this.splideElement.getAttribute(htmlOption);
            if (value) options[option] = value;
        });
        this.#options = options;
    }
}