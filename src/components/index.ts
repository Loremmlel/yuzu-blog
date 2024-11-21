import {App} from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

const components: {[name: string]: Component} = {
    SvgIcon
}

export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key])
        })
    }
}