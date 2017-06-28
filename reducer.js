// 2. Design the state shape
// [
//     {
//         text: "..",
//         bold: false,
//         italic: false,
//         underline: true,
//         size: 20
//     },
//     ...
// ]

// 3. Declare INITIAL_STATE
const INITIAL_STATE = [];

// 4. Write reducer!

const rootReducer = (state, action) => {
    if(state == undefined) {
        return INITIAL_STATE;
    }

    switch(action.type){
        case 'ADD_ITEM':
            return [
                ...state,
                action.payload
            ];
        case 'DELETE_ITEM':
            return [
                ...state.slice(0, action.payload.index),
                ...state.slice(action.payload.index + 1),
            ];
        case 'SET_ITEM_TEXT':
            return [
                ...state.slice(0, action.payload.index),
                Object.assign({}, state[action.payload.index], { text: action.payload.text }),
                ...state.slice(action.payload.index + 1),
            ];
        case 'SET_ITEM_BOLD':
            return [
                ...state.slice(0, action.payload.index),
                Object.assign({}, state[action.payload.index], { bold: action.payload.bold }),
                ...state.slice(action.payload.index + 1),
            ];
        case 'SET_ITEM_ITALIC':
            return [
                ...state.slice(0, action.payload.index),
                Object.assign({}, state[action.payload.index], { italic: action.payload.italic }),
                ...state.slice(action.payload.index + 1),
            ];
        case 'SET_ITEM_UNDERLINE':
            return [
                ...state.slice(0, action.payload.index),
                Object.assign({}, state[action.payload.index], { underline: action.payload.underline }),
                ...state.slice(action.payload.index + 1),
            ];
        case 'INCREASE_ITEM_SIZE':
            return [
                ...state.slice(0, action.payload.index),
                Object.assign({}, state[action.payload.index], { size: state[action.payload.index].size + 10 }),
                ...state.slice(action.payload.index + 1),
            ];
        case 'DECREASE_ITEM_SIZE':
            return [
                ...state.slice(0, action.payload.index),
                Object.assign({}, state[action.payload.index], { size: state[action.payload.index].size - 10 }),
                ...state.slice(action.payload.index + 1),
            ];
        default:
            return state;
    }
} 

const testAddItemReducer = () => {
    const state = [];
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
    const newState = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    ]
    expect(rootReducer(state, action)).toEqual(newState);
}
testAddItemReducer();

const testDeleteItemReducer = () => {
    const state = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    ];
    const action = {
        type: 'DELETE_ITEM',
        payload: {
            index: 0
        }
    };
    const newState = [];
    expect(rootReducer(state, action)).toEqual(newState);
}
testDeleteItemReducer();

const testSetItemTextReducer = () => {
    const state = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    ];
    const action = {
        type: 'SET_ITEM_TEXT',
        payload: {
            index: 0,
            text: 'Other text'
        }
    };
    const newState = [
        {
            text: 'Other text',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    ];
    expect(rootReducer(state, action)).toEqual(newState);
}
testSetItemTextReducer();


const testSetItemBoldReducer = () => {
    const state = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    ];
    const action = {
        type: 'SET_ITEM_BOLD',
        payload: {
            index: 0,
            bold: true
        }
    };
    const newState = [
        {
            text: '',
            bold: true,
            italic: false,
            underline: false,
            size: 30
        }
    ];
    expect(rootReducer(state, action)).toEqual(newState);
}
testSetItemBoldReducer();


const testSetItemItalicReducer = () => {
    const state = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    ];
    const action = {
        type: 'SET_ITEM_ITALIC',
        payload: {
            index: 0,
            italic: true
        }
    };
    const newState = [
        {
            text: '',
            bold: false,
            italic: true,
            underline: false,
            size: 30
        }
    ];
    expect(rootReducer(state, action)).toEqual(newState);
}
testSetItemItalicReducer();


const testSetItemUnderlineReducer = () => {
    const state = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    ];
    const action = {
        type: 'SET_ITEM_UNDERLINE',
        payload: {
            index: 0,
            underline: true
        }
    };
    const newState = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: true,
            size: 30
        }
    ];
    expect(rootReducer(state, action)).toEqual(newState);
}
testSetItemUnderlineReducer();

const testIncreaseItemSizeReducer = () => {
    const state = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    ];
    const action = {
        type: 'INCREASE_ITEM_SIZE',
        payload: {
            index: 0
        }
    };
    const newState = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 40
        }
    ];
    expect(rootReducer(state, action)).toEqual(newState);
}
testIncreaseItemSizeReducer();

const testDecreaseItemSizeReducer = () => {
    const state = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 30
        }
    ];
    const action = {
        type: 'DECREASE_ITEM_SIZE',
        payload: {
            index: 0
        }
    };
    const newState = [
        {
            text: '',
            bold: false,
            italic: false,
            underline: false,
            size: 20
        }
    ];
    expect(rootReducer(state, action)).toEqual(newState);
}
testDecreaseItemSizeReducer();

console.log("Reducer tests passsed")

// Expose the reducer globally so we can access it from the console/other files
window.reducer = rootReducer;