import axios from 'axios'
import moment from "moment";

export const state = () => ({
  woData:[]
});

export const getters = () => ({
  woData(state){
    return state.woData;
  }
});

export const mutations = {
  setWoData(state, wodata){
    state.woData = wodata;
  }
};

export const actions = {
  async fetchWoData({commit}){
    await axios.post("http://lejnet/api/csnet/web-order").then((res) => {
        let webOrdData = res.data;
        let date_cols = ["OH_DATE_ENTERED", "OH_DATE_ORDERED", "OH_DT_LST_MOD"];
        webOrdData = webOrdData.map((val) => {
          //初期整形処理
          for (let key in val) {
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
          return val;
        });
        commit('setWoData',webOrdData)
        
      });
  }
};