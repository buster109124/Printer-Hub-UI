<template>
  <div>
    <div>
      <h1>{{product.name}}</h1>

      <h4>Plans</h4>

      <ul>
        <li v-for="p in product.plans.sort((x,y)=> x.amount - y.amount)" :key="p.id">
          <h3>{{ p.nickname }} - ${{ p.amount }}</h3>
        </li>
      </ul>

      <button @click="selected">Get Started</button>
    </div>

    <div v-show="purchase" class="purchase">
      <div class="user-info">
        <h3>Personal Details</h3>

        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            v-model="payload.name"
            placeholder="First Last Name"
            required
          >
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            v-model="payload.email"
            placeholder="Work email preferred"
            required
          >
        </div>

        <div>
          <label>Mobile #</label>
          <input type="tel" name="mobile" v-model="payload.mobile" placeholder="___   ___   ____">
        </div>

        <div>
          <label>Title</label>
          <input type="text" name="title" v-model="payload.title" placeholder="Work Title" required>
        </div>

        <div>
          <label>Interest (optional)</label>
          <div class="selection">
            <input type="checkbox" name="interest" id="0" value="Private">
            <label for="0">Committees</label>
          </div>

          <div class="selection">
            <input type="checkbox" name="interest" id="1" value="Private">
            <label for="1">Speaking Opportunities</label>
          </div>

          <div class="selection">
            <input type="checkbox" name="interest" id="2" value="Public">
            <label for="2">Social Issues</label>
          </div>

          <div class="selection">
            <input type="checkbox" name="interest" id="3" value="Subsidary">
            <label for="3">Networking</label>
          </div>

          <div class="selection">
            <input type="checkbox" name="interest" id="4" value="Other">
            <label for="4">Advocacy</label>
          </div>

          <div class="selection">
            <input type="checkbox" name="interest" id="5" value="Other">
            <label for="5">Community Outreach</label>
          </div>

          <div class="selection">
            <input type="checkbox" name="interest" id="6" value="Other">
            <label for="6">Public Policy</label>
          </div>

          <div class="selection">
            <input type="checkbox" name="interest" id="7" value="Other">
            <label for="7">Programs</label>
          </div>
        </div>
      </div>

      <div class="user-info">
        <h3>Company Information</h3>

        <label>Company</label>
        <input
          type="text"
          name="company"
          v-model="payload.company"
          placeholder="Company Name"
          class="fill"
          required
        >

        <br>

        <label>Website</label>
        <input
          type="url"
          name="website"
          v-model="payload.website"
          placeholder="https://website.com"
        >

        <br>

        <label>Company Phone #</label>
        <input
          type="tel"
          name="companyPhone"
          v-model="payload.companyPhone"
          placeholder="___   ___   ____"
        >

        <br>

        <label>Ownership</label>
        <div class="selection">
          <input
            type="radio"
            name="ownership"
            id="private"
            value="Private"
            v-model="payload.ownership"
          >
          <label for="private">Private</label>
        </div>

        <div class="selection">
          <input
            type="radio"
            name="ownership"
            id="public"
            value="Public"
            v-model="payload.ownership"
          >
          <label for="public">Public</label>
        </div>

        <div class="selection">
          <input
            type="radio"
            name="ownership"
            id="subsidary"
            value="Subsidary"
            v-model="payload.ownership"
          >
          <label for="subsidary">Subsidary</label>
        </div>

        <div class="selection">
          <input type="radio" name="ownership" id="other" value="Other" v-model="payload.ownership">
          <label for="other">Other</label>
        </div>
      </div>

      <div class="plans">
        <h3>Membership</h3>
        <h1>{{product.name}}</h1>

        <br>

        <h3 @click="mockSubmit">How would you like to pay?</h3>

        <div
          class="selection"
          v-for="p in product.plans.sort((x,y)=> x.amount - y.amount)"
          :key="p.id"
        >
          <input type="radio" name="plan" :id="p.id" :value="p.id" v-model="payload.plan">
          <label :for="p.id">${{ p.amount }} / {{ p.nickname }}</label>
        </div>

        <br>
        <br>

        <h3>Apply coupon code (optional):</h3>
        <input type="text" placeholder="Enter coupon code">

        <br>

        <h3>You will be charged:</h3>
        <a>${{selectedPlan.amount}} - {{selectedPlan.nickname + (selectedPlan && selectedPlan.nickname[selectedPlan.nickname.length -1 ] === 'y' ? '': 'ly') }}</a>

        <br>
        <br>

        <stripe-card-component v-show="!succcesfulPayment" @token-generated="setTokenAndSubmit"></stripe-card-component>

        <button class="success" v-show="succcesfulPayment">Congrats! You are now a Member of the Partnership!</button>
      </div>
    </div>
  </div>
