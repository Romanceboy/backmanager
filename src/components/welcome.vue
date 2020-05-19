<!--  -->
<template>
  <div class>
    <span class="time">
      {{ str2 }}
      {{ str }}
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: "",
      str: "",
      str2: "",
      message: [],
      flag: false
    };
  },
  //方法集合
  methods: {
    updatetime() {
      this.name = this.$store.state.name;
      var that = this;
      this.message = [
        "晚上好！" + this.name + "，欢迎登录后台管理界面，现在是北京时间： ",
        "深夜了，" +
          this.name +
          "，请您合理安排工作时间注意休息，现在是北京时间： ",
        "凌晨了，" + this.name + "，请您注意休息，现在是北京时间：  ",
        "上午好！" + this.name + "，欢迎登录后台管理界面，现在是北京时间：  ",
        "中午好！" + this.name + "，欢迎登录后台管理界面，现在是北京时间：  ",
        "下午好！" + this.name + "，欢迎登录后台管理界面，现在是北京时间：  "
      ];
      var fuc = {
        night: value => {
          if (value >= 18 && value < 22) {
            that.str2 = that.message[0];
            that.flag = true;
          }
          return;
        },
        latenight: value => {
          if ((value >= 22 && value < 24) || value < 1) {
            that.str2 = that.message[1];
            that.flag = true;
          }
          return;
        },
        beforeDawn: value => {
          if (value >= 1 && value < 6) {
            that.str2 = that.message[2];
            that.flag = true;
          }
          return;
        },
        morning: value => {
          if (value >= 6 && value < 12) {
            that.str2 = that.message[3];
            that.flag = true;
          }
          return;
        },
        noon: value => {
          if (value >= 12 && value < 14) {
            that.str2 = that.message[4];
            that.flag = true;
          }
          return;
        },
        afternoon: value => {
          if (value >= 14 && value < 18) {
            that.str2 = that.message[5];
            that.flag = true;
          }
          return;
        }
      };

      function time() {
        //创建一个时间日期对象
        var date = new Date();
        var year = date.getFullYear(); //存储年
        var month = date.getMonth() + 1; //存储月份
        var day = date.getDate(); //存储日期
        var hours = date.getHours(); //存储时
        var minutes = date.getMinutes(); //存储分
        var seconds = date.getSeconds(); //存储秒
        if (parseInt(hours) < 10) {
          hours = "0" + hours;
        }
        if (parseInt(minutes) < 10) {
          minutes = "0" + minutes;
        }
        if (parseInt(seconds) < 10) {
          seconds = "0" + seconds;
        }
        //返回格式化后的日期
        return (
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds
        );
      }
      function time2() {
        var date = new Date();
        var tim = parseInt(date.getHours());
        that.str = time();
        for (var key in fuc) {
          fuc[key](tim);
          if (that.flag == true) {
            that.flag = false;
            return;
          }
        }
      }
      time2();
      setInterval(() => {
        time2();
      }, 1000);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.updatetime();
  }
};
</script>
<style lang="scss" scoped>
.time {
  float: left;
  font-weight: 700;
  font-size: 19px;
}
</style>
