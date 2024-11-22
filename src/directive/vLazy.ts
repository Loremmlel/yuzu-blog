/**
 * 实现图片懒加载的指令
 * 当元素进入视口时，加载实际的图片资源
 * 如果元素不需要懒加载，则直接加载图片
 * 
 * @param el HTML元素
 * @param binding 指令的绑定值，包含懒加载的配置
 */
const lazyBinding = (el: HTMLElement, binding: any) => {
    // 加载中的占位图片
    const placeHold = "/src/assets/images/img_loading.gif"

    // 检查是否需要懒加载
    const {noLazy} = binding.value
    if (noLazy) {
        // 如果不需要懒加载，直接设置元素的src为数据属性中的src或占位图片
        return (el.src = el.dataset.src || placeHold)
    }
    // 默认先设置为占位图片
    el.src = placeHold

    // 创建IntersectionObserver实例，用于监听元素是否进入视口
    const observer = new IntersectionObserver(entries => {
        // 如果元素进入视口，则加载实际图片并停止观察
        if (entries.find(v => v.intersectionRatio)) {
            el.src = el.dataset.src || placeHold
            observer.unobserve(el)
        }
    })
    // 开始观察元素
    observer.observe(el)
}

// 导出Vue指令对象
export default {
    // 在元素挂载前设置懒加载
    beforeMount(el: HTMLElement, binding: any) {
        lazyBinding(el, binding)
    },
    // 在元素更新后重新设置懒加载，以应对数据变化
    updated(el: HTMLElement, binding: any) {
        lazyBinding(el, binding)
    }
}
