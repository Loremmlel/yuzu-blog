import {getToken} from "@/utils/auth.ts";
import {UserInfo} from "@/api/type.ts";
import {getUserInfo} from "@/api/user.ts";

export const useUserStore = defineStore('user', () => {
    let token = getToken()
    const userInfo = shallowRef<UserInfo>()

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