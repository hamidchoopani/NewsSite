<template>
    <section class="page_404">
        <div class="container">
            <div class="row">
                <div>
                    <div class="text-center">
                        <div class="four_zero_four_bg">
                            <h1 class="text-center ">404</h1>


                        </div>

                        <div class="contant_box_404">
                            <h3 class="h2">
                                Look like you're lost
                            </h3>

                            <p>the page you are looking for not avaible!</p>
                            <v-btn class="link_404" :to="{name:'Home'}">Go to Home</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>
/*======================
    404 page
=======================*/


.page_404 {
    padding: 40px 0;
    background: #fff !important;
    font-family: 'Arvo', serif;
}

.page_404 img {
    width: 100%;
}

.four_zero_four_bg {
    background-image: url(../assets/NotFount/404.gif);
    width: 800px;
    height: 400px;
    background-position: center;
}
.text-center{
    color: #000;
}

.four_zero_four_bg h1 {
    font-size: 80px;
}

.four_zero_four_bg h3 {
    font-size: 80px;
}

.link_404 {
    color: #fff !important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
}

.contant_box_404 {
    margin-top: -50px;
}
</style>