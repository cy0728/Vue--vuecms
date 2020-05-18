<template>
    <div class="news">
        <van-pull-refresh 
            v-model="refreshing" 
            @refresh="onRefresh"
        >
            <van-list 
                v-model="loading" 
                :finished="finished" 
                finished-text="没有更多了" 
                @load="onLoad"
            >
                <van-cell 
                    v-for="item in newsList" 
                    :key="item.id" 
                    :to="'/newsDetail/'+item.id"
                >
                    <van-icon 
                        slot="icon" 
                        :name="item.img_url"
                    />
                    <template slot="title">
                        <h4 class="custom-title">
                            {{ item.title }}
                        </h4>
                    </template>
                    <template slot="label">
                        <span class="publishtime">
                            发表时间：{{ item.add_time | dateFormat }}
                        </span>
                        <span class="clickcoumt">
                            点击：{{ item.click }}次
                        </span>
                    </template>
                </van-cell>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import cyaxios from "@/tools/cyaxios";
import {NewsListURL} from "@/tools/api";
export default {
    data() {
        return {
            newsList: [],
            loading: false,
            finished: false,
            refreshing: false
        };
    },
    methods: {
        async onLoad() {
            let result = await cyaxios("GET",NewsListURL);
            if (this.refreshing) {
                this.newsList = [];
                this.refreshing = false;
            }
            this.newsList = result.message;
            this.loading = false;
            this.finished = true;
        },
        onRefresh() {
            this.finished = false;
            this.loading = true;
            this.onLoad();
        }
    }
}
</script>

<style lang="less" scoped>
    .van-list{
        .van-cell{
            .van-icon{
                margin-top: 6px;
                margin-right: 5px;
                img{
                    width: 2.5em;
                    height: 2.5em;
                }
            }
            .van-cell__label{
                display: flex;
                justify-content: space-between;
            }
            .van-cell__title{
                width: 80%;
                .custom-title{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>