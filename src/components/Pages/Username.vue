<template>
  <div id="Home">
    <br />
    <br />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-dialog
      title="新建用户"
      :visible.sync="add_isDisplay"
      width="60%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          size="medium"
          :model="user_form"
          :rules="user_rules"
          ref="user_form"
          label-width="400px"
          class="demo-ruleForm"
        >
          <el-form-item label="ID" :label-width="formLabelWidth" prop="user_id">
            <el-input
              clearable
              maxlength="200"
              style="width: 400px"
              id="user_id"
              v-model="user_form.user_id"
              placeholder="请输入ID"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户账号"
            :label-width="formLabelWidth"
            prop="user_name"
          >
            <el-input
              clearable
              maxlength="200"
              style="width: 400px"
              id="user_name"
              v-model="user_form.user_name"
              placeholder="请输入用户账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="权限"
            :label-width="formLabelWidth"
            prop="function_permission"
          >
            <el-transfer
              :titles="['可选', '已选']"
              filterable
              filter-placeholder="请输入功能权限（菜单权限）名称"
              v-model="user_form.function_permission"
              :data="function_permission_data"
              @change="debug_"
            ></el-transfer>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit_add_form('user_form')"
          >提交</el-button
        >
        <el-tooltip
          class="item"
          effect="dark"
          content="确定要取消？"
          placement="top"
        >
          <el-button @click="submit_add_form_cancel">取 消</el-button>
        </el-tooltip>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑用户"
      :visible.sync="edit_isDisplay"
      width="60%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          size="medium"
          :model="user_eidt_form"
          :rules="user_rules"
          ref="user_eidt_form"
          label-width="400px"
          class="demo-ruleForm"
        >
          <el-form-item label="ID" :label-width="formLabelWidth" prop="user_id">
            <el-input
              clearable
              maxlength="200"
              style="width: 400px"
              id="user_id"
              v-model="user_eidt_form.user_id"
              placeholder="请输入ID"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户账号"
            :label-width="formLabelWidth"
            prop="user_name"
          >
            <el-input
              clearable
              maxlength="200"
              style="width: 400px"
              id="user_name"
              v-model="user_eidt_form.user_name"
              placeholder="请输入用户账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="权限"
            :label-width="formLabelWidth"
            prop="function_permission"
          >
            <el-transfer
              :titles="['可选', '已选']"
              filterable
              filter-placeholder="请输入功能权限（菜单权限）名称"
              v-model="user_eidt_form.function_permission"
              :data="function_permission_data"
              @change="debug_"
            ></el-transfer>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit_edit_form('user_eidt_form')"
          >提交</el-button
        >
        <el-tooltip
          class="item"
          effect="dark"
          content="确定要取消？"
          placement="top"
        >
          <el-button @click="submit_add_form_cancel">取 消</el-button>
        </el-tooltip>
      </span>
    </el-dialog>
    <el-drawer
      size="45%"
      id="view"
      title="查看用户"
      :visible.sync="view_isDisplay"
      :direction="direction"
    >
      <div>
        <el-form
          size="medium"
          :model="user_eidt_form"
          :rules="user_rules"
          ref="user_eidt_form"
          label-width="400px"
          class="demo-ruleForm"
          close-on-press-escape
        >
          <el-form-item
            label="用户账号"
            :label-width="formLabelWidth"
            prop="user_name"
          >
            <el-input
              clearable
              maxlength="200"
              style="width: 400px"
              id="user_name"
              v-model="user_eidt_form.user_name"
              placeholder="用户账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth" prop="user">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 5 }"
              maxlength="2000"
              style="width: 400px"
              id="user_create_time"
              v-model="user_eidt_form.user_create_time"
              placeholder="创建时间"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <div
      id="default_content"
      v-show="isDisplay"
      style="margin-top: 10px; margin-left: 30px; margin-bottom: 30px"
    >
      <el-input
        v-show="is_show_username_search"
        suffix-icon="el-icon-search"
        clearable
        maxlength="100"
        style="width: 400px; margin-right: 5px; margin-left: 5px"
        v-model="db_Select_input_name"
        placeholder="请输入用户账号"
      ></el-input>

      <el-button
        v-show="is_show_username_search"
        @click="search()"
        id="Select_button"
        type="primary"
        style="margin-right: 5px; margin-left: 5px"
        >搜索</el-button
      >

      <p></p>
      <el-button
        v-show="is_show_username_add"
        @click="add_button()"
        type="primary"
        style="margin-right: 5px; margin-left: 5px"
        >新增账号</el-button
      >
      <el-button
        v-show="is_show_output_username"
        @click="exportExcel"
        id="exportExcel"
        type="warning"
        style="margin-right: 5px; margin-left: 5px"
        >导出用户</el-button
      >
      <p></p>
      <el-table
        ref="multipleTable"
        id="out-table"
        :row-class-name="tableRowClassName"
        border
        size="medium"
        highlight-current-row
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="
          tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)
        "
        style="width: 100%"
        :default-sort="{ prop: 'user_name', order: 'descending' }"
      >
        <el-table-column
          type="index"
          label="序号"
          header-align="center"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="user_id"
          sortable
          label="ID"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="user_name"
          sortable
          label="用户账号"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="function_permission"
          sortable
          label="权限"
          :formatter="formatter"
          width="350"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="user_create_time"
          sortable
          label="创建时间"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button
                v-show="is_show_username_edit"
                type="warning"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-edit"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip content="查看" placement="top">
              <el-button
                type="primary"
                @click="handleView(scope.$index, scope.row)"
                icon="el-icon-view"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                v-show="is_show_username_delete"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
