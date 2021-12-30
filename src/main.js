import { createApp }                                            from 'vue'
import App                                                      from './App.vue'
import router                                                   from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import { ApolloClient, createHttpLink, InMemoryCache }          from '@apollo/client/core'
import { createApolloProvider }                                 from '@vue/apollo-option'
import { setContext }                                           from 'apollo-link-context' 

const httpLink = createHttpLink({
    uri : "https://p5g2-apigateway-psych.herokuapp.com/"
});

const authLink = setContext((_, { headers }) => {
    return {
        headers:{
            ...headers,
            "Authorization": localStorage.getItem("tokenAccess") || ""
        }
    }
});

const apolloClient = new ApolloClient({
    link    : authLink.concat(httpLink),
    cache   : new InMemoryCache(),
});

const apolloProvider = new createApolloProvider({
    defaultClient   :  apolloClient
});


    


createApp(App).use(router).use(apolloProvider).mount('#app')