import { ref as r, watch as M, createElementBlock as s, openBlock as u, createElementVNode as c, createCommentVNode as j, withModifiers as h, normalizeClass as w, renderSlot as C, toDisplayString as F, unref as E } from "vue";
const N = (l, f) => {
  const d = l.__vccOpts || l;
  for (const [a, n] of f)
    d[a] = n;
  return d;
}, U = { class: "upload-text" }, L = {
  key: 1,
  class: "preview"
}, O = ["src", "alt"], P = ["accept"], $ = {
  key: 0,
  class: "error-message"
}, A = {
  key: 1,
  class: "helper-text"
}, R = {
  __name: "FileUpload",
  props: {
    modelValue: File,
    required: Boolean,
    fileType: {
      type: Array,
      default: () => ["image/png", "image/jpeg", "image/jpg", "application/pdf", "text/plain"]
    },
    placeholder: {
      type: String,
      default: "Drag and drop a file here"
    },
    helperText: {
      type: String,
      default: ""
    },
    maxSize: {
      type: Number,
      default: 2 * 1024 * 1024
    },
    maxFiles: {
      type: Number,
      default: 1
    },
    inValid: Boolean
  },
  emits: ["update:modelValue", "file-reset"],
  setup(l, { expose: f, emit: d }) {
    const a = l, n = d, o = r(null), x = r(null), i = r(""), p = r(!0), m = r(a.modelValue || null), v = r(!1), _ = a.fileType.join(","), g = r("");
    M(
      () => a.modelValue,
      (e) => {
        e ? T(e) : y();
      }
    );
    const z = () => {
      x.value.click();
    }, S = (e) => {
      e.dataTransfer.dropEffect = "copy", v.value = !0;
    }, D = () => {
      v.value = !1;
    }, b = (e) => {
      v.value = !1;
      const t = e.dataTransfer.files[0];
      V(t);
    }, B = (e) => {
      const t = e.target.files[0];
      V(t);
    }, V = (e) => {
      if (!e) return;
      if (!a.fileType.includes(e.type)) {
        k(`Invalid file type. Only ${a.fileType.join(", ")} allowed.`);
        return;
      }
      const t = (a.maxSize / (1024 * 1024)).toFixed(2);
      if (e.size > a.maxSize) {
        k(`File is too large. Maximum size is ${t}MB.`);
        return;
      }
      i.value = "", p.value = !0, m.value = e, n("update:modelValue", e), T(e);
    }, T = (e) => {
      const t = new FileReader();
      e.type.startsWith("image/") ? (t.onload = (I) => {
        o.value = I.target.result, g.value = "Preview";
      }, t.readAsDataURL(e)) : (o.value = "", g.value = "File Preview");
    }, k = (e) => {
      y(), i.value = e, p.value = !1;
    }, y = () => {
      o.value = null, m.value = null, i.value = "", p.value = !0, n("update:modelValue", null), n("file-reset");
    };
    return f({ resetFile: y, selectedFile: m, isFileValid: p, preview: o }), (e, t) => (u(), s("div", null, [
      c("div", {
        class: w(["drop-zone", {
          "error-border error-file": i.value || l.inValid,
          dragging: v.value
        }]),
        onClick: z,
        onDragover: h(S, ["prevent"]),
        onDragleave: h(D, ["prevent"]),
        onDrop: h(b, ["prevent"])
      }, [
        o.value ? (u(), s("div", L, [
          c("img", {
            src: o.value,
            alt: g.value,
            class: "preview-image"
          }, null, 8, O)
        ])) : (u(), s("div", {
          key: 0,
          class: w({ "placeholder-error": l.inValid, placeholder: !l.inValid })
        }, [
          C(e.$slots, "icon", {}, () => [
            t[0] || (t[0] = c("i", { class: "fas fa-upload upload-icon fs-4" }, null, -1))
          ], !0),
          c("p", U, F(l.placeholder), 1)
        ], 2)),
        c("input", {
          type: "file",
          ref_key: "fileInput",
          ref: x,
          onChange: B,
          hidden: "",
          accept: E(_)
        }, null, 40, P)
      ], 34),
      i.value ? (u(), s("p", $, F(i.value), 1)) : l.helperText ? (u(), s("p", A, F(l.helperText), 1)) : j("", !0)
    ]));
  }
}, q = /* @__PURE__ */ N(R, [["__scopeId", "data-v-d2bd141b"]]), G = {
  install(l) {
    l.component("FileUpload", q);
  }
};
export {
  q as FileUpload,
  G as Vue3Fileinput,
  G as default
};
