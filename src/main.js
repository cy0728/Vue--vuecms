import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//按需加载组件库
import 'vant/lib/index.css';
import { NavBar, 
  Tabbar, 
  TabbarItem, 
  Button, 
  GoodsActionIcon, 
  GoodsAction,
  GoodsActionButton,
  Swipe, 
  SwipeItem, 
  Grid, 
  GridItem,
  Icon,
  Lazyload,
  List,
  Cell, 
  CellGroup,
  Skeleton,
  Panel,
  PullRefresh,
  Form,
  Field,
  Tab, 
  Tabs,
  Toast,
  Stepper,
  Checkbox,
  Image
} from 'vant';

Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.use(GoodsActionIcon);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(Lazyload);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Skeleton);
Vue.use(Panel);
Vue.use(PullRefresh);
Vue.use(Form);
Vue.use(Field);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Toast);
Vue.use(Stepper);
Vue.use(Checkbox);
Vue.use(Image);


//引入缩略图插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


//导入格式化时间的插件
import moment from 'moment';
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pattern);
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
