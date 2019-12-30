<template>
  <div
    :class="{'choose-wrap':true, 'disabled':disabled}"
    @click="showWrapper"
    v-document-click="documentClick"
  >
    <div class="choose">
      <span>{{ title }}</span>
      <i class="el-icon-caret-bottom"></i>
      <div :class="{ 'mt-content': true, active: showWrapperActive }">
        <h2>{{ value }}</h2>
        <div :class="['wrapper', mclass]">
          <div class="col" v-for="(listData,index) in renderList" :key="index">
            <span :class="{'mt-item':true, 'active':item.name == value}" v-for="(item, index) in listData" :key="index" @click="changeValue(item)">{{
              item.name
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["list", "title", "value", "showWrapperActive","disabled","mclass"],
  computed: {
    renderList: function () {
      let col = Math.ceil(this.list.length /12);
      let resultList = [];
      for(var i = 0; i<col; i++) {
        let data = this.list.slice(i*12, i*12+12);
        // console.log(data);
        resultList.push(data);
      }
      return resultList;
    }
  },
  methods: {
    showWrapper(e) {
      e.stopPropagation();
      // this.showWrapperActive = true;
      if(!this.disabled) {
        this.$emit("change_active", true);
      }
    },
    documentClick() {
    //   console.log("do-cl");
      this.$emit("change_active", false);
    },
    changeValue(item) {
        this.$emit('change', item)
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/select.scss";
</style>
