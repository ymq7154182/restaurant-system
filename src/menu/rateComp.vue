<template>
  <div>
    <div v-for="(sitem, sindex) in list"
      v-if="sindex !== 0"
      class="ques-score-item"
      :class="{'active': item.suggestion && item.suggestionId === sindex}"
      @click="setScore(findex, sindex)">
      <i :class="['iconfont', quesIcon[sindex]]"></i>    
    </div>
</div>
</template>
<script>
  export default {
    data () {
      return {
        quesIcon: ['', 'iconxiaolian', 'iconpinglian', 'iconkulian'],
        quesScore: ['', '满意', '一般', '不满意']
      }
    },
    props: {
      item: Object,
      list: Array,
      type: String,
      findex: Number
    },
    methods: {
      setScore (qIndex, sIndex) {
        console.log('setScore')
        // const _this = this
        // if (this.type === 'service') {
        //   if (sIndex !== 1 || this.sIndex === 6) {
        //     this.$vux.confirm.show({
        //       title: '评价意见',
        //       showInput: true,
        //       closeOnConfirm: true,
        //       placeholder: '请输入意见',
        //       // 组件除show外的属性
        //       onCancel () {
        //       },
        //       onConfirm (value) {
        //         if (value === '') {
        //           errorMsg(_this, '不能为空')
        //           return
        //         }
        //         console.log('thi', value)
        //         _this.$set(_this.ques[qIndex], 'suggestion', _this.quesScore[sIndex])
        //         _this.$set(_this.ques[qIndex], 'suggestionId', sIndex)
        //         _this.$set(_this.ques[qIndex], 'suggestionText', value)
        //       }
        //     })
        //   } else {
        //     _this.$set(_this.ques[qIndex], 'suggestion', _this.quesScore[sIndex])
        //     _this.$set(_this.ques[qIndex], 'suggestionId', sIndex)
        //   }
        // } else {
        //   if (sIndex === 1) {
        //     this.$emit()
        //     _this.$set(_this.foods[qIndex], 'suggestion', _this.quesScore[sIndex])
        //     _this.$set(_this.foods[qIndex], 'suggestionId', sIndex)
        //   } else {
        //     this.$vux.confirm.show({
        //       title: '评价意见',
        //       showInput: true,
        //       closeOnConfirm: false,
        //       placeholder: '请输入您的意见',
        //       // 组件除show外的属性
        //       onCancel () {
        //       },
        //       onConfirm (value) {
        //         if (value === '') {
        //           errorMsg(_this, '输入不能为空')
        //           return
        //         }
        //         console.log('thi', value)
        //         _this.$set(_this.foods[qIndex], 'suggestion', _this.quesScore[sIndex])
        //         _this.$set(_this.foods[qIndex], 'suggestionId', sIndex)
        //         _this.$set(_this.foods[qIndex], 'suggestionText', value)
        //       }
        //     })
        //   }
        // }
      }
    }
  }
</script>