export const usePaginationStore = defineStore('pagination', () => {
    const current = ref(1)
    const pageSize = ref(10)
    const total = ref(0)

    return {current, pageSize, total}
})