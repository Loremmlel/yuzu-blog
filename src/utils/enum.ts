/**
 * Random: 随机播放
 *
 * ListLoop: 列表循环
 *
 * SingleCycle: 单曲循环
 */
export enum ModelList {
    Random,
    ListLoop,
    SingleCycle
}

/**
 * Custom: 播放用户添加的歌曲
 *
 * Top: 当前歌曲排行榜列表
 */
export enum PlayType {
    Custom,
    Top
}

export enum LyricType {
    Common,
    Special
}

/**
 * 首页Loading效果的请求路径
 */
export const RequestLoadingPath = [
    "/wapi/toplist/detail",
    "/websiteInfo/front",
    "/wapi/playlist",
    "/banners/list"
]