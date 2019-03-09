<template>
  <div>
    <div class="title">
      <div> 
        <v-ons-icon v-if="back" class="icon-back" icon="md-arrow-left"></v-ons-icon>
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: String,
    back: Boolean,
  }
}
</script>

<style scoped>
  .title {
    display: block;
    height: 40px;
    z-index: 3;
    position: fixed;
    background-color: #26a2ff;
    width: 100%;
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: 1000;
    line-height: 40px;
  }

  .icon-back {
    position: absolute;
    left: 18px;
  }
</style>