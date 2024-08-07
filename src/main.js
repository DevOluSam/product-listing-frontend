// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import './assets/tailwind.css'
// import Header from '../src/components/HeaderView.vue'

// App.component('Header', Header)
// createApp(App).use(store).use(router).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import HeaderView from './components/HeaderView.vue'

const app = createApp(App)

app.component('HeaderView', HeaderView)
app.use(store)
app.use(router)
app.mount('#app')
