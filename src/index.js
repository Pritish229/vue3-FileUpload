import FileDrag from "./components/FileDrag.vue";

export { FileDrag };

export default {
  install(app) {
    app.component("FileDrag", FileDrag);
  }
};