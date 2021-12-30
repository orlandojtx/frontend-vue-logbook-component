<template>
    <div class="signUpUser">
        <div class="image">
            <img src="../images/illustration.jpg" width="500" height="300">
        </div>
        <div class="containerSignUpUser">
            <div class="superior-panel">
                <h2>¡Únase ahora!</h2>
            </div>
            <form v-on:submit.prevent="processSignUp" >
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <input type="text" v-model="user.name" placeholder="Name">
                <br>
                <input type="email" v-model="user.email" placeholder="Email">
                <br>
                <br>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    
        <div class="footer">
            <h2>MisionTic 2022 - P5 - Grupo2 ©</h2>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    export default {
        name: "SignUp",

        data: function(){
            return {
                user: {
                    username: "",
                    password: "",
                    name: "",
                    email: "",
                }
            }
        },

        methods: {
            processSignUp: async function(){
                console.log(this.user);
                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation($userInput: SignUpInput) {
                                SignUpUser(userInput: $userInput) {
                                    refresh
                                    access
                                    }
                            }
                        `, 
                        variables: {
                            userInput : this.user,
                        },
                    }       
                )
                .then((result) => {
                    console.log(this.result)
                    let dataSignUp = {
                        username     : this.user.username,
                        tokenRefresh : result.data.SignUpUser.refresh,
                        tokenAccess  : result.data.SignUpUser.access 
                    }

                    this.$emit("completedSignUp", dataSignUp);

                })
                .catch((error) => {
                    console.log(error);
                    alert("Fallo en el proceso de registro. Intenta de nuevo");
                })

            }
        }
    }
</script>

<style>
    .signUpUser{
        margin: 0;
        padding: 0%;
        height: 112%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .containerSignUpUser {
        border: 3px solid #303F9F;
        border-radius: 10px;
        width: 25%;     /*Echele ojo acá que es donde se està cuadrando el tamaño del container*/
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .superior-panel{
        display:flex;
        background-color:#303F9F;
        height:20%;
        width:102%;
        align-items: center;
        align-content:center;
        justify-content: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;

    }
    .superior-panel h2{
        color: white;
        font-size: 1.5rem;
        align-content:center;
    }
    .signUpUser form{
        margin-top:10px;
        width: 70%;
    }
    .signUpUser input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
        color:black;
    }
    form button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #303F9F;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 0px 0 30px 0;
        
        
    }
    form button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>