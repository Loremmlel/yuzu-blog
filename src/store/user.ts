import {getToken} from "@/utils/auth.ts";
import {UserInfo} from "@/api/type.ts";
import {getUserInfo} from "@/api/user.ts";
import {ShallowRef} from "vue";

export const useUserStore = defineStore('user', () => {
    let token = getToken()
    const userInfo: ShallowRef<UserInfo> = shallowRef({})

    function setToken(newToken: string) {
        token = newToken
    }

    async function getInfo() {
        const res = await getUserInfo()
        if (res.code === 200) {
            userInfo.value = res.data
        }
    }

    return {token, userInfo, setToken, getInfo}
})