import XLSX from "xlsx"; 
import user_json from "../../../server/public/User.json";
import Username from "./Username";
export default {
  inject: ["reload"],
  provide() {
    return {
      reload: this.reload,
    };
  },
  name: "Username",
  data() {
    return {
      user_form: {
        user_id: "",
        user_name: "", 
        password: "", 
        function_permission: [],
        user_create_time: "", 
        user_is_delete: false,
      },
      user_eidt_form: {
        user_id: "", 
        user_name: "", 
        password: "", 
        function_permission: [], 
        user_create_time: "", 
        user_is_delete: false,
      },
      function_permission_data: [
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
        { key: 15, label: "导出账号", disabled: false },
      ],
      loading: true,
      db_Select_input_name: "",
      tableData: [],
      tableData_result: [],
      currentPage: 1,
      totalCount: 1,
      pageSizes: [5, 10, 20, 30, 40, 50, 100],
      PageSize: 100,
      isDisplay: true,
      add_isDisplay: false,
      edit_isDisplay: false,
      formLabelWidth: "110px",
      isRouterAlive: true,
      user_rules: {
        user_id: [
          { required: true, message: "请输入ID", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        user_name: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          {
            min: 2,
            max: 500,
            message: "长度在 2 到 500 个字符",
            trigger: "blur",
          },
        ],
      },
      user_options: [],
      view_isDisplay: false,
      drawer: false,
      direction: "ltr", 
    };
  },
  methods: {
    Select_all_user_data() {
      this.tableData = [];
      this.$http
        .get(this.GLOBAL.server_url + this.GLOBAL.select_user)
        .then(function (res) {
          for (let index = 0; index < res.body.msg.length; index++) {
            const element = res.body.msg[index];
            if (element["user_is_delete"] === false) {
              this.tableData.push(element);
            }
          }
          this.totalCount = this.tableData.length;
          if (res.status === 200) {
            this.loading = false;
          }
          console.log("用户总数：" + this.totalCount);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    search() {
      if (this.db_Select_input_name === "") {
        this.Select_all_user_data();
      } else {
        this.$http
          .post(this.GLOBAL.server_url + this.GLOBAL.search_user_condition, {
            user_name: this.db_Select_input_name,
          })
          .then(function (res) {
            this.tableData = res.body.msg;
            this.totalCount = Object.keys(res.body.msg).length;
            console.log(this.totalCount);
            this.$notify({
              title: "搜索",
              message: "完成",
              type: "success",
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    add_button() {
      this.isDisplay = true;
      this.add_isDisplay = true;
      this.edit_isDisplay = false;
    },
    handleView(index, row) {
      this.view_isDisplay = true;
      this.user_form = Object.assign({}, row);    
      this.user_eidt_form.user_id = this.user_form["user_id"]; 
      this.user_eidt_form.user_name = this.user_form["user_name"]; 
      this.user_eidt_form.password = this.user_form["password"]; 
      this.user_eidt_form.function_permission = this.user_form[
        "function_permission"
      ]; 
      this.user_eidt_form.user_create_time = this.user_form["user_create_time"]; 
      this.user_eidt_form.user_is_delete = this.user_form["user_is_delete"]; 
    },
    handleEdit(index, row) {
      console.log(index, row.user_id); 
      this.edit_isDisplay = true; 
      this.user_form = Object.assign({}, row); 
      this.user_eidt_form.user_id = this.user_form["user_id"]; 
      this.user_eidt_form.user_name = this.user_form["user_name"];
      this.user_eidt_form.password = this.user_form["password"];
      this.user_eidt_form.function_permission = this.user_form[
        "function_permission"
      ];
      this.user_eidt_form.user_create_time = this.user_form["user_create_time"];
      this.user_eidt_form.user_is_delete = this.user_form["user_is_delete"];
      console.log("id", this.user_eidt_form.user_id);
    },
    debug_() {
      // alert(this.user_form.function_permission)
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .delete(this.GLOBAL.server_url + this.GLOBAL.delete_user, {
              body: {
                user_id: row.user_id,
              },
            })
            .then(function (res) {
              console.log(res);

              if (res.status === 200) {
                this.refresh_page(); 
              }
            })
            .catch(function (error) {
              console.log(error);
            });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    refresh_page() {
      this.reload();
    },
  
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if (row.user_is_delete === true) {
        return "failure-row";
      } else if (row.user_is_delete === false) {
        return "pass-row";
      }
      return "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submit_add_form_cancel() {
      this.$confirm("确认关闭？数据将不被保存")
        .then((_) => {
          this.add_isDisplay = false;
          this.edit_isDisplay = false;
          this.refresh_page;
          done();
        })
        .catch((_) => {});
    },
    submit_add_form(user_form) {
      this.$refs[user_form].validate((valid) => {
        if (valid) {
          this.$confirm("此操作将新增一条记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.user_form.user_create_time = this.getTime();
              this.$http
                .post(this.GLOBAL.server_url + this.GLOBAL.add_user, {
                  user_id: this.user_form.user_id,
                  user_name: this.user_form.user_name,
                  password: this.user_form.password,
                  function_permission: this.user_form.function_permission,
                  user_create_time: this.user_form.user_create_time,
                  user_is_delete: false,
                })
                .then(function (res) {
                  console.log(res);
                  if (
                    JSON.stringify(res.body).indexOf("Duplicate") != -1 ||
                    JSON.stringify(res.body).indexOf("PRIMARY") != -1
                  ) {
                    this.$notify({
                      title: "失败",
                      message: "文件编号重复",
                      type: "error",
                    });
                  } else {
                    switch (res.body.code) {
                      case 202:
                        this.$notify({
                          title: "重复",
                          message: "ID已存在",
                          type: "error",
                        });
                        break;

                      default:
                        this.$notify({
                          title: "新增",
                          message: "成功",
                          type: "success",
                        });
                        break;
                    }
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消新增",
              });
            });
        } else {
          alert("请填写完整再提交");
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit_edit_form(user_eidt_form) {
      this.$refs[user_eidt_form].validate((valid) => {
        if (valid) {
          this.$confirm("此操作将更新记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$http
                .put(this.GLOBAL.server_url + this.GLOBAL.update_user, {
                  user_id: this.user_eidt_form.user_id,
                  user_name: this.user_eidt_form.user_name,
                  password: this.user_eidt_form.password,
                  function_permission: this.user_eidt_form.function_permission,
                  user_create_time: this.user_eidt_form.user_create_time,
                  user_is_delete: false,
                })
                .then(function (res) {
                  console.log(res);
                  this.$notify({
                    title: "保存",
                    message: "成功",
                    type: "success",
                  });
                })
                .catch(function (error) {
                  console.log(error);
                  this.$notify({
                    title: "失败",
                    message: "错误内容：" + error,
                    type: "error",
                  });
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消",
              });
            });
        } else {
          alert("请填写完整再提交");
          console.log("error submit!!");
          return false;
        }
      });
    },
    exportExcel() {
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "账号数据.xlsx"
        );
        this.$notify({
          title: "导出",
          message: "请选择保存位置",
          type: "success",
        });
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    getTime() {
      var D = new Date();
      return `${D.getFullYear()}-${D.getMonth()}-${D.getDate()}-${D.getHours()}-${D.getMinutes()}-${D.getSeconds()}`;
    },
    formatter(row, column) {
      var array = row.function_permission;
      var arr = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        switch (element) {
          case 1:
            arr.push("新建产品原型,");
            break;
          case 2:
            arr.push("编辑产品原型,");
            break;
          case 3:
            arr.push("查询产品原型,");
            break;
          case 4:
            arr.push("删除产品原型,");
            break;
          case 5:
            arr.push("导出产品原型,");
            break;
          case 6:
            arr.push("新建分类,");
            break;
          case 7:
            arr.push("编辑分类,");
            break;
          case 8:
            arr.push("查询分类,");
            break;
          case 9:
            arr.push("删除分类,");
            break;
          case 10:
            arr.push("导出分类,");
            break;
          case 11:
            arr.push("新建账号,");
            break;
          case 12:
            arr.push("编辑账号,");
            break;
          case 13:
            arr.push("查询账号,");
            break;
          case 14:
            arr.push("删除账号,");
            break;
          default:
            arr.push("导出账号,");
            break;
        }
      }
      return arr;
    },
  },
  watch: {

  },
  computed: {
    is_show_username_add() {
      return this.$store.getters.username_add;
    },
    is_show_username_edit() {
      return this.$store.getters.username_edit;
    },
    is_show_username_search() {
      return this.$store.getters.username_search; 
    },
    is_show_username_delete() {
      return this.$store.getters.username_delete;
    },
    is_show_output_username() {
      return this.$store.getters.output_username; 
    },
  },
  components: {
    Username,
  },
  created() {
    this.Select_all_user_data();
    if (localStorage.getItem("pagination") === null) {
      this.currentPage = 1;
      console.log("created()且localStorage pagination为空:" + this.currentPage);
    } else {
      this.currentPage = parseInt(localStorage.getItem("pagination")); //localStorage获取的是字符串，所以需要转换一下
      console.log("created():" + this.currentPage);
    }
  },
  beforeCreate() {},
  beforeMount() {},
  mounted() {
  },
  updated() {
    if (this.isDisplay === true) {
    }
  },
  beforeUpdate() {
    localStorage.setItem("pagination", this.currentPage);
    console.log("beforeUpdate():" + this.currentPage);
  },
  beforeDestroy() {},
};
</script>

<style scoped>
.el-header {
  background-color: #5999e2;
  border-color: #7a7a7a;
  color: #f1eeee;
  font-size: 40px;
  text-align: center;
  line-height: 60px;
}
.el-footer {
  background-color: #5999e2;
  border-color: #7a7a7a;
  color: #f1eeee;
  text-align: center;
  line-height: 60px;
}


.el-main {
  background-color: #ffffff;
  border-color: #7a7a7a;
  color: #333;
  text-align: left;
  line-height: 10px;
  height: 760px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
