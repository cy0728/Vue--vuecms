<template>
    <div>
        <van-tabs @click="tabChanged" v-model="activeName" animated>
            <van-tab v-for="item in cates" :name="item.id" :title="item.title" :key="item.id">
                <ul class="photo-list">
                    <router-link v-for="photo in list" :key="photo.id" tag="li" :to="'/photoInfo/'+photo.id">
                        <img v-lazy="photo.img_url">
                        <div class="info">
                            <h1 class="info-title">
                                {{photo.title}}
                            </h1>
                            <div class="info-body">
                                {{photo.zhaiyao}}
                            </div>
                        </div>
                    </router-link>
                </ul>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { ImgCategoryURL, ImagesURL } from '@/tools/api';
import cyaxios from "@/tools/cyaxios";
export default {
    data() {
        return {
            cates: [],
            list: [],
            activeName: 0
        }
    },
    created() {
        this.getPhotoCategory();
    },
    methods: {
        //获取图片分类数据的方法
        async getPhotoCategory() {
            let result = await cyaxios('GET', ImgCategoryURL);
            console.log(result)
            this.cates = result.message;
            this.cates.unshift({title: "全部", id: 0});
            //根据指定分类来获取分类下的图片列表信息
            this.getPhotoListByCateId(this.cates[0].id);
        },
        //根据指定分类获取该分类下的列表
        async getPhotoListByCateId(id) {
            let result = await cyaxios('GET', ImagesURL+id);
            this.list = result.message;
        },
        tabChanged(name, title) {
            //先清空之前的数据源
            this.list = [];
            //再加载新的数据
            this.getPhotoListByCateId(this.activeName);
        }
    },
}
</script>

<style lang="less" scoped>
    .van-tab__pane{
        padding: 16px;
    }
    .photo-list{
        list-style: none;
        margin: 0px;
        padding: 10px;
        li{
            position: relative;
            box-shadow: 0px 0px 9px #999;
            margin-bottom: 10px;
            img{
                width: 100%;
            }
            .info{
                color: white;
                position: absolute;
                bottom: 0px;
                width: 100%;
                background-color: rgba(0, 0, 0, .4);
                overflow: auto;
                max-height: 90px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 12px;
                }
            }
        }
    }
</style>