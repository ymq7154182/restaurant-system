<template>
  <div class="register-form stu">
    <group>
      <!-- x-input
        :readonly="type!=='reg'"
        title="学号"
        :show-clear="false"
        v-model="form.userCode"></x-input> -->
      <popup-picker
        title="校区"
        :value="[campus[Number(form.campusId) - 1]]"
        :data="campus"
        :columns="1"
        @on-change="selCampus"></popup-picker>
      <!-- <popup-picker
        :readonly="type!=='reg'"
        :disabled="type!=='reg'"
        title="年级"
        :value="[form.userLevel]"
        :data="levels"
        :columns="1"
        @on-change="selLevel"></popup-picker>
      <popup-picker
        :readonly="type!=='reg'"
        :disabled="type!=='reg'"
        title="分段"
        :value="[form.userGrade]"
        :data="grades"
        :columns="1"
        @on-change="selGrade"></popup-picker>
      <popup-picker
        :readonly="type!=='reg'"
        :disabled="type!=='reg'"
        title="班级"
        :value="[form.userClass]"
        :data="classes"
        :columns="1"
        @on-change="selClass"></popup-picker> -->

    </group>
    <div class="btn send-btn" v-if="type==='reg'" @click="reg">提交</div>
    <div class="btn send-btn" v-if="type!=='reg'" @click="modi">修改</div>
  </div>
</template>

<script>
import formMixin from './formMixin.js'
export default {
  name: 'stuReg',
  mixins: [formMixin],
  data () {
    return {
      form: {
        campusId: '', // 是 int 校区 （1：校本部 2：清华园校区 3：双榆树校区）
        userRole: 2 // 是 int 用户角色 （1：教师 2：学生(家长) 3：食堂工作人员）
      //   userCode: '', // 是 String  学号或教工号
      //   userLevel: '', // 否 String  初中或高中
      //   userGrade: '', // 否 String  如 “2018级”
      //   userClass: '' // 否 String  如 “1班”
      },
      campus: ['校本部', '清华园校区', '双榆树校区']
      // grades: ['高中', '初中'],
      // levels: ['2016级', '2017级', '2018级', '2019级'],
      // classes: ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班', '9班', '10班', '11班', '12班', '13班', '14班', '15班', '16班', '17班', '18班', '19班']
    }
  },
  props: {
    type: {
      type: String,
      default: 'reg'
    }
  },
  computed: {
    infoObj () {
      return this.$store.state.user.infoObj
    }
  },
  mounted () {
    if (this.type !== 'reg') {
      this.initForm()
    } else {
      this.form.campusId = '1'
    }
  },
  watch: {
    infoObj: {
      handler: function () {
        this.initForm()
      },
      deep: true
    }
  },
  methods: {
    initForm () {
      // this.form.userCode = this.infoObj.user_code || ''
      this.form.campusId = this.infoObj.campus_id || ''
      // this.form.userLevel = this.infoObj.user_level || ''
      // this.form.userGrade = this.infoObj.user_grade || ''
      // this.form.userClass = this.infoObj.user_class || ''
    },
    // selGrade (item) {
    //   this.form.userGrade = item[0]
    // },
    // selLevel (item) {
    //   console.log(item)
    //   this.form.userLevel = item[0]
    // },
    selCampus (item) {
      console.log(item[0])
      this.form.campusId = this.campus.indexOf(item[0]) + 1
    },
    // selClass (item) {
    //   console.log(item)
    //   this.form.userClass = item[0]
    // },
    reg () {
      this.isValid = false
      // this.checkValid('userCode')
      // this.checkValid('userLevel')
      // this.checkValid('userGrade')
      // this.checkValid('userClass')
      if (this.isValid) {
        this.$vux.toast.show({
          text: '信息不能为空',
          type: 'cancel',
          width: '140px'
        })
        return
      }
      this.$emit('reg', this.form)
    }
  }
}
</script>
<style lang="scss" scoped="">
  .password-control {
    position: relative;
    padding-right: 40px;
    .iconfont {
      position: absolute;
      right: 0;
      top: 0;
      height: 22px;
      padding: 7px 12px;
    }
  }
</style>
<style lang="scss">
  .register-form {
    .weui-label {
      width: 3em !important;
    }
    .vux-x-input.disabled .weui-input {
      text-fill-color: #373d41;
      -webkit-text-fill-color: #373d41;
    }
  }
</style>
