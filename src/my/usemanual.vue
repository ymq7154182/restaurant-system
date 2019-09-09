<template>
  <div style="height: 100%;width: 100%;display:flex;flex-direction: column;">
    <div class="serviceInfo" ref="serviceInfo">
      <div>
        <div class="one-title">
          <span class="one-title__icon"></span>
          <span>食堂评价系统使用手册</span>
          <span class="one-title__bacicon iconfont icon-jiantou">手册</span>
        </div>
        <div class="one-item">
          <p class="one__p">该套系统实现师生对饭菜质量及餐饮服务的评价反馈，满足师生与校园餐饮管理的有效互动，辅助校园餐厅提高服务质量、改善菜品结构搭配，力求为学校广大师生群体提供更加健康、养生、合理的餐饮服务<strong>注意：使用该系统前请关注“中科智禾”微信公众号,选择“智禾教育”模块，点击“食堂系统”进行使用</strong></p>
        </div>

        <div class="one-item">
          <div class="one-item__header">功能介绍</div>
          <div class="one-step">
            <div class="one-step__item">
              <span>教师和学生（家长）角色：</span>
            </div>
            <div class="one-step__item" >
              <span>1. 查看每天可以享用的菜品；</span>
            </div>
            <div class="one-step__item">
              <span >2. 左边的导航将所有菜品进行归一化处理，分为早、中、晚三大类；又细化分为套餐、小炒、盖饭、面点、清真等，可以让用户快速定位到自己想看的菜品；</span>
            </div>
            <div class="one-step__item">
              <span>3. 用户还可以切换不同的校区、不同的日期进行查看菜品；</span>
            </div>
            <div class="one-step__item">
              <span>4. 用户可以对不同日期、校区的菜品和服务在任意地点、任意时间下进行评价;</span>
            </div>
          </div>
          <div class="one-step__item">
            <span >餐厅管理老师：</span>
          </div>
          <div class="one-step__item">
            <span>1. 可以查看所有的菜品；</span>
          </div>
          <div class="one-step__item">
            <span>2. 可以为不同的角色进行个性化配菜；</span>
          </div>
          <div class="one-step__item">
            <span>3. 餐厅管理老师可以使用“多角度精准查询和快速定位”进行高效配菜功能；</span>
          </div>
          <div class="one-step__item">
            <span>4  左边的导航将所有菜品进行归一化处理，分为早、中、晚三大类；又细化分为套餐、小炒、盖饭、面点、清真等，可以让餐厅管理老师快速定位到某一菜品，从而为教师和学生快速进行配每天的菜品。可以任意切换不同的校区、不同的日期，可以一次为不同的角色配好一周的菜品；</span>
          </div>
          <div class="one-step__item">
            <span>5. 用户可以对不同日期、校区的菜品和服务进行评价；</span>
          </div>
        </div>

        <div class="one-item">
          <div class="one-item__header">声明</div>
          <div class="one-kefu">
            <span>本系统会对用户信息进行加密存储，并且保证不会主动外泄用户私人信息</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'usemanual',
    data () {
      return {
        serviceScroll: null,
        show: 0
      }
    },
    mounted () {
      this.$store.commit('SET_RETURN_URL', '/my')
      this.init()
    },
    methods: {
      init () {
        this.$nextTick(() => {
          this.serviceScroll = new BScroll(this.$refs.serviceInfo, {
            click: true
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .oto-wrapper {
    background: #647cfb;
    background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
    flex: none;
    z-index: 1;
    height: 56px;
  }
  .returnicon{
    position: relative;
    left: 15px;
    top: 6px;
    z-index: 9;
    padding: 8px 6px;
    color: #fff;
  }
  .serviceInfo {
    height: calc(100% - 60px);
    overflow: hidden;
  }
  .one-title {
    padding-top: 20px;
    text-align: center;
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
  }
  .one-title__subtitle {
    position: absolute;
    left: 50%;
    font-size: 13px;
    bottom: -24px;
    opacity: 0.3;
    font-weight: 400;
  }
  .one-title__icon {
    /*background: url('../assets/img/woshou.png') no-repeat;*/
    width: 40px;
    height: 40px;
    display: block;
    background-size: contain;
    position: absolute;
    left: 50%;
    margin-left: -140px;
  }
  .one-title__bacicon {
    position: absolute;
    right: 0;
    font-size: 60px;
    opacity: 0.2;
    top: 34px;
    color: #a3d4ff;
  }
  .one-item{
    background: #fff;
    padding: 16px;
    margin: 20px 20px 16px;
    box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  .one-step {
    margin-bottom: 20px;
  }
  .one__fee {
    margin-top: 10px;
  }
  .one__p--top {
    padding-left: 50px;
    line-height: 40px;
    position: relative;
  &:before {
     content: "\e66b";
     font-family: "iconfont" !important;
     font-size: 16px;
     font-style: normal;
     opacity: 0.2;
     padding-right: 10px;
     position: absolute;
     left: 24px;
     top: -10px;
   }
  }
  .one__p {
    display: block;
    line-height: 1.5;
  }
  .one-item__header {
    font-size: 15px;
    font-weight: bold;
  }
  .iconfont{
    margin: 0 10px;
  }
  .text {
    font-weight: bold;
  }
  .one-step__item {
    text-align: left;
    padding-top: 10px;
  }
  .one-step__item {
    position: relative;
  span {
    background: #fff;
    padding: 2px 6px;
    border-radius: 6px;
  }
  }
  .one-item__btn {
    width: 100%;
    text-align: center;
    border-radius: 4px;
    margin: 16px 0;
    background: rgba(52, 127, 244, 0.8);
    color: #fff;
    padding: 4px 0;
  }
  .one-item__ok {
    border-radius: 18px;
    background: #7cbb5a;
    color: #fff;
    font-size: 12px;
    width: 18px;
    height: 18px;
    display: inline-block;
    text-align: center;
    line-height: 18px;
  }
  .one-kefu {
    margin: 10px auto;
    text-align: left;
    display: block;
  & > div {
      display: inline-block;
      width: 240px;
      text-align: left;
      margin-bottom: 10px;
    }
  }
</style>
