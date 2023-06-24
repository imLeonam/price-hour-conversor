class InputText extends HTMLElement {
    constructor() {
        super();
        this.component = '';
        this.parser = new DOMParser();
    }

    connectedCallback() {
        this.loadContent();
    }

    async loadContent() {
        try {
            const response = await fetch('/src/pages/components/inputText/inputText.html');
            this.component = await response.text();

            const icon = this.getAttribute('icon');
            this.setIcon(icon);

            this.innerHTML = this.buildComponent(this.component);
        } catch (error) {
            console.error('Error loading component:', error);
        }
    }

    setPropValue(prop, value) {
        this.component = this.component.replace(`${prop}=""`, `${prop}="${value}"`);
    }

    setIcon(icon) {
        this.component = this.component.replace('name="x"', `name="${icon}"`);
    }

    buildComponent(rawHtml) {
        const name = this.getAttribute('name');
        const id = this.getAttribute('id');
        const labelFor = this.getAttribute('for');
        const labelText = this.getAttribute('label');

        this.setPropValue(rawHtml, 'name', name);
        this.setPropValue(rawHtml, 'id', id);
        this.setPropValue(rawHtml, 'for', labelFor);

        const doc = this.parser.parseFromString(rawHtml, 'text/html');
        const labelElement = doc.querySelector('label');

        const labelIcon = labelElement.innerHTML

        labelElement.innerHTML = labelText + labelIcon;

        return doc.documentElement.innerHTML;
    }
}

customElements.define('my-input-text', InputText);