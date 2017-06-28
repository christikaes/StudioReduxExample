// Contains all the logic hooking our components to the store

const renderAndAddListeners = () => {
    const items = store.getState().present;

    // Render views
    renderCanvas(items);
    renderEditor(items);

    // Dispatch actions when buttons are clicked
    items.forEach((item, index) => {
        // DELETE_ITEM
        document.getElementById('item-editor-' + index + '-delete').addEventListener('click', () => {
            store.dispatch(actions.deleteItemAction(index));
        });
        // SET_ITEM_TEXT
        document.getElementById('item-editor-' + index + '-text').addEventListener('change', (e) => {
            const text = e.target.value;
            store.dispatch(actions.setItemTextAction(index, text));
        });
        // SET_ITEM_BOLD
        document.getElementById('item-editor-' + index + '-bold').addEventListener('change', (e) => {
            const bold = e.target.parentElement.classList.contains("is-checked");
            store.dispatch(actions.setItemBoldAction(index, bold));
        });
        // SET_ITEM_ITALIC
        document.getElementById('item-editor-' + index + '-italic').addEventListener('change', (e) => {
            const italic = e.target.parentElement.classList.contains("is-checked");
            store.dispatch(actions.setItemItalicAction(index, italic));
        });
        // SET_ITEM_UNDERLINE
        document.getElementById('item-editor-' + index + '-underline').addEventListener('change', (e) => {
            const underline = e.target.parentElement.classList.contains("is-checked");
            store.dispatch(actions.setItemUnderlineAction(index, underline));
        });
        // INCREASE_ITEM_SIZE
        document.getElementById('item-editor-' + index + '-size-up').addEventListener('click', () => {
            console.log("sizeup")
            store.dispatch(actions.increaseItemSizeAction(index));
        });
        // DECREASE_ITEM_SIZE
        document.getElementById('item-editor-' + index + '-size-down').addEventListener('click', () => {
            store.dispatch(actions.decreaseItemSizeAction(index));
        });
    });
}

store.subscribe(() => {
    renderAndAddListeners();
});

renderAndAddListeners();

// ADD_ITEM
document.getElementById('add-item').addEventListener("click", () => {
    store.dispatch(actions.addItemAction());
});

// UNDO
document.getElementById('undo').addEventListener("click", () => {
    store.dispatch({ type: 'UNDO'});
});

// REDO
document.getElementById('redo').addEventListener("click", () => {
    store.dispatch({ type: 'REDO'});
});
