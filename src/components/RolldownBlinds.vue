<template>
  <div class="rolldown-blinds">
    <div class="line">
      <div class="knob left"/>
      <div class="knob right"/>
    </div>

    <transition name="slide-down" appear>
      <div class="flag">
        <h4 class="label">{{ text }}</h4>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style lang="scss">
.rolldown-blinds {
  width: 15rem;
  margin: 0 auto;
  max-width: 100%;
  position: relative;

  .line {
    box-sizing: border-box;
    background-color: transparentize($color-accent, 0.3);
    height: 4px;
    width: 100%;
    border-radius: 1px;
    @include shadow-blurry;
    border-top: 2px solid $color-accent;
    position: relative;

    .knob {
      position: absolute;
      width: 4px;
      background: #b6b6b6;
      top: -2px;
      height: 4px;
      overflow: hidden;

      &.left {
        left: -3px;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
      &.right {
        right: -3px;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }
    }
  }

  .flag {
    position: relative;
    background-color: rgba(149, 188, 193, 0.05);
    height: 2.9rem;
    margin: 0 1px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
    @include border-thick;
    border-top: none;
  }

  .label {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 33%;
    color: #716967;
    font-family: $font-secondary;
    letter-spacing: 2.7px;
    text-transform: lowercase;
    font-size: 0.8em;
    font-weight: 400;
    margin: 0;
  }
}

.slide-down-enter-active {
  transition: height 0.4s cubic-bezier(0.455, 0.505, 0, 1.22);
  transition-delay: 0.7s;
}
.slide-down-enter {
  height: 0 !important;
}
.slide-down-enter-to {
  height: 2.3rem;
}
</style>
