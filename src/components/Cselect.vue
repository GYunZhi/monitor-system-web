<template>
  <div class="select">
    <span>省：</span>
    <el-select  v-model="searchKey.provinceId" clearable  placeholder="请选择省"  @change="provinceChange" >
      <el-option
        v-for="item in provinceList"
        :key="item.Id"
        :label="item.name"
        :value="item.Id"
      ></el-option>
    </el-select>
    <span style="margin-left: 40px;">市：</span>
    <el-select  v-model="searchKey.cityId"  clearable  placeholder="请选择市"   @change="cityChange">
      <el-option
        v-for="item in cityList"
        :key="item.Id"
        :label="item.name"
        :value="item.Id"
      ></el-option>
    </el-select>
    <span style="margin-left: 40px;">县/区：</span>
    <el-select  v-model="searchKey.countyId"  clearable  placeholder="请选择县/区"  @change="searchData">
      <el-option
        v-for="item in countyList"
        :key="item.Id"
        :label="item.name"
        :value="item.Id"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchKey: {
        provinceId: '',
        cityId: '',
        countyId: ''
      },
      provinceList: [{
        name: '江西',
        Id: 1
      }],
      cityList: [],
      countyList: []
    }
  },
  methods: {
    // 获取省
    getProvince () {

    },
    // 点击省 获取市
    provinceChange () {
      this.$emit('selectChange', this.searchKey)
    },
    // 点击市获取县区
    cityChange () {
      this.$emit('selectChange', this.searchKey)
    },
    // 点击县区事件
    searchData () {
      this.$emit('selectChange', this.searchKey)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
