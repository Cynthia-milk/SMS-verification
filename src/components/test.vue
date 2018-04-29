<template>
  <div class="hello">
    <mt-field label="验证码" placeholder="请输入验证码">
      <div @click="getCode">
        <mt-button type="primary" size="small" v-if="flag">{{btnText}}</mt-button>
        <mt-button type="primary" size="small" v-if="!flag">剩余{{second}}S</mt-button>
      </div>
    </mt-field>
  </div>
</template>

<script>
// var second = null;
// var set_time = null;
// function get_second() {
//   second == localStorage.getItem("second");
//   set_time == localStorage.getItem("set_time");

//   if (second == null || set_time == null) {
//     second == 10;
//     set_time = new Date().getTime();
//     localStorage.setItem("second", second);
//     localStorage.setItem("set_time", set_time);
//   } else if (second != null && set_time != null) {
//     let now = new Date().getTime();
//     let left_second = now - set_time;
//     second = left_second;
//   } else {
//     console.log("error");
//     second = 0;
//   }
//   return second;
// }
// console.log(second);
export default {
  data() {
    return {
      btnText: "获取验证码",
      second: 10,
      flag: true,
      timer: null
    };
  },
  mounted() {
    this.judgeCode();
  },
  methods: {
    // 获取验证码
    getCode() {
      let that = this;
      if (that.flag) {
        that.flag = false;
        // 解决delay为未点击时为1的bug
        let localDelay = that.getStorage();
        if (localDelay.delay <= 1) {
          that.setStorage(that.second);
        }

        let interval = window.setInterval(function() {
          that.setStorage(that.second);

          if (that.second-- <= 1) {
            that.second = 10;
            that.flag = true;
            window.clearInterval(interval);
          }
        }, 1000);
      }
    },
    setStorage(parm) {
      localStorage.setItem("delay", parm);
      localStorage.setItem("_time", new Date().getTime());
    },
    getStorage() {
      let localDelay = {};
      localDelay.delay = localStorage.getItem("delay");
      localDelay.sec = localStorage.getItem("_time");
      return localDelay;
    },
    // 防止页面刷新时页面验证码失效
    judgeCode() {
      let that = this;
      let localDelay = that.getStorage();
      let secTime = parseInt((new Date().getTime() - localDelay.sec) / 1000);
      console.log(localDelay);
      if (secTime > localDelay.delay) {
        // 此处赋值时为了让浏览器打开的时候,直接就显示剩余的时间

        that.flag = true;
        console.log("已过期");
      } else {
        that.flag = false;
        let _delay = localDelay.delay - secTime;
        that.second = _delay;
        that.timer = setInterval(function() {
          if (_delay > 1) {
            _delay--;
            that.setStorage(_delay);
            that.second = _delay;
            that.flag = false;
          } else {
            that.flag = true;
            window.clearInterval(that.timer);
          }
        }, 1000);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
