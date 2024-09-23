import GlideNode from "./GlideNode.js";
import Glide from "../base/glide.modular.esm.js";
import * as Modules from "../base/glide.modular.esm.js";

function getAllUsefullModules (names) {
    const result = {};
    for(const [name, module] of Object.entries(Modules)) {
        if (names.includes(name))
            result.name=module;
    }
    return result;
}

GlideNode.getAllNodes().forEach(element => {
    //console.log("." + element.getGlideClass())
    //console.log(element.getOptions())
    const slider = new Glide("." + element.getGlideClass(), element.getOptions());
    const modules = getAllUsefullModules(element.getCustomModules());
    modules.anchors = Modules.Anchors
    slider.mount(modules);
});