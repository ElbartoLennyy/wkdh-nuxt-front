<template>
  <div id="toolbox">
    <section class="meta-content">
      <div id="idSection">
        <h1 id="explanation" class="typo-title">
          Wir holen dein Handy ab!
        </h1>

        <h3 class="icon-header-title">
          Sei bitte zur angegebenen Zeit zu Hause.
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
            Vielen Dank - wir holen dein Gerät
            <b>{{ offer.TransportData }}</b> ab
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    offer: { type: Object, required: true }
  }
}
</script>
