<template>
  <div>
    <card
      class="stripe-card"
      :class="{ complete }"
      stripe="pk_test_pmjCZGyZbGQfvqr6eTchZb0g00tjboeX39"
      :options="stripeOptions"
      @change="complete = $event.complete"
    />

    <br>

    <button
      class="pay-with-stripe"
      @click="pay"
      :disabled="!complete"
    >Submit Payment &amp; Start Membership</button>
  </div>
</template>

<script>
import { stripeKey, stripeOptions } from "./stripeConfig.json";
import { Card, createToken } from "vue-stripe-elements";

export default {
  name: "StripeCardComponent",

  props: {},

  data: function() {
    return {
      complete: false,
      stripeOptions: stripeOptions,
      token: ""
    };
  },

  components: { Card },

  methods: {
    pay: function() {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then(data => {
        if (data.token) {
          this.token = data.token.id;
          this.$emit("token-generated", this.token);
        }
      });
    }
  }
};
</script>

<style>
.stripe-card {
  width: 75%;
  padding: 1em 1.75em;
  background-color: #efefef;
  border: 1px solid var(--header-color);
  border-radius: 5px;
  font-family: "Work Sans", sans-serif !important;
  font-weight: 500 !important;
}
.stripe-card.complete {
  border-color: var(--valid-color);
}

button.pay-with-stripe {
  border: none;
  font-size: 115%;
  opacity: 1;
  cursor: pointer;
  background-color: var(--accent-color);
}

button.pay-with-stripe:disabled {
  opacity: 0.1;
  cursor: not-allowed;
}
</style>
