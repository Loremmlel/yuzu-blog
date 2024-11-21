import {getToken} from "@/utils/auth.ts";

export const useUserStore = defineStore('user', () => {
    let token = getToken()

    function setToken(newToken: string) {
        token = newToken
    }

    return {token, setToken}
})