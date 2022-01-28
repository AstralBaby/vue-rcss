function resolveStyles(vm, styles) {
    if (styles.length > 0) {
        let instanceId = vm.$el.attributes[0].name
        let stylesheets = document.querySelector(`[${instanceId}-rcss]`)
        if (stylesheets) {
            stylesheets.remove()
        }
        let result = `[${instanceId}]{`
        for (let field in styles) {
            let propName = typeof styles[field] === 'object' ? Object.keys(styles[field])[0] : styles[field]
            let value = typeof styles[field] === 'object' ? vm[styles[field][propName]] : vm[propName]
            // check for a valid field type
            if (typeof value === 'string' || typeof value === 'number') {
                result += `--${propName}: ${value || 'inherit'};`
            } else {
                if (process.env.NODE_ENV === 'development')
                console.warn(`[RCSS] Warning, trying to use invalid value for ${propName}`, value)
            }
        }

        result += `}`

        let instanceStyles = document.createElement("style")
        instanceStyles.setAttribute('type', 'text/css')
        instanceStyles.setAttribute(`${instanceId}-rcss`, '')
        instanceStyles.innerHTML = result
        document.head.append(instanceStyles)
    }
}

export const RCSSMixin = {
    mounted() {
        const styles = this.$options.styles || []
        // Mount styles
        resolveStyles(this, styles)
        for (let style in this.$options.styles) {
            let prop = styles[style] || this.$data[style]
            if (!(prop && typeof prop === 'object' || typeof prop === 'string')) {
                return
            }
            let propName = typeof prop === 'object' ? Object.keys(prop)[0] : prop
            this.$watch(propName, () => resolveStyles(this, styles))
        }
    }
}

export default  {
    install(Vue) {
        Vue.mixin(RCSSMixin)
    }
}