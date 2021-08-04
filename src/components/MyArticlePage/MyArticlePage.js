import React, {useCallback, useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import human1 from '../../assets/images/human.png';
import eye from '../../assets/images/eye icon.png';
import prof from '../../assets/images/prof_photo.png';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './MyArticlePage.scss';
import {getOneArticle, getProfileInfo} from "../../services";

const MyArticlePage = () => {

  // const myArticle = JSON.parse(localStorage.getItem("art"));
  // const myUser = JSON.parse(localStorage.getItem("myUser")) || [];

  const [myInfo, setMyInfo] = useState([])
console.log('===>myInfo', myInfo);

  const getProfileApi = useCallback(() => {
    console.log('===>myInfo', myInfo);
    getProfileInfo({
    }, userId).then(res => {
      setMyInfo(res)
    })
  }, [])
  console.log('===>myInfo', myInfo);

  const [myArticle, setMyArticle] = useState([])


  // const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem('isLogin')));
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const myArticles = useCallback(() => {
    getOneArticle({
    }, userId).then(res => {
      setMyArticle(res)
      console.log('===>res', res);
    })
  }, [])


  useEffect(() => {
    getProfileApi()
  }, [])


  useEffect(() => {
    myArticles()
  }, [])

console.log('===>myArticles', myArticle);
  console.log('===>myInfo', myInfo);
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
                              src={prof}
                              alt='User photo'
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
                              dangerouslySetInnerHTML={{__html: el.titleForShow}}
                              className="p__text"
                            />
                          </div>
                        </div>
                        {myInfo?.map((elUser) => (
                          <div className="main__panel__bottom">
                            <div className="main__panel__bottom__human">
                              <div>
                                <img
                                  src={human1}
                                  alt='profile photo'
                                />
                              </div>
                              <div>
                                <p className="p__human">
                                  {myInfo[0].name
                                    ?
                                    myInfo[0].name
                                    + ' ' +
                                    myInfo[0].lastName
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
              {!myArticle && <Redirect to="/"/>}
            </div>
          </div>
        )
        :
        <div className="inProf__container">
          <div className="prof__cont__photo">
              <span className="line">
                        <div>
                            <img
                              src={prof}
                              alt='User photo'
                            />
                        </div>
                        <div>
                            <h3>
                              {/*{myInfo[0].name*/}
                              {/*  ?*/}
                              {/*  myInfo[0].name*/}
                              {/*  + ' ' +*/}
                              {/*  myInfo[0].lastName*/}
                              {/*  :*/}
                              {/*  ''*/}
                              {/*}*/}
                            </h3>
                        </div>
                        <div>
                            <p>
                              {/*{myInfo[0].description*/}
                              {/*  ?*/}
                              {/*  myInfo[0].description*/}
                              {/*  :*/}
                              {/*  ''*/}
                              {/*}*/}
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
