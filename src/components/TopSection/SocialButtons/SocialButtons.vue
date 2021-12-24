<template>
  <section class="socials">
    <a
      title="kalle.bornemark@gmail.com"
      href="mailto:kalle.bornemark@gmail.com"
    >
      <Email />
    </a>

    <a
      title="kallebornemark @ Twitter"
      href="https://twitter.com/kallebornemark"
      target="_blank"
    >
      <Twitter />
    </a>

    <a
      title="kallebornemark @ Github"
      href="https://github.com/kallebornemark"
      target="_blank"
    >
      <Github />
    </a>

    <a
      title="Kalle Bornemark @ LinkedIn"
      href="https://www.linkedin.com/in/kalle-bornemark-00737a4a/"
      target="_blank"
    >
      <LinkedIn />
    </a>
  </section>
</template>

<script>
import Email from './email.svg';
import Twitter from './twitter.svg';
import Github from './github.svg';
import LinkedIn from './linkedin.svg';

export default {
  components: {
    Email,
    Twitter,
    Github,
    LinkedIn,
  },
};
</script>

<style lang="scss" scoped>
.socials {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;

  @media screen and (max-width: $screen-sm) {
    justify-content: center;
    flex-wrap: nowrap;
  }

  a {
    svg {
      height: 2.2rem;
      fill: $color-icon;
      cursor: pointer;
      @include hover-enlarge;

      &:hover {
        fill: $color-accent;
      }
    }

    &:before {
      visibility: hidden;
    }

    &:not(:first-child) {
      margin-left: 2rem;

      @media screen and (max-width: $screen-sm) {
        margin-left: 10%;
      }
    }
  }
}
</style>
