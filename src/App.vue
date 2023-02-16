<template>
  <div class="splash" v-if="splash" :class="{ 'diplay-none': !splash }">
    <h1 class="fade-in">welcome to website</h1>
  </div>
  <v-app :theme="theme">
    <v-app-bar>
      <v-app-bar-nav-icon
        class="menu"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <router-link :to="{ name: 'Home' }">
        <v-toolbar-title
          class="webnews"
          v-bind:class="{ 'text-white': clicked, 'text-black': !clicked }"
          > 
          <img width="130" src="./assets/logo.png" alt="">
          </v-toolbar-title
        >
      </router-link>
      <v-spacer></v-spacer>
      <v-btn
        v-if="currentLang == 'en'"
        class="box-side"
        :to="{ name: 'currency' }"
        >Crypto Currency</v-btn
      >
      <v-btn v-else class="box-side" :to="{ name: 'currency' }"
        >ارزهای دیجیتال</v-btn
      >

      <v-btn
        v-if="currentLang == 'en'"
        class="box-side"
        :to="{ name: 'weatherapp' }"
        >Meteorology</v-btn
      >
      <v-btn v-else class="box-side" :to="{ name: 'weatherapp' }"
        >هواشناسی</v-btn
      >
      <div class="box box-side">
        <form name="search">
          <input
            type="text"
            class="input"
            @keyup="newsInSearch()"
            v-model="searchBox"
            onmouseout="this.value = ''; this.blur();"
          />
        </form>
        <v-icon>mdi-magnify</v-icon>
      </div>
      <!-- lang -->
      <LanguageSwitcher />

      <v-btn @click="changeToUSA()" icon
        ><img src="@/assets/flag/united-states.svg" width="30" alt=""
      /></v-btn>
      <v-btn @click="changeToPersion()" icon
        ><img src="@/assets/flag/iran.svg" width="30" alt=""
      /></v-btn>
      <v-btn
        class="theme"
        :prepend-icon="
          theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="onClick"
      >
        <v-tooltip activator="parent" location="bottom">change theme</v-tooltip>
      </v-btn>

      <router-link v-if="!checkuser" :to="{ name: 'SignIn' }">
        <v-btn
          class="account"
          icon
          v-bind:class="{ 'text-white': clicked, 'text-black': !clicked }"
        >
          <v-icon>mdi-account</v-icon>
          <v-tooltip activator="parent" location="bottom">Login</v-tooltip>
        </v-btn>
      </router-link>

      <v-menu
        v-else-if="checkuser"
        class="accountLogin account-nav"
        min-width="200px"
        rounded
      >
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="avatar">
            <v-avatar color="brown" size="large">
              <img
                src="./assets/pngfind.com-avatar-png-2387252.png"
                width="41"
              />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-btn rounded variant="text">
                {{ checkuser }}
              </v-btn>
              <v-divider class="my-3"></v-divider>

              <v-btn @click="logOutUser" rounded variant="text">
                LogOut
                <v-icon>mdi-export</v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    <!-- side bar -->

    <div class="sidbaar">
      <v-navigation-drawer class="dropdown" v-model="drawer" temporary>
        <v-btn
          v-if="currentLang == 'en'"
          class="mb-3 mt-3"
          :to="{ name: 'currency' }"
          >Crypto Currency</v-btn
        >
        <v-btn v-else class="box-side" :to="{ name: 'currency' }"
          >ارزهای دیجیتال</v-btn
        >
        <v-btn
          v-if="currentLang == 'en'"
          :to="{ name: 'weatherapp' }"
          >Meteorology</v-btn
        >
        <v-btn v-else class="box-side" :to="{ name: 'weatherapp' }"
          >هواشناسی</v-btn
        >

        <div class="box">
          <form name="search" class="search-box">
            <input
              type="text"
              class="input mt-10"
              name="txt"
              onmouseout="this.value = ''; this.blur();"
            />
            <v-icon class="magnify mt-5">mdi-magnify</v-icon>
          </form>
        </div>
        <div class="AccountUser">
          <router-link v-if="!checkuser" :to="{ name: 'SignIn' }">
            <v-btn
              icon
              v-bind:class="{ 'text-white': clicked, 'text-black': !clicked }"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </router-link>

          <v-menu
            v-else-if="checkuser"
            class="accountLogin"
            min-width="200px"
            rounded
          >
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-avatar color="brown" size="large">
                  <img
                    src="./assets/pngfind.com-avatar-png-2387252.png"
                    width="41"
                  />
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">
                  <h3></h3>
                  <p class="text-caption mt-1"></p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded variant="text">
                    {{ checkuser }}
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn @click="logOutUser" rounded variant="text">
                    LogOut
                    <v-icon>mdi-export</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </div>
      </v-navigation-drawer>
    </div>

    <!-- end side bar -->

    <v-main>
      <v-container>
        <v-row>
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-main>
    <v-divider></v-divider>
    <Footer />
  </v-app>
