import fileupload from "./components/FileUpload.vue";

const Vue3fileupload = {
  install(app) {
    app.component("fileupload", fileupload);
  }
};

export { fileupload, Vue3fileupload };
