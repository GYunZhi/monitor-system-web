<template>
  <ul class="labels">
    <li class="first">已选择：</li>
    <li v-for="(item, index) in currentLabels" :key="index">
      <span class="ellipsis inline-block vertical-middle">{{item.label}}: {{item.value | format}}</span>
      <i class="iconfont icon-delete" v-if="!item.readOnly" @click="remove(item)"></i>
    </li>
    <li class="clearAll" @click="remove('all')" v-show="savedLabels.length>1">
      <i class="iconfont icon-shanchu"></i>
      清空选项
    </li>
  </ul>
</template>
<script>
import utils from '@/utils/utils'

export default {
  name: 'CLabelGroup',
  props: {
    labels: {
      type: Array
    },
    filter: {
      type: Object
    }
  },
  data () {
    return {
      savedLabels: [],
      currentLabels: []
    }
  },
  watch: {
    filter (val, oldVal) {
      this.getCurrentLabels()
    }
  },
  methods: {
    getCurrentLabels () {
      const params = utils.compactParams(this.filter)
      _.forEach(this.labels, (item) => {
        let isActive = _.has(params, item.key)
        if (isActive) {
          item.value = item.filter ? item.filter(params[item.key]) : params[item.key]
          if (_.indexOf(this.savedLabels, item) < 0) {
            this.savedLabels.push(item)
          }
        } else {
          const index = _.indexOf(this.savedLabels, item)
          if (index >= 0) {
            this.savedLabels.splice(index, 1)
          }
        }
      })
      this.currentLabels = utils.deepClone(this.savedLabels)
    },
    remove (item) {
      if (item === 'all') {
        this.$emit('removeItem')
        this.savedLabels = []
      } else {
        const index = _.indexOf(this.savedLabels, item)
        if (index >= 0) {
          this.savedLabels.splice(index, 1)
        }
        this.filter[item.key] = null
        this.$emit('removeItem', item.key)
      }
    }
  },
  filters: {
    format: function (value) {
      if (_.isNumber(value)) {
        if (value === 1) {
          return '是'
        } else if (value === 0) {
          return '否'
        } else {
          return value
        }
      } else if (_.isArray(value)) {
        return value.join(', ')
      } else {
        return value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variables.scss';
$color_border: #ddd;
.labels {
  li {
    display: inline-block;
    padding: 0 10px;
    margin-right: 8px;
    margin-bottom: 4px;
    border: 1px solid $color_border;
    font-size: 13px;
    background: white;
    .ellipsis {
      max-width: 320px;
    }
    .iconfont {
      padding-left: 4px;
      font-size: 14px;
      cursor: pointer;
    }
    &:hover {
      border: 1px solid $primary_color;
      .iconfont {
        color: $primary_color;
      }
    }
    &.first {
      border: none;
    }
  }
  .clearAll {
    cursor: pointer;
    padding: 0 10px 0 0;
    color: white;
    border: 1px solid $primary_color;
    background: $primary_color;
    i.iconfont {
      color: white;
    }
  }
}
</style>
