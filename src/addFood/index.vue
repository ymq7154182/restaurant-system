<template>
  <div class="add-food">
    <div class="add-food-header">
      <div class="title">{{title}}</div>
    </div>
    <div class="add-food-body">
      <group>
        <popup-picker title="菜品校区"
          :value="[campus[Number(campusId) - 1]]"
          :data="campus"
          :columns="1"
          @on-change="selCampus"></popup-picker>
        <popup-picker title="菜品对象"
          :data="users"
          :value="[userRole]"
          :columns="1"
          @on-change="selUser"></popup-picker>
        <x-input title="菜品名字"
          v-model="dishname"
          :show-clear="false"
          :text-align="'right'"
          style="padding-right: 47px;"></x-input>
        <x-textarea title="菜品描述" v-model="dishdesc" :max="30"></x-textarea>
        <popup-picker title="菜品时间"
          :data="meals"
          :value="[meal]"
          :columns="1"
          @on-change="selMeal"></popup-picker>
        <popup-picker title="菜品类别"
          :data="types"
          :value="[dishclassid]"
          :columns="1"
          @on-change="selType"></popup-picker>
        <div class="vux-cell-box" @click="selPic">
          <div class="weui-cell vux-tap-active weui-cell_access">
            <div class="weui-cell__hd">
              <label class="weui-label" style="display: block; width: auto;">菜品图片</label>
            </div>
            <div class="vux-cell-primary vux-popup-picker-select-box">
              <img class="food-img" v-if="dishimgurl" :src="dishimgurl" @click="selPic">
              <img class="food-img" v-if="!dishimgurl" src="../assets/img/addlogo.png" @click="selPic">
              <div v-if="dishimgurl === undefined || dishimgurl === ''" class="vux-popup-picker-select" style="text-align: right;">
                <span class="vux-popup-picker-value vux-cell-value"></span>
              </div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </group>
      <div class="btn send-btn" @click="confirm">提交保存</div>
    </div>
  </div>
</template>
<script>
  import { Group, XInput, XTextarea, PopupPicker } from 'vux'

  import request from '@/utils/request'
  import { msg, errorMsg } from '@/utils/common'
  import wxMixin from './wxMixin'
  export default {
    components: {
      Group,
      XInput,
      XTextarea,
      PopupPicker
    },
    mixins: [wxMixin],
    data () {
      return {
        showpicurl: '',
        users: ['老师', '学生'],
        meals: ['早餐', '午餐', '晚餐'],
        types: ['套餐', '小炒', '盖饭', '面点', '小吃', '清真', '其他'],
        campus: ['校本部', '清华园校区', '双榆树校区'],
        logoImg: 'http://img3.imgtn.bdimg.com/it/u=2342726261,3398983232&fm=26&gp=0.jpg',
        userRole: '',
        title: '',
        campusId: '',
        dishid: '', // 是 int 自增id
        dishname: '', // 是 string  菜名必填
        dishdesc: '', // 否 string  菜品描述必填
        dishimgurl: '', // 是 string  图片地址必填
        dishclassid: '', // 是 int 菜类别必填
        meal: '', // 是 int 早餐、午餐或晚餐
        openid: ''
      }
    },
    mounted () {
      this.openid = localStorage.getItem('wechatopenid')
      this.dishid = this.$route.params.id
      if (this.dishid !== undefined && this.dishid !== '') {
        this.title = '编辑菜品'
        this.getFood()
      } else {
        this.title = '新增菜品'
      }
      this.getSign()
    },
    methods: {
      selCampus (item) {
        this.campusId = this.campus.indexOf(item[0]) + 1
      },
      selUser (item) {
        this.userRole = item[0]
      },
      selMeal (item) {
        this.meal = item[0]
      },
      selType (item) {
        this.dishclassid = item[0]
      },
      getFood () {
        request({
          url: 'http://zhongkeruitong.top/canteen-system/rest/getBaseDishById',
          data: {
            dishid: this.dishid
          },
          method: 'post'
        }).then(res => {
          if (res.data.errno === 0) {
            console.log('d', res.data.data)
            this.dishclassid = this.types[Number(res.data.data.dishclassid) - 1]
            this.campusId = res.data.data.campus_id
            this.dishdesc = res.data.data.dishdesc
            this.dishimgurl = res.data.data.dishimgurl
            this.dishname = res.data.data.dishname
            this.meal = this.meals[Number(res.data.data.mealid) - 1]
            this.userRole = this.users[Number(res.data.data.role) - 1]
          }
        })
      },
      confirm () {
        if (this.userRole === '' || Number(this.campusId) === 0 || this.campusId === '' || this.dishid === '' || this.dishname === '' || this.dishdesc === '' || this.dishimgurl === '' || this.dishclassid === '' || this.meal === '') {
          errorMsg(this, '信息不能为空')
          return
        }
        let url = ''
        let req = {}
        if (this.dishid !== undefined && this.dishid !== '') {
          // 编辑
          url = 'http://zhongkeruitong.top/canteen-system/rest/updateBaseDishes'
        } else {
          // 新增
          url = 'http://zhongkeruitong.top/canteen-system/rest/insertBaseDishes'
        }
        // 学生老师
        const tmprole = this.userRole === '老师' ? 1 : 2
        // 类别
        const tmpdishclassid = this.types.indexOf(this.dishclassid) + 1
        // 早中晚
        const tmpmeal = this.meals.indexOf(this.meal) + 1
        req = {
          role: tmprole,
          campus_id: Number(this.campusId),
          dishid: this.dishid,
          dishname: this.dishname,
          dishdesc: this.dishdesc,
          dishimgurl: this.dishimgurl,
          dishclassid: tmpdishclassid,
          meal: tmpmeal,
          openid: this.openid
        }
        request({
          url: url,
          data: req,
          method: 'post'
        }).then(res => {
          if (res.data.errno === 0) {
            msg(this, '成功, 请继续添加', '200px')
            setTimeout(() => {
              this.dishid = ''
              this.userRole = ''
              this.campusId = ''
              this.dishname = ''
              this.dishdesc = ''
              this.meal = ''
              this.dishclassid = ''
              this.dishimgurl = ''
            }, 800)
          } else {
            errorMsg(this, res.data.errmsg)
          }
        })
      }
    }
  }
</script>
<style lang="scss">
.add-food-header {
  height: 60px;
  width: 100%;
  position: absolute;
  background: #fff;
  z-index: 3;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
  .title {
    text-align: center;
    font-size: 16px;
    padding: 20px;
  }
}
.add-food {
  .vux-popup-picker-select-box {
    text-align: right;
    padding-right: 20px;
  }
  .food-img {
    width: 100px;
    height: 100px;
  }
}
.add-food-body {
  margin-top: 60px;
}
</style>
