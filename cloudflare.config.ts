import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "talentxcelnet",
    entrypoint: "./worker.ts",
    compatibilityDate: "2026-11-26",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: [
        "/*",
        "!/_next/static/*",
        "!/*/_next/static/*",
        "!/images/*",
        "!/brand/*",
        "!/logos/*",
        "!/videos/*",
        "!/favicon.ico",
        "!/favicon.png",
        "!/apple-touch-icon.png",
        "!/icon.svg",
        "!/logo.svg",
        "!/logo.png",
        "!/logo.jpg",
        "!/file.svg",
        "!/globe.svg",
        "!/next.svg",
        "!/vercel.svg",
        "!/window.svg",
        "!/manifest.json",
        "!/sw.js",
        "!/e5a8f2736194458bb61230491823901a.txt",
      ],
    },
    env: {
      ASSETS: bindings.assets(),
      VINEXT_KV_CACHE: bindings.kv({
        id: "ab9bcb69fcab448ab780b68365394939",
      }),
    },
  }),
});
