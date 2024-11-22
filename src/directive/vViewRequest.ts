const vViewRequest = {
    mounted(el: HTMLElement, binding: any) {
        const options = {
            root: binding.value?.root || null,
            rootMargin: binding.value?.rootMargin || '0px',
            threshold: binding.value?.threshold || 0
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    binding.value?.callback?.(el)
                    observer.unobserve(el)
                }
            })
        })
        observer.observe(el)

        onUnmounted(() => {
            observer.unobserve(el)
        })
    }
}

export default vViewRequest