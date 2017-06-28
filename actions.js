// 1. Define actions

/******* ADD_ITEM *******/
const addItemAction = () => {
    return  {
        type: 'ADD_ITEM',
        payload: {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    };
}

const testAddItemAction = () => {
    const action = {
        type: 'ADD_ITEM',
        payload: {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    };
    expect(addItemAction()).toEqual(action);
}
testAddItemAction();

/******* DELETE_ITEM *******/
const deleteItemAction = (index) => {
    return {
        type: 'DELETE_ITEM',
        payload: {
            index
        }
    };
}

const testDeleteItemAction = () => {
    const action = {
        type: 'DELETE_ITEM',
        payload: {
            index: 1
        }
    };
    expect(deleteItemAction(1)).toEqual(action);
}
testDeleteItemAction();

/******* SET_ITEM_TEXT *******/
const setItemTextAction = (index, text) => {
    return {
        type: 'SET_ITEM_TEXT',
        payload: {
            index,
            text
        }
    };
}

const testSetItemTextAction = () => {
    const action = {
        type: 'SET_ITEM_TEXT',
        payload: {
            index: 1,
            text: "test"
        }
    };
    expect(setItemTextAction(1, "test")).toEqual(action);
}
testSetItemTextAction();

/******* SET_ITEM_BOLD *******/
const setItemBoldAction = (index, bold) => {
    return {
        type: 'SET_ITEM_BOLD',
        payload: {
            index,
            bold
        }
    };
}

const testSetItemBoldAction = () => {
    const action = {
        type: 'SET_ITEM_BOLD',
        payload: {
            index: 1,
            bold: true
        }
    };
    expect(setItemBoldAction(1, true)).toEqual(action);
}
testSetItemBoldAction();

/******* SET_ITEM_ITALIC *******/
const setItemItalicAction = (index, italic) => {
    return {
        type: 'SET_ITEM_ITALIC',
        payload: {
            index,
            italic
        }
    };
}

const testSetItemItalicAction = () => {
    const action = {
        type: 'SET_ITEM_ITALIC',
        payload: {
            index: 1,
            italic: true
        }
    };
    expect(setItemItalicAction(1, true)).toEqual(action);
}
testSetItemItalicAction();

/******* SET_ITEM_UNDERLINE *******/
const setItemUnderlineAction = (index, underline) => {
    return {
        type: 'SET_ITEM_UNDERLINE',
        payload: {
            index,
            underline
        }
    };
}

const testSetItemUnderlineAction = () => {
    const action = {
        type: 'SET_ITEM_UNDERLINE',
        payload: {
            index: 1,
            underline: true
        }
    };
    expect(setItemUnderlineAction(1, true)).toEqual(action);
}
testSetItemUnderlineAction();

/******* INCREASE_ITEM_SIZE *******/
const increaseItemSizeAction = (index) => {
    return {
        type: 'INCREASE_ITEM_SIZE',
        payload: {
            index
        }
    };
}

const testIncreaseItemSizeAction = () => {
    const action = {
        type: 'INCREASE_ITEM_SIZE',
        payload: {
            index: 1
        }
    };
    expect(increaseItemSizeAction(1)).toEqual(action);
}
testIncreaseItemSizeAction();

/******* DECREASE_ITEM_SIZE *******/
const decreaseItemSizeAction = (index) => {
    return {
        type: 'DECREASE_ITEM_SIZE',
        payload: {
            index
        }
    };
}

const testDecreaseItemSizeAction = () => {
    const action = {
        type: 'DECREASE_ITEM_SIZE',
        payload: {
            index: 1
        }
    };
    expect(decreaseItemSizeAction(1)).toEqual(action);
}
testDecreaseItemSizeAction();

console.log("Actions tests passed");

// Expose the actions globally so we can access it from the console/other files
window.actions = {
    addItemAction,
    deleteItemAction,
    setItemTextAction,
    setItemBoldAction,
    setItemItalicAction,
    setItemUnderlineAction,
    increaseItemSizeAction,
    decreaseItemSizeAction
}
