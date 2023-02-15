<template>
  <div class="hero">
    <h3 class="section-title">SignUp</h3>
  </div>
  <v-app id="inspire" class="mt-15">
    <v-container>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window>
                <v-window-item>
                  <v-row class="fill-height">
                    <v-col class="fack">
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text>
                        <v-card-title class="text-center text-lg-h5"
                          >Create Account</v-card-title
                        >
                        <v-card-title class="text-center text-lg-h6"
                          >Enter your Personal Details</v-card-title
                        >

                        <v-form @submit.prevent="registerUser">
                          <v-text-field
                            label="Email"
                            v-model="emailRegister"
                            :error-messages="errors.emailRegister"
                          ></v-text-field>

                          <v-text-field
                            label="Password"
                            v-model="passwordRegister"
                            :error-messages="errors.passwordRegister"
                          ></v-text-field>
                          <div class="text-center mt-n5">
                            <v-btn
                              class="mb-10"
                              variant="flat"
                              color="secondary"
                              type="submit"
                            >
                              SIGN UP
                            </v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
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
import { useField, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import * as zod from "zod";
import { computed, ref } from "vue";
import { useAccountStore } from "@/store/AccountUser";
import { storeToRefs } from "pinia";

const accountUser = useAccountStore();
// login

const validationSchema = toFormValidator(
  zod.object({
    emailRegister: zod
      .string()
      .nonempty("This is required")
      .email({ message: "Must be a valid email" }),
    passwordRegister: zod
      .string()
      .nonempty("This is required")
      .min(8, { message: "Too short message" }),
  })
);

const { handleSubmit, errors, handleReset } = useForm({
  validationSchema,
});

const { value: emailRegister } = useField("emailRegister");
const { value: passwordRegister } = useField("passwordRegister");

const registerUser = handleSubmit((values) => {
  accountUser.registerUser({
    email: emailRegister.value,
    password: passwordRegister.value,
  });
  handleReset()
});

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
</style>
  