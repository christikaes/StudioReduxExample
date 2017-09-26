# Redux101 with StudioReduxExample

## PART 1--REDUX 101

Let's get right into it! I'm a strong believer in learning by doing, so today we will build a very naive version of the Vistaprint Studio.

This application is a perfect example of where redux can be utilized to manage client side state. Let's take a look at it.

At first glance it seems pretty basic, but the devil is in the details. Let's look at the example of editing text. 
You can edit text from this left area, as well as from the canvas. The actual text appears in many places. How do we ensure that all this
information is synced up across all these usesages? Imagine that we created a service to automatically spell check your text--would that
also have access to manipulate the sate of our document? You can see how information organization is so crutial!

For today's demos, we will be building a simple studio with redux. I already have the basic layout of our application setup to save time.

All of this code is available on my github repo. I am not using react, angular, or even jquery just to keep things as vanilla as possible
for the purposes of this demonstration.

Redux has 3 key concepts. And to tell you the truth the entire concept of redux can be defined in 1 line:
newState = reducer(oldState, action)

1) Actions
The first foundational concept of redux are actions.
Actions are simple js objects that contain 2 things: a type and optional parameters.
Actions define the only source of data for our store. The only way to update the state of our application is by dispatching an action on the store.

Let's look at an example of an action for a basic counter. What can you do in a simple todo application?
{
    type: 'ADD_TODO',
    text: 'Learn Redux'
}
{
    type: 'REMOVE_TODO',
    index: 1
}

In many ways these are very similar to events, however more complex.

I mentioned this before, but the reason that this is so powerful is that any update to your application store can be defined by some very particular action.
Let's go ahead and define the actions for our Studio application.
```
{
    type: 'ADD_ITEM',
    payload: {
        text: "Sample",
        bold: false,
        italics: false,
        underline: false,
        size: 20
    }
}
{
    type: 'REMOVE_ITEM',
    index: 1
}
```

I personally perfer putting all of the data that is being passed through the action in a payload object. It keeps large amounts of data clean.

Great! We have 2 actions defined for our application.

A good practice when writing our actions is to write ActionCreators. 
For example, if we want to be able to add an Item from multiple areas of our application, we don't want to copy the default attributes.
An action creator does exactly that--it returns an action.

Let's go ahead and write some action creators. The first thing that we'll do is write some unit tests.

```
testAddItemActionCreator(){
    action = {
        type: 'ADD_ITEM',
        payload: {
            text: "Sample",
            bold: false,
            italics: false,
            underline: false,
            size: 20
        }
    }
    expect(addItemAction()).toEqual(action)
}
```

This will fail since we haven't written our action yet. Let's do that now:

```
addItemAction() {
    return {
        type: 'ADD_ITEM',
        payload: {
            text: "Sample",
            bold: false,
            italics: false,
            underline: false,
            size: 20
        }
    }
}
```

Let's do the same for removeItem.

Great we have some action creators and are ready to use them!

2) Reducer
Actions tell us 'Hey something happened!' but they don't define what will happen to the state because of it. Enter the reducer.

Has anyone seen the Array.Reuce function? The reduce function takes 2 arguments, and reduces the array. 
The reducer performs exactly the same function--it takes the state, and an action and returns a new state.

Before we go on to define our reducer, let's define design the shape of our application state.
The state of the application contains everything that changes in our application. 
The first thing that comes to mind is the data of our app, but the state can also contain UI details.

Let's design the state of our studio application.

```
[
    {
        text: "Sample",
        bold: false,
        italics: false,
        underline: false,
        size: 20
    },
    ...
]
```

What will the initial state of our application be?
```
INITIAL_STATE = [];
```

If we wanted to hydrate the state from a database or localstorage, we could do that here.

Ok now that we have designed the state of our application, let's consider how it will change for each action.

What happens when: 
"ADD_ITEM" -> Adds a new entry
"REMOVE_ITEM" -> Removes the entry at the given index

Let's code it out! First we'll write some tests

```
testAddItem(){
    oldState = [];
    action = {
        type: 'ADD_ITEM',
        payload: {
            text: "Sample",
            bold: false,
            italics: false,
            underline: false,
            size: 20
        }
    }
    newState = [{
        text: "Sample",
        bold: false,
        italics: false,
        underline: false,
        size: 20
    }]
    expect(studioReducer(oldState, action)).toEqual(newState);
}
```

If we run this now, it will fail. Let's implement our reducer:

```
studioReducer(state, action){
    // If there is no state then return the initial state
    // This happens when the store is first setup
    if(state == undefined) {
        return INITIAL_STATE;
    }

    switch(action.type)
        case 'ADD_ITEM':
            return state.concat(action.payload);
        default:
            return state;
}
```

Ok let's run the test again. Great it passes!

This looks good, but it's missing one key ingredient: Immutability.
Redux requires our state to be immutable. This means that we cannot edit the state.
Our reducers must be pure functions. This ensures that every time you call a reducer, it always returns the same result
This saves us from side effects and unpredictability.

