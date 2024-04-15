/** @odoo-module **/

// to import odoo using import syntax we need to declare that this JS
// file is @odoo-module as declared in the first line

import publicWidget from "@web/legacy/js/public/public_widget";
// import publicWidget from 'web.public.widget';
import { renderToElement } from "@web/core/utils/render";

// need to register created JS template into publicWidget
publicWidget.registry.jsTemplate = publicWidget.Widget.extend({
    selector: '.js_template', // value can be any css selector from the page
    template: 'qweb_turorials.jsTemplate', // JS template to render

    // start, owl life-cycle method
    start() {
        // to render the template we need to call the renderElement() method of publicWidget
        console.log(this);
        this.renderElement();
    }
})

// in this we are going to pass some data needed in the template
// so here we need to use renderToElement methods from web/core/utils/render
publicWidget.registry.templateWithVariables = publicWidget.Widget.extend({
    selector: '.js_template_with_variables',
    template: 'qweb_turorials.templateWithVariables',

    // to render the model from JS side we need orm services and 
    // need to initialize it under init method
    init(){
        // while initializing we must need to call super, 
        this._super(...arguments);

        // for v17.0 and above orm service is default bind in publicWidget, we
        // just need to get require service as below
        this.orm = this.bindService("orm"); // this will return a promise so we need async await to resolve it
    },
    async start(){
        const content = renderToElement(this.template, {
            string: "Test String from JS Public widget, just like we had done for Python here we use renderToElement method with data/values",
            array: [1, 2, 3, 4, 5],
            email: "can@odoo.com",
            model: await this.orm.searchRead("sale.order", [], ["name", "partner_id"]),
        })
        
        // renderToElement can be attached to any selector
        this.$target.html(content);  // TODO: need to check more in this
    }


})

// template inheritance
publicWidget.registry.mainTemplate = publicWidget.Widget.extend({
    selector: '.js_template_extension', // value can be any css selector from the page
    template: 'qweb_turorials.mainTemplate', // JS template to render

    start() {
        // to render the template we need to call the renderElement() method of publicWidget
        this.renderElement();

        // const templatePrimary = document.querySelector('.js_template_primary')
        // templatePrimary.innerHTML = renderToElement("qweb_turorials.childTemplatePrimary").outerHTML
    }
})

// either we can directly find the selector and render the template as above
// or we can create a new publicWidget and do the job
publicWidget.registry.childTemplatePrimary = publicWidget.Widget.extend({
    selector: '.js_template_primary', // value can be any css selector from the page
    template: 'qweb_turorials.childTemplatePrimary', // JS template to render

    start() {
        this.renderElement();
    }
})

// subTemplate
publicWidget.registry.subTemplate = publicWidget.Widget.extend({
    selector: '.js_sub_template',
    template: 'qweb_turorials.subTemplate',

    start() {
        this.renderElement();
    }
})

// templateWithEvent
publicWidget.registry.templateWithEvents = publicWidget.Widget.extend({
    selector: '.js_template_with_events',
    template: 'qweb_turorials.templateWithEvents',
    events: {
        'click button': 'onClickButton',
    },

    init() {
        this._super(...arguments);
        this.counter = 0;
    },

    start() {
        this.renderElement();
    },

    onClickButton() {
        this.counter++;
        this.$el.find('#counter').text(this.counter);
    }
})

// betterForSEO
publicWidget.registry.betterForSEO = publicWidget.Widget.extend({
    selector: '#betterForSEO',
    events: {
        'click button': 'onClickButton',
    },
    init() {
        this._super(...arguments);
        this.counter = 0;
    },
    onClickButton() {
        this.counter++;
        this.$el.find('#counter').text(this.counter);
    }
})

// there were 2 approaches to render the QWeb template in Odoo,
// 1. we can render the template by making publicWidget and render it with renderToElement
// 2. we can use owl framework to render the template, the advantage with owl is we do not need to
//    call renderToElement method to render template instead it it done using state, whenever
//    state is change the template gets re-render
