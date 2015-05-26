$(document).ready(function(){
	// test for model accordance	
	QUnit.test( "modelCollection.Book - testing function 'accordance'", function( assert ) {
		var modelFunctionAccordance = new myLibrarryApp.modelCollection.Book({
			title : 1,
			author : 1,
			year : 1,
			description : 'Not specefied',
			genre : 1,
			id : 1
		});


		assert.ok( modelFunctionAccordance.accordance('all') , "When we send 'all' - answer true" );
		assert.ok( modelFunctionAccordance.accordance(1) , "When we send 1 - answer true" );
		assert.notOk( modelFunctionAccordance.accordance(2), "When we send 2 - answer false" );
	});



//------------------------------------------------------------------------------
	// test for Edit view
	// for new model variant	
	QUnit.test( "staticViews.EditBookView - testing function 'goSave' ", function( assert ) {
		var modelsaveMethodStaticView = new myLibrarryApp.modelCollection.Book({
			title : 1,
			author : 1,
			year : 1,
			description : 'Not specefied',
			genre : 1,
			id : undefined
		});
		// for old model variant
		var modelsaveMethodStaticView2 = new myLibrarryApp.modelCollection.Book({
			title : 1,
			author : 1,
			year : 1,
			description : 'Not specefied',
			genre : 1,
			id : 1
		});
		var collectionForEditViewTest = new myLibrarryApp.modelCollection.CollectionBook([
			modelsaveMethodStaticView
	    ]);
	    // for new model variant    
		var saveMethodStaticView = new myLibrarryApp.staticViews.EditBookView({
			model: modelsaveMethodStaticView
		});
		// for old model variant
		var saveMethodStaticView2 = new myLibrarryApp.staticViews.EditBookView({
			model: modelsaveMethodStaticView2
		});

		assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,1,2,2,2,2,true) === 'new', "Test for model without 'id' (new). return 'new' - 'new' model" );
		assert.ok( saveMethodStaticView2.goSave2(collectionForEditViewTest,1,2,2,2,2,true) === 'old', "Test for model with 'id' (old). return 'old' - 'old' model" );
		assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,undefined,2,2,2,2,true) === 'empty', "Send attribute without 'empty' - return 'empty'" );
		assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,1,undefined,2,2,2,true) === 'empty', "Send attribute without 'empty' - return 'empty'" );
		assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,1,2,undefined,2,2,true) === 'empty', "Send attribute without 'genre' - return 'empty'" );
		assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,1,2,2,undefined,2,true) === 'empty', "Send attribute without 'year' - return 'empty'" );
	});



// -----------------------------------------------------------------------
	// test for listViews.ControlForList
	QUnit.test( "listViews.ControlForList - testing function 'showFilter' ", function( assert ) {
		var collectionForEditViewTest = new myLibrarryApp.modelCollection.CollectionBook([
			{
				title: 1,
				genre: 'genre-1'
			},
			{
				title: 2,
				genre: 'genre-2'
			},
			{
				title: 3,
				genre: 'genre-1'
			},
			{
				title: 4,
				genre: 'genre-2'
			},
			{
				title: 5,
				genre: 'genre-2'
			}
	    ]);
		var newTestControlForList = new myLibrarryApp.listViews.ControlForList({
			collection: collectionForEditViewTest
		});

		assert.ok( newTestControlForList.showFilter(true)[0]+1 === 2, "We send collection of models. This models have two different types of genre. Answer from function is true - 2 genre ");
		assert.ok( newTestControlForList.showFilter(true)[1] === 'test beginning: genre-1 genre-2', "We send collection of models. This models have two different types of genre. Answer from function is true - 'test beginning: genre-1 genre-2'" );
	});



// -----------------------------------------------------------------------
	// test for routerController.GeneralController
	QUnit.test( "routerController.GeneralController - testing function 'RouterProcessing' ", function( assert ) {
		var generalControllerTest = new routerController.GeneralController();
		var generalRouterTest = new routerController.GeneralRouter({
			controller: generalControllerTest,
		});

		assert.ok( generalControllerTest.RouterProcessing('home', true) === 'header-footer+main', "Imitation of 'home' route. Answer from function is true - 'header-footer+main'" );
		assert.ok( generalControllerTest.RouterProcessing(null, true) === 'header-footer+main', "Imitation of null route. When we have not any route. Answer from function is true - 'header-footer+main'" );
		assert.ok( generalControllerTest.RouterProcessing('testAnyBla-lbla', true) === 'header-footer+404', "Imitation of nonexistent route. Answer from function is true - 'header-footer+404'" );
	});






// -------------------------------------------------------------------------

	QUnit.test( "staticViews.EditBookView - testing function 'goSave'. Testing realization saving of model", function( assert ) {

		function testingCollection(){
			var testCollection = new myLibrarryApp.modelCollection.CollectionBook();
			var destroy;
			var modelsaveMethodStaticView = new myLibrarryApp.modelCollection.Book({
					id : undefined
				});
			var saveMethodStaticView = new myLibrarryApp.staticViews.EditBookView({
					model: modelsaveMethodStaticView
				});
			saveMethodStaticView.goSave2(testCollection,'test','test','test','test','test',false);
			testCollection.fetch().done(function(){
				destroy = testCollection.at(testCollection.length-1);
				if(destroy.get('title') === 'test' && destroy.get('author') === 'test' && destroy.get('genre') === 'test' && destroy.get('year') === 'test' && destroy.get('description') === 'test'){
					destroy.destroy();
					assert.ok( true , "Saving of model finished successfully." );
				} else {
					assert.ok( false , "Bad saving" );
				}
				destroy = testCollection.at(testCollection.length-1);
				if(destroy.get('title') === 'test' && destroy.get('author') === 'test' && destroy.get('genre') === 'test' && destroy.get('year') === 'test' && destroy.get('description') === 'test'){
					assert.ok( false , "Bad delete" );
				} else{
					assert.ok( true , "Deleting of model finished successfully." );
				}
			});
		}

		// collectionForEditViewTest.get(lengthCollection2);
		assert.ok(testingCollection() == undefined , "Saving is started" );
	});
});