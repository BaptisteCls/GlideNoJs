import GlideNode from "./GlideNode.js";
import Glide from "../base/glide.modular.esm.js"

GlideNode.getAllNodes.forEach(element => {
    const slider = new Glide(element, element.getOptions());
    slider.mount();
});