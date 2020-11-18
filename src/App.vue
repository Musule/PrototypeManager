<template>
  <div id="app">
    <div style="width: 100%;height: 100%;">
      <el-container>
        <el-header>产品原型管理</el-header>
        <el-container>
          <el-container>
            <el-main>
              <More></More>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
      <el-footer>Copyright ©️2020  <a href="https://github.com/liyinchigithub">https://github.com/liyinchigithub</a></el-footer>
      <el-backtop :bottom="60"></el-backtop>
    </div>
  </div>
</template>

<script>
import Home from "./components/Pages/Home";
import Category from "./components/Pages/Category";
import More from "./components/Pages/More";
import Username from "./components/Pages/Username";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  beforeCreate() {

    var permission = window.sessionStorage.getItem("permission").split(","); 
    if (permission.length > 0) {
      for (let index = 0; index < permission.length; index++) {
        const element = permission[index];
        switch (element) {
          case "1":
            this.$store.dispatch("set_url_add", true);
            break;
          case "2":
            this.$store.dispatch("set_url_edit", true);
            break;
          case "3":
            this.$store.dispatch("set_url_search", true);
            break;
          case "4":
            this.$store.dispatch("set_url_delete", true);
            break;
          case "5":
            this.$store.dispatch("set_output_url", true);
            break;
          case "6":
            this.$store.dispatch("set_category_add", true);
            break;
          case "7":
            this.$store.dispatch("set_category_edit", true);
            break;
          case "8":
            this.$store.dispatch("set_category_search", true);
            break;
          case "9":
            this.$store.dispatch("set_category_delete", true);
            break;
          case "10":
            this.$store.dispatch("set_output_category", true);
            break;
          case "11":
            this.$store.dispatch("set_username_add", true);
            break;
          case "12":
            this.$store.dispatch("set_username_edit", true);
            break;
          case "13":
            this.$store.dispatch("set_username_search", true);
            break;
          case "14":
            this.$store.dispatch("set_username_delete", true);
            break;
          default:
            this.$store.dispatch("set_output_username", true);
            break;
        }
      }
    }
  },
  components: {
    Home,
    Category,
    More,
    Username
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #409eff;
  color: #ffffff;
  font-size: 40px;
  text-align: center;
  line-height: 60px;
}
.el-footer {
  background-color: #409eff;
  color: #ffffff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #409eff;
  color: rgb(0, 0, 0);
  text-align: center;
  line-height: 600px;
  height: 800px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: left;
  line-height: 20px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 460px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

a {
  color: #313030;
  text-decoration: none;
  font-family: 微软雅黑;
}
.router-link-active {
  text-decoration: none;
}
</style>
