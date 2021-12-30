<template>
    <div class="pqrs">
        <div class="scroll-to-top">
                <button @click="scrollToTop"> Subir </button>
         </div>

        <div class="logbook-container-2" ref="crearEntrada">
            <fieldset>
                <legend>Cuéntanos, {{UserDetailById.name}}</legend>
                <form class="formCreateEntry" v-on:submit.prevent="processCreateCuentanos">
                    <input type="email" v-model="cuentanos.email" placeholder="Email">
                    <br/>
                    <input type="text" v-model="cuentanos.ventajas" placeholder="¿Ventajas de la plataforma?">
                    <br/>
                    <input type="text" v-model="cuentanos.terapias" placeholder="¿A qué terapias asistes?">
                    <br/>
                    <input type="text" v-model="cuentanos.negativo" placeholder="¿Has tenido inconvenientes?">
                    <br/>
                    <input type="text" v-model="cuentanos.sugerencia" placeholder="¿Recomiendas ir a terapia?">
                    <br/>
                    <button type="submit">Enviar</button>
                </form>

            </fieldset>

            <div class="imageCreateEntry">
                <img src="../images/pqrsRequest.png" width="600" height="400">
            </div>   
        </div>

        <!-- ======== Detail view Section ========== -->
        <div class="logbook-container-4" ref="verEntrada">
            <div class="middle-container-4">
                <div class="viewEntry">
                    <h3 >Fecha :               {{}}   </h3>
                    <h3 >Ventajas plataforma: {{}}   </h3>
                    <h3>Terapias :             {{}}   </h3>
                    <h3>Inconvenientes :       {{}}   </h3>
                    <h3>Recomendaciones :      {{}}   </h3>
                </div> 
                <div class="viewEntryAnswer">
                    <h3>{{this.pqrsDetail.fecha}}</h3>
                    <h3>{{this.pqrsDetail.ventajas}}</h3>
                    <h3>{{this.pqrsDetail.negativo}}</h3>
                    <h3>{{this.pqrsDetail.terapias}}</h3>
                    <h3>{{this.pqrsDetail.sugerencia}}</h3>                   
                </div>
            </div>           
            <button class="delete-pqrs" v-on:click="processDeleteCuetanos()">Eliminar</button>
        </div>




         <!-- ======= Contact Section ======= -->
        <section id="contact" class="contact section-bg">
            <div class="container" data-aos="fade-up">
                <div class="section-title">
                </div>

                <div class="row">

                <div class="col-lg-6">

                    <div class="row">
                    <div class="col-md-12">
                        <div class="info-box">
                        <i class="bx bx-map"></i>
                        <h3>Nuestra ubicación</h3>
                        <p>Bogotá, Colombia</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-box mt-4">
                        <i class="bx bx-envelope"></i>
                        <h3>Escribenos</h3>
                        <p>we@gmail.com<br>weadmin@gmail.com</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-box mt-4">
                        <i class="bx bx-phone-call"></i>
                        <h3>Llamanos</h3>
                        <p>+57 3213333333<br>+57 3213222223</p>
                        </div>
                    </div>
                    </div>

                </div>

                <div class="col-lg-6 mt-4 mt-md-0">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16289433.790265229!2d-83.39978676614085!3d4.609674209206876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a43aae1594a3%3A0x9a0d9a04eff2a340!2sColombia!5e0!3m2!1sen!2sco!4v1639426055177!5m2!1sen!2sco" 
                            width="600" height="380" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

                </div>

                </div>

            </div>
            
            </section><!-- End Contact Section -->
        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">

        <!-- ======= Footer Section ======= -->
        <section class="footerAbout" >
        <div>
            <h2 class="footertext">MisionTic 2022 - P5 - Grupo2 ©</h2>
            </div>  <!-- End Footer Section -->
        </section>
    </div>


</template>

