# About
Allows you to use your component state within your css.\
*Live preview:* https://jsfiddle.net/Catalinita/4jzo1xw7/9/

# Installation
Download the package with ```npm i vue-rcss``` for npm or ```yarn add vue-rcss``` for yarn. \
 \
**Global use:**
```javascript
//main.js
import RCSS from 'vue-rcss'
Vue.use(RCSS)
```
**Individual use:**
```javascript

import { RCSSMixin } from 'vue-rcss'

export default {
    name: 'HelloWorld',
    mixins: [RCSSMixin]
}
```

# Usage
Within your vue component, register the properties you would like to use in a new key named **styles**.
You can register **props**, **computed properties** and **state**.

```vue
<script>
export default {
  name: 'HelloWorld',
  styles: [{fontSize: 'fontSizePx'}, 'textColor'],
  data: () => ({
    fontSize: 14,
    textColor: ''
  }),
  computed: {
    fontSizePx () {
      return this.fontSize + 'px'
    }
  }
}
</script>
```
Every property registered in your **styles** key
will be transformed into component-scoped css variables.
```vue
<style scoped lang="scss">
.dynamicText {
  color: var(--textColor) !important;
  font-size: var(--fontSize);
}
</style>
```
 State changes will be reflected in your css dynamically without causing unnecessary component re-rendering.
```vue
<template>
  <div>
    <h3 class="dynamicText">
      Hello World!
    </h3>
    <p>Font Size</p>
    <button @click="fontSize--">
      -
    </button>
    {{ fontSizePx }}
    <button @click="fontSize++">
      +
    </button>
    <p>Text Color</p>
    <input type="text" v-model="textColor">
  </div>
</template>
```