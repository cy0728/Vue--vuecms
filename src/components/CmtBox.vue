<template>
    <div>
        <van-form @submit="onSubmit">
            <h4>发表评论</h4>
            <van-field
                autosize
                rows="3"
                type="textarea"
                v-model="content"
                placeholder="请输入你要评论的内容"
                :rules="[{ required: true, message: '请填写内容' }]"
            />
            <div style="margin: 16px;">
                <van-button block type="info" native-type="submit">
                    发表评论
                </van-button>
            </div>
        </van-form>
       
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item,idx) in commentList" :key="item.add_time">
                <template slot="title">
                    <span>
                        第{{idx}}楼 {{item.user_name}} {{item.add_time | dateFormat}}
                    </span>
                </template>
                <template slot="label">
                    <span>{{item.content}}</span>
                </template>
            </van-cell>
        </van-list>    
    </div>
</template>

<script>
import cyaxios from "@/tools/cyaxios";
import {CommentsURL} from "@/tools/api";
import {PostCommentURL} from "@/tools/api";
export default {
    props: ['id'],
    data() {
        return {
            content: '',
            pageIndex: 0,
            commentList: [],
            //列表的状态信息
            loading: false,
            finished: false
        }
    },
    methods: {
        async onSubmit() {
            let result = await cyaxios('POST', PostCommentURL+this.id, {
                content: this.content.trim()
            });
            //提交评论成功
            if (result.status == 0) {
                var obj = {
                    user_name: '匿名用户',
                    add_time: Date.now(),
                    content: this.content.trim()
                };
                this.commentList.unshift(obj);
                this.content = "";
            }
        },
        async onLoad() {
            //每一次调用onLoad方法加载数据的时候都让页码+1
            this.pageIndex++;
            let result = await cyaxios('GET', CommentsURL+this.id, {
                params: { pageindex: this.pageIndex }
            });
            //每一次请求完毕之后，让loading设置false(表述list的加载都已经完成了)
            this.loading = false;
            //如果服务器没有返回数据了，说明服务器的所有资源都已经加载完毕
            if (result.message.length == 0) {
                this.finished = true;
                return;
            }
            this.commentList = [...this.commentList, ...result.message];
        }
    }
}
</script>

<style lang="less" scoped>
    .van-form{
        h4{
            padding: 16px;
        }
        /deep/ .van-field__body{
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    }
</style>