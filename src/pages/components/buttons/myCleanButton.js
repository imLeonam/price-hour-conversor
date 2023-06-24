class CleanButton extends HTMLElement {
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
            const response = await fetch('/src/pages/components/buttons/myCleanButton.html');
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
        this.component = this.component.replace('%ICON%', icon);
    }

    buildComponent(rawHtml) {
        const name = this.getAttribute('name');
        const id = this.getAttribute('id');
        const onClick = this.getAttribute('onClick');

        this.setPropValue('name', name);
        this.setPropValue('id', id);

        const doc = this.parser.parseFromString(rawHtml, 'text/html');
        const buttonElement = doc.querySelector('button');

        const buttonIcon = buttonElement.innerHTML

        buttonElement.innerHTML = buttonIcon;

        return doc.documentElement.innerHTML;
    }
}

customElements.define('my-clean-button', CleanButton);