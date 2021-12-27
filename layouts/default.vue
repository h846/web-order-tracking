<template>
  <v-app>
    <v-app-bar fixed dense app>
      <span
        class="font-italic blue--text text--darken-4 font-weight-black text-h6 mr-1"
      >
        CS-NET
      </span>
      <v-toolbar-title class="title">Web Order Tracking</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row align="center" justify="space-around">
        <v-btn small depressed color="primary">
          Webオーダー全体表示
        </v-btn>
        <v-btn small depressed color="primary">
          対応中/対応済表示
        </v-btn>
        <v-btn small depressed color="primary">
          未反映オーダー対応
        </v-btn>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
        {{ webOrdData }}
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      webOrdData: ""
    };
  },
  mounted() {
    this.getWOdata();
  },
  methods: {
    getWOdata: async function() {
      await axios
        .post("http://lejnet/api/csnet/web-order")
        .then(res => (this.webOrdData = res.data));
    }
  }
};
</script>
<style scoped>
.title {
}
</style>
