<template>
  <transition name="fade">
    <el-card
      shadow="hover"
      class="block-card"
    >
      <div class="block-card-body">
        <div
          v-if="!!icon"
          class="block-card-icon"
        >
          <svg-icon :icon-class="icon" />
        </div>
        <div class="block-card-info">
          <div>{{ label }}</div>
          <div>
            <count-to
              :start-val="0"
              :end-val="number"
              :decimals="2"
              :duration="3200"
              class="block-card-panel-num"
            />
          </div>
        </div>
      </div>
    </el-card>
  </transition>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'BolckCard',
  components: {
    CountTo
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Label'
    },
    number: {
      type: Number,
      default: 0
    }
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.block-card {
  &:hover {
    background-color: $blockCardBackgroundColor;
    color: aliceblue;
  }

  &-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &-icon {
    font-size: 3em;
  }

  &-info {
    padding-left: 20px;
    & div:first-child {
      font-size: 1.5em;
    }

    & div:last-child {
      font-size: 1.5em;
      font-weight: bold;
    }
  }
}
</style>
