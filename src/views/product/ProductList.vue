<template>
    <div class="goods-list">
      <router-link
        class="goods-item"
        v-for="item in productlist"
        :key="item.id"
        :to="'/productInfo/'+item.id"
        tag="div"
      >
        <img :src="item.img_url" alt />
        <h1 class="title">{{ item.title }}</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥{{ item.sell_price }}</span>
            <span class="old">￥{{ item.market_price }}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
          </p>
        </div>
      </router-link>
      <van-button type="info" block @click="getMore">加载更多</van-button>
    </div>
</template>

<script>
import { ProductURL } from '@/tools/api'
import cyaxios from '@/tools/cyaxios'
export default {
    data() {
        return {
            pageindex: 1,
            productlist: []
        }
    },
    created() {
        this.getProductList();
    },
    methods: {
        async getProductList() {
            let result = await cyaxios('GET', ProductURL, {
                params: { pageindex: this.pageindex }
            });
            if ( result.status === 0 ) {
                if ( result.message.length == 0 ) {
                    return;
                }
                this.productlist = [...this.productlist, ...result.message];
            }
        },
        getMore() {
            this.pageindex++;
            this.getProductList();
        }
    }
}
</script>

<style lang="less" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;

        .goods-item {
            width: 49%;
            box-sizing: border-box;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;

            img {
                width: 100%;
            }
            .title {
                font-size: 14px;
            }

            .info {
                background-color: #eee;
                p {
                    margin: 0;
                    padding: 5px;
                }
                .price {
                    .now {
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                    }
                    .old {
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>