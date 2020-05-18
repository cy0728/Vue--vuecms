<template>
  <div id="app">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.meta.title" @click-left="onClickLeft">
      <van-icon name="arrow-left" slot="left" v-if="flag"/>
    </van-nav-bar>

    <router-view></router-view> 

    <!-- 标签栏 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/member">会员</van-tabbar-item>
      <van-tabbar-item to="/cart">
          <van-goods-action-icon id="badge" icon="cart-o" text="购物车" :info="$store.getters.getAllProductCount" />
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      active: 0
    }
  },
  created() {
    var arr = ["/", "/member", "/cart", "/search"];
      if (arr.includes(this.$route.path)) {
        this.flag = false;
      }
      else {
        this.flag = true;
      }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function (newVal, oldVal) {
      var routeArr = ["/", "/member", "/cart", "/search"];
      if (routeArr.includes(newVal)) {
        this.flag = false;
      }
      else {
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="less">
  *{
    margin: 0px;
    padding: 0px;
  }
  
</style>

<style lang="less" scoped>
  #app{
    padding-top: 46px;
    padding-bottom: 50px;
    overflow: hidden;
  }
  .van-nav-bar{
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #26a2ff;

    .van-nav-bar__title{
      color: white;
    }

    .van-icon{
      color: white;
    }
  }

  .van-tabbar {
    .van-tabbar-item--active {
      background-color: #eaeaea;

      .van-goods-action-icon {
        background-color: transparent;
        color: #1989fa;
      }
    }
  }       
</style>
