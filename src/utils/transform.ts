import gsap from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger"

/**
 * 用gsap进行盒子动画
 */
export function gsapTransX(list: string[], x: number, duration: number = 1, ease = "power1.inOut") {
    gsap.registerPlugin(ScrollTrigger)
    list.map(v => {
        gsap.fromTo(v, {scrollTrigger: v, x}, {scrollTrigger: v, x: 0, duration, ease})
    })
}

export function gsapTransY(list: string[], y: number, duration: number = 1, ease = "power1.inOut") {
    gsap.registerPlugin(ScrollTrigger)
    list.map(v => {
        gsap.fromTo(v, {scrollTrigger: v, y}, {scrollTrigger: v, y: 0, duration, ease})
    })
}

export function gsapTransXScale(list: string[], opacity: number = 0, duration: number = 0.6, ease = "power2.inOut") {
    gsap.registerPlugin(ScrollTrigger)
    list.map(v => {
        gsap.fromTo(v,
            {scrollTrigger: v, duration: 0, y: 50, opacity: opacity},
            {scrollTrigger: v, duration, opacity: 1, y: 0, ease})
    })
}

/**
 * 字体动画
 */
export function gsapTransFont(name: string) {
    gsap.to(name, {y: -10, stagger: 0.3})
}

export function gsapTransLyric(name: string, duration: number, reverse: boolean = false) {
    if (!reverse) {
        gsap.fromTo(name, {opacity: 0}, {opacity: 1, duration})
    } else {
        gsap.fromTo(name, {opacity: 1}, {opacity: 0, duration})
    }
}