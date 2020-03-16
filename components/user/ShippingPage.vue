<template>
  <div id="toolbox">
    <!--   <img
      height="1"
      width="1"
      style="display:none"
      src="https://www.facebook.com/tr?id=480915019270567&ev=Lead&noscript=1"/> -->
    <section class="meta-content">
      <div id="idSection">
        <h1 id="explanation" class="typo-title">
          Du willst dein Handy verschicken
        </h1>

        <h3 class="icon-header-title">
          Bitte sorge dafür, dass dein Paket sicher und unbeschädigt bei uns ankommt.
        </h3>

        <button class="elevated-button" onclick="window.location = '/contactUs'">
          Probleme?
        </button>
      </div>
    </section>

    <section class="selection-content" data-switch-appearance>
      <div class="box">
        <div id="selGrid" class="grid">
          <h2 class="typo-subheader">
            Drucke einfach das Label aus und klebe es auf das Paket.
          </h2>
        </div>

        <object
          width="80%"
          height="100%"
          type="application/pdf"
          :data="labelUrl"
        />

        <h2 class="typo-subheader">
          Wird es nicht richtig angezeit?
          <a :href="labelUrl">Klicke hier!</a>
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    labelUrl() {
      return `/user/${this.$route.params.userId}/label.pdf`
    },
  },
}
</script>
