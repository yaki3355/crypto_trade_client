<template>
  <v-app>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <h1>Crypto trade</h1>
    <br>
      <div>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="black"
          icons-and-text
          dark
          grow 
          @change='tabChanged'
        >
          <v-tabs-slider color="orange"></v-tabs-slider>
          <v-tab v-for="(t, i) in tabs" :key="i">
            <v-icon large>{{ t.icon }}</v-icon>
            <div class="caption py-1">{{ t.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="username"
                        label="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'eye' : 'eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn
                        x-large
                        block
                        color="warning"
                        @click="loginBtn"
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
             <div class="alert alert-danger col-md-4" role="alert" v-if="error">
                {{error}}
            </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="username"
                        label="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        label="E-mail"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="confirmPassword"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                        x-large
                        block
                        color="warning"
                        @click="registerBtn"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
                <div class="alert alert-danger col-md-4" role="alert" v-if="error">
                    {{error}}
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="resetPasswordForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col v-if="showEmailFieldOfReset" cols="12">
                      <v-text-field
                        v-model="email"
                        label="E-mail"
                      ></v-text-field>
                    </v-col>
                    <v-col v-if="showVerificationCodeAndPasswordFields" cols="12">
                      <v-text-field
                        v-model="verificationCode"
                        label="Verification code"
                      ></v-text-field>
                    </v-col>
                    <v-col v-if="showVerificationCodeAndPasswordFields" cols="12">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="New Password"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col v-if="showVerificationCodeAndPasswordFields" cols="12">
                      <v-text-field
                        block
                        v-model="confirmPassword"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm New Password"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="6" xsm="12">
                      <v-btn
                        x-large
                        block
                        color="warning"
                        @click="resetPasswordBtn"
                        :disabled="resetPasswordBtnDisabled"
                        >{{resetPasswordBtnLabel}}</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
                <div class="alert alert-danger col-md-4" role="alert" v-if="error">
                    {{error}}
                </div>
                <div class="control-group" v-show="showSpinner">
                    <div class="controls">
                    <div class="spinner-border text-warning"></div>
                    </div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
    <video id="cryptoBG" autoplay muted loop>
      <source src="../assets/crypto.webm" type="video/webm">
    </video>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  methods: {
    loginBtn() {
        const {username, password} = this;

        if (!username || !password) return this.error = 'Please fill all fields';

        this.$axios.post('api/login', {username, password})
        .then(({data: {token, email}}) => {
            this.$store.commit('LOGIN', {user: {token, username, email}});
            this.$router.push('/trade');
        })
        .catch(({response: {data}}) => this.error = data);
    },
    tabChanged() {
        this.resetFields();
    },
    resetFields() {
        this.error = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.showSpinner = false;
        this.showVerificationCodeAndPasswordFields = false;
        this.showEmailFieldOfReset = true;
        this.resetPasswordBtnLabel = 'Send verification code';
        this.resetPasswordBtnDisabled = false;
    },
    registerBtn() {
        const {username, email, password, confirmPassword} = this;

        if (!username || !email || !password || !confirmPassword) return this.error = 'Please fill all fields';
        if (password !== confirmPassword) return this.error = 'Password and Confirm Password not match';

        this.$axios.post('api/register', {username, email, password})
        .then(() => {
            this.resetFields();
            this.tab = 0;
        })
        .catch(({response: {data}}) => this.error = data);
    },
    resetPasswordBtn() {
        switch(this.resetPasswordBtnLabel) {
            case 'Send verification code':
                this.sendVerificationCode();
                break;
            case 'Reset':
                this.resetPassword();
                break;
        }
    },
    sendVerificationCode() {
        const {email} = this;

        if (!email) return this.error = 'Please fill field';

        this.showSpinner = true;
        this.resetPasswordBtnDisabled = true;

        this.$axios.put('api/email_reset_code', {email})
        .then(() => {
            this.error = '';
            this.showEmailFieldOfReset = false;
            this.showVerificationCodeAndPasswordFields = true;
            this.resetPasswordBtnLabel = 'Reset';
        })
        .catch(({response: {data}}) => this.error = data)
        .finally(() => {
            this.showSpinner = false;
            this.resetPasswordBtnDisabled = false;
        });
    },
    resetPassword() {
        const {verificationCode, password, confirmPassword} = this;

        if (!verificationCode || !password || !confirmPassword) return this.error = 'Please fill fields';
        if (password !== confirmPassword) return this.error = 'New Password and Confirm New Password not match';

        this.$axios.put('api/reset_password', {email: this.email, email_reset_code: verificationCode, password})
        .then(() => {
            this.resetFields();
            this.tab = 0;
        })
        .catch(({response: {data}}) => this.error = data);
    }
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
      { name: "Reset password", icon: "mdi-account-outline" }
    ],
    valid: true,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    show1: false,
    resetPasswordBtnLabel: '',
    verificationCode: '',
    showEmailFieldOfReset: true,
    showVerificationCodeAndPasswordFields: false,
    error: '',
    showSpinner: false,
    resetPasswordBtnDisabled: false
  })
};
</script>

<style scoped>
h1 { color: #b48608; font-family: 'Droid serif', serif; font-size: 72px; font-weight: 400; font-style: italic; line-height: 44px; margin: 0 0 12px; text-align: center; }

#cryptoBG {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
</style>