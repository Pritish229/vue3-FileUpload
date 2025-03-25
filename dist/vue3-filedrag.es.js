import { ref as r, watch as b, createElementBlock as s, openBlock as u, createElementVNode as c, createCommentVNode as j, withModifiers as h, normalizeClass as k, renderSlot as C, toDisplayString as F, unref as E } from "vue";
const N = (l, f) => {
  const d = l.__vccOpts || l;
  for (const [t, n] of f)
    d[t] = n;
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
}, q = {
  __name: "FileDrag",
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
    const t = l, n = d, i = r(null), x = r(null), o = r(""), p = r(!0), g = r(t.modelValue || null), v = r(!1), w = t.fileType.join(","), m = r("");
    b(
      () => t.modelValue,
      (e) => {
        e ? D(e) : y();
      }
    );
    const _ = () => {
      x.value.click();
    }, z = (e) => {
      e.dataTransfer.dropEffect = "copy", v.value = !0;
    }, S = () => {
      v.value = !1;
    }, B = (e) => {
      v.value = !1;
      const a = e.dataTransfer.files[0];
      V(a);
    }, I = (e) => {
      const a = e.target.files[0];
      V(a);
    }, V = (e) => {
      if (!e) return;
      if (!t.fileType.includes(e.type)) {
        T(`Invalid file type. Only ${t.fileType.join(", ")} allowed.`);
        return;
      }
      const a = (t.maxSize / (1024 * 1024)).toFixed(2);
      if (e.size > t.maxSize) {
        T(`File is too large. Maximum size is ${a}MB.`);
        return;
      }
      o.value = "", p.value = !0, g.value = e, n("update:modelValue", e), D(e);
    }, D = (e) => {
      const a = new FileReader();
      e.type.startsWith("image/") ? (a.onload = (M) => {
        i.value = M.target.result, m.value = "Preview";
      }, a.readAsDataURL(e)) : (i.value = "", m.value = "File Preview");
    }, T = (e) => {
      y(), o.value = e, p.value = !1;
    }, y = () => {
      i.value = null, g.value = null, o.value = "", p.value = !0, n("update:modelValue", null), n("file-reset");
    };
    return f({ resetFile: y, selectedFile: g, isFileValid: p, preview: i }), (e, a) => (u(), s("div", null, [
      c("div", {
        class: k(["drop-zone", {
          "error-border error-file": o.value || l.inValid,
          dragging: v.value
        }]),
        onClick: _,
        onDragover: h(z, ["prevent"]),
        onDragleave: h(S, ["prevent"]),
        onDrop: h(B, ["prevent"])
      }, [
        i.value ? (u(), s("div", O, [
          c("img", {
            src: i.value,
            alt: m.value,
            class: "preview-image"
          }, null, 8, P)
        ])) : (u(), s("div", {
          key: 0,
          class: k({ "placeholder-error": l.inValid, placeholder: !l.inValid })
        }, [
          C(e.$slots, "icon", {}, () => [
            a[0] || (a[0] = c("i", { class: "fas fa-upload upload-icon fs-4" }, null, -1))
          ], !0),
          c("p", L, F(l.placeholder), 1)
        ], 2)),
        c("input", {
          type: "file",
          ref_key: "fileInput",
          ref: x,
          onChange: I,
          hidden: "",
          accept: E(w)
        }, null, 40, $)
      ], 34),
      o.value ? (u(), s("p", A, F(o.value), 1)) : l.helperText ? (u(), s("p", R, F(l.helperText), 1)) : j("", !0)
    ]));
  }
}, U = /* @__PURE__ */ N(q, [["__scopeId", "data-v-7a39e182"]]), G = {
  install(l) {
    l.component("FileDrag", U);
  }
};
export {
  U as FileDrag,
  G as Vue3FileDrag
};
