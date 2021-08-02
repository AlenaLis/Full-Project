import { ajaxWrapper } from '../helpers/ajaxWrapper';

import {urls} from '../helpers/constant';

export const login = (data) => {
  const url = `${urls.USER}/login`;
  return ajaxWrapper({
    method: 'POST',
    url,
    data,
  }).then(data => data.data)
};

export const registration = (data) => {
  const url = `${urls.USER}/register`;
  return ajaxWrapper({
    method: 'POST',
    url,
    data,
  });
};

export const profileInfo = (data, id) => {
  const url = `${urls.USER}/${id}`;
  return ajaxWrapper({
    method: 'PATCH',
    url,
    data,
  });
};

export const getAllArticles = (data) => {
  const url = `${urls.ARTICLE}`;
  return ajaxWrapper({
    method: 'GET',
    url,
    data,
  }).then(data => data.data)
};

export const getOneArticle = (id) => {
  const url = `${urls.ARTICLE}/${id}`;
  return ajaxWrapper({
    method: 'GET',
    url,
  }).then(data => data.data)
};

export const countWatches = (id) => {
  const url = `${urls.ARTICLE}/${id}`;
  return ajaxWrapper({
    method: 'PATCH',
    url,
  }).then(data => data.data)
};

export const addOneArticle = (data) => {
  const url = `${urls.ARTICLE}`;
  return ajaxWrapper({
    method: 'POST',
    url,
    data
  }).then(data => data.data)
};

// export const checkOut = (data) => {
//   const url = `${urls.CART}`;
//   return ajaxWrapper({
//     method: 'DELETE',
//     url,
//   }).then(data => data.data)
// };
//
// export const deleteOne = (id, total) => {
//   const url = `${urls.CART}/${id}`;
//   return ajaxWrapper({
//     method: 'DELETE',
//     url,
//     data: {productId: id, total}
//   }).then(data => data.data)
// };


