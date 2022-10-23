<script lang="tsx">
import { UIContext, UIInjectionKey } from "@/context";
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
import { defineComponent, inject, reactive, ref } from "vue";
import { over } from "@/utils/ui";
import API from "@/api";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    // 路由
    const router = useRouter();
    const toLogin = () => router.push("/login");

    // 获取 UI 上下文
    const UIContext = inject(UIInjectionKey);

    // 表单数据与校验规则
    const form = reactive({
      userName: "",
      password: "",
      confirmPassword: "",
    });
    const userNameRules: FieldRule[] = [
      {
        required: true,
        message: "用户名是必填项",
      },
      {
        validator: (value, cb) => {
          if (!value) return;
          return API.user
            .checkName({
              userName: form.userName,
            })
            .then((res) => {
              if (res.has) {
                cb("该用户名已被占用");
              }
            });
        },
      },
    ];
    const passwordRules: FieldRule[] = [
      { required: true, message: "密码是必填项" },
    ];
    const confirmPasswordRules: FieldRule[] = [
      { required: true, message: "确认密码是必填项" },
      {
        validator: (_, cb) => {
          if (form.password !== form.confirmPassword) {
            cb("确认密码与密码不同");
          }
        },
      },
    ];

    // 提交注册
    const submiting = ref<boolean>(false);
    const handleSubmit = () => {
      submiting.value = true;
      API.user
        .register({
          userName: form.userName,
          password: form.password,
        })
        .then((res) => {
          submiting.value = false;
          if (res.err_code === "0") {
            Message.success("注册成功, 3s内将跳转至登录");
            setTimeout(() => {
              toLogin();
            }, 3000);
          }
        });
    };
    return () => (
      <div class="chessroom-login-root">
        <div
          class="chessroom-login-left"
          style={{
            width: over((UIContext as UIContext).breakpoint, "md")
              ? "420px"
              : "0",
          }}
        ></div>
        <div class="chessroom-login-right">
          <div class="chessroom-login-right-box">
            <TypographyParagraph>
              <TypographyTitle>注册</TypographyTitle>
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
                  size={"large"}
                  invisibleButton={false}
                  modelValue={form.password}
                  placeholder={"密码"}
                  onInput={(args: string) => {
                    form.password = args;
                  }}
                ></InputPassword>
              </FormItem>
              <FormItem field="password" rules={confirmPasswordRules}>
                <InputPassword
                  // @ts-ignore
                  size={"large"}
                  invisibleButton={false}
                  modelValue={form.confirmPassword}
                  placeholder={"确认密码"}
                  onInput={(args: string) => {
                    form.confirmPassword = args;
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
                  注册
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
              <Link onClick={toLogin}>返回登录</Link>
            </div>
            <div
              class="chessroom-login-right-box-jacker"
              style={{
                height: over((UIContext as UIContext).breakpoint, "md")
                  ? "12vh"
                  : "40vh",
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
