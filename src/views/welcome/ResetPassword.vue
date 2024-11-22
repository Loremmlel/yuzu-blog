<script setup lang="ts">
import {Reactive} from "vue";
import {ElMessage} from "element-plus";
import {resetPasswordStepOne, resetPasswordStepTwo} from "@/api/user.ts";
import {EditPen, Lock, Message} from "@element-plus/icons-vue";

interface FormData {
  email: string,
  code: string,
  password: string,
  repeatPassword: string
}

const router = useRouter()
const active = ref(0)
const emailColdTime = ref(0)

const formRef = ref()
const formData: Reactive<FormData> = reactive({})
const isEmailValid = computed(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))
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
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码的长度必须在 6-20 个字符之间', trigger: ['blur', 'change']}
  ],
  repeatPassword: [
    {validator: validatePassword, trigger: ['blur', 'change']}
  ],
  email: [
    {required: true, message: '请输入邮件地址', trigger: 'blur'},
    {type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change']}
  ],
  code: [
    {required: true, message: '请输入获取的验证码', trigger: 'blur'},
  ]
}

async function sendCode() {
  if (!isEmailValid) {
    ElMessage.warning('请输入正确的邮箱')
    return
  }
  emailColdTime.value = 60
  const res = await sendEmail(formData.email, 'reset')
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

function confirmReset() {
  formRef.value.validate(async (valid) => {
    if (!valid) {
      return
    }
    const res = await resetPasswordStepOne(formData)
    if (res.code !== 200) {
      ElMessage.warning(res.msg)
      return
    }
    active.value++
  })
}

function doReset() {
  formRef.value.validate(async (valid) => {
    if (!valid) {
      return
    }
    const res = await resetPasswordStepTwo(formData)
    if (res.code !== 200) {
      ElMessage.warning(res.msg)
      return
    }
    ElMessage.success('密码重置成功，请重新登录')
    await router.push('/login')
  })
}
</script>

<template>
  <div class="text-center">
    <div class="mt-7">
      <el-steps align-center :active="active" finish-status="success">
        <el-step title="验证电子邮件"></el-step>
        <el-step title="重写设定密码"></el-step>
      </el-steps>
    </div>
    <!--第一步-->
    <div class="mx-5" v-if="active === 0">
      <div class="mt-20">
        <div class="text-2xl font-bold">重置密码</div>
        <div class="text-sm text-gray-400 mt-4">请输入需要重置密码的电子邮件地址</div>
      </div>
      <div class="mt-12">
        <el-form :model="formData" :rules="rules" ref="formRef">
          <el-form-item prop="email">
            <el-input v-model.trim="formData.email" type="text" placeholder="请输入电子邮件地址" clearable>
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
                <el-button type="success" @click="sendCode" :disabled="!isEmailValid || emailColdTime > 0">
                  {{ emailColdTime > 0 ? `请稍后 ${emailColdTime} 秒` : '发送验证码' }}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div class="mt-20">
        <el-button @click="confirmReset" type="warning" class="w-72" plain>开始重置密码</el-button>
      </div>
    </div>
    <!--第二步-->
    <div class="mx-4" v-if="active === 1">
      <div>
        <div class="mt-20">
          <div class="text-2xl font-bold">重置密码</div>
          <div class="text-sm text-gray-400 mt-4">请输入新密码</div>
        </div>
      </div>
      <div class="mt-12">
        <el-form :model="formData" :rules="rules" ref="formRef">
          <el-form-item prop="password">
            <el-input v-model.trim="formData.password" type="password" placeholder="请输入新密码" show-password>
              <template #prefix>
                <el-icon>
                  <Lock></Lock>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="repeatPassword">
            <el-input v-model.trim="formData.repeatPassword" type="password" placeholder="请再次输入密码" show-password>
              <template #prefix>
                <el-icon>
                  <Lock></Lock>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="mt-20">
        <el-button type="danger" class="mt-72" plain @click="doReset">重置密码</el-button>
      </div>
    </div>
    <div class="mt-5">
      <span class="text-sm text-gray-400">改变主意?</span>
      <el-link class="translate-x-0 -translate-y-0.5" @click="router.push('/login')">返回登录</el-link>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>