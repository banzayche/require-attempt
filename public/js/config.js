requirejs.config({
	// baseURL: './js',
	deps: ['main'],
	paths: {
		// test
		'test' : 'test',

		// libraries
		'jquery' : '../bower_components/jquery/dist/jquery',
		'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap',
		'underscore' : '../bower_components/underscore/underscore',
		'backbone' : '../bower_components/backbone/backbone',
		'backbone.babysitter' : '../bower_components/backbone.babysitter/lib/backbone.babysitter',
		'backbone.wreqr' : '../bower_components/backbone.wreqr/lib/backbone.wreqr',
		'marionette' : '../bower_components/backbone.marionette/lib/core/backbone.marionette',

		// App
		'app' : '/js/app',
		'model-collection' : '/js/model_collection/model-collection',
		'static-views' : '/js/views/static-views',
		'list-views' : '/js/views/list-views',
		'tile-list' : '/js/views/tile-list',
		'router-controller' : '/js/router_controller/router-controller'

	},
	shim: {
		'bootstrap' : ['jquery'], 
		'underscore' : ['bootstrap'],
		'backbone' : ['underscore'],
		'backbone.babysitter' : ['backbone'],
		'backbone.wreqr' : ['backbone.babysitter'],
		'marionette' : ['backbone.wreqr'],
		'test' : ['marionette'],

		// app
		'app' : ['marionette'],
		'model-collection' : ['app'],
		'static-views' : ['model-collection'],		
		'tile-list' : ['static-views'],
		'list-views' : ['static-views', 'tile-list'],
		'router-controller' : ['list-views']
	}
});