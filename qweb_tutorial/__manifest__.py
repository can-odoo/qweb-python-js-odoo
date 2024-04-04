{
    'name': 'QWEB Tutorial',
    'version': '17.0',
    'summary': 'Qweb Tutorial',
    'sequence': -1,
    'category': 'Website',
    'depends': ['web', 'website'],
    'data': [
        'views/python_templates.xml',
    ],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_frontend': [
            'qweb_tutorial/static/src/*',
        ]
    }
}