<template>
  <div class="register-form tea">
    <group>
      <!-- <x-input :show-clear="false" title="工号" v-model="form.userCode"></x-input> -->
      <popup-picker title="校区" 
          :data="campus"
          :value="[campus[Number(form.campusId) - 1]]"
          :columns="1"
          @on-change="selCampus"></popup-picker>
      
    </group>
    <div class="btn send-btn" v-if="type==='reg'" @click="reg">提交</div>
    <div class="btn send-btn" v-if="type!=='reg'" @click="modi">修改</div>
  </div>
</template>

<script>
import formMixin from './formMixin.js'

export default {
  name: 'teaReg',
  mixins: [formMixin],
  data () {
    return {
      campus: ['校本部', '清华园校区', '双榆树校区'],
      form: {
        campusId: '', // 是 int 校区 （1：校本部 2：清华园校区 3：双榆树校区）
        userRole: 1 // 是 int 用户角色 （1：教师 2：学生(家长) 3：食堂工作人员）
        // userCode: '' // 是 String  学号或教工号
      }
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
    },
    selCampus (item) {
      console.log(item[0])
      this.form.campusId = this.campus.indexOf(item[0]) + 1
    },
    reg () {
      this.isValid = false
      // this.checkValid('userCode')
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
