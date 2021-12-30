<template>
<div>
    <div class="Home">
        <div class="home-container-1">  
                <h1> <span id="LogedUser">{{ UserDetailById.name }}</span>, recuerda que el seguimiento de tu proceso te ayudará a progresar y a tomar mejores decisiones</h1>
        </div>
        <div class="imagehome">
            <img src="../images/calendar.jpg">
        </div>

  
    </div>
    <hr style="border:15px;color:transparent;">     
 <hr style="border:15px;color:transparent;">
 <hr style="border:15px;color:transparent;">     
 <hr style="border:15px;color:transparent;">
 <hr style="border:15px;color:transparent;">
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
                }
            }
            
        },

        components:{

        },

        apollo: {
            //Take in account that this MS require authorization to perform this activity.
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
            }
        }

    }
</script>

<style>

    .Home{
    height: 260px;
        
       
    }
    .home-container-1{
        position: relative;
        height: 100%;
        width: 40%;
        display: block;
        justify-content: center;
        align-items: left;
        align-content: left;
        margin-top:150px;
        color: black;
        left:100px;
        overflow: hidden;
        z-index:-1;
       
        
    }

    h1{
        color:black;
        font-family: "Arial", "Courier New", monospace;
        text-align: left;
        z-index:10;
    }


    #LogedUser{
        color:#303F9F;
        font-size: 3rem;
    }

    .imagehome{
        position: relative;
        top:-320px;
        left:300px;
        z-index: -1;
    }

</style>
