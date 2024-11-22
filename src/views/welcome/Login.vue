<script setup lang="ts">
import {Reactive} from "vue";
import {useUserStore} from "@/store/user.ts";
import {login} from "@/api/user.ts";
import {setToken} from "@/utils/auth.ts";
import {ElMessage} from "element-plus";
import {Lock, User} from "@element-plus/icons-vue";

interface FormData {
  username: string,
  password: string,
  remember: boolean
}

const formRef = ref()
const formData: Reactive<FormData> = reactive({})
const rules = {
  username: [{required: true, message: '请输入用户名'}],
  password: [{required: true, message: '请输入密码'}]
}
const env = import.meta.env
const userStore = useUserStore()
const router = useRouter()

function userLogin() {
  formRef.value.validate(async (valid) => {
    if (!valid) {
      return
    }
    const res = await login(formData)
    if (res.code === 200) {
      setToken(res.data.token, res.data.expire, formData.remember)
      ElMessage.success('登录成功')
      await router.push('/')
      await userStore.getInfo()
    } else {
      ElMessage.error(res.msg)
    }
  })
}
</script>

<template>
  <div class="text-center mx-5">
    <div class="mt-40">
      <div class="text-2xl font-bold">登录</div>
      <div class="text-sm text-gray-400 mt-4">用户密码使用键式哈希算法加密</div>
    </div>
    <div class="mt-12">
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model.trim="formData.username" maxlength="30" type="text" placeholder="用户名/邮箱" clearable>
            <template #prefix>
              <el-icon>
                <User></User>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="formData.password" type="password" maxlength="30" placeholder="请输入密码"
                    @keyup.enter="userLogin()" show-password>
            <template #prefix>
              <el-icon>
                <Lock></Lock>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12" class="text-left">
            <el-form-item prop="remember">
              <el-checkbox v-model="formData.remember" label="记住我"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-link @click="router.push('/reset')">忘记密码</el-link>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="mt-8">
      <el-button class="w-72" type="success" plain @click="userLogin">登录</el-button>
    </div>
    <el-divider>
      <span class="text-sm text-gray-400">没有账号?</span>
    </el-divider>
    <div>
      <el-button @click="router.push('/register')" class="w-72" type="danger" plain>立即注册</el-button>
    </div>
    <el-divider>
      <span class="text-sm text-gray-400">其他方式</span>
    </el-divider>
    <div>
      <div class="other-login">
        <div>
          <el-link :href="env.MODE === 'development'
              ? env.VITE_SERVER + '/oauth/gitee/render'
              :env.VITE_SERVER + '/api/oauth/gitee/render'">
            <svg-icon name="gitee" width="20px" height="20px" color="#4e86f1"></svg-icon>
          </el-link>
        </div>
        <div class="ml-4">
          <el-link :href="env.MODE === 'development'
              ? env.VITE_SERVER + '/oauth/github/render'
              :env.VITE_SERVER + '/api/oauth/github/render'">
            <svg-icon name="github" width="20px" height="20px" color="#4e86f1"></svg-icon>
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.other-login {
  display: flex;
  justify-content: center;

  div:hover {
    cursor: pointer;
  }
}
</style>