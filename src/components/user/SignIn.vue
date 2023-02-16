<template>
  <article class="blog-post">
    <div class="blog-post__img">
      <img src="@/assets/world.jpg" alt="" />
      <v-btn v-if="currentLang == 'en'" class="btnSIGNUp" :to="{ name: 'SignUp' }" variant="flat" color="secondary"
        type="submit">
        SIGN Up
      </v-btn>
      <v-btn v-else class="btnSIGNUp" :to="{ name: 'SignUp' }" variant="flat" color="secondary" type="submit">
        ثبت نام
      </v-btn>
    </div>
    <div class="blog-post__info">
      <div class="login-box">
        <h6 class="blog-post__title" v-if="currentLang == 'en'">Enter your Personal Details</h6>
        <h6 class="blog-post__title" v-else>اطلاعات خود را وارد کنید</h6>

        <v-form @submit.prevent="loginUser">
          <v-text-field v-if="currentLang == 'en'" label="Email" variant="underlined" v-model="emailLogin"
            :error-messages="errors.emailLogin"></v-text-field>
          <v-text-field v-if="currentLang == 'fa'" label="ایمیل" variant="underlined" v-model="emailLogin"
            :error-messages="errors.emailLogin"></v-text-field>

          <v-text-field v-if="currentLang == 'en'" label="Passowrd" variant="underlined" v-model="passwordLogin"
            :error-messages="errors.passwordLogin"></v-text-field>
          <v-text-field v-if="currentLang == 'fa'" label="کلمه عبور" variant="underlined" v-model="passwordLogin"
            :error-messages="errors.passwordLogin"></v-text-field>

          <h5 v-if="currentLang == 'en'" class="text-center mt-4">Forgot your password ?</h5>
          <h5 v-if="currentLang == 'fa'" class="text-center mt-4">کلمه عبور را فراموش کرده اید؟</h5>
          <v-btn v-if="currentLang == 'en'" class="mb-7" variant="flat" color="secondary" type="submit">
            SIGN IN
          </v-btn>
          <v-btn v-if="currentLang == 'fa'" class="mb-7" variant="flat" color="secondary" type="submit">
            ورود
          </v-btn>
        </v-form>
      </div>
    </div>
</article>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod'; 
import { computed, ref, watch } from "vue";
import { useAccountStore } from "@/store/AccountUser";
import { storeToRefs } from "pinia";
import { useNewsStore } from '@/store/News'

const newsStore = useNewsStore()
const { currentLang } = storeToRefs(newsStore)

// login


const validationSchema = toFormValidator(
  zod.object({
    emailLogin: zod.string().nonempty('This is required').email({ message: 'Must be a valid email' }),
    passwordLogin: zod.string().nonempty('This is required').min(6, { message: 'Too short message' }),
  }),
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
@font-face {
  font-family: iranSans;
  src: url('@/assets/font/IRANSans.ttf');
}

* {
  font-family: iranSans;
}

a {
  text-decoration: none;
}

/* General styles end*/
.blog-post {
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 70rem;
  height: 25rem;
  /* background-color: #fff; */
  padding: 2.5rem;
  box-shadow: 0 1.4rem 8rem rgba(0, 0, 0, 0.2);
  border-radius: 0.8rem;
}

.blog-post__img {
  position: relative;
  min-width: 35rem;
  max-width: 35rem;
  height: 20rem;
  transform: translateX(-8rem);
}

.blog-post__img img {
  display: block;
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  border-radius: 0.8rem;
}

.blog-post__img::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0.5rem 0.5rem 3rem 1px rgba(0, 0, 0, 0.05);
  border-radius: 0.8rem;
  opacity: 0.5;
}

.blog-post__date span {
  display: block;
  /* color: #8e8c8c; */
  font-weight: 600;
  margin: 0.5rem 0;
}

.blog-post__title {
  font-size: 1.5rem;
  margin: 1.5rem 0 2rem;
  text-transform: uppercase;
  color: #4facfe;
}

.blog-post__info p {
  margin-bottom: 3rem;
  /* color: rgba(0, 0, 0, 0.7); */
}

.blog-post__cta {
  display: inline-block;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  padding: 1.5rem 3rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  /* color: #fff; */
  border-radius: 0.8rem;
}

.blog-post__cta:hover {
  background-image: linear-gradient(to right, #00f2fe 0%, #4facfe 100%);
}

@media (max-width: 1068px) {
  .blog-post {
    max-width: 80rem;
  }

  .blog-post__img {
    min-width: 30rem;
    max-width: 30rem;
  }
}

@media (max-width: 868px) {
  .blog-post {
    max-width: 70rem;
  }
}

@media (max-width: 768px) {
  .blog-post {
    padding: 2.5rem;
    flex-direction: column;
  }

  .blog-post__img {
    min-width: 100%;
    transform: translate(0, -8rem);
  }
}


/* formlog */
@media (max-width: 768px) {
  .blog-post {
    margin-top: 7rem;
    padding-bottom: 35rem;
  }

  .login-box {
    transform: translateY(-8rem);
  }
}

.btnSIGNUp {
  /* transform: translateX(17rem); */
  transform: translateY(-3rem);
  margin-left: 14rem;
}
</style>
