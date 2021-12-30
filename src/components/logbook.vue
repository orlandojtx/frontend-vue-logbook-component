<template>
    <div class="Logbook">
         <div class="scroll-to-top">
                <button @click="scrollToTop"> Subir </button>
         </div>
        <div class="logbook-container-1" >  
           
            <div class="menu-logbook">
                <ul>
                    <li>   
                        <button> <a  @click="scrollMeTo('crearEntrada')">Añadir</a></button>
                        <button> <a  @click="scrollMeTo('actualizarEntrada')">Actualizar</a></button>
                        <button> <a @click="scrollMeTo('verEntrada')">Ver</a></button>
                        <button v-on:click="processDeleteEntry()"> Eliminar </button> 
                    </li>
                </ul>
            </div>
            <br/>
            <br/>

            <div class="table-boots table-responsive">
                <table class="table table-bordered table-hover" id="tableLogbook">
                    <thead>
                    <tr>
                        <th scope="col" style ="width:3%">  #</th>
                        <th scope="col" style ="width:5%">  Fecha</th>
                        <th scope="col" style ="width:15%"> Profesional</th>
                        <th scope="col" style ="width:10%"> Asistencia</th>
                        <th scope="col" style ="width:40%"> Descripción</th>
                        <th scope="col" cstyle="width:5%">  Satisfacción</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr height="10px" v-for="entry in entriesDetailByUsername" :key="entry" v-on:click="selectRow(entry)" class="hideextra">
                            <td>{{entry.id}}</td>
                            <td>{{entry.fecha}}</td>
                            <td>{{entry.psicologo}}</td>
                            <td>{{entry.asistencia}}</td>
                            <td>
                                <div class="hideextra" style="width:450px">
                                    {{entry.descripcion}}
                                </div>
                            </td>                    
                            <td>{{entry.satisfaccion}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p v-if="rowSelected != 0">El id de la fila seleccionada es: {{this.rowSelected}} </p>
        </div>
        <br/>
        <br/>

        <div class="logbook-container-2" ref="crearEntrada">
            <fieldset>
                <legend>Crear entrada</legend>
                <form class="formCreateEntry" v-on:submit.prevent="processCreateEntry">
                    <input type="text" v-model="entryTicket.physichologist" placeholder="Profesional">
                    <br/>
                    <input type="date" v-model="entryTicket.date" placeholder="Date">
                    <br/>
                    <textarea rows="4" cols="31" v-model="entryTicket.description" placeholder="Descripción"></textarea>
                    <br/>
                    <p>Asistencia</p>
                    <div class="create-radio-buttons">
                        <label for="1">Si</label>
                        <input class="radio-1" type="radio" id="1" value="1" v-model="entryTicket.attendance">
                        <label for="2">No</label>
                        <input class="radio-1" type="radio" id="0" value="0" v-model="entryTicket.attendance">
                    </div>
                    <input type="number" v-model="entryTicket.satisfaction" placeholder="Satisfacción">
                    <br/>
                    <button type="submit">Crear</button>
                </form>
           
            </fieldset>

          <div class="imageCreateEntry">
            <img src="../images/appointment.jpg" width="600" height="450">
        </div>   
        </div>
        <br/>
        <br/>

        
        <div class="logbook-container-3" ref="actualizarEntrada">
            
            <div class="imageUpdateEntry">
                <img src="../images/appointment2.jpg" width="500" height="450">
            </div> 

            <fieldset>
                <legend>Actualizar entrada</legend>
                <form class="formUpdateEntry" v-on:submit.prevent="processUpdateEntry">
                    <input type="text" v-model="updateTicket.physichologist" placeholder="Profesional">
                    <br/>
                    <input type="date" v-model="updateTicket.date" placeholder="Date">
                    <br/>
                    <textarea rows="4" cols="40" v-model="updateTicket.description" placeholder="Descripción"></textarea>
                    <br/>
                    <p>Asistencia</p>
                    <div class="create-radio-buttons">
                        <label for="1">Si</label>
                        <input class="radio-1" type="radio" id="1" value="1" v-model="updateTicket.attendance">
                        <label for="2">No</label>
                        <input class="radio-1" type="radio" id="0" value="0" v-model="updateTicket.attendance">
                    </div>
                    <input type="number" v-model="updateTicket.satisfaction" placeholder="Satisfacción">
                    <br/>
                    <button type="submit">Actualizar</button>
                </form>
            </fieldset>
        </div>
        <br/>
        <br/>

        <div class="logbook-container-4" ref="verEntrada">
            <div class="middle-container-4">
                <div class="viewEntry">
                    <h3 >Profesional: {{}}   </h3>
                    <h3>Fecha:        {{}}   </h3>
                    <h3>Asistencia:   {{}}   </h3>
                    <h3>Satisfaccion: {{}}   </h3>
                    <h3>Descripción:  {{}}   </h3>
                </div> 
                <div class="viewEntryAnswer">
                    <h3>{{this.detailTicket.psicologo}}</h3>
                    <h3>{{this.detailTicket.fecha}}</h3>
                    <h3>{{this.detailTicket.asistencia}}</h3>
                    <h3>{{this.detailTicket.satisfaccion}}</h3>
                    <h3>{{this.detailTicket.descripcion}}</h3>
                    
                </div>
            </div>            
        </div>

<div class="footer">
      <h2>MisionTic 2022 - P5 - Grupo2 ©</h2>
    </div>
    
    </div>
</template>

<script>
    import gql        from 'graphql-tag';

    export default{
        name: "Home",
        data: function(){
            return {
                username                : localStorage.getItem("username"),
                entriesDetailByUsername : [],
                entryTicket             : {
                    logbook         : localStorage.getItem("username"),
                    date            : "",
                    physichologist  : "",
                    attendance      : undefined,
                    description     : "",
                    satisfaction    : ""
                },
                
                rowSelected : 0,

                updateTicket            : {
                    id              : this.rowSelected,
                    logbook         : localStorage.getItem("username"),
                    date            : "",
                    physichologist  : "",
                    attendance      : false,
                    description     : "",
                    satisfaction    : ""
                },  
                
                detailTicket              : {
                    psicologo       : "",
                    fecha           : "",
                    asistencia      : undefined,
                    descripcion     : "",
                    satisfaccion    : undefined         
                },
                
            }
            
        },

        methods: {

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


            scrollMeTo(refName) {
                var element = this.$refs[refName];
                var top = element.offsetTop;
                 window.scrollTo(0, top);
            },

            selectRow(entryRow){
                this.rowSelected = entryRow.id;

                this.detailTicket.psicologo     = entryRow.psicologo;
                this.detailTicket.fecha         = entryRow.fecha;
                this.detailTicket.asistencia    = entryRow.asistencia;
                this.detailTicket.descripcion   = entryRow.descripcion;
                this.detailTicket.satisfaccion  = entryRow.satisfaccion;
            },

            processCreateEntry: async function(){
                this.entryTicket.attendance = !!parseInt(this.entryTicket.attendance);

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


                console.log(this.entryTicket)
                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation EntryCreate($entryCreateInput: EntryCreation!) {
                              entryCreate(entryCreateInput: $entryCreateInput)
                            }
                         `,
                        variables : {
                            entryCreateInput: this.entryTicket,
                        }

                    }
                )
                .then((result) => {
                    let message = "La entrada ha sido añadida a tu bitácora";
                    alert(message);
                })
                .catch((error) => {
                    console.log(error)
                    alert("Ha ocurrido un error")
                })

            },

            processUpdateEntry: async function(){
                this.updateTicket.attendance = !!parseInt(this.updateTicket.attendance);
                console.log(this.updateTicket);
                console.log("Estoy actualizando la entrada" + this.rowSelected)
                this.updateTicket.id = this.rowSelected;
                
                if(this.rowSelected != 0)
                {
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
                                mutation ($entryUpdateBody: EntryUpdateInput!) {
                                entryUpdate(entryUpdateBody: $entryUpdateBody) {
                                    id
                                    bitacora
                                    fecha
                                    psicologo
                                    asistencia
                                    descripcion
                                    satisfaccion
                                }
                                }
                            `,
                            variables : {
                                entryUpdateBody: this.updateTicket,
                            }
                        }
                    )
                    .then((result) => {
                        let message = "La entrada ha sido actualizada exitosamente";
                        alert(message);
                        this.$emit("completedLogbook")
                    })
                    .catch((error) => {
                        console.log(this.updateTicket)
                        console.log(error)
                        alert("Ha ocurrido un error actualizando la entrada")
                    })
                }
                else{
                    alert("Debe seleccionar alguna entrada");
                }
            },

            processDeleteEntry: async function(){
                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation EntryDelete($entryId: Int!) {
                              entryDelete(entryId: $entryId)
                            }
                        `,
                        variables : {
                            entryId: this.rowSelected,
                        }
                    }
                )
                .then((result) => {
                    console.log(result)
                    let message = "La entrada ha sido eliminada exitosamente";
                    alert(message);
                })
                .catch((error) => {
                    console.log(error)
                    alert("Ha ocurrido un error eliminando la entrada")
                })                
            }

        },

        apollo: {
            entriesDetailByUsername : {
                query: gql`
                    query Query($username: String!) {
                      entriesDetailByUsername(username: $username) {
                        id
                        fecha
                        psicologo
                        asistencia
                        descripcion
                        satisfaccion
                      }
                    }
                `,
                variables() {    
                    return {
                        username: this.username,
                    };
                }
            }
        },

        created: function(){
            this.$apollo.queries.entriesDetailByUsername
            this.$apollo.queries.entriesDetailByUsername.refetch()
        },
      


   
      }

    
</script>

<style>
    .Logbook{
        display:block;
    }
    .logbook-container-1{
        position: relative;
        height: 400px;
        width: 80%;
        justify-content: center;
        align-items: center;
        align-content: center;
        align-self:center;
        margin-top:150px;
        color: black;
        left:130px;
        top:-50px;
            }

    .logbook-container-2{
        position: relative;
        display:flex;
        width: 80%;
        height : 600px;
        align-self: center;
        left: 100px;
        
    }

    .imageCreateEntry{
        position:relative;
        right:-100px;
        z-index:-1;
    }

    .logbook-container-3{
       position: relative;
        display:flex;
        width: 80%;
        height : 600px;
        align-self: center;
        left: 100px;   
    }

    .logbook-container-4{
        position: relative;
        display:flex;
        width: 80%;
        height : 600px;
        align-self: center;
        left: 100px; 
        background-color: lime;  
    }

    h3{
        color:black;
    }

    .formCreateEntry{
         border:1px solid black;
         padding-top: 20px;
         border-radius: 0 0 10px 10px;
         align-items: left;
         align-content: left;
         margin-top:-0px;
    }
    
    .formUpdateEntry{
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

    .table-responsive {
        max-height:300px;
    }

    .menu-logbook{
        align-self: center;
        position:absolute;
        left:200px;
    }

    .menu-logbook button{
        height : 30px;
        width  : 120px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', sans-serif;
        color: white;
        padding: 5px;
        margin-right: 10px;
        border-radius:5px;
        background-color: #59309F;
        border-color: white;
    }


    .table-boots{
        right:210px;
    }
    
    .table-bordered th{
        color:black;
        z-index :10;    
    }

    .table-bordered td{
        z-index :10;    
        height: 14px
    }

    .table-bordered tr{
         line-height: 20px;
    } 

    .hideextra {
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        color:black;
    }

    .logbook-container-2 input{
        height: 45px;
        width: 80%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin-bottom: 5px;
        border: 1px solid #283747;
    }

    .logbook-container-3 input{
        height: 45px;
        width: 80%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin-bottom: 5px;
        border: 1px solid #283747;
    }

    .logbook-container-2 button{
        width: 40%;
        height: 40px;
        color: #E5E7E9;
        background: #303F9F;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        margin-bottom:15px;
    }
    
    .logbook-container-2 button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

    .logbook-container-3 button{
        width: 40%;
        height: 40px;
        color: #E5E7E9;
        background: #303F9F;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        margin-bottom:15px;
    }
    .logbook-container-3 button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

    /* CONTAINER VER ENTRADA */

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
        width: 70%;
        margin-left: 100px;
        align-self: center;
        display:flex;
        align-items: right;
        border: 1px solid black;
        text-align: left;
        padding : 50px;
        margin-bottom:150px;
    }

    .viewEntry h3{
        position:relative;
        text-align: left;
        text-decoration: none;
        font-weight: none;
        color: blue;
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

    .create-radio-buttons{
        align-items: center;
        display:flex;
        height: 20px;
        margin-right: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        padding-left: 120px;
        width:50%
    }
    input[type=radio] {
        border: 0px;
        width: 100%;
        height: 1em;
    }

    table tr:not(:first-child){
    cursor: pointer;transition: all .25s ease-in-out;
    }

    table tr:not(:first-child):hover{
        background-color: #ddd;
    }

    ul{
        list-style-type: none;
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


</style>    