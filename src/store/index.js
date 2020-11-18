import vue from 'vue';// 引入vue
import Vuex from 'vuex';//引入vuex
vue.use(Vuex);// vue中注册vuex

// state
const state = { //设置的全局访问的state对象
    is_login: false,//是否登录的状态：登录成功 true 登录失败false
    url_add: false,//【产品原型管理】新建产品原型
    url_edit: false,//【产品原型管理】编辑产品原型
    url_search: true,//【产品原型管理】查询产品原型
    url_delete: false,//【产品原型管理】删除产品原型
    output_url: false,//【产品原型管理】导出产品原型
    category_add: false,//【分类管理】新建分类
    category_edit: false,//【分类管理】编辑分类
    category_search: true,//【分类管理】查询分类
    category_delete: false,//【分类管理】删除分类
    output_category: false,//【分类管理】导出分类
    username_add: false,//【账号管理】新建账号
    username_edit: false,//【账号管理】编辑账号
    username_search: true,//【账号管理】查询账号
    username_delete: false,//【账号管理】删除账号
    output_username: false,//【账号管理】导出账号
};
// getters   
const getters = { //实时监听state值的变化(最新状态)
    is_login(state) { //方法名随意！！,主要是来承载变化的state中key的值
        return state.is_login;   //【获取方式】this.$store.getters.is_login
    },
    url_add(state) { 
        return state.url_add; 
    },
    url_edit(state) {
        return state.url_edit;
    },
    url_search(state) {
        return state.url_search;
    },
    url_delete(state) {
        return state.url_delete;
    },
    output_url(state) {
        return state.output_url;
    },
    category_add(state) {
        return state.category_add;
    },
    category_edit(state) {
        return state.category_edit;
    },
    category_search(state) {
        return state.category_search;
    },
    category_delete(state) {
        return state.category_delete;
    },
    output_category(state) {
        return state.output_category;
    },
    username_add(state) {
        return state.username_add;
    },
    username_edit(state) {
        return state.username_edit;
    },
    username_search(state) {
        return state.username_search;
    },
    username_delete(state) {
        return state.username_delete;
    },
    output_username(state) {
        return state.output_username;
    },

};
// mutations
const mutations = {
    set_is_login(state, value) { //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.is_login = value;;  //【获取方式】 this.$store.commit('is_login',true) 
    },
    set_url_add(state, value) { 
        state.url_add = value;
    },
    set_url_edit(state, value) {
        state.url_edit = value;
    },
    set_url_search(state, value) {
        state.url_search = value;
    },
    set_url_delete(state, value) {
        state.url_delete = value;
    },
    set_output_url(state, value) {
        state.output_url = value;
    },
    set_category_add(state, value) {
        state.category_add = value;
    },
    set_category_edit(state, value) {
        state.category_edit = value;
    },
    set_category_search(state, value) {
        state.category_search = value;
    },
    set_category_delete(state, value) {
        state.category_delete = value;
    },
    set_output_category(state, value) {
        state.output_category = value;
    },
    set_username_add(state, value) {
        state.username_add = value;
    },
    set_username_edit(state, value) {
        state.username_edit = value;
    },
    set_username_search(state, value) {
        state.username_search = value;
    },
    set_username_delete(state, value) {
        state.username_delete = value;
    },
    set_output_username(state, value) {
        state.output_username = value;
    },
};
// action
const actions = {

    set_is_login(context, value) { //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性，所有context可以context.commit(state、context.commit(getters、context.commit(commit、context.commit(dispatch
        context.commit('set_is_login', value); //【获取方式】this.$store.dispatch("set_url_add",true)
    },
    set_url_add(context, value) { 
        context.commit('set_url_add', value);
    },
    set_url_edit(context, value) {
        context.commit('set_url_edit', value);
    },
    set_url_search(context, value) {
        context.commit('set_url_search', value);
    },
    set_url_delete(context, value) {
        context.commit('set_url_delete', value);
    },
    set_output_url(context, value) {
        context.commit('set_output_url', value);
    },
    set_category_add(context, value) {
        context.commit('set_category_add', value);
    },
    set_category_edit(context, value) {
        context.commit('set_category_edit', value);
    },
    set_category_search(context, value) {
        context.commit('set_category_search', value);
    },
    set_category_delete(context, value) {
        context.commit('set_category_delete', value);
    },
    set_output_category(context, value) {
        context.commit('set_output_category', value);
    },
    set_username_add(context, value) {
        context.commit('set_username_add', value);
    },
    set_username_edit(context, value) {
        context.commit('set_username_edit', value);
    },
    set_username_search(context, value) {
        context.commit('set_username_search', value);
    },
    set_username_delete(context, value) {
        context.commit('set_username_delete', value);
    },
    set_output_username(context, value) {
        context.commit('set_output_username', value);
    },
};
// 实例化vuex对象
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store;
