
// 用户登录
import http from "@/utils/request.ts";
import {GetUserInfoRes, PRes, UpdateUserInfoReq, UserRegisterReq} from "@/api/type.ts";

export function login(data: any) {
    return http({
        url: '/user/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
        method: 'post'
    })
}

// 退出登录
export function logout() {
    return http({
        url: '/user/logout',
        method: 'post'
    })
}

// 第三方登录
export function oauthLogin(accessToken: string,type: string,username: string) {
    return http({
        url: '/user/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Login-Type': type,
            'Access-Token': accessToken,
        },
        data: {
            username: username,
            password: accessToken,
        },
        method: 'post'
    })
}

// 获取用户信息
export function getUserInfo(): GetUserInfoRes {
    return http({
        url: '/user/auth/info',
        method: 'get'
    })
}

// 用户注册
export function register(data: UserRegisterReq): PRes<null> {
    return http({
        url: '/user/register',
        data: data,
        method: 'post'
    })
}

// 重置密码步骤一
export function resetPasswordStepOne(data: {code: string, email: string}): PRes<null> {
    return http({
        url: '/user/reset-confirm',
        data: data,
        method: 'post'
    })
}

// 重置密码步骤二
export function resetPasswordStepTwo(data: {password: string, code: string, email: string}): PRes<null> {
    return http({
        url: '/user/reset-password',
        data: data,
        method: 'post'
    })
}

// 修改用户信息
export function updateUserAccount(data: UpdateUserInfoReq): PRes<null> {
    return http({
        url: '/user/auth/update',
        data: data,
        method: 'post'
    })
}

// 修改电子邮箱
export function updateEmail(data: {password: string, code: string, email: string}): PRes<null> {
    return http({
        url: '/user/auth/update/email',
        data: data,
        method: 'post'
    })
}

// 修改第三方登录电子邮箱
export function updateThirdEmail(data: {password: string, code: string, email: string}): PRes<null> {
    return http({
        url: '/user/auth/third/update/email',
        data: data,
        method: 'post'
    })
}