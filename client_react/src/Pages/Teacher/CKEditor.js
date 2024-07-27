//
//
import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './CSS/TeacherInput.css'


const CKEditorArea = (props) => {
    let TinputElement =
        <CKEditor
            editor={ClassicEditor}
            data={props.value}
            className="CKEditor"
            config={ (event) => { event.width='auto' } }
            onChange={props.changed}
        />

    return (
        <div className='ekeditor'>
            <div>
                <label className="Teacher-Label">{props.label}</label>
            </div>

            <div>
                {TinputElement}
            </div>
        </div>
    )
}

export default CKEditorArea
