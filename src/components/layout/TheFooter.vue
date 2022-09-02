<template>
<div class="temp">
    <v-footer
    color="#021b40"
    padless
    app
  >
    <v-row
      justify="center"
      no-gutters
      class=" py-4 text-center white--text"
    >    
      {{ new Date().getFullYear() }} — <strong> hermescorp</strong>
    </v-row>
    </v-footer>
    </div>
</template>

<script>
export default {
}
</script>
  <style scoped>
  .temp{
    padding: 3.55rem 0 0 0;
}
</style>

