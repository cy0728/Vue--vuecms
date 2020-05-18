<template>
    <div class="hone">
        <van-swipe class="my-swipe" :autoplay="3000">
            <van-swipe-item v-for="item in lunboList" :key="item.url">
                <img v-lazy="item.img" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :column-num="3">
            <van-grid-item
                v-for="item in itemList"
                :key="item.title"
                :icon="item.url"
                :text="item.title"
                :to="item.to"
            />
        </van-grid>
    </div>
</template>

<script>
import cyaxios from "@/tools/cyaxios";
import { LunboURL } from "@/tools/api";
export default {
    data() {
        return {
            lunboList: [],
            itemList: [
                {
                    title: "新闻资讯",
                    url: require("../images/menu1.png"),
                    to: "/newsList",
                },
                {
                    title: "图片分享",
                    url: require("../images/menu2.png"),
                    to: "/photoList",
                },
                {
                    title: "商品购买",
                    url: require("../images/menu3.png"),
                    to: "/productList",
                },
                {
                    title: "留言反馈",
                    url: require("../images/menu4.png"),
                    to: "/",
                },
                {
                    title: "视频专区",
                    url: require("../images/menu5.png"),
                    to: "/",
                },
                {
                    title: "联系我们",
                    url: require("../images/menu6.png"),
                    to: "/",
                },
            ],
        };
    },
    created() {
        this.getLunbo();
    },
    methods: {
        async getLunbo() {
            let result = await cyaxios("GET", LunboURL);
            this.lunboList = result.message;
        },
    },
};
</script>

<style lang="less" scoped>
.my-swipe {
    height: 200px;
    overflow: hidden;
    .van-swipe-item {
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
}

.van-grid {
    /deep/ .van-icon__image {
        width: 2em;
        height: 2em;
    }
}
</style>
