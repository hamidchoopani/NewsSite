<template>
  <div class="container">
    <div class="content">
      <div class="left-side">
        <div class="address details">
          <i class="fas fa-map-marker-alt"></i>
          <div class="topic">Address</div>
          <div class="text-one">Surkhet, NP12</div>
          <div class="text-two">Birendranagar 06</div>
        </div>
        <div class="phone details">
          <i class="fas fa-phone-alt"></i>
          <div class="topic">Phone</div>
          <div class="text-one">+0098 9893 5647</div>
          <div class="text-two">+0096 3434 5678</div>
        </div>
        <div class="email details">
          <i class="fas fa-envelope"></i>
          <div class="topic">Email</div>
          <div class="text-one">codinglab@gmail.com</div>
          <div class="text-two">info.codinglab@gmail.com</div>
        </div>
      </div>
      <div class="right-side">
        <div class="topic-text">Send us a message</div>
        <p>If you have any work from me or any types of quries related to my tutorial, you can send me message from
          here. It's my pleasure to help you.</p>
        <form ref="form" @submit.prevent="submit">
          <div class="input-box">
            <!-- <input type="text" placeholder="Enter your name"> -->
            <v-text-field v-model="name" class="mb-5" name="to_name" :error-messages="errors.name" label="Name"></v-text-field>
          </div>
          <div class="input-box">
            <!-- <input type="text" placeholder="Enter your email"> -->
            <v-text-field v-model="email" class="mt-8" name="from_name" :error-messages="errors.email" label="email"></v-text-field>
          </div>
          <!-- <textarea placeholder="Message" class="field"></textarea> -->
          <v-textarea clearable name="message" class="mt-8" label="message" v-model="message"
            :error-messages="errors.message"></v-textarea>
          <!-- <v-btn class="text-orange" width="120">Send Now</v-btn> -->
          <v-btn color="orange" variant="outlined" width="150" type="submit" name="Send">
            Button
          </v-btn>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2'

import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';


const validationSchema = toFormValidator(
  zod.object({
    name: zod.string().nonempty('This is required').min(3, { message: 'Too short' }),
    email: zod.string().nonempty('This is required').email({ message: 'Must be a valid email' }),
    message: zod.string().nonempty('This is required').min(8, { message: 'Too short message' }).max(100, { message: 'Too long message' }),
  })
);

const { handleSubmit, errors, handleReset } = useForm({
  validationSchema,
});

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: message } = useField('message');

const form=ref(null)

const submit = handleSubmit(values => {
  emailjs.sendForm('service_g9i2dpl', 'template_6w0672m', form.value, '3z66-fmfviL9jQHXe')
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Submitted successfully',
                text: 'Thank you for your comments',
            })
            handleReset()
        }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'An error occurred',
                text: 'Sorry, try again in a few minutes',
            })
        });
})


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  min-height: 100vh;
  width: 100%;
  background: #c8e8e9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 85%;
  margin-top: 20px;
  margin-bottom: 20px;
  /* background: #fff; */
  border-radius: 6px;
  padding: 20px 60px 30px 40px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.container .content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.container .content .left-side {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  position: relative;
}

.content .left-side::before {
  content: '';
  position: absolute;
  height: 70%;
  width: 2px;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  background: #afafb6;
}

.content .left-side .details {
  margin: 14px;
  text-align: center;
}

.content .left-side .details i {
  font-size: 30px;
  /* color: #3e2093; */
  margin-bottom: 10px;
}

.content .left-side .details .topic {
  font-size: 18px;
  font-weight: 500;
}

.content .left-side .details .text-one,
.content .left-side .details .text-two {
  font-size: 14px;
  /* color: #afafb6; */
}

.container .content .right-side {
  width: 75%;
  margin-left: 75px;
}

.content .right-side .topic-text {
  font-size: 23px;
  font-weight: 600;
  color: #3e2093;
}

.right-side .input-box {
  height: 50px;
  width: 100%;
  margin: 12px 0;
}

.right-side .input-box input,
.right-side .input-box textarea {
  height: 100%;
  width: 100%;
  border: 1px solid;
  outline: none;
  font-size: 16px;
  /* background: #F0F1F8; */
  border-radius: 6px;
  padding: 0 15px;
  resize: none;
}

.right-side .message-box {
  min-height: 110px;
}

.right-side .input-box textarea {
  padding-top: 6px;
}

.right-side .button {
  display: inline-block;
  margin-top: 12px;
}

.right-side .button input[type="button"] {
  /* color: #fff; */
  font-size: 18px;
  outline: none;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  background: #3e2093;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button input[type="button"]:hover {
  background: #5029bc;
}

@media (max-width: 950px) {
  .container {
    width: 90%;
    padding: 30px 40px 40px 35px;
  }

  .container .content .right-side {
    width: 75%;
    margin-left: 55px;
  }
}

@media (max-width: 820px) {
  .container {
    margin: 40px 0;
    height: 100%;
  }

  .container .content {
    flex-direction: column-reverse;
  }

  .container .content .left-side {
    width: 100%;
    flex-direction: row;
    margin-top: 40px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .container .content .left-side::before {
    display: none;
  }

  .container .content .right-side {
    width: 100%;
    margin-left: 0;
  }
}

.field {
  width: 100%;
  height: 120px;
  border: 1px solid;
  outline: none;
  /* background-color: rgba(230, 230, 230, 0.6); */
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  margin-bottom: 22px;
  transition: .3s;
}

.field:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>