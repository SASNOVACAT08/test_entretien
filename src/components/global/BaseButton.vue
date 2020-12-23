<template>
  <div>
    <button :style="{color}" @click="click">{{msg}}</button>
  </div>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    msg: String,
    click: Function,
    color: String
  }
}
</script>
