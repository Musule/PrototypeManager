<template>
  <div id="Category">
    <br />
    <br />
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员登录</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <br />
    <div>
      <el-form
        v-show="is_show_login_form"
        size="medium"
        :model="form_data"
        :rules="form_data_rules"
        ref="form_data"
        label-width="400px"
        class="demo-ruleForm"
      >
        <el-form-item label="管理员账号：" :label-width="formLabelWidth" prop="user_name">
          <el-input
            clearable
            maxlength="200"
            style="width:300px"
            id="user_name"
            v-model="form_data.user_name"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员密码：" :label-width="formLabelWidth" prop="password">
          <el-input
            clearable
            maxlength="200"
            style="width:300px"
            id="password"
            v-model="form_data.password"
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="is_show_login_form" type="primary" @click="submit_form('form_data')">登 录</el-button>
        <el-button v-show="is_show_logout_form" type="primary" @click="logout()">退出登录</el-button>

      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  inject: ["reload"],
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      formLabelWidth: "200px", 
      user_name: "", 
      password: "", 
      result: "", 
      permission_content: [], 
      form_data: {
        user_name: "",
        password: ""
      },
      form_data_rules: {
        user_name: [
          { required: true, message: "请输入账号", trigger: "change" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ]
      }
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
    submit_form_cancel() {
      this.$confirm("确认关闭？数据将不被保存")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    logout() {
      window.sessionStorage.clear();
      window.localStorage.clear();
      this.$store.dispatch("is_login", false);
      this.$message({
        message: "退出成功,请刷新页面",
        type: "success"
      });
      this.reload();
    },
    submit_form(form_data) {
      this.$refs[form_data].validate(valid => {
        if (valid) {
          this.$confirm("是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$http
                .post(this.GLOBAL.server_url + this.GLOBAL.login, {
                  user_name: this.form_data.user_name,
                  password: this.form_data.password
                })
                .then(function(res) {
                  console.log(res);
                  if (res.body.msg !== "登录成功") {
                    this.$notify({
                      title: "失败",
                      message: "账号或密码错误",
                      type: "error"
                    });
                  } else {
                    this.$notify({
                      title: "登录",
                      message: "成功",
                      type: "success"
                    });
                    this.is_show_login_form = false;
                    this.is_show_logout_form = true;
                    this.$store.dispatch("set_is_login", true);
                    var permission = res.body.permission;
                    for (let index = 0; index < permission.length; index++) {
                      const element = permission[index];
                      switch (element) {
                        case 1:
                          this.$store.dispatch("set_url_add", true);
                          break;
                        case 2:
                          this.$store.dispatch("set_url_edit", true);
                          break;
                        case 3:
                          this.$store.dispatch("set_url_search", true);
                          break;
                        case 4:
                          this.$store.dispatch("set_url_delete", true);
                          break;
                        case 5:
                          this.$store.dispatch("set_output_url", true);
                          break;
                        case 6:
                          this.$store.dispatch("set_category_add", true);
                          break;
                        case 7:
                          this.$store.dispatch("set_category_edit", true);
                          break;
                        case 8:
                          this.$store.dispatch("set_category_search", true);
                          break;
                        case 9:
                          this.$store.dispatch("set_category_delete", true);
                          break;
                        case 10:
                          this.$store.dispatch("set_output_category", true);
                          break;
                        case 11:
                          this.$store.dispatch("set_username_add", true);
                          break;
                        case 12:
                          this.$store.dispatch("set_username_edit", true);
                          break;
                        case 13:
                          this.$store.dispatch("set_username_search", true);
                          break;
                        case 14:
                          this.$store.dispatch("set_username_delete", true);
                          break;
                        default:
                          this.$store.dispatch("set_output_username", true);
                          break;
                      }
                      window.sessionStorage.setItem(
                        "permission",
                        res.body.permission
                      ); 
                    }
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        } else {
          alert("请填写完整再提交");
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    is_show_login_form() {
      if (this.$store.getters.is_login === true) {
        return false;
      } else {
        return true;
      }
    },
    is_show_logout_form() {
      if (this.$store.getters.is_login === true) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {},
  created() {},
  beforeCreate() {},
  mounted() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  destroyed() {},
  beforeDestroy() {}
};
</script>
<style lang="">
</style>