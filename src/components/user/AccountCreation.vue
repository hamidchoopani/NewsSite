<template>
  <v-card class="mx-auto" width="500">
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
    </v-card-title>
    
    <!-- login -->
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field required prepend-inner-icon="mdi-email-outline" variant="outlined" label="Email"
            placeholder="john@vuetifyjs.com" v-model="emailLogin"></v-text-field>

          <v-text-field required :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'" placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
            label="Password" v-model="passwordLogin"></v-text-field>
          <span v-if="checkEmailForLogin" class="text-red">{{ checkEmailForLogin }}</span>
        </v-card-text>
      </v-window-item>
      <!-- End login -->

      <v-window-item :value="2">
        <v-card-text>
          <!-- <v-text-field prepend-inner-icon="mdi-account" variant="outlined" label="userName" placeholder="hamid"
            v-model="userName"></v-text-field> -->

          <v-text-field required prepend-inner-icon="mdi-email-outline" variant="outlined" label="Email"
            placeholder="john@vuetifyjs.com" v-model="email">
          </v-text-field>

          <v-text-field required :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'" placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
            label="Password" v-model="password"></v-text-field>
          <span v-if="checkEmail" class="text-red">{{ checkEmail }}</span>
        </v-card-text>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-spacer></v-spacer>

    <div class="sign-in" v-if="step < 2">
      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
        Log In
      </v-btn>
    </div>

    <div class="sign-up" v-else>
      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="register">
        Sign-up
      </v-btn>
    </div>

    <v-card-text v-if="step > 1" @click="step--" class="text-center">
      <a class="text-blue text-decoration-none" rel="noopener noreferrer" target="_blank">
        <v-icon icon="mdi-chevron-left"></v-icon> login
      </a>
    </v-card-text>
    <v-card-text v-if="step < 2" @click="step++" class="text-center">
      <a class="text-blue text-decoration-none" rel="noopener noreferrer" target="_blank">
        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
      </a>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAccountStore } from "@/store/AccountUser";
import { storeToRefs } from "pinia";

const emailLogin = ref('')
const passwordLogin = ref('')

// const userName = ref("");
const email = ref("");
const password = ref("");

const accountUser = useAccountStore();

const { checkEmail, checkEmailForLogin } = storeToRefs(accountUser)

// const checkUser = () => {
//   accountUser.checkUserData(userName.value)
// }

const register = () => {
  accountUser.registerUser({
    // userName: userName.value,
    email: email.value,
    password: password.value
  })
  // userName.value = ''
  email.value = ''
  password.value = ''
};

const login = () => {
  accountUser.loginUser({
    email: emailLogin.value,
    password: passwordLogin.value
  })
}

const step = ref(1);
const visible = ref(false);
const currentTitle = computed(() => {
  if (step.value == 1) {
    return "Sign-in";
  } else {
    return "Sign-up";
  }
});
</script>






<style scoped>
.v-card-text {
  cursor: pointer;
}

.v-card {
  margin: 11.5% 0;
  background-color: #212121;
  color: #fff;
}

.sign-in,
.sign-up {
  width: 50% !important;
  margin-left: 7rem !important;
}

.v-btn {
  margin-right: 50px;
}
</style>