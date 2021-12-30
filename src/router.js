import gql                                              from 'graphql-tag' 
import { createRouter, createWebHashHistory }           from 'vue-router'
import { ApolloClient, InMemoryCache, createHttpLink }  from '@apollo/client/core'


import App                                              from './App.vue'
import Login                                            from './components/login.vue'
import SignUp                                           from './components/signUp.vue'
import Home                                             from './components/home.vue'
import Logbook                                          from './components/logbook.vue'
import About                                            from './components/about.vue'
import Pqrs                                             from './components/pqrs.vue'
import Experiences                                      from './components/experiences.vue'


const routes = [
  {
    path: '/experiences',
    name: "experiences",
    component: Experiences,
    meta      : {
      requiresAuth: false,
    }
  },
  {
    path: '/about',
    name: "about",
    component: About,
    meta      : {
      requiresAuth: false,
    }
  },
  {
    path        : '/user/login',
    name        : "login",
    component   : Login,
    meta      : {
      requiresAuth: false,
    }
  },
  {
    path        : '/user/signUp',
    name        : "signup",
    component   : SignUp,
    meta      : {
      requiresAuth: false,
    }
  },
  {
    path      : '/home',
    name      : "home",
    component : Home,
    meta      : {
      requiresAuth: true,
    }
  },
  {
    path: '/logbook',
    name: "logbook",
    component: Logbook,
    meta      : {
      requiresAuth: true,
    }
  },
  {
    path: '/cuentanos',
    name: "pqrs",
    component: Pqrs,
    meta      : {
      requiresAuth: true,
    }
  },
  
];

const apolloClient = new ApolloClient({
  link    : createHttpLink( { uri : "https://p5g2-apigateway-psych.herokuapp.com/" } ),
  cache   : new InMemoryCache(),
});

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

async function isAuth() {
  console.log("Voy a entrar a verificar la autenticación")
  if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem('tokenAccess') === null){
    return false;
  }
  try{
    var result = await apolloClient.mutate(
      {
        mutation: gql`
            mutation($token: Refresh!) {
              refreshToken(token: $token) {
                access
              }
            }
        `,
        variables:{
            token: {
                refresh: localStorage.getItem("tokenRefresh"),
            }
        }
      
      }
    )
    
    localStorage.setItem("tokenAccess", result.data.refreshToken.access);
    return true;
  }
  catch{
    localStorage.clear();
    alert("Su sesión ha expirado. Inicie sesión de nuevo");
  }
}


router.beforeEach(async (to,from) => {
  console.log(from)
  let is_auth =  await isAuth();
  console.log(isAuth())

  if (is_auth == to.meta.requiresAuth)
    return true;

  if(is_auth){
    return { name : "home" };
  }
  else{
    return { name : "about" }; //En vez de login que me cargue about
  }
});

export default router
