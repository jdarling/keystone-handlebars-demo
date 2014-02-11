// Load .env for development environments
require('dotenv')().load();

var keystone = require('keystone');
var engine = require('express3-handlebars');

/**
 * Application Initialisation
 */

keystone.init({

	'name': 'Keystone Demo',
	'brand': 'Demo',

	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

	'views': 'views',

	'custom engine': engine({
		layoutsDir: 'views/layouts',
		defaultLayout: 'default',
		helpers: {
			ifeq: function(a, b, options) {
				if(a == b){
					return options.fn(this);
				}else{
					return options.inverse(this);
				}
			},
			or: function(){
				var args = Array.prototype.slice.apply(arguments);
				var i=0, l=args.length;
				while(i<l){
					if(args[i]){
						return args[i];
					}
					i++;
				}
				return null;
			}
		}
	}),
	'view engine': 'handlebars',

	'auto update': true,
	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/keystone-demo',

	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'demo',

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN

});

require('./models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'posts': ['posts', 'post-comments', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users',
	'field-tests': 'things'
});

keystone.start();