</template>

<script setup>
// import NavbarVue from './components/Navbar.vue';
import { ref, onMounted, watch } from "vue";
import { useNewsStore } from "@/store/News";
import { useAccountStore } from "@/store/AccountUser";
import { storeToRefs } from "pinia";
import Footer from "./components/Footer.vue";

onMounted(() => {
  splashScreen();
});

// const btn=ref()

const drawer = ref(false);
// dark mode
const theme = ref("dark");
theme.value = localStorage.getItem("theme");
let clicked = ref(false);
clicked.value = localStorage.getItem("colorIcon");
const dialog = ref(false);
function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
  clicked.value = clicked.value === false ? true : false;
  localStorage.setItem("theme", theme.value);
  localStorage.setItem("colorIcon", clicked.value);
}
// end dark mode

const newsStore = useNewsStore();
const userStore = useAccountStore();

const { checkuser } = storeToRefs(userStore);

// let changeTextBtn = 'en'

userStore.checkUserLogin();

const changeToUSA = () => {
  newsStore.chnageLangToUSA();
};
const changeToPersion = () => {
  newsStore.changeToPersion();
};

const { splash, currentLang } = storeToRefs(newsStore);

watch(currentLang, () => {
  if (currentLang.value == "fa") {
    console.log("fa");
  } else {
    console.log("en");
  }
});

const logOutUser = () => {
  userStore.logOut(checkuser.value);
};
const NewsTypeFilter = (newsType) => {
  console.log(newsType);
  newsStore.allNewsTypeFilter(newsType);
};

function splashScreen() {
  newsStore.splashTime();
}

let searchBox = ref("");

const newsInSearch = () => {
  newsStore.newsSearch(searchBox.value.toLocaleLowerCase());
};
</script>


<style scoped>
@font-face {
  font-family: iranSans;
  src: url("@/assets/font/IRANSans.ttf");
}

* {
  font-family: iranSans;
}
.splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  z-index: 1200;
  color: white;
  text-align: center;
  line-height: 100vh;
}

.splash.diplay-none {
  position: fixed;
  top: 0;
  opacity: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  z-index: -10;
  color: white;
  text-align: center;
  line-height: 50vh;
  transition: all 1s;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
}

.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}

.AccountUser {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}

.newstypebtn {
  justify-content: end;
}

.v-list {
  width: 90%;
}

a {
  text-decoration: none;
}

.v-dialog {
  align-items: center;
}

.closeDialog {
  display: contents;
  width: 100px;
}

.v-list-item {
  cursor: pointer;
}

.allProduct {
  cursor: pointer;
  padding: 10px 0 10px 15px;
}

.v-input {
  max-width: 10rem !important;
  height: 50px;
}

.count {
  padding-bottom: 17px;
  color: #ffb5009e;
}

.text-white {
  color: #fff;
}

.text-black {
  color: #000;
}

.v-row {
  justify-content: center;
}

/* search */

.box {
  position: relative;
}

.input {
  padding: 10px;
  width: 50px;
  height: 50px;
  background: none;
  /* border: 4px solid #8d8d8d; */
  border-radius: 50px;
  box-sizing: border-box;
  font-family: Comic Sans MS;
  font-size: 26px;
  color: #000000;
  outline: none;
  transition: 0.5s;
}

.box:hover input {
  width: 250px;
  background: #eeeeee;
  border-radius: 10px;
}

.box i {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  font-size: 26px;
  /* color: #1b1b1b; */
  transition: 0.2s;
}

.box:hover i {
  opacity: 0;
  z-index: -1;
}

.accountLogin {
  height: 15px;
  width: 15px;
}

.v-list-item {
  cursor: pointer;
}

/* End search */

/* responsive */
@media screen and (max-width: 549px) {
  .box-side,
  .account,
  .account-nav,
  .logout,
  .align-self-center,
  .theme,
  .avatar {
    display: none;
  }
}

@media screen and (min-width: 549px) {
  .menu {
    display: none;
  }
}

.webnews {
  margin-left: 10px;
}

.sidbaar {
  text-align: center;
}

/* End responsive */
</style>