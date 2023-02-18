<template>
	<footer class="footer-distributed">

		<div class="footer-left" v-if="currentLang=='en'">
			<router-link :to="{name:'Home'}">
				<div>
					<img width="130" src="../assets/logo.png" alt="">
				</div>
			</router-link>
			<p>quick access</p>
			<p class="footer-links ">
				<v-btn :to="{name:'Home'}" class="pa-0" variant="plain">Home</v-btn>
				<v-btn :to="{name:'ContactUs'}" class="pa-0" variant="plain">Contact Us</v-btn>
				<v-btn :to="{name:'currency'}" class="pl-2" variant="plain">CryptoCurrency</v-btn>
				<v-btn :to="{name:'weatherapp'}" class="pa-0" variant="plain">Meteorology</v-btn>
			</p>
			<p class="footer-company-name">News Name © 2023</p>
		</div>
		<div class="footer-left" v-if="currentLang=='fa'">
			<h3>News<span>logo</span></h3>
			<p class="footer-linksFa">دسترسی سریع</p>
			<p class="footer-links">
				<a href="#" class="link-1">هواشناسی</a>
				<a href="#">ارزهای دیجیتال</a>
				<a href="#">تماس با ما</a>
				<a href="#">خانه</a>
			</p>
			<p class="footer-company-name">News Name © 2023</p>
		</div>

		<div class="footer-center">

			<div>
				<i class="fa fa-map-marker"></i>
				<p v-if="currentLang=='en'">Sanandaj, Kurdstan</p>
				<p v-if="currentLang=='fa'">کردستان, سنندج</p>
			</div>

			<div>
				<i class="fa fa-phone"></i>
				<p>+98 555 44 33</p>
			</div>

			<div>
				<i class="fa fa-envelope"></i>
				<p><a href="mailto:support@company.com">support@News.com</a></p>
			</div>
			<div>
				<v-btn variant="plain" class="ml-4" color="#be603a" size="small" icon>
					<v-icon>mdi-email</v-icon>
				</v-btn>
				<v-btn variant="plain" class="ml-4" color="#00acee" size="small" icon>
					<v-icon>mdi-twitter</v-icon>
				</v-btn>
				<v-btn variant="plain" class="ml-4" color="#0077b5" size="small" icon>
					<v-icon>mdi-linkedin</v-icon>
				</v-btn>
			</div>
		</div>

		<div class="footer-right">
			<p class="footer-company-about">
				<span v-if="currentLang=='en'">Technology Used On The Site</span>
				<span v-if="currentLang=='fa'">تکنولوژی های استفاده شده</span>
				<v-btn icon variant="text">
					<img width="30" src="@/assets/icon/vue-js.svg" />
					<v-tooltip activator="parent" location="top">vue js</v-tooltip>
				</v-btn>
				<v-btn icon variant="text">
					<img width="30" src="@/assets/icon/vuetify.svg" />
					<v-tooltip activator="parent" location="top">vuetify</v-tooltip>
				</v-btn>
				<v-btn icon variant="text">
					<img width="35" src="@/assets/icon/vee-validate.png" />
					<v-tooltip activator="parent" location="top">vee-validate</v-tooltip>
				</v-btn>
				<v-btn icon variant="text">
					<img width="25" src="@/assets/icon/pinia.svg" />
					<v-tooltip activator="parent" location="top">pinia</v-tooltip>
				</v-btn>
				<v-btn variant="text" class="pa-0">
					<img width="110" src="@/assets/icon/axios.svg" />
					<v-tooltip activator="parent" location="top">axios</v-tooltip>
				</v-btn>
				<v-btn icon variant="text">
					<img width="25" src="@/assets/icon/emailjs.png" />
					<v-tooltip activator="parent" location="top">emailjs</v-tooltip>
				</v-btn>
				<v-btn icon variant="text">
					<img width="40" src="@/assets/icon/openWeather.png" />
					<v-tooltip activator="parent" location="top">openWeather</v-tooltip>
				</v-btn>
				<v-btn variant="text" class="pa-0">
					<img width="110" src="@/assets/icon/vuesweetalert.png" />
					<v-tooltip activator="parent" location="top">sweetalert</v-tooltip>
				</v-btn>
				<v-btn icon variant="text">
					<img width="30" src="@/assets/icon/coingecko2.webp" />
					<v-tooltip activator="parent" location="top">coingecko</v-tooltip>
				</v-btn>
				<v-btn icon variant="text">
					<img width="30" src="@/assets/icon/swiper.png" />
					<v-tooltip activator="parent" location="top">swiperjs</v-tooltip>
				</v-btn>
			</p>
		</div>

	</footer>
