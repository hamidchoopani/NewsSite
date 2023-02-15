import { defineStore } from 'pinia'
import axios from 'axios'
import baseURL from '@/baseUrl/url'
import Swal from 'sweetalert2'
import router from '@/router/routes'
// axios.defaults.baseURL='http://localhost:3000'
export const useNewsStore = defineStore('NewsStore', {
    state: () => ({
        AllNews: '',
        getAllImageNews: '',
        allNewsType: '',
        newsDetail: '',
        allNewsComment: '',
        loading: true,
        countLike: 0,
        countDislike: 0,
        splash: true,
        page: 1,
        pageSize: 10,
        pagesCount: null,
        searchDataTag: '',
        currentLang: 'en'

    }),
    getters: {
        cureentLangforapp: (state) => {
            return state.currentLang
        }
    },
    actions: {
        getAllNewsbyfilterBtn() {
            axios('news')
                .then(res => {
                    if (res.status === 200) {
                        this.AllNews = res.data
                    } else {
                        alert('server error')
                    }
                })
        },
        getAllNewsbyfilterBtnFa() {
            axios('newsFa')
                .then(res => {
                    if (res.status === 200) {
                        this.AllNews = res.data
                    } else {
                        alert('server error')
                    }
                })
        },
        getNews() {
            if (this.currentLang == 'en') {
                axios('news')
                    .then(res => {
                        if (res.status === 200) {
                            if (this.searchDataTag != '') {
                                this.pagesCount = Math.ceil(this.searchDataTag.length / this.pageSize)
                                this.AllNews = this.searchDataTag.slice((this.page - 1) * this.pageSize, (this.page) * this.pageSize);
                            } else {
                                this.pagesCount = Math.ceil(res.data.length / this.pageSize)
                                this.AllNews = res.data.slice((this.page - 1) * this.pageSize, (this.page) * this.pageSize);
                                this.loading = false
                            }
                        } else {
                            alert('server error')
                        }
                    })
            } else {
                this.getNewsFa()
            }
        },
        getNewsFa() {
            if (this.currentLang == 'fa') {
                axios('newsFa')
                    .then(res => {
                        if (res.status === 200) {
                            if (this.searchDataTag != '') {
                                this.pagesCount = Math.ceil(this.searchDataTag.length / this.pageSize)
                                this.AllNews = this.searchDataTag.slice((this.page - 1) * this.pageSize, (this.page) * this.pageSize);
                            } else {
                                this.pagesCount = Math.ceil(res.data.length / this.pageSize)
                                this.AllNews = res.data.slice((this.page - 1) * this.pageSize, (this.page) * this.pageSize);
                                this.loading = false
                            }
                        } else {
                            alert('server error')
                        }
                    })
            } else {
                this.getNews()
            }
        },
        getSingleNews(id) {
            if (this.currentLang == 'en') {
                axios('news/' + id)
                    .then(res => {
                        if (res.status === 200) {
                            this.newsDetail = res.data
                            this.loading = false
                        } else {
                            alert('server error')
                        }
                    })
            } else {
                this.getSingleNewsFa(id)
            }
        },
        getSingleNewsFa(id) {
            if (this.currentLang == 'fa') {
                axios('newsFa/' + id)
                    .then(res => {
                        if (res.status === 200) {
                            this.newsDetail = res.data
                            this.loading = false
                        } else {
                            alert('server error')
                        }
                    })
            } else {
                this.getSingleNews(id)
            }
        },
        getNewsType() {
            if (this.currentLang == 'en') {
                axios('typeNews')
                    .then(res => {
                        if (res.status === 200) {
                            this.allNewsType = res.data
                        } else {
                            alert('server error')
                        }
                    })
            } else {
                this.getNewsTypeFa()
            }
        },
        getNewsTypeFa() {
            if (this.currentLang == 'fa') {
                axios('typeNewsFa')
                    .then(res => {
                        if (res.status === 200) {
                            this.allNewsType = res.data
                        } else {
                            alert('server error')
                        }
                    })
            } else {
                this.getNewsType()
            }
        },
        allNewsTypeFilter(newsType) {
            axios(`news?type=${newsType}`)
                .then(res => {
                    if (res.data != '') {
                        this.AllNews = res.data
                        this.loading = false
                    }
                })
        },
        newsSearch(value) {
            axios(`news?q=${value}`)
                .then(res => {
                    this.pagesCount = Math.ceil(res.data.length / this.pageSize)
                    this.AllNews = res.data.slice((this.page - 1) * this.pageSize, (this.page) * this.pageSize);
                    this.loading = false
                    // if(res.data!=''){
                    //     this.AllNews=res.data
                    // }
                })
        },
        getNewsComments(newsId) {
            axios(`newsComment?newsId=${newsId}`)
                .then(res => {
                    if (res.data != '') {
                        console.log(res.data);
                        this.allNewsComment = res.data
                        this.loading = false
                    } else {
                        this.allNewsComment=''
                        console.log("no comment");
                    }
                })
        },
        getLikeComment(newsId) {
            axios(`news/${newsId}`)
                .then(res => {
                    if (res.data != '') {
                        this.countLike = res.data.like
                    } else {
                        console.log("no lik");
                    }
                })
        },
        getDislikeComment(newsId) {
            axios(`news/${newsId}`)
                .then(res => {
                    if (res.data != '') {
                        this.countDislike = res.data.disLike
                    } else {
                        console.log("no lik");
                    }
                })
        },
        addCommentUser(comment) {
            if (comment.comment != null) {
                axios.post(`newsComment`, comment)
                    .then(res => {
                        this.getNewsComments(comment.newsId)
                        return
                    })
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'warning',
                    title: 'Write your opinion'
                })
                return
            }
        },
        splashTime() {
            setTimeout(() => {
                this.splash = false
            }, 1000);
        },
        getImageNews() {
            if (this.currentLang == 'en'){
                axios('news')
                    .then(res => {
                        if (res.status === 200) {
                            this.getAllImageNews = res.data
                        } else {
                            alert('server error')
                        }
                    })
            }else{
                this.getImageNewsFa()
            }
        },
        getImageNewsFa() {
            if (this.currentLang == 'fa'){
                axios('newsFa')
                    .then(res => {
                        if (res.status === 200) {
                            this.getAllImageNews = res.data
                        } else {
                            alert('server error')
                        }
                    })
            }else{
                this.getImageNews()
            }
        },
        likeTheNews(newsId) {
            axios(`news/${newsId}`)
                .then(res => {
                    if (res.data != '') {
                        const newss = {
                            "id": res.data.id,
                            "type": res.data.type,
                            "img": res.data.img,
                            "subTitle": res.data.subTitle,
                            "title": res.data.title,
                            "description": res.data.description,
                            "like": res.data.like += 1,
                            "disLike": res.data.disLike,
                            "tag": res.data.tag,
                            "source": res.data.source
                        }
                        axios.put(`news/${newsId}`, newss)
                            .then(data => {
                                this.getLikeComment(newsId)
                            })
                    } else {
                        console.log("no like");
                    }

                })
        },
        disLikeTheNews(newsId) {
            axios(`news/${newsId}`)
                .then(res => {
                    if (res.data != '') {
                        const newss = {
                            "id": res.data.id,
                            "type": res.data.type,
                            "img": res.data.img,
                            "subTitle": res.data.subTitle,
                            "title": res.data.title,
                            "description": res.data.description,
                            "like": res.data.like,
                            "disLike": res.data.disLike -= 1,
                            "tag": res.data.tag,
                            "source": res.data.source
                        }
                        axios.put(`news/${newsId}`, newss)
                            .then(data => {
                                this.getDislikeComment(newsId)
                            })
                    }
                })
        },
        chnageLangToUSA() {
            if (this.currentLang == 'fa') {
                this.currentLang = 'en'
                localStorage.setItem('lang', this.currentLang)
                this.getNews()
                // this.getSingleNews()
                return true
            }
        },
        changeToPersion() {
            if (this.currentLang == 'en') {
                this.currentLang = 'fa'
                localStorage.setItem('lang', this.currentLang)
                this.getNewsFa()
                // this.getSingleNewsFa()
                return true
            }
        },
        filterNewsByTag(tag) {
            axios(`news?q=${tag}`)
                .then(res => {
                    this.pagesCount = Math.ceil(res.data.length / this.pageSize)
                    this.searchDataTag = res.data.slice((this.page - 1) * this.pageSize, (this.page) * this.pageSize);
                    router.push("/")
                    this.loading = false
                    // if(res.data!=''){
                    //     this.AllNews=res.data
                    // }
                })
        }
    }
})