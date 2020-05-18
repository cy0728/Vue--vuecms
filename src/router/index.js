import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//路由懒加载
const Home = () => import("@/views/Home.vue");
const Member = () => import("@/views/Member.vue");
const Cart = () => import("@/views/Cart.vue");
const Search = () => import("@/views/Search.vue");
const NewsList = () => import("@/views/news/NewsList.vue");
const NewsDetail = () => import("@/views/news/NewsDetail.vue");
const PhotoList = () => import("@/views/photo/PhotoList.vue");
const PhotoInfo = () => import("@/views/photo/PhotoInfo.vue");
const ProductList = () => import("@/views/product/ProductList.vue");
const ProductInfo = () => import("@/views/product/ProductInfo.vue");
const ProductDetail = () => import("@/views/product/ProductDetail.vue");

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "无锡极客营",
        },
    },
    {
        path: "/member",
        name: "Member",
        component: Member,
        meta: {
            title: "会员中心",
        },
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart,
        meta: {
            title: "购物车",
        },
    },
    {
        path: "/search",
        name: "Search",
        component: Search,
        meta: {
            title: "搜索",
        },
    },
    {
        path: "/newsList",
        name: "NewsList",
        component: NewsList,
        meta: {
            title: "新闻列表",
        },
    },
    {
        path: "/newsDetail/:id",
        name: "NewsDetail",
        component: NewsDetail,
        meta: {
            title: "新闻详情",
        },
    },
    {
        path: "/photoList",
        name: "PhotoList",
        component: PhotoList,
        meta: {
            title: "图片列表",
        },
    },
    {
        path: "/photoInfo/:id",
        name: "PhotoInfo",
        component: PhotoInfo,
        meta: {
            title: "图片详情",
        },
    },
    {
        path: "/productList",
        name: "ProductList",
        component: ProductList,
        meta: {
            title: "商品列表",
        },
    },
    {
        path: "/productInfo/:id",
        name: "ProductInfo",
        component: ProductInfo,
        meta: {
            title: "商品描述",
        },
    },
    {
        path: "/productDetail/:id",
        name: "ProductDetail",
        component: ProductDetail,
        meta: {
            title: "商品详情",
        },
    },
];

const router = new VueRouter({
    routes,
});

export default router;
