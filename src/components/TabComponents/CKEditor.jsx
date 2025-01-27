import React, { useEffect, useContext } from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';

import { StateContext } from '../Main/StateContext';
import getNamesInDialogue from 'Utils/getNamesInDialogue';

export function InputEditor() {
  // get refs from EditorContext to provide to CKEditor components
  // refer to Main.js code
  const { renderRef, setRenders, inputRef } = useContext(StateContext);
  const howToLink = window.location.href + 'howto';

  // updates the dialogue render inputs when content of InputArea changes
  const updateNames = (editor) => {
    const names = getNamesInDialogue(editor.getData());
    Object.keys(names).forEach((name) => {
      names[name] = renderRef.current[name] || '';
    });
    setRenders(names);
  };

  // Autosave documentation:
  // https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/saving-data.html#autosave-feature
  const inputEditorConfig = {
    plugins: [
      Essentials,
      Paragraph,
      Bold,
      Italic,
      Link,
      PasteFromOffice,
      Autosave,
    ],
    toolbar: ['bold', 'italic', 'link', '|', 'undo', 'redo'],
    autosave: {
      save: updateNames,
    },
  };

  const inputEditorData = `<p>If this is your first time using the formatter, please check the <a href='${howToLink}'>Text Guidelines</a> to make
        sure your text is ready.</p>
      <p>---EXAMPLE DIALOGUE---</p>
      <p>Bg 64207.png</p>
      <p>Location: Dwarfs’ Mine - Campsite</p>
      <p>Heading: —Day 2: Camp Vargas.</p>
      <p>Jamil: This is a line said by Jamil (the line starts with his name followed by a colon).</p>
      <p>This is another line said by Jamil.</p>
      <p>Floyd: This is a line said by Floyd instead <strong>with some emphasis.</strong></p>
      <p>Some Random NPC: Hello`;

  useEffect(() => {
    // Grab the HTML element using ref.current.editor
    // https://github.com/ckeditor/ckeditor5/issues/1185
    inputRef.current.editor.editing.view.change((writer) => {
      writer.setAttribute(
        'spellcheck',
        'false',
        inputRef.current.editor.editing.view.document.getRoot(),
      );
    });
  }, []);

  return (
    <CKEditor
      editor={BalloonEditor}
      config={inputEditorConfig}
      data={inputEditorData}
      ref={inputRef}
    />
  );
}

export function TLNotesEditor() {
  // get refs from EditorContext to provide to CKEditor components
  // refer to Main.js code
  const { tlNotesRef } = useContext(StateContext);

  const tlNotesEditorConfig = {
    plugins: [Bold, Italic, Link, List, PasteFromOffice, Essentials, Paragraph],
    toolbar: ['bold', 'italic', 'link', 'numberedList', '|', 'undo', 'redo'],
  };

  useEffect(() => {
    // Grab the HTML element using ref.current.editor
    // https://github.com/ckeditor/ckeditor5/issues/1185
    tlNotesRef.current.editor.editing.view.change((writer) => {
      writer.setAttribute(
        'spellcheck',
        'false',
        tlNotesRef.current.editor.editing.view.document.getRoot(),
      );
    });
  }, []);

  return (
    <CKEditor
      editor={BalloonEditor}
      config={tlNotesEditorConfig}
      ref={tlNotesRef}
    />
  );
}
