
<template>
	

	<section id="app" v-if="checkuser" class="commentuser">
		
				<div class="container">
					<div class="row">
						<div class="col-6">
							<div class="comment">
								<h1 style="margin-bottom:20px; margin-top:20px;">Comments</h1>
							</div>
						</div>
					</div>
					<div class="">
						<div class="col-6" >
							<v-textarea class="btnaddcom" v-model="comment" clearable label="comment" variant="outlined"></v-textarea>
							<v-btn class='float-right text-orange' :disabled="!comment" @click="addComment()">Add Comment</v-btn>
						</div>
					</div>
				</div>
			</section>
			<div v-else class="alertlogin" id="alertlog">
				<v-alert closable  icon="mdi-comment-alert-outline" title="add comment" text="You must login to comment"
					type="info" variant="tonal"></v-alert>
			</div>

			<div class="comments-container" v-if="allNewsComment">
		<v-progress-circular v-if="loading" indeterminate :size="50" color="primary" :width="5"></v-progress-circular>
		<ul v-else id="comments-list" class="comments-list">
			<li v-for="comment in allNewsComment" :key="comment.commentId">
				<div class="comment-main-level">
					<!-- Avatar -->
					<div class="comment-avatar"><img src="@/assets/pngfind.com-avatar-png-2387252.png" alt=""></div>
					<!-- Contenedor del Comentario -->
					<div class="comment-box">
						<div class="comment-head">
							<h6 class="comment-name"><a href="http://creaticode.com/blog">{{ comment.userName }}</a>
							</h6>
							<span>{{ comment.dateTime }}</span>
							<i class="fa fa-reply"></i>
							<i class="fa fa-heart"></i>
						</div>
						<div class="comment-content">
							{{ comment.comment }}
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div v-else id="commentuseralert">
		<v-alert closable icon="mdi-comment-alert-outline" title="There is no comment"
			text="There are no comments for this post" type="info" variant="tonal"></v-alert>
	</div>
	
</template>

<script setup>
import { ref } from 'vue';
import { useNewsStore } from '@/store/News'
import { useAccountStore } from '@/store/AccountUser'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';



const route = useRoute();
const NewsId = route.params.id;
const newsStore = useNewsStore()
const userStore = useAccountStore()

const { allNewsComment, loading } = storeToRefs(newsStore)


const { checkuser } = storeToRefs(userStore)

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const withSlashes = [year, month, day].join('/');




const comment = ref(null)

const addComment = () => {
	newsStore.addCommentUser({
		comment: comment.value,
		userName: checkuser.value.split('@')[0],
		dateTime: withSlashes,
		newsId: parseInt(NewsId)
	})
	comment.value=''
}


</script>





<style scoped>
/* add comment */
.v-btn {
	width: 150px;
}

/* end add comment */



/* comment */
.app{
	padding-bottom: -10rem;
}
* {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

a {
	/* color: #03658c; */
	text-decoration: none;
}

ul {
	list-style-type: none;
}

body {
	font-family: 'Roboto', Arial, Helvetica, Sans-serif, Verdana;
	/* background: #dee1e3; */
}

/** ====================
 * Lista de Comentarios
 =======================*/
.comments-container {
	margin: 90px auto 15px;
	width: 768px;
	margin-bottom: 20px;
}

.comments-container h1 {
	font-size: 36px;
	/* color: #283035; */
	font-weight: 400;
}

.comments-container h1 a {
	font-size: 18px;
	font-weight: 700;
}

/* .comments-list {
	margin-top: 30px;
 position: relative;
} */
.comments-list{
	transform: translateY(-8rem);
}
/**
 / Detalles
 -----------------------*/
.comments-list li {
	margin-bottom: 15px;
	display: block;
	position: relative;
}

.comments-list li:after {
	content: '';
	display: block;
	clear: both;
	height: 0;
	width: 0;
}

.reply-list {
	padding-left: 88px;
	clear: both;
	margin-top: 15px;
}

/**
 * Avatar
 ---------------------------*/
.comments-list .comment-avatar {
	width: 65px;
	height: 65px;
	position: relative;
	z-index: 99;
	float: left;
	/* border: 3px solid #FFF; */
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	-moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	overflow: hidden;
}

.comments-list .comment-avatar img {
	width: 100%;
	height: 100%;
}

.reply-list .comment-avatar {
	width: 50px;
	height: 50px;
}

.comment-main-level:after {
	content: '';
	width: 0;
	height: 0;
	display: block;
	clear: both;
}

/**
 * Caja del Comentario
 ---------------------------*/
.comments-list .comment-box {
	width: 680px;
	float: right;
	position: relative;
	-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

.comments-list .comment-box:before,
.comments-list .comment-box:after {
	content: '';
	height: 0;
	width: 0;
	position: absolute;
	display: block;
	border-width: 10px 12px 10px 0;
	border-style: solid;
	border-color: transparent #FCFCFC;
	top: 8px;
	left: -11px;
}

.comments-list .comment-box:before {
	border-width: 11px 13px 11px 0;
	/* border-color: transparent rgba(0, 0, 0, 0.05); */
	left: -12px;
}

.reply-list .comment-box {
	width: 610px;
}

.comment-box .comment-head {
	/* background: #FCFCFC; */
	padding: 10px 12px;
	border-bottom: 1px solid;
	overflow: hidden;
	-webkit-border-radius: 4px 4px 0 0;
	-moz-border-radius: 4px 4px 0 0;
	border-radius: 4px 4px 0 0;
}

.comment-box .comment-head i {
	float: right;
	margin-left: 14px;
	position: relative;
	top: 2px;
	/* color: #A6A6A6; */
	cursor: pointer;
	-webkit-transition: color 0.3s ease;
	-o-transition: color 0.3s ease;
	transition: color 0.3s ease;
}



.comment-box .comment-name {
	/* color: #283035; */
	font-size: 14px;
	font-weight: 700;
	float: left;
	margin-right: 10px;
}



.comment-box .comment-head span {
	float: left;
	/* color: #999; */
	font-size: 13px;
	position: relative;
	top: 1px;
}

.comment-box .comment-content {
	/* background: #FFF; */
	padding: 12px;
	font-size: 15px;
	/* color: #595959; */
	-webkit-border-radius: 0 0 4px 4px;
	-moz-border-radius: 0 0 4px 4px;
	border-radius: 0 0 4px 4px;
}


.comment-box .comment-name.by-author:after {
	content: 'autor';
	/* background: #03658c; */
	/* color: #FFF; */
	font-size: 12px;
	padding: 3px 5px;
	font-weight: 700;
	margin-left: 10px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	border-radius: 3px;
}

/** =====================
 * Responsive
 ========================*/
@media only screen and (max-width: 766px) {
	.comments-container {
		width: 480px;
	}

	.comments-list .comment-box {
		width: 390px;
	}

	.reply-list .comment-box {
		width: 320px;
	}
}

.btnaddcom{
	width:800px;
}
.container{
	margin-top: -450px;
	padding-top: 70px;
}
.alertlogin{
	position: absolute;
	transform: translateY(45rem);
}
.commentuser{
	margin-top: 18rem;
}
#commentuseralert{
	position: absolute;
	top: 55rem;
	transform: translateY(-111px);
}
#alertlog{
	margin-top: -80px;
}
</style>