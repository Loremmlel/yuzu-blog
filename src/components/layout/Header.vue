<script setup lang="ts">
import {useUserStore} from "@/store/user.ts";
import {useWebsiteStore} from "@/store/website.ts";
import {useColorMode} from "@vueuse/core";
import DayNightToggleButton from "@/components/DayNightToggleButton.ts";
import {logout, oauthLogin} from "@/api/user.ts";
import {removeToken, setToken} from "@/utils/auth.ts";
import {ElMessage} from "element-plus";
import {
  Clock,
  Close,
  DocumentCopy,
  Files,
  Fries,
  Headset,
  HomeFilled,
  Postcard,
  PriceTag,
  Promotion,
  Search,
  Setting,
  UserFilled
} from "@element-plus/icons-vue";

const userStore = useUserStore()
const website = useWebsiteStore()
const route = useRoute()
const router = useRouter()
// 日夜切换
const mode = useColorMode()

onMounted(async () => {
  if (!window.customElements.get('my-day-night-toggle-button')) {
    window.customElements.define('my-day-night-toggle-button', DayNightToggleButton)
  }
  await userStore.getInfo()
})

async function thirdLogin() {
  const access_token = route.query.access_token
  const login_type = route.query.login_type
  const username = route.query.user_name
  if (access_token && login_type) {
    const res = await oauthLogin(access_token, login_type, username)
    if (res.code === 200) {
      await router.replace({query: {}})
      setToken(res.data.token, res.data.expire, true)
      await userStore.getInfo()
      ElMessage.success('登录成功')
      await router.push('/')
    } else {
      ElMessage.error(res.msg)
    }
  }
}

async function logoutSub() {
  const res = await logout()
  if (res.code === 200) {
    removeToken()
    userStore.userInfo = undefined
    ElMessage.success('退出登录成功')
    await router.push('/')
  }
}

// 菜单
const activeIndex = ref('1')
const isHeader = ref(true)

function handleSelect(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}

const dialogVisible = ref(false)
const env = import.meta.env

function changeToggle({detail}) {
  mode.value = detail
}

;(() => {
  thirdLogin()
  window.addEventListener('wheel', (event) => {
    // 向下滚动
    if (event.deltaY > 0) {
      isHeader.value = false
    } else if (event.deltaY < 0) {
      isHeader.value = true
    }
  })
})()
</script>

