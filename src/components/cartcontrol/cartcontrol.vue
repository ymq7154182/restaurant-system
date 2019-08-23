<template>
  <div class="cartcontroll">
    <!-- <transition name="slide-fade"> -->
    <div class="in-sel sel-item"
      v-show="food.isSel"
      @click="foodSel(false)">已选中</div>
    <!-- </transition> -->
    <div class="un-sel sel-item"
      v-show="!food.isSel"
      @click="foodSel(true)">选择</div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object,
    partent: String
  },
  methods: {
    foodSel (flag) {
      console.log('eeeeeeeeeeeeeee')
      console.log(this.partent)
      console.log(this.food)
      if (this.partent === 'menu') {
        this.$emit('selFood', this.food, flag)
      } else {
        this.$emit('cartSelFood', this.food.dishid, flag)
      }
    }
  }
}
</script>

<style lang="scss" >
  .cartcontroll {
    font-size: 0;
    .sel-item {
      font-size: 12px;
      border: 1px solid #aaa;
      padding: 2px 6px;
      border-radius: 4px;
      &.in-sel {
        background: #00a0dc;
        border-color: #00a0dc;
        color: #fff;
      }
    }
  }
  /* .cartcontroll {
    &.slide-fade-enter-active {
      transition: all .3s ease;
    }
    &.slide-fade-leave-active {
      transition: all .3s ease;
    }
    &.slide-fade-enter,
    &.slide-fade-leave-to {
      transform: translateY(24px);
      opacity: 0;
    }
  } */
</style>
