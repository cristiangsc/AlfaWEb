<template>
<span v-if="date">
  {{date.getDate()}}/{{date.getMonth()+1}}/{{date.getFullYear()}}
</span>
</template>

<script>
export default {
  name: "DateDisplay",
  props:['date']
}
</script>

<style scoped>

</style>