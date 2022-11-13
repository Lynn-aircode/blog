<script lang="tsx">
import { useUIContext } from "@/context";
import {
  Button,
  FieldRule,
  Form,
  FormItem,
  Input,
  InputPassword,
  Link,
  Message,
  TypographyParagraph,
  TypographyTitle,
} from "@arco-design/web-vue";
import { defineComponent, reactive, ref } from "vue";
import { over } from "@/utils/ui";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import API from "@/api";

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

    return () => (
      <div class="chessroom-login-root">
        <div
          class="chessroom-login-left"
          style={{
            width: over(UIContext.breakpoint, "md") ? "420px" : "0",
          }}
        ></div>
        <div class="chessroom-login-right">
          <div class="chessroom-login-right-box">
            <TypographyParagraph>
              <TypographyTitle>登录</TypographyTitle>
            </TypographyParagraph>
            <Form
              labelColProps={{ span: 0 }}
              wrapperColProps={{ span: 24 }}
              model={form}
              onSubmitSuccess={handleSubmit}
            >
              <FormItem field="userName" rules={userNameRules}>
                <Input
                  size="large"
                  modelValue={form.userName}
                  placeholder="用户名"
                  onInput={(args: string) => {
                    form.userName = args;
                  }}
                ></Input>
              </FormItem>
              <FormItem field="password" rules={passwordRules}>
                <InputPassword
                  // @ts-ignore
                  // arco 的 mixin 真是让人血压飙升
                  size={"large"}
                  modelValue={form.password}
                  placeholder={"密码"}
                  onInput={(args: string) => {
                    form.password = args;
                  }}
                ></InputPassword>
              </FormItem>
              <FormItem style={{ marginTop: "16px" }} field="password">
                <Button
                  loading={submiting.value}
                  htmlType="submit"
                  size="large"
                  long
                  type="primary"
                >
                  登录
                </Button>
              </FormItem>
            </Form>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link onClick={toRegister}>没有账号？去注册！</Link>
              <Link>找回密码</Link>
            </div>
            <div
              class="chessroom-login-right-box-jacker"
              style={{
                height: over(UIContext.breakpoint, "md") ? "12vh" : "40vh",
              }}
            />
          </div>
        </div>
      </div>
    );
  },
});
</script>

<style lang="less">
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
