import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { plugin, defaultConfig } from '@formkit/vue';
import { de, en } from '@formkit/i18n';
import { createAutoAnimatePlugin } from '@formkit/addons';

import '@formkit/themes/genesis';

createApp(App)
  .use(
    plugin,
    defaultConfig({
      locales: { de, en },
      locale: 'de',
      plugins: [createAutoAnimatePlugin()],
    })
  )
  .mount('#app');
