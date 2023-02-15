import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router/routes'
import Swal from 'sweetalert2'
axios.defaults.baseURL = 'http://localhost:3000'
export const useAccountStore = defineStore('AccountStore', {
    state: () => ({
        checkuser: null,
        checkEmail: null,
        checkEmailForLogin: null
    }),
    getters: {

    },
    actions: {
        registerUser(user) {
            const email = user.email
            const password = user.password
            // if (email == '' || password == '') {
            //     return this.checkEmail = 'Please enter email and password'
            // }
            axios.get(`user?email=${email}`)
                .then(res => {
                    if (res.data != null) {
                        if (res.data[0]?.email == email) {
                            this.checkEmail = 'This email is already available on the site'
                        }
                        else {
                            axios.post('user', user)
                                .then(res => {
                                    console.log(res.data);
                                    if (res.status === 201) {
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Register was successful',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        router.push("/SignIn")
                                    }
                                }).catch((error) => {
                                    console.log(error);
                                })
                        }
                    }
                })

        },

        loginUser(userlogin) {
            const email = userlogin.email
            const password = userlogin.password

            if (email == '' || password == '') {
                return this.checkEmailForLogin = 'Please enter email and password'
            }
            axios.get(`user?email=${email}&password=${password}`)
                .then(res => {
                    if (res.status == 200) {
                        if (res.data != '') {
                            let expires = null
                            const cookieName = 'userlogin'
                            const d = new Date();
                            d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
                            expires = "expires=" + d.toUTCString();
                            document.cookie = cookieName + "=" + email + ";" + expires + ";path=/";

                            // localStorage.setItem('useremail', email)
                            this.checkuser = email
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Login was successful',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(() => {
                                router.push('/')
                            }, 2000);
                        } else {
                            console.log("no login");
                        }
                    } else {
                        alert('server error');
                    }
                }).catch((error) => {
                    console.log(error);
                })
        },

        checkUserLogin() {
            // if (localStorage.getItem('useremail')) {
                // this.checkuser = localStorage.getItem('useremail')
                let cookies = document.cookie.split(';')
                cookies.some(cookie => {
                    if (cookie.includes('userlogin')) {
                        this.checkuser = cookie.substring(cookie.indexOf('=') + 1)
                        return true
                    }
                })
            // }
        },
        logOut(user) {
            // localStorage.removeItem('useremail')
            console.log(user);
            let expires = null
            const d = new Date();
            d.setTime(d.getTime() - 2 * 24 * 60 * 60 * 1000);
            expires = "expires=" + d.toUTCString();
            document.cookie = 'userlogin' + "=" + user + ";" + expires + ";path=/";
            this.checkuser = null;

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
                icon: 'success',
                title: 'Logout was successful'
            })
            setTimeout(() => {
                router.push('/SignIn')
            }, 3000);
        },
    }
})