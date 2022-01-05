<template>
  <v-sheet width="230" class="mt-10 ml-5">
    <v-form v-model="valid">
      <v-text-field
        v-model="receptNum"
        label="受付番号"
        messages="※発注番号欄からコピー"
        dense
        outlined
        required
      ></v-text-field>
      <v-text-field
        label="顧客番号"
        v-model="custNum"
        dense
        outlined
        required
        hide-details
      ></v-text-field>
      <v-radio-group v-model="pendings" row>
        <v-radio label="消" value="0" class="mr-6"></v-radio>
        <v-radio label="要" value="1" class="mr-6"></v-radio>
        <v-radio label="TEL" value="2" class="mr-6"></v-radio>
        <v-radio label="メール" value="3" class="mr-6"></v-radio>
        <v-radio label="済" value="4" class="mr-6"></v-radio>
      </v-radio-group>
      <v-textarea label="ノート" v-model="notes" outlined></v-textarea>
      <v-btn :disabled="!valid" color="success" @click="regist()" block
        >保存</v-btn
      >
    </v-form>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      receptNum: "",
      custNum: "",
      pendings: [],
      notes: "",
    };
  },
  methods: {
    regist: function () {},
  },
};
</script>
