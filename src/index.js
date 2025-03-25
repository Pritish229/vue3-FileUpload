import FileUpload from "./components/FileUpload.vue";

const Vue3Fileinput = {
  install(app) {
    app.component("Vue3Fileinput", FileUpload); // Use a more unique component name
  }
};

// Named exports
export { FileUpload, Vue3Fileinput };

// Default export for easier plugin installation
export default Vue3Fileinput;
