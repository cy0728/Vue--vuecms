<template>
    <div>
        <van-panel>
            <template slot="header">
                <div class="header">
                    <h4 class="title">{{info.title}}</h4>
                    <div class="desc">
                        <span class="addtime">{{info.add_time | dateFormat}}</span>
                        <span class="clickcount">点击:{{info.click}}次</span>
                    </div>
                </div>
            </template>
            <template slot="default">
                <vue-preview :slides="thubs"></vue-preview>
                <div class="content" v-html="info.content"></div>
            </template>
        </van-panel>
    </div>
</template>

<script>
import { ImageInfoURL, ThumImageURL } from '@/tools/api'
import cyaxios from '@/tools/cyaxios'
export default {
    data() {
        return {
            id: this.$route.params.id,
            info: [],
            thubs: []
        }
    },
    created() {
        this.getPhotoInfo();
        this.getPhotoThubs();
    },
    methods: {
        async getPhotoInfo() {
            let result = await cyaxios('GET', ImageInfoURL + this.id);
            this.info = result.message[0];
        },
        async getPhotoThubs() {
            let result = await cyaxios('GET', ThumImageURL + this.id);
            var data = result.message;
            data.forEach(item => {
                item.msrc = item.src;
                item.w = 400;
                item.h = 200;
            })
            this.thubs = data;
        }
    }
}
</script>

<style lang="less" scoped>
    .header{
        padding: 5px;
        .title{
            text-align: center;
            color: #26a2ff;
        }
        .desc{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            margin-top: 10px;
        }
    }
    .van-panel__content{
        font-size: 13px;
        line-height: 2;
        /deep/ .my-gallery{
            margin-left: 7px;
            figure{
                width: 80px;
                margin: 5px;
                display: inline-block;
                overflow: hidden;
                box-sizing: border-box;
                a {
                    img[itemprop] {
                        box-shadow: 0 0 8px #999;
                        width: 80px;
                    }
                }
            }
        }
        .content{
            padding: 5px;
        }
    }
</style>