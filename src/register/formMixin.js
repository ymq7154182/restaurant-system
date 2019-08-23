import { Group, XInput, PopupPicker } from 'vux'
export default {
  components: {
    Group,
    XInput,
    PopupPicker
  },
  data () {
    return {
      pwdVis: true,
      isValid: false
    }
  },
  computed: {
    openid () {
      return this.$store.state.user.openid
    },
    infoObj () {
      return this.$store.state.user.infoObj
    }
  },
  methods: {
    pwdVisible (flag) {
      this.pwdVis = flag
    },
    checkValid (type) {
      this.isValid = this.isValid || (this.form[type].trim() === '')
    },
    modi () {
      this.$emit('modi', this.form)
    }
  }
}
