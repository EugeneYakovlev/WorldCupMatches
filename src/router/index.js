import Vue from 'vue'
import Router from 'vue-router'

import groupA from '../groups/groupA.vue';
import groupC from '../groups/groupC.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/groupA', component: groupA},
        {path: '/groupC', component: groupC}
    ]
});

