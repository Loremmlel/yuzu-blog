import {WebsiteInfo} from "@/api/type.ts";
import {getWebsiteInfo} from "@/api/website.ts";
import {returnTime} from "@/utils/tool.ts";
import {ShallowRef} from "vue";

export const useWebsiteStore = defineStore('website', () => {
    const webInfo: ShallowRef<WebsiteInfo> = shallowRef()

    async function getInfo() {
        const res = await getWebsiteInfo()
        res.data.lastUpdateTime = returnTime(res.data.lastUpdateTime)
        webInfo.value = res.data
    }

    return {webInfo, getInfo}
})