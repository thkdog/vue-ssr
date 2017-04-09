// server-entry.js
import Vue from 'vue'
import App from './App.vue'

const app = new Vue(App)

// the default export should be a function
// which will receive the context of the render call
export default context => {
  // data pre-fetching
  // return app.fetchServerData(context.url).then(() => {
  //   return app
  // })

  return app
}
