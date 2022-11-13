<script lang="tsx">
import { useUIContext } from "@/context";
import {
  Badge,
  Button,
  Menu,
  MenuItem,
  Space,
  Trigger,
} from "@arco-design/web-vue";
import {
  IconEdit,
  IconExport,
  IconFile,
  IconImport,
  IconMoon,
  IconStar,
  IconSun,
  IconUser,
} from "@arco-design/web-vue/es/icon";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Logo from "./Logo.vue";

export default defineComponent({
  components: {
    Logo,
  },

  setup() {
    const store = useStore();
    // 路由
    const router = useRouter();
    const toLogin = () => router.push("/login");
    const toNote = () => router.push("/note");
    return () => (
      <div class="chessroom-header">
        <Logo />
        <div>
          <Space size="small">
            <Button
              onClick={() => {
                store.commit("changeTheme");
              }}
              type="text"
            >
              {{
                icon: () =>
                  store.state.ui.theme === "dark" ? (
                    <IconSun class="chessroom-icon" size="20" />
                  ) : (
                    <IconMoon class="chessroom-icon" size="20" />
                  ),
              }}
            </Button>
            <Button onClick={toNote} type="text">
              {{
                icon: () => (
                  <Badge dot count={1}>
                    <IconEdit class="chessroom-icon" size="20" />
                  </Badge>
                ),
              }}
            </Button>
            <Button type="text">
              {{
                icon: () => <IconStar class="chessroom-icon" size="20" />,
              }}
            </Button>
            <Trigger position="br" popupTranslate={[0, 16]}>
              {{
                content: () => (
                  <div class="chessroom-header-user-info">
                    {store.state.user.userName ? (
                      <Menu>
                        <MenuItem>
                          {"你好，" + store.state.user.userName}
                        </MenuItem>
                        <MenuItem>
                          {{
                            icon: () => <IconFile size="18" />,
                            default: () => "个人信息",
                          }}
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            toLogin();
                            store.commit("logout");
                          }}
                        >
                          {{
                            icon: () => <IconExport size="18" />,
                            default: () => "退出登录",
                          }}
                        </MenuItem>
                      </Menu>
                    ) : (
                      <Menu>
                        <MenuItem>{"你好啊！游客"}</MenuItem>
                        <MenuItem
                          onClick={() => {
                            store.commit("logout");
                            toLogin();
                          }}
                        >
                          {{
                            icon: () => <IconImport size="18" />,
                            default: () => "登录注册",
                          }}
                        </MenuItem>
                      </Menu>
                    )}
                  </div>
                ),
                default: () => (
                  <Button type="text">
                    {{
                      icon: () => (
                        <Badge dot count={0}>
                          <IconUser class="chessroom-icon" size="20" />
                        </Badge>
                      ),
                    }}
                  </Button>
                ),
              }}
            </Trigger>
          </Space>
        </div>
      </div>
    );
  },
});
</script>

<style lang="less">
.pop-card {
  padding: 12px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.chessroom-header {
  width: 100%;
  height: 52px;
  color: var(--color-text-1);
  background-color: var(--color-bg-2);
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &-user-info {
    .pop-card;
    div.arco-typography {
      margin: 0;
    }
    .arco-divider-horizontal {
      margin: 0 8px;
    }
    padding: 8px 0 4px;
    width: 180px;
  }
}

.arco-btn-icon .chessroom-icon {
  stroke: var(--color-text-2);
}
</style>
