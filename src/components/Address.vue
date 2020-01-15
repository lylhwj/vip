<template>
  <div>
    <el-select :clearable="true" v-model="address.province" style="width:120px;" placeholder="请选择省份" @change="provinceChange">
      <el-option v-for="item in provinceOptions" :key="item.linkageid" :label="item.name" :value="item.name">
      </el-option>
    </el-select>
    <el-select :clearable="true" v-model="address.city" style="width:120px;" placeholder="请选择城市" @change="cityChange">
      <el-option v-for="item in cityOptions" :key="item.linkageid" :label="item.name" :value="item.name">
      </el-option>
    </el-select>
    <el-select :clearable="true" v-model="address.area" style="width:120px;" placeholder="请选择区域" @change="areaChange">
      <el-option v-for="item in areaOptions" :key="item.linkageid" :label="item.name" :value="item.name">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'Address',
    data() {
      return {
        address: {
          province: '',
          city: '',
          area: '',
        },
        provinceOptions: [],
        cityOptions: [],
        areaOptions: []
      }
    },
    methods: {
      provinceChange(value) {
        let linkageid = '';
        this.provinceOptions.forEach(element => {
          if (element.name == value) {
            linkageid = element.linkageid; 
          }
        });
        this.address.city = '';
        this.address.area = '';
        this.$emit('getAddress', this.address);
        // 获取城市
        this.GET({
          api: `/user.php?op=edit_info&action=get_city&linkageid=${linkageid}`,
          success: (data) => {
            this.cityOptions = data.data;
          }
        })
      },
      cityChange(value) {
        let linkageid = '';
        this.cityOptions.forEach(element => {
          if (element.name == value) {
            linkageid = element.linkageid; 
          }
        });
        this.address.area = '';
        this.$emit('getAddress', this.address);
        // 获取区域
        this.GET({
          api: `/user.php?op=edit_info&action=get_area&linkageid=${linkageid}}`,
          success: (data) => {
            this.areaOptions = data.data;
          }
        })
      },
      areaChange(value) {
        this.$emit('getAddress', this.address);
      }
    },
    created() {
      // 获取初始化地址
      this.address.province = this.userInfo.province || '';
      this.address.city = this.userInfo.city || '';
      this.address.area = this.userInfo.area || '';
      //获取省份
      this.GET({
        api: '/user.php?op=edit_info&action=init',
        success: (data) => {
          this.provinceOptions = data.data;
        }
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
