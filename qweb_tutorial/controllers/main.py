# -*- coding: utf-8 -*-

from odoo import http
from odoo.tools import html_escape, html_sanitize
from markupsafe import Markup


class QwebTutorual(http.Controller):
    @http.route('/qweb-tutorials', type='http', auth='public', website=True)
    def qweb_tutorials(self):
        """QWEB tutorial"""

        # pass this data to render method as a 2nd argument and data will be 
        # available fot template, we can also directly pass data into template

        def some_function():
            return "return some string from python function"
        
        sale_model = http.request.env['sale.order'].sudo().search([])

        data = {
            'string': 'Qweb Tutorials',
            'integer': 100,
            'float': 3.14,
            'boolean': True,
            'some_list': [1, 2, 3, 4],
            'some_dict': {'any_key': 'any_value'},
            'some_funtion': some_function(),
            'model': sale_model,
            'html': '<h3>test HTML</h3><script>alert("attack")</script>',
            'html_escape': '<h3>test escaped HTML</h3>%s' %html_escape('<script>alert("attack")</script>'),
            'html_sanitize': '<h3>test sanitize HTML</h3>%s' %html_sanitize('<script>alert("attack")</script>'),
            # markup has inbuilt escape method
            'html_markup': Markup('<h3>test markup HTML</h3>%s') %'<script>alert("attack")</script>',
        }
        return http.request.render("qweb_tutorial.somePythonTemplate", data)
