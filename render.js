var addItemToCanvas = function(item) {
    var canvasItem = document.createElement("div");
    canvasItem.classList.add('item');
    canvasItem.innerText = item.text;
    canvasItem.style.fontWeight = item.bold ? 'bold' : 'normal';
    canvasItem.style.fontStyle = item.italic ? 'italic' : 'normal';
    canvasItem.style.textDecoration = item.underline ? 'underline' : '';
    canvasItem.style.fontSize = item.size;
    document.getElementById('canvas').appendChild(canvasItem);
};

var addItemToEditor = function(item, index) {
    var editorItem = document.createElement("div");
    editorItem.classList.add('item-editor');
    editorItem.classList.add('mdl-card');
    editorItem.classList.add('mdl-shadow--2dp');
    editorItem.innerHTML = 
        '<div class="text-container">' +
            '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' + 
                '<input class="mdl-textfield__input" type="text" id="item-editor-' + index + '-text" value="' + item.text + '">' + 
                '<label class="mdl-textfield__label" for="item-editor-' + index + '-text">Text...</label>' + 
            '</div>' + 
            '<button class="mdl-button mdl-js-button mdl-button--icon delete-item" id="item-editor-' + index + '-delete">' +
                '<i class="material-icons">close</i>' +
            '</button>' +
        '</div>' +
        '<div class="text-ctas">' + 
            '<label class="mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect" for="item-editor-' + index + '-bold">' +
                '<input type="checkbox" id="item-editor-' + index + '-bold" class="mdl-icon-toggle__input"' + (item.bold ? "checked":"") + '>' +
                '<i class="mdl-icon-toggle__label material-icons">format_bold</i>' +
            '</label>' +
            '<label class="mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect" for="item-editor-' + index + '-italic">' +
                '<input type="checkbox" id="item-editor-' + index + '-italic" class="mdl-icon-toggle__input"' + (item.italic ? "checked":"") + '>' +
                '<i class="mdl-icon-toggle__label material-icons">format_italic</i>' +
            '</label>' +
            '<label class="mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect" for="item-editor-' + index + '-underline">' +
                '<input type="checkbox" id="item-editor-' + index + '-underline" class="mdl-icon-toggle__input"' + (item.underline ? "checked":"") + '>' +
                '<i class="mdl-icon-toggle__label material-icons">format_underline</i>' +
            '</label>' + 
            '<div class="mdl-layout-spacer"></div>' +
            '<button class="mdl-button mdl-js-button mdl-button--icon" id="item-editor-' + index + '-size-up">' +
                '<i class="material-icons">format_size</i>' +
            '</button>' +
            '<button class="mdl-button mdl-js-button mdl-button--icon" id="item-editor-' + index + '-size-down">' +
                '<i class="material-icons">text_fields</i>' +
            '</button>'
        '</div>';
    document.getElementById('item-editors').appendChild(editorItem);
};

renderCanvas = function(items){
    // clear document
    document.getElementById('canvas').innerHTML = '';

    // Add all the items
    items.forEach((item, index) => {
        addItemToCanvas(item);
    });
}

renderEditor = function(items) {
     // clear document
    document.getElementById('item-editors').innerHTML = '<span class="mdl-layout-title">Items</span>';

    // Add all the items
    items.forEach((item, index) => {
        addItemToEditor(item, index);
    });

    // This is for mdl
    componentHandler.upgradeDom();
}
