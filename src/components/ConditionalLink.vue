<script>
export default {
  functional: true,
  props: {
    hasLink: Boolean,
  },
  render(
    h,
    {
      slots,
      props: { hasLink },
    }
  ) {
    const { link, text } = slots();

    if (hasLink) {
      link[0].children = text;
      return link;
    }
    return text;
  },
};
</script>
