<template>
  <div class="chessroom-login-root">
    <div class="chessroom-login-left" :style="leftZoneWidth"></div>
    <div class="chessroom-login-right">
      <div class="chessroom-login-right-box">
        <a-typography>
          <a-typography-title>登录</a-typography-title>
        </a-typography>
        <a-form
          :labelColProps="{ span: 0 }"
          :wrapperColProps="{ span: 24 }"
          :model="form"
          :onSubmitSuccess="handleSubmit"
        >
          <a-form-item field="userName" :rules="userNameRules">
            <a-input
              size="large"
              :modelValue="form.userName"
              placeholder="用户名"
              :onInput="
                (args) => {
                  form.userName = args;
                }
              "
            ></a-input>
          </a-form-item>
          <a-form-item field="password" :rules="passwordRules">
            <a-input-password
              size="large"
              :modelValue="form.password"
              placeholder="密码"
              :onInput="
                (args) => {
                  form.password = args;
                }
              "
            ></a-input-password>
          </a-form-item>
          <a-form-item style="margin-top: 16px" field="password">
            <a-button
              :loading="submiting"
              htmlType="submit"
              size="large"
              long
              type="primary"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
        <div class="space-between">
          <a-link :onClick="toRegister">没有账号？去注册！</a-link>
          <a-link>找回密码</a-link>
        </div>
        <div class="chessroom-login-right-box-jacker" :style="jackerHeight" />
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { useUIContext } from "@/context";
import { computed, defineComponent, reactive, ref } from "vue";
import { over } from "@/utils/ui";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import API from "@/api";
import { FieldRule, Message } from "@arco-design/web-vue";

export default defineComponent({
  setup() {
    const store = useStore();

    // 路由
    const router = useRouter();
    const toRegister = () => router.push("/register");
    const toHome = () => router.push("/");

    //表单数据与校验规则
    const form = reactive({
      userName: "",
      password: "",
    });
    const userNameRules: FieldRule[] = [
      { required: true, message: "用户名是必填项" },
    ];
    const passwordRules: FieldRule[] = [
      { required: true, message: "密码是必填项" },
    ];

    // 登录
    const submiting = ref<boolean>(false);
    const handleSubmit = () => {
      submiting.value = true;
      API.user
        .login({
          userName: form.userName,
          password: form.password,
        })
        .then((res) => {
          if (res.token) {
            store.commit("login", {
              userName: form.userName,
              token: res.token,
            });
            toHome();
          }
          Message.error("用户名或密码错误");
          submiting.value = false;
        });
    };

    // 获取 UI 上下文
    const UIContext = useUIContext();
    if (!UIContext) return () => null;

    const leftZoneWidth = computed(
      () => `width: ${over(UIContext.breakpoint, "md") ? "420px" : "0"};`
    );
    const jackerHeight = computed(
      () => `height: ${over(UIContext.breakpoint, "md") ? "12vh" : "40vh"};`
    );

    return {
      form,
      leftZoneWidth,
      jackerHeight,
      toRegister,
      toHome,
      handleSubmit,
      submiting,
      userNameRules,
      passwordRules,
    };
  },
});
</script>

<style lang="less">
.space-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.chessroom {
  &-login {
    &-root {
      display: flex;
      flex-direction: row;
      height: 100vh;
    }
    &-left {
      width: 400px;
      background-color: var(--color-fill-1);
      transition: 300ms width ease-in-out;
    }
    &-right {
      flex: 1;
      box-shadow: 0px 4px 36px -8px rgba(#000, 0.08);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px;
      transition: 300ms width ease-in-out;
      &-box {
        max-width: 420px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &-jacker {
          height: 36vh;
          transition: 300ms height ease-in-out;
        }
      }
    }
  }
}
</style>
