import { ref as r, watch as b, createElementBlock as s, openBlock as u, createElementVNode as c, createCommentVNode as j, withModifiers as h, normalizeClass as w, renderSlot as C, toDisplayString as x, unref as E } from "vue";
const N = (l, d) => {
  const p = l.__vccOpts || l;
  for (const [a, o] of d)
    p[a] = o;
  return p;
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
  __name: "Vue3Fileinput",
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
  setup(l, { expose: d, emit: p }) {
    const a = l, o = p, i = r(null), F = r(null), n = r(""), v = r(!0), m = r(a.modelValue || null), f = r(!1), _ = a.fileType.join(","), g = r("");
    b(
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
    }, B = (e) => {
      f.value = !1;
      const t = e.dataTransfer.files[0];
      V(t);
    }, I = (e) => {
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
      n.value = "", v.value = !0, m.value = e, o("update:modelValue", e), T(e);
    }, T = (e) => {
      const t = new FileReader();
      e.type.startsWith("image/") ? (t.onload = (M) => {
        i.value = M.target.result, g.value = "Preview";
      }, t.readAsDataURL(e)) : (i.value = "", g.value = "File Preview");
    }, k = (e) => {
      y(), n.value = e, v.value = !1;
    }, y = () => {
      i.value = null, m.value = null, n.value = "", v.value = !0, o("update:modelValue", null), o("file-reset");
    };
    return d({ resetFile: y, selectedFile: m, isFileValid: v, preview: i }), (e, t) => (u(), s("div", null, [
      c("div", {
        class: w(["drop-zone", {
          "error-border error-file": n.value || l.inValid,
          dragging: f.value
        }]),
        onClick: z,
        onDragover: h(S, ["prevent"]),
        onDragleave: h(D, ["prevent"]),
        onDrop: h(B, ["prevent"])
      }, [
        i.value ? (u(), s("div", O, [
          c("img", {
            src: i.value,
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
          onChange: I,
          hidden: "",
          accept: E(_)
        }, null, 40, $)
      ], 34),
      n.value ? (u(), s("p", A, x(n.value), 1)) : l.helperText ? (u(), s("p", R, x(l.helperText), 1)) : j("", !0)
    ]));
  }
}, U = /* @__PURE__ */ N(q, [["__scopeId", "data-v-14a6869e"]]), G = {
  install: (l, d) => {
    l.component("Vue3Fileinput", U);
  }
};
export {
  G as default
};
