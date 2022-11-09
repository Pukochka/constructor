import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router;
  }
}

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();
  return pinia;
});

import { useStatesStore } from './StateStore/States';
import { useMainStore } from './MainStore/Main';
import { useSelectStore } from './SelectStore/Select';
import { useSvgStore } from './SvgController/Svg';

export { useStatesStore, useSelectStore, useMainStore, useSvgStore };
