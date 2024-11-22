<script setup lang="ts">
import {Reactive} from "vue";
import {sendEmail} from "@/api/email.ts";
import {ElMessage} from "element-plus";
import {register} from "@/api/user.ts";
import {EditPen, Lock, Message, User} from "@element-plus/icons-vue";

interface FormData {
  username: string,
  password: string,
  repeatPassword: string,
  email: string,
  code: string
}

const emailColdTime = ref(0)
const formRef = ref()
const formData: Reactive<FormData> = reactive({})
const router = useRouter()
const isEmailValid = computed(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))


const validateUsername = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!/[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('用户名只能包含字母、数字、汉字'))
  } else {
    callback()
  }
}

const validateRepeatPassword = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== formData.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = {
  username: [{required: true, trigger: ['blur', 'change'], validator: validateUsername}],
  password: [
    {required: true, trigger: 'blur', message: '请输入密码'},
    {min: 6, max: 20, trigger: ['blur', 'change'], message: '密码长度在6-20位'}
  ],
  repeatPassword: [{required: true, trigger: ['blur', 'change'], validator: validateRepeatPassword}],
  email: [
    {required: true, trigger: 'blur', message: '请输入邮箱'},
    {type: 'email', trigger: ['blur', 'change'], message: '请输入正确的邮箱'}
  ],
  code: [{required: true, trigger: 'blur', message: '请输入验证码'}]
}

async function sendCode() {
  if (!isEmailValid) {
    ElMessage.warning('请输入正确的邮箱')
    return
  }
  emailColdTime.value = 60
  const res = await sendEmail(formData.email, 'register')
  if (res.code !== 200) {
    ElMessage.warning(res.msg)
    emailColdTime.value = 0
    return
  }
  ElMessage.success(`验证码已发送到邮箱: ${formData.email}, 请注意查收`)
  const intervalId = setInterval(() => {
    emailColdTime.value--
    if (emailColdTime.value <= 0) {
      clearInterval(intervalId)
    }
  }, 1000)
}

function registerFun() {
  formRef.value.validate(async (valid) => {
    if (!valid) {
      ElMessage.warning('请输入完整信息')
      return
    }
    const res = await register(formData)
    if (res.code !== 200) {
      ElMessage.error(res.msg)
      return
    }
    ElMessage.success('注册成功，建议先看年彬')
    await router.push('/login')
  })
}
</script>

<template>
  <div class="text-center mx-5">
    <div class="mt-24">
      <div class="text-2xl font-bold">注册新用户</div>
      <div class="text-sm text-gray-400 mt-4">欢迎注册柚子博客，请在下方填写相关信息</div>
    </div>
    <div class="mt-12">
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model.trim="formData.username" maxlength="20" type="text" placeholder="请输入用户名" clearable>
            <template #prefix>
              <el-icon>
                <User></User>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="formData.password" maxlength="20" type="password" placeholder="请输入密码" show-password>
            <template #prefix>
              <el-icon>
                <Lock></Lock>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="repeatPassword">
          <el-input v-model.trim="formData.repeatPassword" maxlength="20" type="password" placeholder="请再次输入密码"
                    show-password>
            <template #prefix>
              <el-icon>
                <Lock></Lock>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model.trim="formData.email" maxlength="50" type="text" placeholder="请输入邮箱" clearable>
            <template #prefix>
              <el-icon>
                <Message></Message>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="10" class="w-full">
            <el-col :span="17">
              <el-input v-model.trim="formData.code" maxlength="6" placeholder="请输入收到的验证码" clearable>
                <template #prefix>
                  <el-icon>
                    <EditPen></EditPen>
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-button type="success" @click="sendCode" :disabled="!isEmailValid || emailColdTime !== 0">
                {{ emailColdTime > 0 ? `请稍后 ${emailColdTime} 秒` : '获取验证码' }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt-20">
      <el-button class="w-72" type="warning" plain @click="registerFun">立即注册</el-button>
    </div>
    <div class="mt-5">
      <span class="text-sm text-gray-400">已有账号?</span>
      <el-link class="translate-x-0 -translate-y-0.5" @click="router.push('/login')">立即登录</el-link>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>