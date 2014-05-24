// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv')().load();

// Require keystone
var keystone = require('keystone');

// Require our express-hbs module
var expresshbs = require('express3-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
keystone.init({

	'name': 'HBS Demo',
	'brand': '',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',

	'views': 'templates/views',
    'view engine':'hbs',
    'custom engine':expresshbs.create({
        layoutsDir:'templates/views/layouts',
        partialsDir:'templates/views/partials',
        defaultLayout:'default',
        helpers:new require('./templates/views/helpers')(),
        extname:'.hbs'
    }).engine,
	'auto update': true,

	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': '3RE@PG|F?f}L_)Qkx[a}UQL~=)N1Jr.(4,$4.]Em2JfO`lK&%BfwsqiXD56.;#xd'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
