<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
			{{collapsed?'':sysName}}
	  </el-col>
	  <el-col :span="10">
		<div class="tools" @click.prevent="collapse">
			<i class="fa fa-align-justify"></i>
		</div>
	   </el-col>
	   <el-col :span="4" class="userinfo">
			<el-dropdown trigger="hover">
				<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>我的消息</el-dropdown-item>
					<el-dropdown-item>设置</el-dropdown-item>
					<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-col>
    </el-col>

    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
       <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
           unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>
  	    <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
              </li>
            </template>
          </li>
        </ul>
      </aside>
        <section class="content-container">
    			<div class="grid-content bg-purple-light">
    				<el-col :span="24" class="breadcrumb-container">
    					<strong class="title">{{$route.name}}</strong>
    					<el-breadcrumb separator="/" class="breadcrumb-inner">
    						<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
    							{{ item.name }}
    						</el-breadcrumb-item>
    					</el-breadcrumb>
    				</el-col>
    				<el-col :span="24" class="content-wrapper">
    					<transition name="fade" mode="out-in">
    						<router-view></router-view>
    					</transition>
    				</el-col>
    			</div>
		   </section>
    </el-col>
  </el-row>
</template>

<script>
export default {
	name: "home",
	data () {
	  return {
        sysName:'VUEADMIN',
    		collapsed:false,
    		sysUserName: '',
    		sysUserAvatar: '',
    		form: {
    			name: '',
    			region: '',
    			date1: '',
    			date2: '',
    			delivery: false,
    			type: [],
    			resource: '',
    			desc: ''
    		}
	  }
	},
	methods: {
    onSubmit() {
        console.log('submit!');
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect: function (a, b) {
      },
      //折叠导航栏
		collapse:function(){
			this.collapsed=!this.collapsed;
		},
	  //退出登录
      logout () {
        var _this = this;
        this.$confirm('确认退出吗', '提示', {

        }).then( () => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch((error) => {
          console.log(error);
        })
      },
      showMenu(i,status){
  		  this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
  	   }
	},
	mounted() {
		var user = sessionStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			this.sysUserName = user.name || '';
			this.sysUserAvatar = user.avatar || '';
		}

	}
}
</script>

<style lang="stylus" scoped>
.container
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  .header
    height: 60px;
    line-height: 60px;
    color: #fff;
    background-color: #3665b3;
    .logo
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-right: 1px solid rgba(238,241,146,0.3);
      img
        float: left;
        width: 40px;
        margin: 10px 10px 10px 18px;
      .txt
        color: #fff;
    .logo-width
      width: 230px;
    .logo-collapse-width
      width: 60px;
    .userinfo
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner
        cursor: pointer;
        color: #fff;
        img
          float: right;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 10px 10px 0 10px;
  .main
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    aside
      flex: 0 0 230px;
      width: 230px;
      .el-menu
        width: 230px;
        height: 100%;
      .collapsed
        width: 60px;
        .item
          position: relative;
        .submenu
          position:absolute;
          top:0px;
          left:60px;
          z-index:99999;
          height:auto;
          display:none;
    .menu-collapsed
      flex: 0 0 60px;
      width: 60px;
    .menu-expanded
      flex: 0 0 230px;
      width: 230px;
    .content-container
      flex: 1;
      padding: 20px;
      overflow-y: scroll
      .breadcrumb-container
        .title
          width: 200px;
          float: left;
          color: #475669;
        .breadcrumb-inner
          float: right;
      .content-wrapper
        background-color: #fff;
	    box-sizing: border-box;


</style>