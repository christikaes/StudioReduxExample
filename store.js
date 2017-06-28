const store = Redux.createStore(
    undoable(reducer, { undoType: "UNDO", redoType: "REDO", jumpToPastType: "JUMP_TO_PAST", jumpToFutureType: "JUMP_TO_FUTURE" }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.store = store;
