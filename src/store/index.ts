import { createStore } from "vuex";
import { UserState } from "./types";

export default createStore({
  state: {
    user: {
      userName: localStorage.getItem("userName"),
      token: localStorage.getItem("token"),
    },
    ui: {
      theme: localStorage.getItem("theme"),
    },
  },
  mutations: {
    login(state, payload: UserState) {
      state.user.userName = payload.userName;
      state.user.token = payload.token;
      localStorage.setItem("userName", payload.userName);
      localStorage.setItem("token", payload.token);
    },
    logout(state) {
      state.user.userName = null;
      state.user.token = null;
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
    },
    changeTheme(state) {
      if (state.ui.theme === "dark") {
        state.ui.theme = "light";
        localStorage.setItem("theme", "light");
        document.body.setAttribute("arco-theme", "light");
      } else {
        state.ui.theme = "dark";
        localStorage.setItem("theme", "dark");
        document.body.setAttribute("arco-theme", "dark");
      }
    },
  },
  actions: {},
  modules: {},
});
