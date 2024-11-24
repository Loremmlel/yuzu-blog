export interface Response<T> {
    code: number,
    msg: string,
    data: T
}

export type PRes<T> = Promise<Response<T>>

export interface Page<T> {
    page: T[],
    total: number
}

export interface Tag {
    id: number,
    tagName: string,
    articleCount: number,
    createTime: string,
    updateTime: string
}

export type GetTagListRes = PRes<Tag[]>

export type Category = Omit<Tag, "tagName"> & { categoryName: string }

export type GetCategoryListRes = PRes<Category[]>

export interface ArticleDetail {
    id: number,
    userId: number,
    categoryName: string,
    categoryId: number,
    tags: Tag[],
    articleCover: string,
    articleTitle: string,
    articleType: number,
    isTop: number,
    visitCount: number,
    commentCount: number,
    likeCount: number,
    favoriteCount: number,
    preArticleId: number,
    preArticleTitle: string,
    nextArticleTitle: string,
    nextArticleId: number,
    createTime: string,
    updateTime: string
}

export type GetArticleDetailRes = PRes<ArticleDetail>

export interface ArticleTimeline {
    id: number,
    articleCover: string,
    articleTitle: string,
    articleContent: string,
    createTime: string
}

export type GetTimelineRes = PRes<ArticleTimeline[]>

export interface ArticleWhere {
    id: number,
    categoryId: number,
    tags: Tag[],
    articleCover: string,
    articleTitle: string,
    visitCount: number,
    createTime: string
}

export type WhereArticleRes = PRes<ArticleWhere[]>

export interface ArticleList {
    id: number,
    categoryName: string,
    tags: Tag[],
    articleCover: string,
    articleTitle: string,
    articleContent: string,
    articleType: number,
    visitCount: number,
    commentCount: number,
    likeCount: number,
    favoriteCount: number,
    createTime: string,
    updateTime: string
}

export type GetArticleListRes = PRes<Page<ArticleList>>

export interface ArticleRecommend {
    id: number,
    articleCover: string,
    articleTitle: string,
    articleContent: string,
    createTime: string
}

export type GetArticleRecommendRes = PRes<ArticleRecommend[]>

export type ArticleRelated = Omit<ArticleRecommend, "articleContent">

export type GetArticleRelatedRes = PRes<ArticleRelated[]>

export interface Comment {
    id: number,
    commentType: number,
    typeId: number,
    parentId: number,
    replyId: number,
    commentContent: string,
    commentUserId: number
    replyUserId: number,
    createTime: string,
    commentUserNickname: string,
    commentUserAvatar: string,
    replyUserNickname: string,
    likeCount: number,
    childCommentCount: number,
    parentCommentCount: number,
    childComment: Comment[]
}

export type GetCommentRes = PRes<Page<Comment>>

export interface AddCommentReq {
    type: number,
    typeId: number,
    parentId?: number,
    replyId?: number,
    commentContent: string,
    replyUserId?: number
}

export interface LeaveWord {
    id: number,
    userId: number,
    content: string,
    createTime: string,
    nickname: string,
    avatar: string,
    commentCount: number,
    likeCount: number,
    favoriteCount: number
}

export type GetLeaveWordListRes = PRes<LeaveWord[]>

export interface Like {
    id: string,
    userId: number,
    type: number,
    typeId: number,
    createTime: string,
    updateTime: string
}

export type IsLikeRes = PRes<Like[]>

export interface ApplyLinkReq {
    name: string,
    url: string,
    description: string,
    background: string,
    email: string
}

export interface Link {
    id: number,
    name: string,
    url: string,
    description: string,
    avatar: string
}

export type LinkListRes = PRes<Link[]>

export interface TreeHole {
    nickname: string,
    avatar: string,
    content: string
}

export type GetTreeHoleListRes = PRes<TreeHole[]>

export interface UserInfo {
    nickname: string;
    username: string;
    avatar: string;
    intro: string;
    registerType: number;
    email: string;
    roles: string[];
    gender: number;
    permissions: string[];
    loginTime: string;
    createTime: string;
}

export type GetUserInfoRes = PRes<UserInfo>

export interface UserRegisterReq {
    username: string,
    password: string,
    code: string,
    email: string
}

export interface UpdateUserInfoReq {
    nickname: string,
    gender: number,
    avatar: string,
    intro: string
}

export interface WebsiteInfo {
    webmasterAvatar: string;
    webmasterName: string;
    webmasterCopy: string;
    webmasterProfileBackground: string;
    giteeLink: string;
    githubLink: string;
    websiteName: string;
    headerNotification: string;
    sidebarAnnouncement: string;
    recordInfo: string;
    startTime: string;
    lastUpdateTime: string;
    articleCount: number;
    categoryCount: number;
    commentCount: number;
    wordCount: number;
    visitCount: number;
}

export type GetWebsiteInfoRes = PRes<WebsiteInfo>