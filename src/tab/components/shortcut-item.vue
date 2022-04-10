<template>
  
</template>

<script>
export default {
    name:'shortcut-item',
    props:{
        link:{
            type:String,
            default:"chrome://newtab"
        },
        text:{
            type:String,
            required:true
        }
    }
}
</script>

<style>

</style>