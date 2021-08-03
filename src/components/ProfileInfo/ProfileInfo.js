import React, {useCallback, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import prof from '../../assets/images/prof_photo.png';
import './ProfileInfo.scss';
import {changeProfileInfo, getProfileInfo} from "../../services";

const ProfileInfo = () => {

  const [local, setLocal] = useState({
    firstNameInput: {
      value: '',
      type: '',
    },
    secondNameInput: {
      value: '',
      type: '',
    },
    emailInput: {
      value: '',
      type: '',
    },
    descriptionInput: {
      value: '',
      type: '',
    },
    photoInput: {
      value: '',
      type: '',
    },
  });

  const userId = localStorage.getItem('userId')
  const [myInfo, setMyInfo] = useState([])

  const getProfileApi = useCallback(() => {
    getProfileInfo({
    }, userId).then(res => {
      setMyInfo(res)
    })
  }, [])

  const handleChange = (e, key) => {
    const {value, type} = e.target
    setLocal((prevState) => ({
      ...prevState,
      [key]: {
        value,
        type,
      },
    }))
  };

  useEffect(() => {
    getProfileApi()
  }, [])

  const newProfileApi = useCallback(() => {
    changeProfileInfo({
      name: local.firstNameInput.value,
      lastName: local.secondNameInput.value,
      description: local.descriptionInput.value,
    }, userId).then(res => {
      console.log('===>res', res);
    })
  }, [local])

  const addNewInfo = () => {
    newProfileApi()
  };

  useEffect(() => {
    if (myInfo[0]) {
      setMyInfo(myInfo[0])
    }
  }, [])

console.log('===>local', local);
console.log('===>Myinfo', myInfo[0]);

  const token = localStorage.getItem('token');

  return (
    <div>
      <div className="prof__content">
        <div>
          <h2 className="h2__text"> Profile </h2>
        </div>
        {myInfo.length > 0 ?
          <div className="prof__cont">
            <div className="prof__cont__photo">
            <span className="line">
              <div>
                <img
                  src={prof}
                  alt={'Profile user photo'}/>
              </div>
              <div>
                <button className='photo'>
                  Change photo
                </button>
              </div>
              <div>
                <p>Delete photo</p>
              </div>
            </span>
            </div>
            <div className="prof_edit">
              <form className="prof__form">
                <div className="form__content">
                  <div>
                    <p>First name</p>
                    <input
                      onChange={
                        (e) => {
                          handleChange(e, 'firstNameInput')
                        }}
                      value={local.firstNameInput.value}
                      placeholder={myInfo[0].name ?
                        myInfo[0].name
                        :
                        ''
                      }
                      className="input"
                      type="text"
                    />
                  </div>
                  <div>
                    <p>Last name</p>
                    <input
                      onChange={
                        (e) => {
                          handleChange(e, 'secondNameInput')
                        }}
                      value=
                        {local.secondNameInput.value}
                      placeholder=
                        {myInfo[0].lastName ?
                          myInfo[0].lastName
                          :
                          ''
                        }
                      className="input"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form__content__second">
                  <p>Description</p>
                  <td align="right" valign="top">
                    <input
                      value={local.descriptionInput.value}
                      placeholder={myInfo[0].description
                        ?
                        myInfo[0].description
                        :
                        'Please enter your description'}
                      onChange={
                        (e) => {
                          handleChange(e, 'descriptionInput')
                        }}
                      className="input__desc"
                      type="text"
                    />
                  </td>
                </div>
                <div>
                  <button
                    className="save__button"
                    onClick={addNewInfo}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          :
          <div/>
        }
      </div>
      {!token && <Redirect to="/"/>}
    </div>
  );
}

export default ProfileInfo;
