import {Link} from 'react-router-dom';
import React, {useCallback, useEffect, useState} from 'react';

import {countWatches, getOneArticleById} from '../../services';

import question from '../../assets/images/question.png';
import img_human from '../../assets/images/human.png';
import eye from '../../assets/images/eye icon.png';

import './FullArticle.scss';

const FullArticle = () => {

  const [myArticle, setMyArticle] = useState([]);

  let currentLocation = window.location;
  let newPath = currentLocation.pathname
  const newParam = newPath.slice(9, 33);

  const countWatch = useCallback(async () => {
    await countWatches(newParam)
  }, [newParam])

  const refreshMyArt = useCallback(async () => {
    await getOneArticleById(newParam)
      .then(res => {
        setMyArticle(res)
      })
  }, [newParam])

  useEffect(() => {
    countWatch().then(res => {
      refreshMyArt()
    })
  }, [countWatch, refreshMyArt])

  return (
    <div>
      <div className="Art__container">
        <button className="button">
          <Link to='/inprof/'>My profile</Link>
        </button>
        <div className="coloum__content">
          <div className="prof__cont__art">
            <div className="main__bottom__art">
              <div className="main__bottom__new">
                <div>
                  <button>{myArticle[0]?.category}</button>
                </div>
                <img
                  src={myArticle[0]?.imageSrc.dataUrl || question}
                  alt='Image from the art'
                  className='art'
                />
                <h2 className="h2__text">
                  {myArticle[0]?.title}
                </h2>
                <div className="main__panel__bottom__art">
                  <div>
                    <p className="p__text">
                      <div
                        dangerouslySetInnerHTML={{__html: myArticle[0]?.textArt}}
                        className="p__text"
                      />
                    </p>
                  </div>
                  <div className="state">
                  </div>
                  <div className="main__panel__bottom">
                    <div className="hum_cont">
                      <div className="main__panel__bottom__human">
                        <div>
                          <img
                            src={myArticle[0]?.user.imageSrc?.dataUrl || img_human}
                            alt='User photo'
                            className="user__photo"
                          />
                        </div>
                        <div>
                          <p className="p__human">
                            {myArticle[0]?.user
                              ?
                              myArticle[0].user.name
                              + ' ' +
                              myArticle[0].user.lastName
                              :
                              ''}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="p__human__second">{myArticle[0]?.data}</p>
                      </div>
                      <div className="main__panel__bottom__human__second">
                        <div>
                          <img src={eye}/>
                        </div>
                        <div>
                          <p className="p__human__second">{myArticle[0]?.count}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bot">
                      <button className="but">Typography</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullArticle;
