import { ref as r, watch as M, createElementBlock as s, openBlock as u, createElementVNode as c, createCommentVNode as j, withModifiers as h, normalizeClass as w, renderSlot as C, toDisplayString as x, unref as E } from "vue";
const N = (l, v) => {
  const d = l.__vccOpts || l;
  for (const [a, n] of v)
    d[a] = n;
  return d;
}, L = { class: "upload-text" }, O = {
  key: 1,
  class: "preview"
}, P = ["src", "alt"], $ = ["accept"], A = {
  key: 0,
  class: "error-message"
}, R = {
  key: 1,
  class: "helper-text"
}, U = {
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
  setup(l, { expose: v, emit: d }) {
    const a = l, n = d, o = r(null), F = r(null), i = r(""), p = r(!0), m = r(a.modelValue || null), f = r(!1), _ = a.fileType.join(","), g = r("");
    M(
      () => a.modelValue,
      (e) => {
        e ? T(e) : y();
      }
    );
    const z = () => {
      F.value.click();
    }, S = (e) => {
      e.dataTransfer.dropEffect = "copy", f.value = !0;
    }, D = () => {
      f.value = !1;
    }, b = (e) => {
      f.value = !1;
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
    return v({ resetFile: y, selectedFile: m, isFileValid: p, preview: o }), (e, t) => (u(), s("div", null, [
      c("div", {
        class: w(["drop-zone", {
          "error-border error-file": i.value || l.inValid,
          dragging: f.value
        }]),
        onClick: z,
        onDragover: h(S, ["prevent"]),
        onDragleave: h(D, ["prevent"]),
        onDrop: h(b, ["prevent"])
      }, [
        o.value ? (u(), s("div", O, [
          c("img", {
            src: o.value,
            alt: g.value,
            class: "preview-image"
          }, null, 8, P)
        ])) : (u(), s("div", {
          key: 0,
          class: w({ "placeholder-error": l.inValid, placeholder: !l.inValid })
        }, [
          C(e.$slots, "icon", {}, () => [
            t[0] || (t[0] = c("i", { class: "fas fa-upload upload-icon fs-4" }, null, -1))
          ], !0),
          c("p", L, x(l.placeholder), 1)
        ], 2)),
        c("input", {
          type: "file",
          ref_key: "fileInput",
          ref: F,
          onChange: B,
          hidden: "",
          accept: E(_)
        }, null, 40, $)
      ], 34),
      i.value ? (u(), s("p", A, x(i.value), 1)) : l.helperText ? (u(), s("p", R, x(l.helperText), 1)) : j("", !0)
    ]));
  }
}, q = /* @__PURE__ */ N(U, [["__scopeId", "data-v-d2bd141b"]]), G = {
  install(l) {
    l.component("fileupload", q);
  }
};
export {
  G as Vue3fileupload,
  q as fileupload
};
