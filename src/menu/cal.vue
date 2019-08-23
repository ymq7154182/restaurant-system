<template>
  <div class="cal-block">
    <div class="show">{{showText}}</div>
    <div class="btns"></div>
    <ul class="nums">
      <li class="num" v-for="num in nums" @click="clickNum(num)">{{num}}</li>
    </ul>
    <ul class="opes">
      <li class="num" v-for="ope in opes" @click="clickOpe(ope)">{{ope}}</li>
    </ul>
    <div>{{lastClick}}</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        rec: [], // 记录
        showText: '0', // 显示的值
        nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 数字
        opes: ['+', '-'],
        lastClick: '',
        nowCount: ''
      }
    },
    methods: {
      clickNum (num) {
        const isOpe = (this.lastClick === '+' || this.lastClick === '-')
        console.log('d', num, this.rec[this.rec.length - 1], isOpe)

        if (Number(this.showText) === 0) {
          this.showText = num.toString()
        } else if (isOpe) {
          this.showText = num.toString()
        } else {
          this.showText += num.toString()
        }
        this.lastClick = num
      },
      clickOpe (ope) {
        this.lastClick = ope
        this.rec.push(Number(this.showText), ope)
        if (this.rec.length < 3) {
          return
        }

        console.log(this.rec)
        const num1 = Number(this.rec[0])
        const num2 = Number(this.rec[2])
        const ope1 = this.rec[1]
        const ope2 = this.rec[3]
        console.log(num1, num2)
        let count = 0
        if (ope1 === '+') {
          count = num1 + num2
        } else if (ope1 === '-') {
          count = num1 - num2
        }
        this.rec = [count, ope2]
        this.showText = count
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .num {
    font-size: 18px;
    list-style: none;
    display: inline-block;
    width: 40px;
    height: 40px;
    background: red;
    color: #fff;
    margin: 10px;
  }
</style>