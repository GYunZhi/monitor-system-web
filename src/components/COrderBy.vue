<template>
  <div class="order cursor-pointer" @click="setDirection()">
    {{order.text}}
    <div class="order-by">
      <div
        class="arrow arrowup"
        :class="{'active': currentOrder.direction === 'asc' && active}">
      </div>
      <div
        class="arrow arrowdown"
        :class="{'active': currentOrder.direction === 'desc' && active}">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'COrderBy',
  data () {
    return {
      currentOrder: this.order,
      clickCount: 0,
      direction: ['desc', 'asc', 'default']
    }
  },
  props: {
    order: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    prevent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setDirection () {
      if (this.prevent) return
      const index = (this.clickCount++ % 3)
      this.currentOrder.direction = this.direction[index]
      this.$emit('setDirection', this.currentOrder)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/variables.scss';
.order-by {
  position: relative;
  display: inline-block;
  width: 10px;
  height: 12px;
  .arrow {
    position: absolute;
    width: 0;
    height: 0;
    left: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  .arrowup {
    top: 0;
    border-bottom: 5px solid #999;
  }
  .arrowup.active {
    border-bottom: 5px solid $primary_color;
  }
  .arrowdown {
    top: 7px;
    border-top: 5px solid #999;
  }
  .arrowdown.active {
    border-top: 5px solid $primary_color;
  }
}
</style>