<script>
    import jwt_decode from 'jwt-decode';
    import gql        from 'graphql-tag';

    export default{
        name: "Home",
        /*Recuerde que esta función de data se carga antes de todo y por eso pone el username de una*/
        data: function(){
            return {
                userId           : jwt_decode(localStorage.getItem("tokenRefresh")).user_id ,
                username         : localStorage.getItem("username"),
                UserDetailById : {
                    name : "",
                },
                cuentanos : {
                    nombre          : localStorage.getItem("username"),
                    fecha           : (new Date()).toJSON().toString().substring(0,10),
                    email           : "",
                    ventajas        : "",
                    terapias        : "",
                    negativo        : "",
                    sugerencia      : "",
                },
                pqrsDetail :  {
                    fecha       : "",
                    ventajas    : "",
                    negativo    : "",
                    terapias    : "",
                    sugerencia  : ""
                }
            }
            
        },

        methods:{
            scrollToTop(){
                    let currentScroll = document.documentElement.scrollTop,
                      int = setInterval(frame, 6)

                      function frame(){
                          if( 0 > currentScroll)
                              clearInterval(int)

                          else {
                              currentScroll = currentScroll - 12
                              document.documentElement.scrollTop = currentScroll

                          }
                      }
                },

            processCreateCuentanos: async function(){
                if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem('tokenAccess') === null){
                    this.$emit("logOut");
                    return;
                }
                localStorage.setItem("tokenAcess", "");

                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation Mutation($token: Refresh!) {
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
                .then((result) => {
                    localStorage.setItem("tokenAcess", result.data.refreshToken.access);
                })
                .catch((error) => {
                    this.$emit("logOut");
                    return;
                })

                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation Mutation($pqrsInput: PqrsCreate!) {
                              pqrsCreate(PqrsInput: $pqrsInput) {
                                nombre
                                fecha
                                email
                                ventajas
                                negativo
                                terapias
                                sugerencia
                              }
                            }
                         `,
                        variables : {
                            pqrsInput: this.cuentanos,
                        }

                    }
                )
                .then((result) => {
                    let message = "Tu opinión ha sido enviada. ¡Muchas gracias!";
                    alert(message);
                })
                .catch((error) => {
                    console.log(this.cuentanos)
                    console.log(error)
                    alert("Ha ocurrido un error enviando tu opinión")
                })                
            },

            processDeleteCuetanos: async function(){
                await this.$apollo.mutate(
                        {
                        mutation: gql `
                            mutation Mutation($username: String!) {
                              pqrsDelete(username: $username)
                            }      
                        `,
                        variables : {
                            username : localStorage.getItem("username")
                        }
                    }
                )
                .then((result) => {
                    console.log(result)
                    let message = "Tu comentario ha sido eliminado exitosamente";
                    alert(message);
                })
                .catch((error) => {
                    console.log(error)
                    alert("Ha ocurrido un error eliminando tu comentario. \n Intenta de nuevo")
                })
            },
        },

        apollo: {
            UserDetailById : {
                query : gql`
                    query Query($userId: Int!) {
                    UserDetailById(userId: $userId) {
                      name
                    }
                }

                `,
                variables(){
                    return {
                        userId : this.userId,
                    }
                }
            },

            pqrsDetail : {
                query :gql `
                    query PqrsDetail($username: String!) {
                      pqrsDetail(username: $username) {
                        fecha
                        ventajas
                        negativo
                        terapias
                        sugerencia
                      }
                    }
                `,
                variables(){
                    return {
                        username : localStorage.getItem("username"),
                    }
                }

            },

        }

    }
</script>

<style>

    .logbook-container-2{
        position: relative;
        display:flex;
        width: 80%;
        height : 600px;
        align-self: center;
        left: 100px;
        top: 50px;      
    }

    .formCreateEntry{
        border:1px solid black;
        padding-top: 20px;
        border-radius: 0 0 10px 10px;
        align-items: left;
        align-content: left;
        margin-top:-0px;
    }
    fieldset{
        position:relative;
        color:black;
        border-color: black;
        border-style : solid;
        width: 60%;
        height: 60%;
        left: 60px;
        top: 50px;
        z-index:10;  
    }

    fieldset legend{
    background-color:#303F9F;
    border-radius: 10px 10px 0px 0px;
    color: white;
    height : 50px;
    font-family: 'Times New Roman', Times, serif, Helvetica, sans-serif;
    margin-bottom: 0px;
    padding-top:10px;
    }

    .logbook-container-2 button:hover{
    color: #E5E7E9;
    background: crimson;
    border: 1px solid #283747;
    }

    .imageCreateEntry{
        top: 20px;
    }

    .logbook-container-4{
        display:flex;
        font-family: 'Times New Roman', Times, serif;
        position: relative;
        width: 100%;
        height : 600px;
        align-self: center;
        align-content: center;
        align-items: center;
        left: 100px; 
        background-color: white;  
    }

    .middle-container-4 {
        position:relative;  
        border-radius:20px;
        width: 75%;
        margin-left: 100px;
        align-self: center;
        display:flex;
        align-items: right;
        text-align: left;
        padding : 50px;
        margin-bottom:150px;
        box-shadow: 0px 0px 16px rgba(0,0,0,0.6);
        background-image: linear-gradient(to bottom right, #2C3E50, #4CA1AF);
        border: 0px solid black;
    }

    .viewEntry h3{
        position:relative;
        text-align: left;
        text-decoration: none;
        font-weight: none;
        color: white;
        font-size:1.2em;
    }

    .viewEntryAnswer h3{
        text-align: justify;
        margin-left: 10px;
        font-size: 1.2em;
    }


    .logbook-container-4 .verEntrada{
        position        : relative;
        padding-left    : 400px;
    }

/*--------------------------------------------------------------
# Contact
--------------------------------------------------------------*/
.contact .info-box {
  color: #2d405f;
  text-align: center;
  box-shadow: 0 0 30px rgba(214, 215, 216, 0.6);
  padding: 20px 0 30px 0;
  background: #fff;
}
.contact .info-box i {
  font-size: 32px;
  color: #3b4ef8;
  padding: 8px;
}
.contact .info-box h3 {
  font-size: 20px;
  color: #777777;
  font-weight: 700;
  margin: 10px 0;
}
.contact .info-box p {
  padding: 0;
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}



.scroll-to-top {
     
      
  right: 0;
  
  z-index:100000;
}
.scroll-to-top button {
  border: none;
  background: #5162ce;
  position: fixed;
  right:10px;
  top:540px;
  cursor: pointer;
  z-index:1000000;
  border-radius:100px;
}
.scroll-to-top :hover{
   background: #333e88;
}

.delete-pqrs{
    position: absolute;
    bottom: 190px;
    right: 200px;
    background-color: red;
    border: 0.5px solid rgb(255, 255, 255);
    height:35px;
    border-radius: 5px;
    padding:10px;
    margin-right: 20px;
    padding-bottom: 30px;
}

.delete-pqrs:hover{
    border: 2px solid white;
    background-color: orange;
}


</style>