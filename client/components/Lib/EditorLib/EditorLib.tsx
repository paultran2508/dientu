import React, { useState } from 'react'
import { Editor, EditorState, } from 'draft-js';
import 'draft-js/dist/Draft.css';


type Props = {}

const EditorLib = ({ }: Props) => {

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),)
  const onChangeEditorSate = (editorState: EditorState) => {

  }

  return (
    <div>
      <Editor
        editorState={editorState}
        // handleKeyCommand={this.handleKeyCommand}
        onChange={setEditorState}
      />
      {/* <span>hello</span> */}
    </div>

  )
}

export default EditorLib