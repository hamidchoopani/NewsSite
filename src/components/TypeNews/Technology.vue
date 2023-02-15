<template>
   <v-container>
        <div class="Newslayout">
            <v-btn variant="text" v-bind:class="{ 'active': layout == 'grid' }" v-on:click="layout = 'grid'" icon>
                <v-icon>mdi-apps</v-icon>
                <v-tooltip activator="parent" location="top">Grid</v-tooltip>
            </v-btn>

            <v-btn class="ml-2" variant="text" :class="{ 'active': layout == 'list' }" v-on:click="layout = 'list'"
                icon>
                <v-icon>mdi-view-list</v-icon>
                <v-tooltip activator="parent" location="top">List</v-tooltip>
            </v-btn>
        </div>

        <v-row v-if="layout == 'list'" class="listTR" no-gutters>
            <v-col class="pa-2" cols="12" sm="4">
                <!-- class="mx-auto" max-width="400" -->
                <v-card darkcard class="listTC">
                    <v-img class="align-end text-white listTI" height="200" src="../../src/assets/Technology/Appleslices.png" 
                        aspect-ratio="1" cover>
                        <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                    </v-img>
                    <div class="changeP">

                        <v-card-subtitle class="pt-4">
                            sub title
                        </v-card-subtitle>

                        <v-card-text>
                            title
                        </v-card-text>

                        <!-- <router-link :to="{ name: 'DescriptionNews', params: { id: n.id } }"> -->
                            <v-card-actions class="DescriptionForList">
                                <v-btn variant="outlined" color="orange">
                                    Description
                                </v-btn>
                            </v-card-actions>
                        <!-- </router-link> -->
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-if="layout == 'grid'" no-gutters>
            <v-col  class="pa-2 for-grid" cols="12" sm="4">
                <!-- class="mx-auto" max-width="400" -->
                <v-card darkcard>
                    <v-img class="align-end text-white" height="200"  src="../../src/assets/Technology/Appleslices.png" aspect-ratio="1"
                        cover>
                        <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
                    </v-img>
                    <div>

                        <v-card-subtitle class="pt-4">
                            subtitle
                        </v-card-subtitle>

                        <v-card-text> 
                           title
                        </v-card-text>


                        <!-- <router-link :to="{ name: 'DescriptionNews', params: { id: n.id } }"> -->
                            <v-card-actions>
                                <v-btn color="orange">
                                    Description
                                </v-btn>
                            </v-card-actions>
                        <!-- </router-link> -->
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="text-center">
            <v-pagination v-model="page" :length="4" rounded="circle"></v-pagination>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
const page = ref(1);
let layout = ref('grid');




</script>

<style scoped>

@media (min-width: 600px) {
    .v-col-sm-4 {
        flex: 0 0 33.3333333333% !important;
        max-width: 100% !important;
    }
}
.for-grid{
    max-width: 33% !important;
    min-height: 495px !important;
}
.changeP {
    display: grid;
    align-items: center;
    width: 66%;
}

.DescriptionForList {
    justify-content: end;
}

.listTI {
    max-width: 400px;
}

.listTC {
    display: flex;
    justify-content: space-between;
    text-align: left;
}

.listTR {
    display: grid;
}

a {
    text-decoration: none;
}

.Newslayout {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin: 10px;
}

.v-divider {
    margin-top: 15px;
}

.card {
    grid-gap: 15px 0;
}

</style>