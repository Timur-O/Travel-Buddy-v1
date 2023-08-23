<template>
  <ion-page>
    <ion-content id="background-container">
      <div id="login-container">
        <div id="container-top">
          <ion-thumbnail class="app-icon">
            <img
              alt="App Icon"
              src="/favicon.png"
            >
          </ion-thumbnail>
          <h1 class="title">
            Travel Buddy
          </h1>
        </div>
        <div id="container-bottom">
          <ion-button
            id="emailLoginButton"
            color="secondary"
          >
            Login/Signup with Email
          </ion-button>
          <br>
          <ion-img
            src="/google_login.png"
            @click="loginWithGoogle()"
          />
          <ion-text
            v-if="googleLoginErr"
            class="error"
            color="danger"
          >
            Something went wrong, please try again!
          </ion-text>
        </div>
      </div>

      <ion-modal
        ref="emailLoginModal"
        mode="ios"
        trigger="emailLoginButton"
      >
        <ion-content class="ion-padding">
          <ion-icon
            id="closeButton"
            :icon="closeOutline"
            aria-label="Close Button"
            color="danger"
            @click="dismissEmailLogin()"
          />
          <h3 class="emailModalHeader">
            Login with Email
          </h3>
          <ion-item>
            <ion-input
              id="loginEmail"
              ref="loginEmailValue"
              label="Email Address:"
              label-placement="stacked"
              placeholder="Enter your email..."
              type="email"
            />
          </ion-item>
          <ion-item>
            <ion-input
              id="loginPassword"
              ref="loginPasswordValue"
              label="Password:"
              label-placement="stacked"
              placeholder="Enter your password..."
              type="password"
            />
          </ion-item>

          <ion-text
            v-if="emailLoginErr"
            class="error"
            color="danger"
          >
            {{ emailLoginErrMsg }}
          </ion-text>

          <ion-button
            id="loginButton"
            class="emailModalButton"
            color="secondary"
            expand="block"
            fill="outline"
            @click="loginWithEmail()"
          >
            Login
          </ion-button>

          <br>
          <br>

          <h3 class="emailModalHeader">
            Signup with Email
          </h3>
          <ion-item>
            <ion-input
              id="signupName"
              ref="signUpNameValue"
              label="Name:"
              label-placement="stacked"
              placeholder="Enter your name..."
              type="text"
            />
          </ion-item>
          <ion-item>
            <ion-input
              id="signupEmail"
              ref="signUpEmailValue"
              label="Email Address:"
              label-placement="stacked"
              placeholder="Enter your email..."
              type="email"
            />
          </ion-item>
          <ion-item>
            <ion-input
              id="signupPassword"
              ref="signUpPasswordValue"
              label="Password:"
              label-placement="stacked"
              placeholder="Enter your password..."
              type="password"
            />
          </ion-item>
          <ion-item>
            <ion-input
              id="signupConfirmPassword"
              ref="signUpConfirmPasswordValue"
              label="Confirm Password:"
              label-placement="stacked"
              placeholder="Re-enter your password..."
              type="password"
            />
          </ion-item>

          <ion-text
            v-if="emailSignupErr"
            class="error"
            color="danger"
          >
            {{ emailSignupErrMsg }}
          </ion-text>

          <ion-button
            id="signupButton"
            class="emailModalButton"
            color="secondary"
            expand="block"
            fill="outline"
            @click="signUpWithEmail()"
          >
            Signup
          </ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonText,
  IonThumbnail
} from "@ionic/vue";
import {ref} from "vue";
import {store} from "@/store";
import {closeOutline} from "ionicons/icons";

const emailLoginModal = ref();

const googleLoginErr = ref(false);
const emailLoginErr = ref(false);
const emailLoginErrMsg = ref("");
const emailSignupErr = ref(false);
const emailSignupErrMsg = ref("");

const loginEmailValue = ref("");
const loginPasswordValue = ref("");
const signUpNameValue = ref("");
const signUpEmailValue = ref("");
const signUpPasswordValue = ref("");
const signUpConfirmPasswordValue = ref("");

function dismissEmailLogin() {
  emailLoginModal.value.$el.dismiss(null, 'cancel');

  emailLoginErr.value = false;
  emailSignupErr.value = false;
  googleLoginErr.value = false;
}

function signUpWithEmail() {
  if (signUpNameValue.value.$el.value !== "") {
    if (signUpEmailValue.value.$el.value !== "") {
      if (signUpPasswordValue.value.$el.value !== "") {
        if (signUpConfirmPasswordValue.value.$el.value !== "") {
          if (signUpConfirmPasswordValue.value.$el.value === signUpPasswordValue.value.$el.value) {
            emailSignupErr.value = false;
            store.dispatch("emailSignup", {
              name: signUpNameValue.value.$el.value,
              email: signUpEmailValue.value.$el.value,
              password: signUpPasswordValue.value.$el.value,
              error: emailSignupErr,
              errorMsg: emailSignupErrMsg
            });
          } else {
            emailSignupErr.value = true;
            emailSignupErrMsg.value = "Please enter the same password twice.";
          }
        } else {
          emailSignupErr.value = true;
          emailSignupErrMsg.value = "Please re-enter your password.";
        }
      } else {
        emailSignupErr.value = true;
        emailSignupErrMsg.value = "Please enter a password.";
      }
    } else {
      emailSignupErr.value = true;
      emailSignupErrMsg.value = "Please enter an email address.";
    }
  } else {
    emailSignupErr.value = true;
    emailSignupErrMsg.value = "Please enter a name."
  }
}

function loginWithEmail() {
  if (loginEmailValue.value.$el.value !== "") {
    if (loginPasswordValue.value.$el.value !== "") {
      emailLoginErr.value = false;
      store.dispatch("emailLogin", {
        email: loginEmailValue.value.$el.value,
        password: loginPasswordValue.value.$el.value,
        error: emailLoginErr,
        errorMsg: emailLoginErrMsg
      });
    } else {
      emailLoginErr.value = true;
      emailLoginErrMsg.value = "Please enter your password.";
    }
  } else {
    emailLoginErr.value = true;
    emailLoginErrMsg.value = "Please enter your email address.";
  }
}

function loginWithGoogle() {
  store.dispatch('googleLogin', {
    error: googleLoginErr
  });
}
</script>

<style scoped>
#background-container {
  --background: url("/login-background.jpg") no-repeat center/220%;
}

#login-container {
  height: 100%;
  backdrop-filter: blur(7px);
}

.title {
  font-family: 'Vanity', 'Engebrechtre', sans-serif;
  text-shadow: 1px 1px black;
  font-size: 3em;
}

#container-top, #container-bottom {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

#container-top {
  top: 35%;
}

#container-bottom {
  top: 60%;
}

.app-icon {
  width: 30%;
  height: 30%;
}

.app-icon > img {
  border-radius: 35px;
}

.error {
  display: block;
  margin-top: 0.5em;
  text-align: center;
}

.emailModalHeader {
  text-align: center;
  color: var(--ion-color-secondary);
}

.emailModalButton {
  margin-top: 1em;
  text-align: center;
}

#closeButton {
  font-size: 1.5em;
}
</style>
