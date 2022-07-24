<template>
		<div id="wrapper">
			<div id="main">
				<div class="inner">
					<h1 id="text05">NoteSquire</h1>
					<p id="text04">NoteSquire is a simple and clean place to share notes with people.</p>
					<div id="container01" class="container default">
						<div class="wrapper">
							<div class="inner">
								<div id="form01">
									<div class="inner">
                    <p id="text01" style="color: red;">{{error}}</p>
										<div class="field">
											<input type="email" name="email" id="form01-email" placeholder="Email" maxlength="128" required v-model="email"/>
										</div>
										<div class="field">
											<input type="password" name="password" id="form01-password" placeholder="Password" maxlength="256" required v-model="password"/>
										</div>
										<div class="actions">
											<button @click="login">Sign In</button>
										</div>
									</div>
								</div>
								<p id="text01">Create Account</p>
							</div>
						</div>
					</div>
					<ul id="icons01" class="icons">
						<li>
							<a class="n01" href="https://100concepts.wkmn.app">
								<svg><use xlink:href="assets/icons.svg#information"></use></svg>
								<span class="label">Information</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
</template>
<script>
import Firebase from '@/config/db.js'
export default {
  name: 'Login',
  data() {
    return {
      message: 'This is an about page',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.$router.push('/')
      })
      .catch(error => {
        this.error = error.message;
        console.log(error)
      })
    }
  },
}
</script>