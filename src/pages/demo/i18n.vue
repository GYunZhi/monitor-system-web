<template>
  <div class="i18n">
    <button @click="switchLanguage('zh')">中文</button>
    <button @click="switchLanguage('en')">英文</button>

    <div style="margin-top: 40px;">
      <p>项目</p>
      <div>{{ $i18n.t('user.name') }}</div>
      <div>{{ $i18n.t('user.sex') }}</div>
    </div>

    <div style="margin-top: 40px;">
      <p>组件库</p>
      <el-date-picker
        v-model="time"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>

  </div>
</template>

<script>
import { setUp } from '@/locale'
export default {
  name: 'i18n',
  data () {
    return {
      time: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    switchLanguage (type = 'zh') {
      setUp(type)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
