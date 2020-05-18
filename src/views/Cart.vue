<template>
    <div>
        <van-cell-group>
            <van-cell v-for="(item, idx) in productInfo" :key="item.id">
                <div class="icon" slot="icon">
                    <van-checkbox
                        v-model="productSelected[item.id]"
                        @change="itemSelectedChanged($event, item.id)"
                    ></van-checkbox>
                    <van-image
                        width="170"
                        height="120"
                        :src="item.thumb_path"
                    />
                </div>
                <div class="title" slot="title">{{ item.title }}</div>
                <div class="label" slot="label">
                    <span class="price">{{ item.sell_price }}</span>
                    <van-stepper
                        v-model="$store.getters.getProductCount[item.id]"
                        min="1"
                        button-size="24px"
                        disable-input
                        @change="valueChanged($event, item.id)"
                    />
                    <van-button
                        type="info"
                        size="small"
                        @click.prevent="remove(item.id, idx)"
                        >删除</van-button
                    >
                </div>
            </van-cell>
        </van-cell-group>
        <van-panel>
            <div class="jiesuan" slot="header">
                <div class="left">
                    <p>总计{{ $store.getters.getAllProductCount }}件</p>
                    <p>
                        已勾选
                        <span class="red">
                            {{ $store.getters.getSelectedProductCountAndAmount.count }}
                        </span>件，
                        总价
                        <span class="red">
                            ￥{{ $store.getters.getSelectedProductCountAndAmount.amount }}
                        </span>
                    </p>
                </div>
                <van-button type="danger">去结算</van-button>
            </div>
        </van-panel>
    </div>
</template>

<script>
import { ShopcarListURL } from "@/tools/api";
import cyaxios from "@/tools/cyaxios";
export default {
    data() {
        return {
            buynum: 1,
            productInfo: [],
            productSelected: this.$store.getters.getProductSelected,
        };
    },
    created() {
        this.getProductInfo();
    },
    methods: {
        async getProductInfo() {
            var idArr = [];
            this.$store.state.car.forEach((item) => {
                idArr.push(item.id);
            });
            //如果购物车为空
            if (idArr.length == 0) {
                return;
            }
            //发送请求
            let result = await cyaxios("GET", ShopcarListURL + idArr.join(","));
            this.productInfo = result.message;
        },
        //更改购物车数量
        valueChanged(e, id) {
            this.$store.commit("updateCar", { id, count: e });
        },
        //删除购物车
        remove(id, idx) {
            this.productInfo.splice(idx, 1);
            this.$store.commit("removeCar", id);
        },
        //更改购物车选中的状态信息
        itemSelectedChanged(e, id) {
            this.$store.commit("updateProductSelected", { id, selected: e });
        },
    },
};
</script>

<style lang="less" scoped>
.icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .van-image {
        margin: 10px;
    }
}
.title {
    font-size: 14px;
    font-weight: bold;
    margin-top: 7px;
}
.label {
    .van-stepper {
        display: inline-block;
        vertical-align: middle;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .price {
        font-size: 14px;
        font-weight: bold;
        color: red;
    }
}
.van-panel {
    padding: 16px;
    color: #515a6e;
    font-size: 14px;
    .jiesuan {
        display: flex;
        justify-content: space-between;
        .red {
            color: red;
            font-weight: bold;
        }
    }
}
</style>
