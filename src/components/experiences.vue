<template>
    <main class="Experiences">
        <section class="opinions">
            <Opinion v-for="opinion in pqrsAll" :key="opinion.terapias" :opinion="opinion"/>
        </section>
    </main>
</template>

<script>
    import gql        from 'graphql-tag';
    import Opinion   from './opinion.vue';

    export default{
        name: "Experiences",
        /*Recuerde que esta función de data se carga antes de todo y por eso pone el username de una*/
        data: function(){
            return {
                pqrsAll : []
            }
        },

        components:{
            Opinion
        },

        apollo: {
            //Take in account that this MS require authorization to perform this activity.
            pqrsAll:{
                query : gql`
                    query Query {
                      pqrsAll {
                        negativo
                        terapias
                        sugerencia
                      }
                    }
                `,
                variables(){
                    return {

                    };
                }
            }
        }

    }
</script> 
<style>
.Experiences{
    width:100vw;
    top: 100px;
    display:flex;
    justify-content: center;
    align-items:center;

}

.opinions{
    display:flex;
    max-height: 1280px;
    padding: 25px;
    margin: 0-auto; 
    color:white;
}
</style>