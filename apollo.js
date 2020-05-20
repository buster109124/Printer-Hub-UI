import Vue from 'vue'
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost'

Vue.use(VueApollo);

const client = new ApolloClient({ uri: "http://locaclhost:4000/erp-srv/gql" });

const apolloProvider = new VueApollo({
    defaultClient: client,
});


export { apolloProvider }