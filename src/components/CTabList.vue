<template>
  <div class="tab-list">
    <router-link
      v-for="item in tabList"
      v-if="!item.isInVisible"
      :key="item.name"
      :to="{name: item.name}"
      :exact="isExact">
      {{item.label}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CTabList',
  data () {
    return {
      keyupEvent: null,
      observer: null,
      dialogList: [],
      isExact: true
    }
  },
  mounted () {
    if (this.$route.query.unique) {
      this.isExact = false
    }
    this.dialogList = document.getElementsByClassName('el-dialog__wrapper')
    this.bindEnter()
    this.observer = new MutationObserver((mutations, observer) => {
      mutations.forEach((mutation) => {
        if (mutation.oldValue.indexOf('display') >= 0 || mutation.oldValue === '') {
          document.onkeyup = null
        } else {
          this.bindEnter()
        }
      })
    })
    _.each(this.dialogList, (item, index) => {
      let options = {
        'attributes': true,
        'attributeOldValue': true,
        'attributeFilter': ['style']
      }
      this.observer.observe(item, options)
    })
  },
  beforeDestroy () {
    document.onkeyup = null
    this.observer.disconnect()
  },
  watch: {
    '$route' (newVal, oldVal) {
      this.bindEnter()
    }
  },
  methods: {
    bindEnter () {
      if (!this.$route.meta.noEnter) {
        document.onkeyup = (event) => {
          var e = event || window.event
          if (e && e.keyCode === 13) {
            if (e.target.tagName !== 'TEXTAREA') {
              window.vm.$children[0].$refs.routerView.search()
            }
          }
        }
      } else {
        document.onkeyup = null
      }
    }
  },
  props: {
    tabList: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variables.scss';
.tab-list {
  overflow: hidden;
  padding: 0 25px;
  font-size: 0;
  background-color: #fff;
  border-bottom: 1px dashed #c9bafa;
  a {
    display: inline-block;
    padding: 15px 0 10px 0;
    margin: 0 23px;
    font-size: 16px;
  }
  a.router-link-active {
    border-bottom: 2px solid $primary_color;
    color: $primary_color;
  }
}

</style>
