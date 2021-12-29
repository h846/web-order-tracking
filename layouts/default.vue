<template>
  <v-app>
    <v-app-bar dense hide-on-scroll app>
      <span
        class="font-italic blue--text text--darken-4 font-weight-black text-h6 mr-1"
      >
        CS-NET
      </span>
      <v-toolbar-title class="title">Web Order Tracking</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row align="center" justify="space-around">
        <v-btn small depressed color="primary"> Webオーダー全体表示 </v-btn>
        <v-btn small depressed color="primary"> 対応中/対応済表示 </v-btn>
        <v-btn small depressed color="primary"> 未反映オーダー対応 </v-btn>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <!--<Nuxt />-->
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
          <template v-slot:[`item.OH_HOLD_RSN`]="{ item }">
            <p v-if="item.OH_HOLD_RSN != ''">{{ item.OH_HOLD_RSN }}</p>
            <p v-if="item.OH_CREDIT_HOLD_RSN != ''">
              {{ item.OH_CREDIT_HOLD_RSN }}
            </p>
          </template>
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import moment from "moment";

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
          value: "OH_STATUS",
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
  mounted() {
    this.getWOdata();
  },
  methods: {
    getWOdata: async function () {
      await axios.post("http://lejnet/api/csnet/web-order").then((res) => {
        this.webOrdData = res.data;
        let date_cols = ["OH_DATE_ENTERED", "OH_DATE_ORDERED", "OH_DT_LST_MOD"];
        this.webOrdData = this.webOrdData.map((val, key) => {
          //初期整形処理
          for (key in val) {
            // "null"は空文字へ
            if (val[key] == "null" || !val[key]) {
              val[key] = "";
              continue;
            }
            //余分な空白を除去。日付型はフォーマット
            if (date_cols.includes(key)) {
              val[key] = moment(val[key]).format("YYYY/MM/DD");
            } else {
              val[key] = val[key].replace(/\s+/g, "");
            }
          }
          //ステータス
          switch (val["OH_STATUS"]) {
            case "P":
              val["OH_STATUS"] = "ピック中";
              break;
            case "B":
              val["OH_STATUS"] = "B/O待ち";
              break;
            case "O":
              val["OH_STATUS"] = "準備済み";
              break;
            case "N":
              if (val["OH_HOLD_RSN"] == "" && val["OH_CREDIT_HOLD_RSN"] == "") {
                val["OH_STATUS"] = "新オーダー";
              } else {
                val["OH_STATUS"] = "9止め中";
              }
              break;
          }

          return val;
        });
        console.log(this.webOrdData);
      });
    },
  },
};
</script>
<style scoped></style>
