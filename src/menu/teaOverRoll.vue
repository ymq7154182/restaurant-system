<template>
  <over-roll
    :nowWeek="nowWeek"
    :nowDate="nowDate"
    :nowCamp="nowCamp"
    :nowRole="'1'"
  ></over-roll>
</template>
<script>
  import overRoll from './overRoll'
  export default {
    components: { overRoll },
    props: {
      nowWeek: String,
      nowDate: String,
      nowCamp: String
    }
  }
</script>
