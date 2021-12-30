<template>
    <div class="Opinion">
        <div class="opinion-inner">
            <div class="opinion-detail">
                <h5>Terapias</h5>
                <p>{{opinion.terapias}}</p>
                <h5>Inconvenientes</h5>
                <p>{{opinion.negativo}}</p>
                <h5>Sugerencias</h5>
                <p>{{opinion.sugerencia}}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name:"Opinion", /*Maybe the o is lower case*/
    props: ['opinion']
}
</script>

<style>
    .Opinion{
        color:white;
        flex: 1 1 33.333%;
        width: 100%;
        height:100%;
        padding: 25px;
    }

    .opinion-inner{
        position:relative;
        padding:5px;
        box-shadow: 0px 0px 16px rgba(0,0,0,0.55);
        background-image: linear-gradient(to bottom right, #F444A4, #1168D4);
        border-radius: 10px;
    }

    .opinion-detail h5{
        color:white;
        justify-content: left;
        font-size: 1.3em;
    }

    .opinion-detail p{
        color:lightgray;
        justify-content: left;
    }

</style>
