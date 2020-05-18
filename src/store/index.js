import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        car: [],
    },
    mutations: {
        //添加购物车
        addToCar(state, productInfo) {
            //记录当前要添加的商品在购物车中是否存在
            var flag = false;
            state.car.forEach((item) => {
                if (item.id == productInfo.id) {
                    item.count += productInfo.count;
                    flag = true;
                }
            });
            if (flag == false) {
                state.car.push(productInfo);
            }
        },
        //更改购物车
        updateCar(state, obj) {
            state.car.forEach((item) => {
                if (item.id == obj.id) {
                    item.count = obj.count;
                }
            });
        },
        //删除购物车
        removeCar(state, id) {
            var idx = state.car.findIndex((item) => {
                if (item.id == id) {
                    return true;
                }
            });
            state.car.splice(idx, 1);
        },
        //更改购物车选中信息
        updateProductSelected(state, obj) {
            state.car.forEach((item) => {
                if (item.id == obj.id) {
                    item.selected = obj.selected;
                }
            });
        },
    },
    getters: {
        //得到购物车中所有商品的数量
        getAllProductCount(state) {
            var count = 0;
            state.car.forEach((item) => {
                count += item.count;
            });
            return count;
        },
        //返回某个商品对应的购物车数量
        getProductCount(state) {
            var obj = {};
            state.car.forEach((item) => {
                obj[item.id] = item.count;
            });
            return obj;
        },
        //返回某个商品有没有选中的信息
        getProductSelected(state) {
            var o = {};
            state.car.forEach((item) => {
                o[item.id] = item.selected;
            });
            return o;
        },
        //返回选中的件数和总价
        getSelectedProductCountAndAmount(state) {
            var b = {
                count: 0,
                amount: 0,
            };
            state.car.forEach((item) => {
                if (item.selected) {
                    b.count += item.count;
                    b.amount += item.price * item.count;
                }
            });
            return b;
        },
    },
    modules: {},
    plugins: [createPersistedState()],
});
