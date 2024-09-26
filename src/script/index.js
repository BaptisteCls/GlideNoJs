import SplideNode from "./SplideNode.js";
import Splide from "../base/splide.esm.js";

SplideNode.getAllNodes().forEach(element => {
    const slider = new Splide("." + element.getSplideClass(), element.getOptions());
    slider.mount();
});