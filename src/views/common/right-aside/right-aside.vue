<template>
  <div>
    <transition name="fade">
      <div class="aside-backdrop" v-show="visible" @click="maskClose"></div>
    </transition>
    <transition :name="(placement === 'left') ? 'slideleft' : 'slideright'">
      <div class="aside"
           :style="{width:width + 'px'}"
           :class="{left:placement === 'left', right:placement === 'right'}"
           v-show="visible">
        <div class="aside-dialog">
          <div class="aside-content">
            <div class="aside-header">
              <h4 class="aside-title">
                <slot name="header">
                  {{ title }}
                </slot>
              </h4>
              <div class="close" @click="close">
                <i class="el-icon-close close-icon"></i>
              </div>
            </div>
            <div class="aside-body" ref="asideBody" id="asideBody" :style="{bottom: showFooter ? '57px' : '0'}">
              <slot></slot>
            </div>
            <div class="aside-footer" v-show="showFooter">
              <el-button size="large" @click="close">{{cancelText}}</el-button>
              <el-button size="large" type="primary" :loading="loading" @click="ok" style="margin-left: 10px">
                {{okText}}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'right-aside',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      placement: {
        type: String,
        default: 'right'
      },
      title: {
        type: String
      },
      width: {
        type: [Number, String],
        default: '800'
      },
      okText: {
        type: String,
        default: '保存'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: this.show
      }
    },
    watch: {
      show(val) {
        this.visible = val;
        this.$nextTick(() => {
          this.$refs.asideBody.scrollTop = 0
        })
      },
      visible(val) {
        this.$emit('update:show', val)
      }
    },
    methods: {
      close() {
        this.visible = false
      },
      ok() {
        this.$emit('on-ok')
      },
      maskClose() {
        if (this.maskClosable) {
          this.close()
        }
      }
    }
  }

</script>

<style lang="less" scoped>
  .aside {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 980;
    overflow: auto;
    background: #fff;
  }

  .slideleft-enter-active {
    animation: slideleft-in .3s;
  }

  .slideleft-leave-active {
    animation: slideleft-out .3s;
  }

  @keyframes slideleft-in {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideleft-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  .slideright-enter-active {
    animation: slideright-in .2s;
  }

  .slideright-leave-active {
    animation: slideright-out .2s;
  }

  @keyframes slideright-in {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideright-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .aside:focus {
    outline: 0
  }

  @media (max-width: 991px) {
    .aside {
      min-width: 240px
    }
  }

  .aside .aside-dialog .aside-header {
    padding: 13px 16px;
    border-radius: 3px 3px 0 0;
    background: #fff;
    color: #666;
    border-bottom: 1px solid #f4f4f4;
    min-height: 50px;
  }

  .aside .aside-dialog .aside-header .close {
    position: absolute;
    font-size: 28px;
    right: 16px;
    top: 3px;
    cursor: pointer;
    .close-icon {
      font-size: 16px;
    }
  }

  .aside .aside-dialog .aside-header .close:hover {
    color: #000;
  }

  .aside .aside-dialog .aside-body {
    position: absolute;
    left: 0;
    top: 51px;
    bottom: 107px;
    padding: 15px;
    box-sizing: border-box;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .aside-title {
    font-weight: 400;
    line-height: 24px;
    font-size: 14px;
  }

  .aside-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 970;
    background: rgba(0, 0, 0, 0.5);
  }

  .aside-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #f4f4f4;
    padding: 10px 16px 10px 10px;
    text-align: right;
    border-radius: 0 0 3px 3px;
    background-color: #fff;
  }
</style>
