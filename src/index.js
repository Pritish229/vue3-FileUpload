import FileDrag from "./components/FileDrag.vue";

const Vue3FileDrag = {
  install(app) {
    app.component("FileDrag", FileDrag);
  }
};

export { FileDrag, Vue3FileDrag };