</template>

<script>
import StripeCardComponent from "./StripeCardComponent";
import SUBSCRIPTION from "../graphql/mutations/subscriptions";

export default {
  name: "ProductCardComponent",

  components: {
    StripeCardComponent
  },

  data: function() {
    return {
      total: 0,
      succcesfulPayment: false,
      payload: {
        company: "",
        ownership: "",
        companyPhone: "",
        website: "",
        name: "",
        email: "",
        title: "",
        mobile: "",
        plan: "",
        token: ""
      }
    };
  },

  props: {
    purchase: Boolean,
    product: { plans: [] }
  },

  computed: {
    selectedPlan: function() {
      return (
        this.product.plans.filter(p => p.id === this.payload.plan)[0] || {
          amount: 0,
          nickname: ""
        }
      );
    }
  },

  mounted: function() {
    let plan = this.product.plans.filter(p => p.nickname === "Annual")[0];
    this.payload.plan = plan ? plan.id : "";
  },

  methods: {
    selected: function() {
      this.purchase = !this.purchase;
    },

    mockSubmit: function() {
      console.log(this.payload);
    },

    setTokenAndSubmit: function(token) {
      this.payload.token = token;
      this.submit();
    },

    submit: function() {
      this.$apollo
        .mutate({
          // Query
          mutation: SUBSCRIPTION.SIMPLE_CREATE,
          // Parameters
          variables: {
            args: this.payload
          }
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          // update: (store, { data: { addTag } }) => {
          //   // Read the data from our cache for this query.
          //   const data = store.readQuery({ query: TAGS_QUERY });
          //   // Add our tag from the mutation to the end
          //   data.tags.push(addTag);
          //   // Write our data back to the cache.
          //   store.writeQuery({ query: TAGS_QUERY, data });
          // },
          // Optimistic UI
          // Will be treated as a 'fake' result as soon as the request is made
          // so that the UI can react quickly and the user be happy
          // optimisticResponse: {
          //   __typename: "Mutation",
          //   addTag: {
          //     __typename: "Tag",
          //     id: -1,
          //     label: newTag
          //   }
          // }
        })
        .then(data => {
          this.succcesfulPayment = true;

          // Result
          console.log(data);
        })
        .catch(error => {
          this.succcesfulPayment = false;

          // Error
          console.error(error);
          // We restore the initial user input
          // this.newTag = newTag;
        });
    }
  }
};
</script>

<style scoped>
.purchase {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  grid-template-columns: 25% 25% auto;
  background-color: rgba(255, 255, 255, 0.96);
  text-align: left;
}

.purchase .plans,
.purchase .user-info {
  padding: 2em 5em;
}

.purchase .user-info {
  background-color: rgba(61, 61, 61, 0.068);
}

/* .purchase .user-info label {
  font-size: 14px;
} */

.purchase .user-info .selection {
  display: inline-block;
  margin: 0.5em 0.5em 0em 0;
  font-size: 85%;
}

.success {
  background-color: var(--valid-color);
  font-size: 120%;
}

/* .purchase .plans {
} */
</style>
