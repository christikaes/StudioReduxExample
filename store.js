const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const store = Redux.createStore(
    undoable(reducer, { undoType: "UNDO", redoType: "REDO", jumpToPastType: "JUMP_TO_PAST", jumpToFutureType: "JUMP_TO_FUTURE" }),
    load(),
    composeEnhancers(
        Redux.applyMiddleware(save())
    )
);

window.store = store;
