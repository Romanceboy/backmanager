<!--  -->
<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <span
              style="position:relative;font-size:30px;color:#F0F5FB;font-weight:500;line-height:60px;font-family:STHupo"
            >
              后台管理系统
              <div class="quan">
                <div class="quan2">
                  <div class="quan3"></div>
                </div>
                <div class="quan4">
                  <div class="quan5"></div>
                </div>
                <div class="quan6">信</div>
              </div>
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span class="name" style="color:white;font-weight:600">
              登入用户：{{ name }}
            </span>
            <el-button class="out" @click="out" size="small" type="info" round>
              注销
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside
        :width="Collapse == true ? '64px' : '200px'"
        style="overflow:hidden;background-color:#DCDFE6;"
      >
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
        <!-- <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>-->
        <!-- <div style="height:30px;width:30px;background-color:red"></div>
        </el-radio-group>-->
        <div
          style="height:35px;font-size:15px;align-item:center;line-height:32px;background-color:##DCDFE6;font-weight:400;cursor:pointer;"
          @click="changeWidth"
        >
          |||
        </div>
        <el-menu
          :default-active="activerouter"
          class="el-menu-vertical-demo"
          background-color="#DCDFE6"
          :collapse="Collapse"
          :collapse-transition="flag"
          :unique-opened="flag2"
          :router="flag"
          style="font-weight:800;font-size:19px"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span slot="title">项目管理</span>
            </template>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-menu-item index="/Home/infor">
              <i class="el-icon-s-grid"></i>项目信息
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">项目数据</span>
            </template>
            <el-menu-item index="/Home/2-1">
              <i class="el-icon-s-grid"></i>选项2-1
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="overflow:hidden">
        <transition
          mode="out-in"
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated zoomOut"
        >
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      Collapse: false,
      name: "",
      activerouter: "",
      flag: true,
      flag2: true
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    out() {
      sessionStorage.clear("name");
      this.$store.commit("clear");
      this.$router.push("/Login");
      this.$message("已退出");
    },
    getagin() {
      let defaultMenu = window.location.hash.substr(
        window.location.hash.indexOf("/")
      );
      this.activerouter = defaultMenu;
    },
    changeWidth() {
      this.Collapse = !this.Collapse;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.name = this.$store.state.name;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getagin();
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #30719b;
  color: #333;
  text-align: center;
  line-height: 50px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  position: relative;
  border-radius: 4px;
  min-height: 60px;
}
.row-bg {
  padding: 10px 0;
}
.out {
  position: absolute;
  right: -6px;
  bottom: 3px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item,
el-menu-item {
  padding-left: 65px !important;
}
.name {
  position: absolute;
  color: antiquewhite;
  font-size: 15px;
  bottom: -7px;
  right: 65px;
}
.quan {
  position: absolute;
  left: -64px;
  top: 50%;
  transform: translateY(-50%);
  height: 60px;
  width: 60px;
}
.quan2 {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 8%;
  left: 7%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid steelblue;
  animation: zhuan 5s linear infinite;
}
.quan3 {
  position: absolute;
  height: 10px;
  width: 10px;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: darkgoldenrod;
  border-radius: 50%;
}
.quan4 {
  position: absolute;
  height: 32px;
  width: 32px;
  top: 23%;
  left: 22%;
  transform: translate(-50%, -50%);
  border: 2px solid blueviolet;
  border-radius: 50%;
  animation: zhuan 3s linear infinite;
}
.quan5 {
  position: absolute;
  height: 7px;
  width: 7px;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4a8af4;
  border-radius: 50%;
}
.quan6 {
  position: absolute;
  font-family: STXinwei;
  line-height: 19px;
  font-size: 15px;
  color: rgb(32, 80, 64);
  height: 19px;
  width: 19px;
  top: 52%;
  left: 52%;
  transform: translate(-50%, -50%);
  background-color: darkseagreen;
  animation: taiyang 3s linear infinite alternate;
  border-radius: 50%;
}
@keyframes zhuan {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes taiyang {
  0% {
    box-shadow: 0px 0px 0px #fff;
  }
  50% {
    box-shadow: 0px 10px 50px #fff;
  }
  100% {
    box-shadow: 0px 10px 100px #fff;
  }
}
</style>
