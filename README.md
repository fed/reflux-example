# Reflux.js Example

This is a simple sample project built upon [ReactJS](https://facebook.github.io/react/), [Reflux](https://github.com/reflux/refluxjs), [Gulp](http://gulpjs.com/) and [Browserify](http://browserify.org/) to demo what Reflux is, how it works and how we can integrate it into our React apps.

## Building and running the app

First run `npm install` to fetch all of the dependencies. Then run `npm start` to have the app build and go live on [http://localhost:6789](http://localhost:6789). To just build the app without running a webserver and watching for changes, use `npm run build` instead.

## About Flux

Flux replaces MVC in favor of a unidirectional data flow and more of a funcional programming style. Flux is a design pattern just like MVC rather than an actual framework, and has multiple implementations.

Here's the main idea behind Flux: **when a user interacts with a React view, the view propagates an action through a central dispatcher, to the various stores that hold the application's data and business logic, which updates all of the views that are affected**. This works especially well with React's declarative programming style, which allows the store to send updates without specifying how to transition views between states.

### Data flow in Flux

![Data flow in Flux](http://i.imgur.com/B765Yl0.png)

### Key parts in the Flux architecture

#### Views dispatch actions

A dispatcher is essentially an event system. It broadcasts events and registers callbacks. There is only ever one, global dispatcher (it's a singleton), and it operates as the central hub of data flow in a Flux application.

For this example we'll be using Facebook's [Dispatcher library](https://github.com/facebook/flux/blob/master/src/Dispatcher.js) which is very easy to instantiate:

```javascript
var AppDispatcher = new Dispatcher();
```

Let's say your application has a button that adds an item to a list:

```html
<button onClick={this.createNewItem}>New Item</button>
```

What happens on click? Your view dispatches a very specific event, with the event name and new item data:

```javascript
createNewItem: function( evt ) {
  AppDispatcher.dispatch({
    eventName: 'new-item',
    newItem: { name: 'John Doe' }
  });
}
```

#### Stores respond to dispatched events

Stores contain the application **state and logic**. They are somewhat similar to a model in a traditional MVC, but they manage the state of many objects – they do not represent a single record of data like ORM models do. **Stores manage the application state for a particular domain within the application.**

```javascript
// List data and business logic
var ListStore = {
  // Actual collection of model data
  items: [],

  // Getter method we'll use later
  getAll: function () {
    return this.items;
  }
};
```

Your store then responds to the dispatched event:

```javascript
AppDispatcher.register(function (payload) {
  switch(payload.eventName) {
    case 'new-item':
      // We get to mutate data!
      ListStore.items.push(payload.newItem);
      break;
  }

  return true; // Needed for Flux promise resolution
}); 
```

This is traditionally how Flux dispatches callbacks. Each payload contains an event name and data. A switch statement decides specific actions.

Key concepts here are:

* A store is not a model. A store contains models.
* A store is the only thing in your application that knows how to update data. This is the most important part of Flux. The event we dispatched doesn't know how to add or remove items.
* A store represents a single *domain* of your application. If, for example, a different part of your application needed to keep track of some images and their metadata, you'd make another store, and call it `ImageStore` (images being the second domain within your app). If your application is large, the domains will probably be obvious to you already. If your application is small, you probably only need one store.
* Only your stores are allowed to register dispatcher callbacks! Your views should never call `AppDispatcher.register`. The dispatcher only exists to send messages from views to stores. Your views will respond to a different kind of event.

#### Store emit change events

Now that our data is definitely changed, we need to tell the world.

Your store emits an event, but not using the dispatcher. This is confusing, but it's the Flux way. Let's give our store the ability to trigger events. If you're using [MicroEvent.js](http://notes.jetienne.com/2011/03/22/microeventjs.html) this is easy:

```javascript
MicroEvent.mixin(ListStore);
```

Let's then trigger our change event:

```javascript
case 'new-item':
  ListStore.items.push(payload.newItem);

  // Tell the world we changed!
  ListStore.trigger( 'change' );

  break;
```

Key concept here is we don't pass the newest item when we trigger. Our views only care that something changed (re-rendering). Let's keep following the data to understand why.

#### Views respond to change events

Now we need to display the list. Our view will completely re-render when the list changes.

First, let's listen for the change event from our `ListStore` when the component mounts (ie: when the component is first created):

```javascript
componentDidMount: function () {  
  ListStore.bind('change', this.listChanged);
},
```

For simplicity's sake, we'll just call `forceUpdate`, which triggers a re-render.

```javascript
listChanged: function () {  
  // Since the list changed, trigger a new render
  this.forceUpdate();
},
```

Don't forget to clean up your event listeners when your component unmounts:

```javascript
componentWillUnmount: function() {  
  ListStore.unbind( 'change', this.listChanged );
},
```

Now what? Let's look at our render function:

```javascript
render: function () {
  var items = ListStore.getAll();

  // Build list items markup by looping over the entire list
  var itemHtml = items.map(function (listItem) {
    return <li key={listItem.id}>
      {listItem.name}
    </li>;
  });

  return <div>
    <ul>
      {itemHtml}
    </ul>

    <button onClick={this.createNewItem}>New Item</button>
  </div>;
}
```

#### So, let's recap

When you add a new item, the view dispatches an action, the store responds to that action, the store updates, the store triggers a change event, and the view responds to the change event by re-rendering.

#### Re-rendering and the virtual DOM

But here's a problem: we're re-rendering the entire view every time the list changes! Isn't that horribly inefficient?!

*Nope.* Sure, we'll call the render function again, and sure, all the code in the render function will be re-run. But **React will only update the real DOM if your rendered output has changed.** Your render function is actually generating a "virtual DOM", which React compares to the previous output of render. If the two virtual DOMs are different, React will update the real DOM with only the difference.

Key concept here is that **when store data changes, your views shouldn't care if things were added, deleted, or modified. They should just re-render entirely. React's "virtual DOM" diff algorithm handles the heavy lifting of figuring out which real DOM nodes changed.**

#### One more thing: what is an action creator?

Remember, when we click our button, we dispatch a specific event:

```javascript
AppDispatcher.dispatch({  
  eventName: 'new-item',
  newItem: { name: 'Samantha' }
});
```

Well, this can get pretty repetitive to type if many of your views need to trigger this event. Plus, all of your views need to know the specific object format. That's lame. Flux suggests an abstraction, called action creators, which just abstracts the above into a function.

```javascript
ListActions = {
  add: function (item) {
    AppDispatcher.dispatch({
      eventName: 'new-item',
      newItem: item
    });
  }
};
```

Now your view can just call `ListActions.add({ name: 'John Doe' });` without having to worry about dispatched object syntax.

#### PS: don't use `forceUpdate`

I used `forceUpdate` for simplicty's sake. The correct way for your component to read store data is to copy data into `this.state` and read the state in the render function.

When the component first loads, store data is copied into the state. When the store updates, the data is re-copied entirely. This is better because internally, `forceUpdate` is synchronous, while `setState` is more efficient.

## About Reflux

Reflux is a simple library for uni-directional dataflow application architecture inspired by React's Flux. Reflux is **one** implementation of Flux, with some key differences:

* The singleton dispatcher is removed in favor for letting every action act as dispatcher instead.
* Because actions are listenable, the stores may listen to them. Stores don't need to have big switch statements that do static type checking (of action types) with strings.
* Stores may listen to other stores, i.e. it is possible to create stores that can aggregate data further, similar to a map/reduce.
* Action creators are not needed because RefluxJS actions are functions that will pass on the payload they receive to anyone listening to them.

Check the [official docs](https://github.com/reflux/refluxjs) for more info on how to use it.

## About this code example

Most of the docs on this file come from [this awesome blog entry](http://blog.andrewray.me/flux-for-stupid-people/) and [this other tutorial](https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture). This project itself is inspired on one of the sections of [this course on Udemy](https://www.udemy.com/learn-and-understand-reactjs/).