<template>
  <div>
    <!--搜索内容-->
    <el-dialog v-model="dialogVisible" width="35%" :show-close="false" style="border-radius: 15px"
               :close-on-click-modal="false" :lock-scroll="false">
      <template #header>
        <div style="display:flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 1.2rem">搜索</span>
          <el-button :icon="Close" style="background:none; font-size: 1.5rem; width: 30px; border: none"
                     @click="dialogVisible = false"></el-button>
        </div>
      </template>
      <Search></Search>
    </el-dialog>
  </div>
  <div>
    <transition name="content-header">
      <div class="content-header" v-show="isHeader">
        <el-menu router :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect"
                 style="width: 100%; border: none" class="menu">
          <el-tooltip class="box-item" effect="light" content="点击回到首页" placement="bottom">
            <el-link href="/">
              <div style="color:white; font-size: 1rem; font-weight: bold; margin-left: 0.2rem;">
                {{ website.webInfo?.websiteName }}
              </div>
            </el-link>
          </el-tooltip>
          <el-menu-item index="/" class="index">
            <el-icon>
              <HomeFilled></HomeFilled>
            </el-icon>
            首页
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Files></Files>
              </el-icon>
              归档
            </template>
            <el-menu-item index="/timeline">
              <el-icon>
                <Clock></Clock>
              </el-icon>
              时间轴
            </el-menu-item>
            <el-menu-item index="/category">
              <el-icon>
                <DocumentCopy></DocumentCopy>
              </el-icon>
              分类
            </el-menu-item>
            <el-menu-item index="/tags">
              <el-icon>
                <PriceTag></PriceTag>
              </el-icon>
              标签
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/tree-hole">
            <el-icon>
              <Fries></Fries>
            </el-icon>
            树洞
          </el-menu-item>
          <el-menu-item index="/message">
            <el-icon>
              <Postcard></Postcard>
            </el-icon>
            留言板
          </el-menu-item>
          <template v-if="env.VITE_MUSIC_FRONTEND_URL">
            <el-menu-item index="/music">
              <el-icon>
                <Headset></Headset>
              </el-icon>
              音乐
            </el-menu-item>
          </template>
          <el-menu-item index="/about">
            <el-icon>
              <UserFilled></UserFilled>
            </el-icon>
            关于
          </el-menu-item>
          <div class="flex-grow"></div>
          <!--日夜切换-->
          <div style="margin-right: 4.5rem; margin-top: -0.2rem;">
            <!--这里有个巨坑。自定义组件名称是DayNightToggleButton，如果使用day-night-toggle-button，vue会自动大驼峰化。-->
            <!--认为是Vue组件。导致出现TypeError: constructor必须用new调用-->
            <my-day-night-toggle-button @change="changeToggle" size="1"></my-day-night-toggle-button>
          </div>
          <!--搜索按钮-->
          <div class="search" @click="dialogVisible = true">
            <SvgIcon name="search" width="30px" height="30px" color="#409eff" class="icon"></SvgIcon>
          </div>
          <div class="user-info">
            <div v-if="!userStore.userInfo">
              <el-tooltip class="box-item" effect="light" content="点击去登录" placement="right">
                <el-avatar @click="router.push('/welcome')" style="margin-right: 3rem;">登录</el-avatar>
              </el-tooltip>
            </div>
            <div v-else style="display:flex;">
              <div class="profile">
                <div style="font-size: 15px;font-weight: bold;color: black">{{ userStore.userInfo?.username }}</div>
                <div style="font-size: 14px;color: #363636;margin-top: 3px"
                     v-if="userStore.userInfo?.registerType === 0">{{ userStore.userInfo?.email }}
                </div>
                <div style="font-size: 14px;color: #363636;margin-top: 3px" v-else>
                  {{ userStore.userInfo?.registerType === 1 ? 'Gitee登录' : 'Github登录' }}
                </div>
              </div>
              <el-dropdown>
                <el-avatar style="margin-right: 3rem;" :src="userStore.userInfo?.avatar"></el-avatar>
                <template #dropdown>
                  <el-dropdown-item @click="router.push('/setting')">
                    <template #default>
                      <el-icon>
                        <Setting></Setting>
                      </el-icon>
                      个人设置
                    </template>
                  </el-dropdown-item>
                  <el-dropdown-item @click="logoutSub">
                    <template #default>
                      <el-icon>
                        <Promotion></Promotion>
                      </el-icon>
                      退出登录
                    </template>
                  </el-dropdown-item>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-menu>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.content-header {
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  height: 45px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100vw;

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    transition: all 0.3s linear;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  .menu {
    font-weight: bold;
    background-color: rgba(248, 249, 250, 0);
    height: 45px;
    @media screen and (max-width: 910px) {
      display: none;
    }
  }

  .el-menu-item.is-active {
    background: rgba(248, 249, 250, 0.2);
  }

  .menu :deep(.el-menu-item:hover) {
    color: #409eff;
  }

  .logo {
    height: 32px;
    margin-left: 10px;
  }

  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-avatar:hover {
    cursor: pointer;
  }

  .profile {
    text-align: right;
    margin-right: 2rem;

    :first-child {
      font-size: 18px;
      font-weight: bold;
      line-height: 20px;
    }

    :last-child {
      font-size: 10px;
      color: gray;
    }
  }

  .flex-grow {
    flex-grow: 1;
  }
}

// 修改element ui菜单鼠标悬浮样式
:deep(.el-menu-item:hover) {
  background-color: rgba(222, 222, 64, 0.2);
}

// 头部缩回去动画
.content-header-enter-active, .content-header-leave-active {
  transition: all 0.8s;
}

.content-header-enter, .content-header-leave-to {
  transform: translateY(-100%);
}

:deep(.el-dialog__body) {
  padding-top: 0;
}

:deep(.el-dialog) {
  transition: all 0.3s;
  @media (max-width: 1400px) {
    width: 45%;
  }
  @media (max-width: 1000px) {
    width: 60%;
  }
  @media (max-width: 760px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
}
</style>