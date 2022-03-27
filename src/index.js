import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div className="container">
				<Switch>
					<Route path="/react_blog/posts/new" component={PostsNew} />
					<Route path="/react_blog/posts/:id" component={PostsShow} />
					<Route path="/react_blog/" component={PostsIndex} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
