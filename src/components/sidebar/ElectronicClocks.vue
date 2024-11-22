<script setup lang="ts">
const time: Ref<string> = ref()
const date: Ref<string> = ref()
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const timerId = setInterval(updateTime, 1000)

function updateTime() {
  const now = new Date()
  time.value = zeroPadding(now.getHours(), 2) + ':' + zeroPadding(now.getMinutes(), 2) + ':' + zeroPadding(now.getSeconds(), 2)
  date.value = zeroPadding(now.getFullYear(), 4) + '-' + zeroPadding(now.getMonth() + 1, 2) + '-' + zeroPadding(now.getDate(), 2) + ' ' + week[now.getDay()]
}

function zeroPadding(num: number, digit: number) {
  let zero = ''
  for (let i = 0; i < digit; i++) {
    zero += 0
  }
  return (zero + num).slice(-digit)
}

onUnmounted(() => {
  clearInterval(timerId)
})

;(() => {
  updateTime()
})()
</script>

<template>
  <Card title="电子时钟" prefix-icon="time" :is-rotate="true" :is-scale="true">
    <div id="clock">
      <p class="date"> {{ date }} </p>
      <p class="time"> {{ time }}</p>
    </div>
  </Card>
</template>

<style scoped lang="scss">
#clock {
  font-family: 'Share Tech Mono', monospace;
  color: white;
  text-align: center;
  color: gray;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0);

  .time {
    letter-spacing: 0.05em;
    font-size: 40px;
    padding: 5px 0;
  }

  .date {
    letter-spacing: 0.1em;
    margin-bottom: 5px;
    font-size: 15px;
  }
}
</style>