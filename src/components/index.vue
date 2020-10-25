<template>
    <div>
        <top></top>
        <router-view :key="$root.path"></router-view>
    </div>
</template>


<script>
    import  top from "./index/top"
    export default {
        components:{
            top
        }
    }
</script>

<style scoped>



</style>