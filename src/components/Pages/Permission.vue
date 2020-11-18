<template>
  <div id="Category">
    <br />
    <br />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
     <br />
    <el-table :data="permission_data" border style="width: 100%">
      <el-table-column prop="key" label="ID" width="150"></el-table-column>
      <el-table-column prop="label" label="功能权限" width="220"></el-table-column>
      <el-table-column prop="disabled" label="是否禁用"  width="150" :formatter="formatter"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Permission",
  data() {
    return {
      permission_data: [
        { key: 1, label: "新建产品原型", disabled: false },
        { key: 2, label: "编辑产品原型", disabled: false },
        { key: 3, label: "查询产品原型", disabled: false },
        { key: 4, label: "删除产品原型", disabled: false },
        { key: 5, label: "导出产品原型", disabled: false },
        { key: 6, label: "新建分类", disabled: false },
        { key: 7, label: "编辑分类", disabled: false },
        { key: 8, label: "查询分类", disabled: false },
        { key: 9, label: "删除分类", disabled: false },
        { key: 10, label: "导出分类", disabled: false },
        { key: 11, label: "新建账号", disabled: false },
        { key: 12, label: "编辑账号", disabled: false },
        { key: 13, label: "查询账号", disabled: false },
        { key: 14, label: "删除账号", disabled: false },
        { key: 15, label: "导出账号", disabled: false }
      ]
    };
  },
  props: [
    "prop_is_show",
    "prop_category_id",
    "prop_category_name",
    "prop_category_create_time",
    "prop_category_is_delete"
  ],
  methods: {
    formatter(row, column) {
        if (row.disabled===false) {
          return "启用";
        } else {
          return "禁用";
        }
      }
  },
  computed: {},
  watch: {},
  created() {},
  beforeCreate() {},
  mounted() {},
  beforeMount() {},
  destroyed() {},
  beforeDestroy() {}
};
</script>
<style lang="">
</style>