A great practice when using redux is to use the immutable library. Let's go ahead and add it to our unittests.

!!!!!!!!!!!!!!!!!!TODO!!!!!!!!!!!!!!!!

Now our tests are failing! Why is that?

Right, it's because we are editing the state array in this case. Let's fix that.

Great now we have a pure reducer function. Every time we call the reducer with some state and an action, we know 
that it will always return the same value.

The main piece of the puzzle is done, we have actions and a reducer ready to go!

3) Store
The last component of our application is the redux store. The redux store ties together the application state, actions and reducers
Infact so far we haven't actually used the redux library!

The redux store holds the application state. It is created by passing in our root reducer.
Any actions that we want to dispatch are dispatched on our store.

Let's go ahead and create our store.
```
store = Redux.createStore(studioReducer);
```

We can use getState to get the state of our store at any time:
```
store.getState();
```

Remember, we cannot set the state directly on the store, we have to set state through an action. The store is Readonly.

The store exposes a subscribe method that we can use to listen to changes on our app state. Let's subscribe to it and log the state:

```
store.subscribe(() => {
    console.log(store.getState())
})
```

That's it! Now we can dispatch any of the actions on the store and see the state update:

```
store.dispatch(addItemAction())
```

And our store subscribe get's triggered.

Let's run through the flow of data through our application.
We call the store.dispatch and pass in an action created by our actionCreator.
The store takes the action and the current state and calls our rootReducer.
The reducer creates a new state and gives it back to the store.
The store sets the new state and triggers the subscribe method.

The data always flows in one direction.
No matter how many actions and reducers you have, the entire state of your application can always be defined by a json blob!

That's beutiful!

So far we have added redux to our application, but we have not tied it into our UI yet. Let's go ahead and do that.

I've already created a renderCanvas and renderEditor functions that take in an array of items. In this case that is just our store.
So we can call these methods inside of the store.subscribe.

In order to trigger the items, let's also add listeners to clicks on various buttons in our UI.
Note that in a real application this logic would live inside of your container components, for now we will just put it here.

Now our UI is able to manipulate the state of our app!

## PART 2 -- REDUX A FEW BEST PRACTICES
Right now we have all of our code in 1 file, let's separate this out.

If we were to further expand this app, we could put each action and reducer into their own files.

Let's also go ahead and add a few more actions and reducers for the other funcitonality of our application.

## PART 3 -- REDUX DEV TOOLS
The redux dev tools are a great way to inspect your application. Let's add dev tools support to our application.

With this you can really see how redux is almost like an API for our UI!

## PART 4 -- UNDO REDO
One thing that we might want to add to our app is the ability to undo and redo.
Because the state of our document can be defined by a single immutable json object, we can easily keep these references.

First let's consider what our state will have to look like for this support:

```
[
    past: [],
    present: [
        {
            text: "Sample",
            bold: false,
            italics: false,
            underline: false,
            size: 20
        }
    ],
    future: []
]
```

We can use: https://github.com/omnidan/redux-undo
This is a higher order reducer that adds past, present, future to our state. We don't have to wory about it at all!

To set it up simply wrap your reducer in 'undoable(rootReducer)' when creating our store:
```
const store = Redux.createStore(
    undoable(reducer, { undoType: "UNDO", redoType: "REDO", jumpToPastType: "JUMP_TO_PAST", jumpToFutureType: "JUMP_TO_FUTURE" }),
    [],
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    []
);
```

All we need to do to call it is dispatch an action: 

```
store.dispatch({ type: 'UNDO'});
```


There we go! In 5 minutes, we've added the ability to undo/redo in our application. Now anytime the user hits undo or redo, we can modify our state


## PART 5 -- Syncing with localstorage

Another feature we might want to add to our applicaiton might be the ability to sync our app to localstorage. That way the user does not have to start from scratch when starting the application again.
In order to do this we will need to use a middleware.

The middleware that we are going to use is: https://github.com/elgerlambert/redux-localstorage

```
const store = Redux.createStore(
    undoable(reducer, { undoType: "UNDO", redoType: "REDO", jumpToPastType: "JUMP_TO_PAST", jumpToFutureType: "JUMP_TO_FUTURE" }),
    load(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.applyMiddleware(save())
);
```

We use `load()` to hydrate the initial state on load, and we use `save()` as a middleware to update our local storage whenenever there is a change.

Now if we close out of the app after adding text, and reload it, our text is persisted. Pretty sweet! We added localstorage support in a few lines of code :D


# Additional Resources
* redux.js.org
* https://egghead.io/courses/getting-started-with-redux
* https://egghead.io/courses/building-react-applications-with-idiomatic-redux
* https://github.com/reactjs/redux/tree/master/docs/faq
* With react: https://github.com/reactjs/react-redux
* With angular: (a lot of options, I like this one) https://github.com/angular-redux/ng2-redux
