<template>
  <div class="rolldown-blinds">
      <div class="line" />

      <transition name="slide-down" appear>
        <div class="flag">
          <h4 class="label">{{text}}</h4>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  props: ['text'],
};
</script>

<style lang="scss">
.rolldown-blinds {
  width: 11.6rem;
  margin: 0 auto;
  max-width: 100%;
  position: relative;

  .line {
    box-sizing: border-box;
    background-color: $color-accent-faded;
    height: 3px;
    width: 100%;
    border-radius: 1px;
  }

  .flag {
    position: relative;
    background-color: white;
    height: 2.9rem;
    margin: 0 1px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
    /* border: 1px solid transparentize($color: $color-border, $amount: 0.2); */
    @include border-standard;
    border-top: none;
    @include shadow-blurry;
  }

  .label {
    position: absolute;
    left: 0; right: 0; bottom: 33%;
    color: lighten($color-primary, 10%);
    font-family: $font-secondary;
    letter-spacing: 2.3px;
    text-transform: lowercase;
    font-size: .90em;
    font-weight: 400;
    margin: 0;
  }
}

.slide-down-enter-active {
  transition: height 0.4s cubic-bezier(0.455, 0.505, 0, 1.22);
  transition-delay: .7s;
}
.slide-down-enter {
  height: 0 !important;
}
.slide-down-enter-to {
  height: 2.3rem;
}
</style>
