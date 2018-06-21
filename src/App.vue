<template>
    <div id="app">
        <rwv-header></rwv-header>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import RwvHeader from './components/TheHeader'
    export default {
        name: 'app',
        components: {
            RwvHeader
        }
    }
</script>