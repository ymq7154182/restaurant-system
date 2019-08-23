<template>
  <div class="overroll-list">
    <div v-if="list.length !== 0" class="overroll-list-title">{{text}}</div>
    <ul v-if="list.length !== 0" >
      <li class="overroll-list-item" :class="'overroll-' + type"
        v-for="(item, index) in list"
         @click="showItem(item)">
        <template v-if="type==='food'">
          <div class="food-img"><img :src="item.dishimgurl"></div>
          <div class="food-name">{{item.dishname}}</div>
        </template>
        <template v-else>
          <div class="service-name" :class="[text === '最喜欢' ? 'good' : 'bad']">
            {{item && item.replace('是否满意', '').replace('？', '')}}
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      oneShow: false,
      curOne: {},
      defaultImg: 'https://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114'
    }
  },
  props: {
    type: String,
    list: Array,
    text: String
  },
  methods: {
    showItem (item) {
      if (this.type === 'food') {
        this.curOne = item
        this.$emit('setCurOne', item)
        // this.curOne = {
        //   dishid: '1',
        //   dishname: '宫保鸡丁',
        //   dishdesc: '宫保鸡丁描述宫保鸡丁描述',
        //   dishimgurl: this.defaultImg,
        //   dishclassid: '',
        //   meal: '早餐'
        // }
        console.log('ite', item)
      }
    }
  }
}
</script>
<style lang="scss">
.overroll-list {
  & > ul {
    text-align: center;
  }
  & + .overroll-title {
    margin-top: 30px;
  }
  .overroll-list-title {
    margin-bottom: 6px;
  }
  .overroll-food.overroll-list-item {
    width: 30%;
    display: inline-block;
    text-align: center;
    margin-bottom: 10px;
  }
  .food-img {
    width: 60px;
    height: 60px;
    padding: 4px 10px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      opacity: 0.8;
    }
  }
  .overroll-service {
    text-align: center;
    margin-bottom: 10px;
    color: #fff;
    vertical-align: text-top;
    .service-name {
      margin: 6px;
      padding: 6px;
      border-radius: 6px;
      &.good {
        background: #03b349;
      }
      &.bad {
        background: #ef5252;
      }
    }
  }
}

</style>
