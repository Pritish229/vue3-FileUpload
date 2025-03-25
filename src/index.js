import FileUpload from "./components/FileUpload.vue";

const Vue3Fileinput = {
  install(app) {
    app.component("FileUpload", FileUpload);
  }
};

export { FileUpload, Vue3Fileinput };
export default Vue3Fileinput;