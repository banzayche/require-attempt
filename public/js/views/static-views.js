/*global Backbone */
'use strict';
define(function(){
	// в данном случаем модуль содержит конструкторы для статических представлений.
	var staticViews = myLibrarryApp.module('staticViews', function(staticViews, MyLibrarryApp, Backbone){

		// Конструктор для главного рутового представления
		// Так как это основной "холст", то он закреплен за уже существующим в DOMе элементом
		staticViews.GeneralView = Backbone.Marionette.LayoutView.extend({
			el: '#general-template',
			// это главные регионы, можно сказать - участки, приложения
			regions: {
				header: '#header',
				main: '#main',
				footer: '#footer'
			},
			initialize: function(){
				console.log('General view has been created!');
			},
		});

		// представление для header
		staticViews.GeneralHeaderView = Backbone.Marionette.ItemView.extend({
			className: 'container header-book',
			template: '#header-template'
		});

		// представление для page-404
		staticViews.NotFoundView = Backbone.Marionette.ItemView.extend({
			className: 'page-404',
			template: '#page-404-template'
		});

		// представление для footer
		staticViews.GeneralFooterView = Backbone.Marionette.ItemView.extend({
			className: 'container footer-book',
			template: '#footer-template'
		});

		// представление для страницы "Подробно о книге"
		staticViews.DetailBookView = Backbone.Marionette.ItemView.extend({
			className: 'detail-book',
			template: '#book-detail-template',
			model: MyLibrarryApp.modelCollection.Book,
			// в ui указываются все присущие, для данного представления, элементы управления
			ui: {
				cancel: '#cancel'
			},
			events: {
				'click @ui.cancel' : 'goCancel'
			},

			goCancel: function(){
				Backbone.history.navigate('home', {trigger:true});
			}
		});

		// представление для страниц "редактирования" и "создания новой книги"
		staticViews.EditBookView = Backbone.Marionette.ItemView.extend({
			template: '#edit-book-template',
			model: MyLibrarryApp.modelCollection.Book,
			// в ui указываются все присущие, для данного представления, элементы управления
			ui: {
				cancel: '#cancel',
				save: '#save',
				title: '#title',
				author: '#author',
				genre: '#genre',
				year: '#year',
				description: '#description',
				error: '.error'
			},
			events: {
				'click @ui.cancel' : 'goCancel',
				'click @ui.save' : 'goSave1',
			},

			goCancel: function(){
				Backbone.history.navigate('home', {trigger:true});
			},
			goSave1: function(){
				var title = this.ui.title.val().trim();
				var author = this.ui.author.val().trim();
				var year = this.ui.year.val().trim();
				var genre = this.ui.genre.val().trim();
				var description = this.ui.description.val().trim();
				this.goSave2(MyLibrarryApp.GeneralCollection, title, author, year, genre, description, false);
			},
			goSave2: function(collection, title, author, year, genre, description, testingAttr){
				// при сохранении, проверяем, чтобы все основные поля были заполнены. И тогда реализуем "сохранение"
				// иначе, показываем сигнал о неверном вводе данных
				if(title && author && year && genre){
					// если модель новая - она не будет иметь id. Поэтому, нам необходимо создать новую модель в колекции
					if(this.model.isNew()){
						if(!testingAttr){
							collection.create({
								title: title,
								author: author,
								year: year,
								genre: genre,
								description: description,
							});
							Backbone.history.navigate('home', {trigger:true});
						}
						return 'new';
					// если модель уже существует, мы смотрим ее id и затем, вызываем соответствующую модель в главной колекции
					// и только потом - сохраняем. Это предоставит возможность представлениям поддерживать правдивое отображение коллекции, 
					// без дополнительного обращения к серверу
					} else{
						if(!testingAttr){
							var id = this.model.get('id');		
							collection.get(id).save({
								title: title,
								author: author,
								year: year,
								genre: genre,
								description: description,
							}).done(function(){
								Backbone.history.navigate('home', {trigger: true});
							});
						}
						return 'old';
					}
				} else{
					if(!testingAttr){
						this.ui.error.show();
					}
					return 'empty';
				}
			},
		});

	});
})