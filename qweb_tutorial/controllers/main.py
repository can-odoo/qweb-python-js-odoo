# -*- coding: utf-8 -*-

from odoo import http


class QwebTutorual(http.Controller):
    @http.route('/qweb-tutorials', type='http', auth='public', website=True)
    def qweb_tutorials(self):
        """QWEB tutorial"""

        # pass this data to render method as a 2nd argument and data will be 
        # available fot template, we can also directly pass data into template

        def some_function():
            return "return some string from python function"
        
        some_model = http.request.env['sale.order'].sudo().search([])

        data = {
            'string': 'Qweb Tutorials',
            'integer': 100,
            'float': 3.14,
            'boolean': True,
            'some_list': [1, 2, 3, 4],
            'some_dict': {'any_key': 'any_value'},
            'some_funtion': some_function(),
            'model': some_model,
        }
        return http.request.render("qweb_tutorial.somePythonTemplate", data)
