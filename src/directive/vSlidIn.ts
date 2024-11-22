const distance = 100
const duration = 500

const map = new WeakMap()
const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            const animation = map.get(entry.target)
            if (animation) {
                animation.play()
                observer.unobserve(entry.target)
            }
        }
    }
})

function isBelowViewport(el: HTMLElement) {
    const rect = el.getBoundingClientRect()
    return rect.top - distance > window.innerHeight
}

export default {
    mounted(el: HTMLElement) {
        if (!isBelowViewport) {
            return
        }
        const animation = el.animate([
            {
                transform: `translateY(${distance}px)`,
                opacity: 0
            },
            {
                transform: 'translateY(0)',
                opacity: 1
            }
        ], {
            duration: duration,
            easing: 'ease-in-out',
            fill: 'forwards'
        })
        animation.pause()
        observer.observe(el)
        map.set(el, animation)
    },
    unmounted(el: HTMLElement) {
        observer.unobserve(el)
    }
}