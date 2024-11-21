export const useLoadingStore = defineStore('loading', () => {
    const isLoading = shallowRef(false)

    function hide() {
        document.body.style.overflow = ''
        isLoading.value = false
    }

    function show() {
        document.body.style.overflow = 'hidden'
        isLoading.value = true
    }

    return {isLoading, hide, show}
})