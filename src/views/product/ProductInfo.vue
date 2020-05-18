<template>
    <div class="content">
        <van-panel>
            <div slot="header">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(item, index) in productImages" :key="index">
                        <img v-lazy="item.src" />
                    </van-swipe-item>
                </van-swipe>
            </div>
        </van-panel>

        <van-panel :title="productinfo.title">
            <div slot="default">
                <p class="price">
                    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                        <div class="ball" v-show="ballFlag" ref="ball">
                            
                        </div>
                    </transition>
                    市场价：
                    <del>￥{{ productinfo.market_price }}</del>
                    销售价：
                    <span class="now_price">￥{{ productinfo.sell_price }}</span>
                </p>
                <p class="buynum">
                    购买数量：
                    <van-stepper v-model="buynum" min="1" :max="productinfo.stock_quantity" disabled-input />
                </p>

                <van-goods-action>
                    <van-goods-action-button type="warning" text="加入购物车" @click="addToCart" />
                    <van-goods-action-button type="danger" text="立即购买" @click="goBuy" />
                </van-goods-action>
            </div>
        </van-panel>

        <van-panel title="商品参数">
            <div slot="default">
                <div class="desc">
                    <p>商品货号：{{ productinfo.goods_no }}</p>
                    <p>库存情况：{{ productinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ productinfo.add_time | dateFormat }}</p>
                </div>
                <van-button type="primary" block @click="goToDetail">图文介绍</van-button>
            </div>
        </van-panel>
    </div>
</template>

<script>
import { ThumImageURL, ProductInfoURL } from '@/tools/api';
import cyaxios from '@/tools/cyaxios';
export default {
    data() {
        return {
            buynum: 1,
            id: this.$route.params.id,
            productImages: [],
            productinfo: {},
            ballFlag: false,
            //节流阀：用来控制动画执行的时机
            animFinished: true
        }
    },
    created() {
        this.getLunbo();
        this.getProductInfo();
    },
    methods: {
        async getLunbo() {
            let result = await cyaxios('GET', ThumImageURL + this.id);
            this.productImages = result.message;
        }, 
        async getProductInfo() {
            let result = await cyaxios('GET', ProductInfoURL + this.id);
            this.productinfo = result.message[0];
        },
        addToCart() {
            //当动画结束之后，才能修改this.ballFlag
            if (this.animFinished == true) {
                this.animFinished = false;
                this.ballFlag = !this.ballFlag;

                //生成一个商品数据
                var productInfo = {
                    id: this.id,
                    count: this.buynum,
                    price: this.productinfo.sell_price,
                    selected: true
                };
                //把商品添加到购物车
                this.$store.commit("addToCar", productInfo);
            }
        },
        goBuy() {

        },
        goToDetail() {
            //编程式导航
            this.$router.push({name: "ProductDetail", params:{id: this.id}});
        },
        beforeEnter(el) {
            el.style.transform = "translate(0,0)";
        },
        enter(el, done) {
            el.offsetWidth;
            //获取小球在页面的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();
            //计算偏移
            const xDist = badgePosition.left - ballPosition.left + 25;
            const yDist = badgePosition.top - ballPosition.top;
            //改变小球的偏移
            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 1s ease";
            //添加小球动画结束的监听事件
            el.addEventListener('transitionend', done);
        },
        afterEnter(el) {
            //完成动画的下半场
            el.style.transition = null;
            this.ballFlag = !this.ballFlag;
            //当小球动画结束之后，把animFinished重新设置为true，此时就可以再次添加购物车了
            this.animFinished = true;
        }
    }
}
</script>

<style lang="less" scoped>
    .content{
        padding: 7px;
        .van-panel{
            border: 1px solid #eee;
            border-radius: 5px;
            margin-bottom: 3px;
            .van-swipe {
                border-radius: 5px;
                height: 200px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .van-goods-action{
                position: static;
            }
            .van-panel__header {
                padding: 16px;
                .van-cell__title {
                font-size: 16px;
                }
            }

            .van-panel__content {
                padding: 16px;
                font-size: 14px;
                color: #8f8f94;
                .price {
                    position: relative;
                    .now_price {
                        color: red;
                        font-weight: bold;
                    }
                    .ball{
                        z-index: 50;
                        position: absolute;
                        top: 39px;
                        left: 116px;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background-color: red;
                    }
                }
                .buynum {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    .van-stepper {
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
                .van-goods-action {
                    position: static;
                }
                .desc {
                    p {
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
</style>