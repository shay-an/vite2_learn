const modules = import.meta.glob('../components/*/*.vue');
const modules2 = import.meta.glob('../components/*/*/*.vue');

export default {
  ...modules,
  ...modules2
};