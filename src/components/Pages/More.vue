<template>
  <div id="More">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <router-link to="/Home">产品原型管理</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/Category">分类管理</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/Username">账号管理</router-link>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">权限管理</template>
        <el-menu-item index="4-1">
          <router-link to="/Login">管理员登录</router-link>
        </el-menu-item>
        <el-menu-item index="4-2">
          <router-link to="/Permission">权限内容</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <transition name="el-fade-in-linear">
      <router-view class="transition-box" v-if="isRouterAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "More",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      activeIndex: "1"
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  props: [],
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
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>