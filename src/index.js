import Vue3Fileinput from "./components/Vue3Fileinput.vue";

export default {
  install : (app , options) => {
    app.component("Vue3Fileinput", Vue3Fileinput); 
  }
}

