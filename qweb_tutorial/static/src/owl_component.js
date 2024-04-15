/** @odoo-module **/

import { Component, xml, mount, whenReady, useState } from "@odoo/owl";
import { templates } from "@web/core/assets";

// sub component should be mentioned the main component
class OwlSubComponent extends Component {
    // for sub component to be render in the main component we need
    // to add this as a components in the main component #addSubComponent
    static template = "qweb_tutorial.owl_sub_component";

}

// add this to main component 
class OwlSubComponentChild extends Component {
    static template = "qweb_tutorial.owl_sub_component_child";
}

// OWL: MainComponent #addSubComponent
class OwlMainComponent extends Component {
    setup() {
        // for reactive data we use hooks like useState
        this.state = useState({
            counter: 0,
        })

        // static data
        this.date = new Date().toLocaleString()
    }

    increaseCounter() {
        this.state.counter++;
    }

    // get some data like a list and render it in template, get and set special
    get someList() {
        return [1, 2, 3, 4];
    }
}

// OwlMainComponent.template = xml`
// <div class="p-4 border">
//     <h3>This is rendered using OWL.</h3>
// </div>
// `
OwlMainComponent.template = "qweb_tutorial.owl_main_component";
// #addSubComponent
OwlMainComponent.components = { OwlSubComponent, OwlSubComponentChild };

// to make sure document is loaded before mounting to the dom
whenReady(() => {
    const element = document.querySelector('.js_template_using_owl');
    
    // for publicWidget if element is undefined it will not through an error
    // but in the case of owl it will through an error for other pages like 
    // contact-us or home or any other page that do not have above element is
    // defined so we need to mount only if we have element defined to get rid
    //  of an error
    if (element) {
        // mount to render template in DOM
        mount(OwlMainComponent, element, { templates });
        // mount(OwlMainComponent, element);
    }
})

