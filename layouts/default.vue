<template>
  <v-app>
    <v-app-bar dense hide-on-scroll app>
      <span
        class="font-italic blue--text text--darken-4 font-weight-black text-h6 mr-1"
      >
        CS-NET
      </span>
      <v-toolbar-title class="title">Web Order Tracking</v-toolbar-title>
      <!--
      <v-spacer></v-spacer>
      <v-row align="center" justify="space-around">
        <v-btn small depressed color="primary" to="/">
          Webオーダー全体表示
        </v-btn>
        <v-btn small depressed color="primary"> 対応中/対応済表示 </v-btn>
        <v-btn small depressed color="primary" to="/regist" nuxt>
          未反映オーダー対応
        </v-btn>
      </v-row>
      -->
    </v-app-bar>
    <v-main>
      <v-container fluid style="min-width: 1200px">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
