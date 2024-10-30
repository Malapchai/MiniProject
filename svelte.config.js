import sveltePreprocess from 'svelte-preprocess';
import { preprocess } from 'svelte/compiler';

const config = {
  preprocess: sveltePreprocess({
    scss: {
      prependData: '@use "src/styles/variables.scss";'
    }
  })
};

export default config;