import React, { useEffect, useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import './style.css'
import blogApi from '../api/blogApi';

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'highlight',
        '|',
        'alignment',
        'restrictedEditingException',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'outdent',
        'indent',
        '|',
        'blockQuote',
        'todoList',
        'link',
        'insertTable',
        'imageUpload',
        'imageInsert',
        'mediaEmbed',
        '|',
        'code',
        'codeBlock',
        'htmlEmbed',
        '|',
        'specialCharacters',
        'superscript',
        'subscript',
        'removeFormat',
        '|',
        'pageBreak',
        '|',
        'undo',
        'redo',
        '|',
        'findAndReplace'
    ],
    heading: {
        options: [
            { model: 'paragraph', view: 'p', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
            { model: 'format', view: 'pre', title: 'Formatted', class: 'ck-format' },
            { model: 'address', view: 'address', title: 'Address', class: 'ck-address' },
        ],
    },
    fontFamily: {
        options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Comic Sans MS, cursive',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif'
        ]
    },
    language: 'vi',
    image: {
        toolbar: [
            'imageTextAlternative',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'linkImage'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
        ]
    },
    ckfinder: {
        options: {
            resourceType: 'Images'
        },
        uploadUrl: "http://127.0.0.1:8000/media/upload/"
    },
};

Blog.propTypes = {

};

function Blog(props) {

    const [data, setData] = useState("")
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        ; (async () => {
            try {
                const response = await blogApi.getAll({});
                setBlogs(response.data)
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])

    return (
        <div className="">
            <h1>Viết Blog</h1>
            <CKEditor
                editor={Editor}
                data=""
                config={editorConfiguration}
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);

                    // Insert the toolbar before the editable area.
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement(),
                    );
                }}
                onError={({ willEditorRestart }) => {
                    // If the editor is restarted, the toolbar element will be created once again.
                    // The `onReady` callback will be called again and the new toolbar will be added.
                    // This is why you need to remove the older toolbar.
                    if (willEditorRestart) {
                        this.editor.ui.view.toolbar.element.remove();
                    }
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setData(data)
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            {blogs.map(blog => (
                <div dangerouslySetInnerHTML={{ __html: blog.data }} />
            ))}
        </div>
    );
}

export default Blog;