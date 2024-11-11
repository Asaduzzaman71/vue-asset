import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from 'vue'
import Auth from '../apis/auth';  
export const useAuthStore = defineStore("auth", () => {
    let error = ref({ type: 401, message: {email: [], password: []} })
    let loading = ref(false)
    async function login(payload = {}) {
        try {
            loading.value = true
            let response = await Auth.login(payload)
            if (response.status == 200) {
                localStorage.setItem('access_token', response?.data?.data?.access_token);
                console.log(response.status)

                this.router.push({ name: 'Dashboard' });
            }
           
        } catch (err) {
            loading.value = false
            if (err.response.status == 401) {
                error.value.type = 401
                error.value.message = err.response?.data?.message || err.response?.data?.error
            } else {
                error.value.type = 422
                error.value.message = err.response?.data.errors
            }
        }
        
    }
    async function logout() {
        try{
                loading.value = true
                let response = await Auth.logout()
                if (response.status == 200) {
                    loading.value = false
                    setTimeout(()=>{
                        localStorage.removeItem("access_token")
                        this.router.push({ name: 'Login' });
                    },500)
                }
            }catch(error){
                loading.value = false
                if (error != 'Assess token has expired')
                this.router.push({ name: 'Login' });
            }
    }
   
    return { login, logout, error, loading }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}