<template>
	      <section class="py-24 md:py-32 bg-white" style="background-image: url('/assets/flex-ui-assets/elements/pattern-white.svg'); background-position: center;">
        <div class="container px-4 mx-auto">
          <div class="max-w-sm mx-auto">
            <div class="mb-6 text-center">
              <a class="inline-block mb-6" href="#">
                <img class="h-16" src="/assets/logo.svg" alt="">
              </a>
              <h3 class="mb-4 text-2xl md:text-3xl font-bold">Join our community</h3>
              <p class="text-lg text-coolGray-500 font-medium">Start your journey with one word.</p>
            </div>
            <div>
              <div class="mb-6">
                <label class="block mb-2 text-coolGray-800 font-medium">Email*</label>
                <input v-model="email" class="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="email" placeholder="me@mail.com">
              </div>
              <div class="mb-4">
                <label class="block mb-2 text-coolGray-800 font-medium">Password*</label>
                <input v-model="password" class="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="password" placeholder="************">
              </div>
              <div class="flex flex-wrap items-center justify-between mb-6">
                <div class="w-full md:w-1/2">
                  <label class="relative inline-flex items-center">
                    <input class="form-checkbox appearance-none" type="checkbox">
                    <img class="absolute top-1/2 transform -translate-y-1/2 left-0" src="/assets/flex-ui-assets/elements/sign-up/checkbox-icon.svg" alt="">
                    <span class="ml-7 text-xs text-coolGray-800 font-medium">Remember me</span>
                  </label>
                </div>
                <div class="w-full md:w-auto mt-1"><a class="inline-block text-xs font-medium text-green-500 hover:text-green-600" href="#">Forgot your password?</a></div>
              </div>
              <button class="inline-block py-3 px-7 mb-4 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm" @click="createAccount">Sign Up</button>
              <p class="text-center">
                <span class="text-xs font-medium">Already have an account?</span>
                <a class="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline" href="/login">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </section>
</template>
<script>
import Firebase from '@/config/db.js'
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    createAccount() {
      Firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('Account created')
        this.$router.push('/')
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
}
</script>