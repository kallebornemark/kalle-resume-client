<template>
  <div class="rolldown-blinds">
      <div class="line" />

      <transition name="slide-down" appear>
        <div class="shadow" />
      </transition>

      <transition name="fade-bounce" appear>
        <h4 class="subtitle">{{text}}</h4>
      </transition>
    </div>
</template>

<script>
export default {
  props: ['text'],
};
</script>

<style lang="scss">
@import '~@/styles/vars.scss';

.rolldown-blinds {
  /* width: 12.92rem; */
  width: 11.6rem;
  margin: 0 auto;
  max-width: 100%;
  position: relative;

  .line {
    box-sizing: border-box;
    background-color: $color-azure-radiance;
    height: 2px;
    width: 100%;
    /* border-left: 2px solid $color-barley-white; */
    /* border-right: 2px solid $color-barley-white; */
    border-radius: 1px;
  }

  .shadow {
    background-color: $color-ebony-clay-2;
    opacity: .5;
    height: 2.9rem;
  }

  .subtitle {
    position: absolute;
    left: 0; right: 0; top: .9rem;
    color: $color-regent-st-blue;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
    letter-spacing: 3px;
    text-transform: lowercase;
    font-size: .95em;
    font-weight: 400;
    margin: 0;
  }
}

// Text
.slide-down-enter-active {
  transition: height 0.4s cubic-bezier(0.455, 0.505, 0, 1.22);
  transition-delay: 0.65s;
}
.slide-down-enter {
  height: 0 !important;
}
.slide-down-enter-to {
  height: 2.3rem;
}

// Blinds
.fade-bounce-enter-active {
  transition: opacity 0.55s cubic-bezier(0.87, -0.41, 0.19, 1.44),
    top .55s cubic-bezier(0.87, -0.41, 0.19, 1.44);
  /* transition: opacity .5s, top; */
  transition-delay: 0.5s;
}
.fade-bounce-enter {
  opacity: 0;
  top: .5rem !important;
}
.fade-bounce-enter-to {
  opacity: 1;
  top: .9rem;
}
</style>
