export const getImage = (image) =>
  new URL(`../../assets/img/${image}`, import.meta.url).href;
// https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
