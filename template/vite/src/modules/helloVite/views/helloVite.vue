<!--
 * @Author: JL Guan
 * @Date: 2021-04-20 13:52:25
 * @description: file description
 * @LastEditTime: 2021-04-20 14:03:04
 * @FilePath: \mine\generate-cli\template\vite\src\modules\helloVite\views\helloVite.vue
-->
<template>
    <div class="helloVite">
        {{name}}
    </div>
</template>

<script>
export default {
    data: () => ({
        name: 'helloVite'
    })
}
</script>

<style lang="scss" scoped>
.helloVite {
    font-size: 40px;
}
</style>