</template>
<script setup>
import { watch } from "vue";
import { useNewsStore } from '@/store/News'
import { storeToRefs } from 'pinia';

const newsStore = useNewsStore()
const { currentLang } = storeToRefs(newsStore)

watch(currentLang, () => {
  if (currentLang.value == 'fa') {
    newsStore.getImageNewsFa()
  } else {
    newsStore.getImageNews()
  }
})

</script>




<style scoped>
@font-face {
    font-family: iranSans;
    src: url('@/assets/font/IRANSans.ttf');
}

* {
    font-family: iranSans;
}
.footer-linksFa{
	display: flex;
	justify-content: space-evenly;
}
section {
	width: 100%;
	display: inline-block;
	/* background: #333; */
	height: 50vh;
	text-align: center;
	font-size: 22px;
	font-weight: 700;
	text-decoration: underline;
}

.footer-distributed {
	/* background: #666; */
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
	box-sizing: border-box;
	width: 100%;
	text-align: left;
	font: bold 16px sans-serif;
	padding: 20px 50px;
}

.footer-distributed .footer-left,
.footer-distributed .footer-center,
.footer-distributed .footer-right {
	display: inline-block;
	vertical-align: top;
}

/* Footer left */

.footer-distributed .footer-left {
	width: 40%;
}

/* The company logo */

.footer-distributed h3 {
	/* color:  #ffffff; */
	font: normal 36px 'Open Sans', cursive;
	margin-bottom: 20px;
}

.footer-distributed h3 span {
	color: lightseagreen;
}

/* Footer links */

.footer-distributed .footer-links {
	/* color:  #ffffff; */
	margin:0 0 20px 12px;
	padding: 0;
}

.footer-distributed .footer-links a {
	display: inline-block;
	line-height: 1.8;
	font-weight: 400;
	text-decoration: none;
	color: inherit;
}

.footer-distributed .footer-company-name {
	/* color:  #222; */
	font-size: 14px;
	font-weight: normal;
	margin: 0;
}

/* Footer Center */

.footer-distributed .footer-center {
	width: 35%;
}

.footer-distributed .footer-center i {
	background-color: #33383b;
	/* color: #ffffff; */
	font-size: 25px;
	width: 38px;
	height: 38px;
	border-radius: 50%;
	text-align: center;
	line-height: 42px;
	margin: 10px 15px;
	vertical-align: middle;
}

.footer-distributed .footer-center i.fa-envelope {
	font-size: 17px;
	line-height: 38px;
}

.footer-distributed .footer-center p {
	display: inline-block;
	/* color: #ffffff; */
	font-weight: 400;
	vertical-align: middle;
	margin: 0;
}

.footer-distributed .footer-center p span {
	display: block;
	font-weight: normal;
	font-size: 14px;
	line-height: 2;
}

.footer-distributed .footer-center p a {
	color: lightseagreen;
	text-decoration: none;
	;
}



/* Footer Right */

.footer-distributed .footer-right {
	width: 20%;
}

.footer-distributed .footer-company-about {
	line-height: 20px;
	/* color:  #92999f; */
	font-size: 13px;
	font-weight: normal;
	margin: 0;
}

.footer-distributed .footer-company-about span {
	display: block;
	/* color:  #ffffff; */
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 20px;
}

.footer-distributed .footer-icons {
	transform: translateX(-28px);
	margin-top: 20px;
}

/* 
.footer-distributed .footer-icons a{
	display: inline-block;
	width: 35px;
	height: 35px;
	cursor: pointer;
	background-color:  #33383b;
	border-radius: 2px;

	font-size: 20px;
	/* color: #ffffff;
	text-align: center;
	line-height: 35px;

	margin-right: 3px;
	margin-bottom: 5px;
} */

/* If you don't want the footer to be responsive, remove these media queries */

@media (max-width: 880px) {

	.footer-distributed {
		font: bold 14px sans-serif;
	}

	.footer-distributed .footer-left,
	.footer-distributed .footer-center,
	.footer-distributed .footer-right {
		display: block;
		width: 100%;
		margin-bottom: 40px;
		text-align: center;
	}

	.footer-distributed .footer-center i {
		margin-left: 0;
	}

}
</style>