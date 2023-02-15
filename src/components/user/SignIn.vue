<template>

  <div class="hero">
    <h3 class="section-title">SignIn User</h3>
  </div>
  <v-app id="inspire" class="mt-15">
    <v-container>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window >
                <v-window-item >
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h4 class="text-center mt-4">
                          Enter your Personal Details
                        </h4>

                        <v-form @submit.prevent="loginUser">
                          <v-text-field label="Email" v-model="emailLogin" :error-messages="errors.emailLogin"></v-text-field>
                          <v-text-field label="Passowrd" v-model="passwordLogin" :error-messages="errors.passwordLogin"></v-text-field>
                          <h5 class="text-center mt-4">Forgot your password ?</h5>
                          <div class="text-center mt-3">
                            <v-btn class="mb-7" variant="flat" color="secondary" type="submit">
                              SIGN IN
                            </v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="fack">
                      <v-card-text class="white--text mt-12">
                        <!-- <v-card-title class="text-center text-lg-h4 mt-15"
                          >Hello, Friend!
                        </v-card-title> -->
                      </v-card-text>
                      <div class="text-center purple darken-2">
                        <router-link :to="{name:'SignUp'}">
                          <v-btn variant="flat" class="signupbtn" color="secondary">
                            SIGN UP
                          </v-btn>
                        </router-link>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import { computed, ref } from "vue";
import { useAccountStore } from "@/store/AccountUser";
import { storeToRefs } from "pinia";

// login

const validationSchema = toFormValidator(
  zod.object({
    emailLogin: zod.string().nonempty('This is required').email({ message: 'Must be a valid email' }),
    passwordLogin: zod.string().nonempty('This is required').min(8, { message: 'Too short message' }),
  })
);

const { handleSubmit, errors, handleReset } = useForm({
  validationSchema,
});

const { value: emailLogin } = useField('emailLogin');
const { value: passwordLogin } = useField('passwordLogin');


const accountUser = useAccountStore();

const { checkEmail, checkEmailForLogin } = storeToRefs(accountUser)

const loginUser = handleSubmit(values => {
  accountUser.loginUser({
    email: emailLogin.value,
    password: passwordLogin.value
  })
})

// end login


</script>

<style scoped>
span {
  color: red;
}
.hero {
  margin-top: 20px;
  margin-bottom: -70px;
}
#inspire {
  /* margin-bottom: -40px; */
  width: 100%;
}
.fack{
  background-image:url("@/assets/world.jpg");
  background-size: cover;
}
.signupbtn{
  transform: translateY(250px);
}
</style>
