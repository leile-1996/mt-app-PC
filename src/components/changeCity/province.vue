<template>
  <div>
    <span class="name">按省份选择：</span>
    <m-select
      :list="provinceList"
      title="省份"
      :value="province"
      :showWrapperActive="provinceActive"
      @change_active="changeProvinceActive"
      @change="changeProvince"
      mclass="province"
    />
    <m-select
      :list="cityList"
      title="城市"
      :value="city"
      :showWrapperActive="cityActive"
      @change_active="changeCityActive"
      @change="changeCity"
      :disabled="cityDisabled"
      mclass="city"
    />
    <span>直接搜索</span>
    <el-select
      v-model="searchWord"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option
        v-for="item in searchList"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import MSelect from "./select";
import api from "@/api/index.js"
export default {
  data() {
    return {
      province: "省份",
      city: "城市",
      provinceList: [],
      cityList: [],
      provinceActive: false,
      cityActive: false,
      searchList: ["九江", "南昌", "哈尔滨", "镇江"],
      searchWord: "",
      loading: false,
      cityDisabled: true
    };
  },
  components: {
    MSelect
  },
  methods: {
    changeProvinceActive(flag) {
      // console.log('changeProvinceActive');
      this.provinceActive = flag;
      if (flag) {
        this.cityActive = false;
      }
    },
    changeCityActive(flag) {
      this.cityActive = flag;
      if (flag) {
        this.provinceActive = false;
      }
    },
    changeProvince(item){
        this.province = item.name;
        this.cityDisabled = false;
        // console.log(item);
        this.cityList = item.cityInfoList;
    },
    changeCity(item){
        this.city = item.name;
        this.$store.dispatch('setPosition', item);
        this.$router.push({name: 'index'});
    },
    remoteMethod(val) {
        //   远程搜索
        // 请求后端接口
        console.log(val);
      }
  },
  created() {
    api.getProvinceList().then(res => {
      this.provinceList = res.data.data.map(item => {
        item.name = item.provinceName;
        return item;
      })
    })
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
