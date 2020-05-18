<template>
    <van-panel :title="productDetail.title">
        <div slot="default">
            <div class="content" v-html="productDetail.content"></div>
        </div>
    </van-panel>
</template>

<script>
import { ProductDetailURL } from '@/tools/api';
import cyaxios from '@/tools/cyaxios';
export default {
    data() {
        return {
            id: this.$route.params.id,
            productDetail: {}
        }
    },
    created() {
        this.getProductDetail();
    },
    methods: {
        async getProductDetail() {
            let result = await cyaxios('GET', ProductDetailURL + this.id);
            this.productDetail = result.message.length > 0 ? result.message[0] : {};
        }
    }
}
</script>

<style lang="less" scoped>
    .van-cell__title{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        font-weight: bold;
    }
    .van-panel__content{
        padding: 16px;
        font-size: 13px;
        color: #515a6e;
        .content{
            font-size: 0px;
            /deep/ img{
                width: 100%;
            }
        }
    }
</style>