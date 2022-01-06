<template>
  <v-data-table
    class="mt-5"
    :headers="headers"
    :items="webOrdData"
    no-data-text="データがありません。"
    fixed-header
    height="80vh"
    :items-per-page="20"
    :footer-props="{
      'items-per-page-text': '行/ページ:',
      'items-per-page-options': [10, 20, 30, 40, 50],
    }"
    dense
  >
    <!-- 以下、列のカスタム -->
    <!-- 9止め理由列 -->
    <template v-slot:[`item.OH_HOLD_RSN`]="{ item }">
      <div v-if="item.OH_HOLD_RSN != ''">{{ item.OH_HOLD_RSN }}</div>
      <div v-else-if="item.OH_CREDIT_HOLD_RSN != ''">
        {{ item.OH_CREDIT_HOLD_RSN }}
      </div>
    </template>
    <!-- 状況列 -->
    <template v-slot:[`item.OH_STATUS`]="{ item }">
      <div v-if="item.OH_STATUS == 'P'">ピック中</div>
      <div v-else-if="item.OH_STATUS == 'B'">B/O待ち</div>
      <div v-else-if="item.OH_STATUS == 'O'">準備済み</div>
      <div v-else-if="item.OH_STATUS == 'N'">
        <template
          v-if="item.OH_HOLD_RSN == '' && item.OH_CREDIT_HOLD_RSN == ''"
        >
          新オーダー
        </template>
        <template v-else> ９止め中 </template>
      </div>
    </template>
    <!-- 楽替列 -->
    <template v-slot:[`item.OH_ORDER_TYPE`]="{ item }">
      <div v-if="item.OH_ORDER_TYPE == 'R'">Y</div>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      webOrdData: [],
      headers: [
        {
          text: "オーダー日付",
          value: "OH_DATE_ORDERED",
        },
        {
          text: "時間",
          value: "OH_ORDER_TIME",
        },
        {
          text: "受付番号",
          value: "OH_PO_NUMBER",
        },
        {
          text: "状況",
          value: "OH_STATUS",
        },
        {
          text: "9止め理由",
          value: "OH_HOLD_RSN",
        },
        {
          text: "氏名",
          value: "OH_BILL_NAME",
        },
        {
          text: "C#",
          value: "OH_CUSTOMER_NUMBER",
        },
        {
          text: "O#",
          value: "OH_ORDER_NUMBER",
        },
        {
          text: "CODE",
          value: "OH_CAMPAIGN_CODE",
        },
        {
          text: "楽替",
          value: "OH_ORDER_TYPE",
        },
        {
          text: "CSR_ID",
          value: "OH_ORDER_TAKER",
        },
        {
          text: "UPDATE",
          value: "OH_USR_LST_MOD",
        },
        {
          text: "更新日",
          value: "OH_DT_LST_MOD",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("fetchWoData");
    this.webOrdData = this.$store.state.woData;
    //console.log(this.webOrdData);
  },
  methods: {},
};
</script>
<style scoped></style>
