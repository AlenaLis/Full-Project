import React, {useCallback, useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import {getOneArticle, getProfileInfo} from '../../services';

import question from '../../assets/images/question.png';
import human1 from '../../assets/images/human.png';
import eye from '../../assets/images/eye icon.png';
import prof from '../../assets/images/prof_photo.png';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './MyArticlePage.scss';

const MyArticlePage = () => {

  const [myInfo, setMyInfo] = useState([]);
  const [myArticle, setMyArticle] = useState([]);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const getProfileApi = useCallback(() => {
    getProfileInfo({}, userId).then(res => {
      setMyInfo(res)
    })
  }, [])

  const myArticles = useCallback(() => {
    getOneArticle({}, userId).then(res => {
      setMyArticle(res)
    })
  }, [])

  useEffect(() => {
    getProfileApi()
  }, [])

  useEffect(() => {
    myArticles()
  }, [])

  return (
    <div>
      {myArticle && myArticle.length > 0
        ? (
          <div className="inProf__container">
            <div className="prof__cont__photo">
              {myInfo && myInfo.length > 0
                ? (
                  <span className="line">
                        <div>
                            <img
                              src={myInfo[0].imageSrc?.dataUrl || prof}
                              alt='User photo'
                              className="main__user_photo"
                            />
                        </div>
                        <div>
                            <h3>
                              {myInfo[0].name
                                ?
                                myInfo[0].name + ' ' +
                                myInfo[0].lastName
                                :
                                ' '
                              }
                            </h3>
                        </div>
                        <div>
                            <p>
                              {myInfo[0].description
                                ?
                                myInfo[0].description
                                :
                                ''
                              }
                            </p>
                        </div>
                </span>
                )
                :
                ''
              }
            </div>
            <div className="coloum__content">
              {myArticle?.map((el) => (
                <div className="prof__cont__art">
                  <div className="main__bottom__art">
                    <div className="main__bottom__new">
                      <div>
                        <img
                          src={el.imageSrc.dataUrl || question}
                          alt='Image from the art'
                          className='second__arts'
                        />
                      </div>
                      <div className="main__panel__bottom__art">
                        <div>
                          <button>{el.category}</button>
                        </div>
                        <div>
                          <h2 className="h2__text">
                            <Link
                              to={`/fullart/${el._id}/`}
                              path="/fullart/:id/"
                            >
                              {el.title}
                            </Link>
                          </h2>
                          <div>
                            <div
                              dangerouslySetInnerHTML={{__html: el.textArt}}
                              className="p__text"
                            />
                          </div>
                        </div>
                        {myInfo?.map((elUser) => (
                          <div className="main__panel__bottom">
                            <div className="main__panel__bottom__human">
                              <div>
                                <img
                                  src={elUser.imageSrc?.dataUrl || human1}
                                  alt='profile photo'
                                  className="user_photo"
                                />
                              </div>
                              <div>
                                <p className="p__human">
                                  {elUser.name
                                    ?
                                    elUser.name
                                    + ' ' +
                                    elUser.lastName
                                    :
                                    ''
                                  }
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="p__human__second">{el.data}</p>
                            </div>
                            <div className="main__panel__bottom__human__second">
                              <div>
                                <img src={eye}/>
                              </div>
                              <div>
                                <p className="p__human__second">{el.count}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {!token && <Redirect to="/"/>}
            </div>
          </div>
        )
        :
        <div className="inProf__container">
          <div className="prof__cont__photo">
              <span className="line">
                        <div>
                            <img
                              src={myInfo[0]?.imageSrc?.dataUrl || prof}
                              alt='User photo'
                              className="user_photo"
                            />
                        </div>
                        <div>
                            <h3>
                              {myInfo[0]
                                ?
                                myInfo[0].name
                                + ' ' +
                                myInfo[0].lastName
                                :
                                ''
                              }
                            </h3>
                        </div>
                        <div>
                            <p>
                              {myInfo[0]?.description
                                ?
                                myInfo[0].description
                                :
                                ''
                              }
                            </p>
                        </div>
                    </span>
          </div>
          <div className="but">
            <Link to="/addarticle/">
              <button>Add new article</button>
            </Link>
          </div>
        </div>
      }
      {!token && <Redirect to="/"/>}
    </div>
  );
}

export default MyArticlePage;
