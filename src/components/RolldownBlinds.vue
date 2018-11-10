<template>
  <div class="rolldown-blinds">
      <div class="line" />

      <transition name="slide-down" appear>
        <div class="shadow">
          <h4 class="subtitle">{{text}}</h4>
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
@import '~@/styles/vars.scss';

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

  .shadow {
    position: relative;
    background-image: linear-gradient(
      to right,
      lighten(lightgray, 13.5%),
      lighten(lightgray, 12%)
    );
    opacity: .5;
    height: 2.9rem;
    margin: 0 1px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }

  .subtitle {
    position: absolute;
    left: 0; right: 0; bottom: 33%;
    color: darken($color-primary, 30%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
    letter-spacing: 2.5px;
    text-transform: lowercase;
    font-size: .95em;
    font-weight: 400;
    margin: 0;
  }
}

.slide-down-enter-active {
  transition: height 0.4s cubic-bezier(0.455, 0.505, 0, 1.22);
  /* transition: height 0.4s cubic-bezier(0.335, 0.715, 0.075, 1.160);; */
  transition-delay: 0.65s;
}
.slide-down-enter {
  height: 0 !important;
}
.slide-down-enter-to {
  height: 2.3rem;
}
</style>
