<template>
<AuthLayout>
    <div class="w-lg-500px p-10">
        <!--begin::Form-->
        <form class="form w-100" novalidate="novalidate" id="kt_sign_in_form" data-kt-redirect-url="../../demo1/dist/index.html" action="#">
            <div class="text-center mb-11">
                <h1 class="text-dark fw-bolder mb-3">Sign In</h1>
                <div class="text-gray-500 fw-semibold fs-6">Your Social Campaigns</div>
            </div>
            <!-- <div class="row g-3 mb-9">
                <div class="col-md-6">
                    <a href="#" class="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
                    <img alt="Logo" src="assets/media/svg/brand-logos/google-icon.svg" class="h-15px me-3" />Sign in with Google</a>
                </div>
                <div class="col-md-6">
                    <a href="#" class="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
                    <img alt="Logo" src="assets/media/svg/brand-logos/apple-black.svg" class="theme-light-show h-15px me-3" />
                    <img alt="Logo" src="assets/media/svg/brand-logos/apple-black-dark.svg" class="theme-dark-show h-15px me-3" />Sign in with Apple</a>
                </div>
            </div> -->
            <!-- <div class="separator separator-content my-14">
                <span class="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
            </div> -->
    
            <div class="fv-row mb-8">
                <input type="text" placeholder="Email" v-model="loginFormData.email" autocomplete="off" class="form-control bg-transparent" />
                <span v-if="authStore.error.type === 422 && authStore.error.message?.email?.length" class="text-danger pt-3 ps-2 font-weight-normal">
                    {{ authStore.error.message?.email?.length ? authStore.error.message.email.join(", ") : "" }}
                </span>
            </div>
            <div class="fv-row mb-3">
                <input type="password" placeholder="Password" v-model="loginFormData.password"  autocomplete="off" class="form-control bg-transparent" />
                <span v-if="authStore.error.type === 422 && authStore.error.message?.password?.length" class="text-danger pt-3 ps-2 font-weight-normal">
                    {{ authStore.error.message?.password?.length ? authStore.error.message.password.join(", ") : "" }}
                </span>
            </div>
            <span v-if="authStore?.error?.type === 401 && authStore?.error?.message?.length" class="text-danger pt-3 ps-2 font-weight-normal">
                {{ authStore?.error?.message }}
            </span>
           
            <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                <div></div>
                <a href="../../demo1/dist/authentication/layouts/corporate/reset-password.html" class="link-primary">Forgot Password ?</a>
            </div>
          
            <div class="d-grid mb-10">
                <button type="button" @click="submitLoginForm()" class="btn btn-primary">
                    <span class="indicator-label">Sign In</span>
                    <ButtonLoader class="ms-2" :show="authStore.loading" :color="'white'"></ButtonLoader>
                </button>
            </div>
            <div class="text-gray-500 text-center fw-semibold fs-6">Not a Member yet?
            <a href="../../demo1/dist/authentication/layouts/corporate/sign-up.html" class="link-primary">Sign up</a></div>
        </form>
    </div>
</AuthLayout>
</template>
<script setup>
import { ref } from 'vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import { useAuthStore } from '../stores/Auth';
import ButtonLoader from '../components/ButtonLoader.vue'
const authStore = useAuthStore();
defineOptions({
  name: 'Login'
});
let loginFormData = ref({
    email: null,
    password: null
})
function submitLoginForm(){
    authStore.login(loginFormData.value)
}
</script>