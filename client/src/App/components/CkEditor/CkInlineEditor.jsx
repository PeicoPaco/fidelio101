import * as React from 'react';
import AllCkEditor from './AllCkEditor';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
const CkInlineEditor = (props) => {
    return (<AllCkEditor editor={InlineEditor} data={props.html} onReady={(editor) => {
            if (props.editor === 'document') {
                const toolbarContainer = document.querySelector('.document-editor__toolbar');
                if (toolbarContainer) {
                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                }
            }
            // console.log( 'Editor is ready to use!', editor );
        }} onChange={(event, editor) => {
            // const data = editor.getData();
            // console.log( { event, editor, data } );
        }} onBlur={(editor) => {
            // console.log( 'Blur.', editor );
        }} onFocus={(editor) => {
            // console.log( 'Focus.', editor );
        }}/>);
};
export default CkInlineEditor;
