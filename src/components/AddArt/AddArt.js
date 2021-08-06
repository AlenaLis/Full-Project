import React, {useCallback, useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertToRaw} from 'draft-js';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';

import {addOneArticle} from '../../services';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './AddArt.scss';


const AddArt = () => {

  const [dataForm, setDataForm] = useState({
    title: '',
    titleForShow: '',
    category: '',
    description: EditorState.createEmpty(),
    date: Date.now(),
    date2: '',
    idUser: '',
    idArt: '',
    image: '',
  });

  const [art, setMyArt] = useState();

  const setArt = useCallback(() => {
    addOneArticle({
      title: dataForm.title,
      category: dataForm.category,
      textArt: dataForm.titleForShow,
      data: dataForm.date2,
      imageSrc: {
        dataUrl: art,
        format: 'png'
      }
    }).then(res => {
      window.location.reload();
    })
  }, [dataForm, art]);

  const token = localStorage.getItem('token');

  let newDate = dataForm.date;
  newDate = new Date().toLocaleDateString();

  const changeDataInput = (e, key) => {

    let dataText = draftToHtml(convertToRaw(dataForm.description.getCurrentContent()));

    if (key === 'description') {
      setDataForm((prevState) => ({
        ...prevState,
        [key]: e,
        titleForShow: dataText,
        date2: newDate,
        id: Date.now(),
      }))

    } else {
      const {value} = e.target
      setDataForm((prevState) => ({
        ...prevState,
        [key]: value,
        titleForShow: dataText,
        date2: newDate,
        id: Date.now(),
      }))
    }
  }

  const uploadImagesWithComp = async (e) => {
    const imageDataUrl = await readFile(e);
    setMyArt(imageDataUrl);
  };

  const readFile = (image) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(image);
    });

  const createNewArt = () => {
    setArt()
  };

  return (
    <div>
      <div className='addArt__content'>
        <div>
          <h2 className="h2__text"> Add article </h2>
        </div>
        <div className="valid__form">
          <div>
            <input
              className="input"
              onChange={(e) => {
                changeDataInput(e, 'title')
              }}
              type="text"
              value={dataForm.title}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => {
                changeDataInput(e, 'category')
              }}
              type="text"
              value={dataForm.category}
            />
          </div>
        </div>
        <div className="editor">
          <Editor
            editorState={dataForm.description}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            type="text"
            onEditorStateChange={(e) => {
              changeDataInput(e, 'description')
            }}
          />
        </div>
        <div className="valid__bottom">
          <Link to="/inprof/">
            <button
              className='button__publish'
              onClick={createNewArt}
            >
              <p>Publish an article</p>
            </button>
          </Link>
          <button
            className='button__create_image'
          >

            <p>Add a picture</p>

            <input
              className="addPicture"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                uploadImagesWithComp(e.target.files[0])
              }}
            />
          </button>
        </div>
      </div>
      {!token && <Redirect to="/"/>}
    </div>
  );
};

export default AddArt;
