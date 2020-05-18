<template>
    <div class="detail">
        <van-panel :title="info.title" :desc="info.add_time | dateFormat">
            <div v-html="info.content"></div>
        </van-panel>
        <Cmt-box :id="this.id"></Cmt-box>
    </div>
</template>

<script>
import CmtBox from '@/components/CmtBox.vue';
import cyaxios from "@/tools/cyaxios";
import {NewsInfoURL} from "@/tools/api";
export default {
    data() {
        return {
            id: this.$route.params.id,
            info: []
        }
    },
    created() {
        this.getNewsDetail()
    },
    methods: {
        async getNewsDetail() {
            let result = await cyaxios('GET',NewsInfoURL+this.id);
            this.info = result.message && result.message[0]
        }
    },
    components: {
        CmtBox
    }
}
</script>

<style lang="less" scoped>
    .van-panel {
        .van-panel__header{
            .van-cell__title{
                text-align: center;
                span{
                    color: red;
                    font-size: 16px;
                    font-weight: bold;
                }
                .van-cell__label{
                    text-align: right;
                }
            }
        }
        .van-panel__content{
            padding: 16px;
            color: #8f8f94;
            font-size: 14px;
        }
    }
</style>