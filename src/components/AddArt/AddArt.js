import React, {useCallback,useState, useEffect} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertToRaw} from 'draft-js';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './AddArt.scss';
import {addOneArticle, login, registration} from "../../services";
import axios from "axios";

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


  const token = localStorage.getItem('token');

  let newDate = dataForm.date;
  newDate = new Date().toLocaleDateString();

  let newImage = String(dataForm.image)

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

  const imageOnChange = (e) => {
    const file = e.target.files[0];
    // saveAs(new Blob(e.target.files[0], {type}),'test');
    // console.log('===>new Blob(file)', new Blob(file, {type: 'text/plain'}));
    setDataForm((prevState) => ({
      ...prevState,
      // image: file,
      image: URL.createObjectURL(file),
    }))
  }

  const setArt =  useCallback( () => {
    console.log('===>dataForm.image', dataForm.image);
    addOneArticle({
      title: dataForm.title,
      category: dataForm.category,
      textArt: dataForm.titleForShow,
      data: dataForm.date2,
      imageSrc: dataForm.image,
    }).then(res => {
      console.log('===>article', res);
    })
  }, [dataForm])


  // useEffect(() => {
  //   addOneArticle()
  // }, [])
  const  createNewArt = () => {
    console.log('===>dataForm', dataForm);
    setArt()
    console.log('===>dataForm FIELELELLE', dataForm.image);
  }

  const  addPicture = () => {


  }
  // console.log('===>dataForm FIELELELLE',(String(dataForm.image)));
  // console.log('===>dataForm IMAGEEEE', dataForm.image);
  return (
    <div>
      {dataForm.image && <img style={
        {width: '500px',
        height: '500px'
        }} src={dataForm.image} alt=""/>}
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
              Publish an article
            </button>
          </Link>

          <button
            className='button__create_image'
            onClick={addPicture}
          >
            <span className="text">
               Add a picture
            </span>
            <input
              className="addPicture"
              type="file"
              accept=".png, .jpg"
              src="/uploads"
              onChange={(e) => {
                imageOnChange(e)
              }}
            />
          </button>
          <button type="submit" className="button">
            Submit
          </button>
        </div>
      </div>
      {!token && <Redirect to="/"/>}
    </div>
  )
}

export default AddArt;
