<template>
    <div class="loginUser">
        <div class="image">
            <img src="../images/illustration.jpg" width="500" height="300">
        </div>
        <div class="containerLoginUser">
            <div class="superior-panel">
                <h2>¡Ingresa ahora!</h2>
            </div>
            <form v-on:submit.prevent="processLogInUser" method="POST">
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <br>
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
        <div></div>
        <div class="footer">
        <h2>MisionTic 2022 - P5 - Grupo2 ©</h2>
         </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    export default {
        name: "LogIn",
        
        data: function(){
            return {
                user: {
                    username:"",
                    password:""
                }
            }
        },
        methods: {
            processLogInUser: async function(){
                console.log(this.user);
                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation($credentials: CredentialsInput!) {
                            LogIn(credentials: $credentials) {
                            refresh
                            access
                            }
                        }   
                    `,
                        variables: {
                            credentials : this.user,
                        }
                    }
                )
                .then((result) => {
                    let dataLogIn = {
                        username     : this.user.username,
                        tokenRefresh : result.data.LogIn.refresh,
                        tokenAccess  : result.data.LogIn.access 
                    }
                    console.log(dataLogIn)
                    this.$emit("completedLogIn", dataLogIn);

                })
                .catch((error) => {
                    console.log(error);
                    alert("Hubo un fallo iniciando tu sesión. Intenta de nuevo");
                })

            }
            
        }
    }
</script>

<style>
    .loginUser{
        position:absolute;
        top:100px;
        margin: 0;
        padding: 0%;
        height: 83%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .img{
        position:absolute;
        left:30px;
        margin-right:150px
    }

    .containerLoginUser {
        border: 4px solid #303F9F;
        border-radius: 15px;
        width: 25%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        right:0px;
    }

    .superior-panel{
        display:flex;
        background-color: #303F9F;
        height:15%;
        width:100%;
        align-items: center;
        align-content:center;
        justify-content: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .superior-panel h2{
        color: white;
        font-size: 1.5rem;
        align-content:center;
        padding-top:12px;
        padding-bottom: 5px;
    }

    .loginUser form{
        margin-top:30px;
        width: 70%;
        height: 100%;
    }
    .loginUser input{
        height: 45px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin-bottom: 5px;
        border: 1px solid #283747;
        color:black;
    }
    .loginUser button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #303F9F;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        margin-bottom:15px;
    }
    .loginUser button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>