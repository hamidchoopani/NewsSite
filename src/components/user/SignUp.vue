<template>
  <article class="blog-post">
    <div class="blog-post__img">
      <img src="@/assets/world.jpg" alt="" />
    </div>
    <div class="blog-post__info">
      <div class="login-box">
        <h6 class="blog-post__title">Enter your Personal Details</h6>
        <v-form @submit.prevent="registerUser">
          <v-text-field label="Email" v-model="emailRegister" :error-messages="errors.emailRegister"></v-text-field>
          <span class="text-red" v-if="checkEmail">{{ checkEmail }}</span>
          <v-text-field label="Password" v-model="passwordRegister"
            :error-messages="errors.passwordRegister"></v-text-field>
          <h5 class="text-center mt-4">Forgot your password ?</h5>
          <v-btn class="mb-10" variant="flat" color="secondary" type="submit"> SIGN UP </v-btn>
        </v-form>
      </div>
    </div>
</article>
</template>
  
<script setup>
import { useField, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import * as zod from "zod";
import { computed, ref } from "vue";
import { useAccountStore } from "@/store/AccountUser";
import { storeToRefs } from "pinia";

const accountUser = useAccountStore();

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

const { checkEmail } = storeToRefs(accountUser)

const registerUser = handleSubmit((values) => {
  accountUser.registerUser({
    email: emailRegister.value,
    password: passwordRegister.value,
  });
  handleReset()
});

</script>
  
<style scoped>



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
</style>
  