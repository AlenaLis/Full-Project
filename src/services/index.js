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

export const changeProfileInfo = (data, id) => {
  const url = `${urls.USER}/${id}`;
  return ajaxWrapper({
    method: 'PATCH',
    url,
    data,
  }).then(data => data.data)
};

export const getProfileInfo = (data, id) => {
  const url = `${urls.USER}/${id}`;
  return ajaxWrapper({
    method: 'GET',
    url,
    data,
  }).then(data => data.data)
};

export const getAllArticles = () => {
  const url = `${urls.CATEGORY}`;
  return ajaxWrapper({
    method: 'GET',
    url,
  }).then(data => data.data)
};

export const getOneArticle = (data, id) => {
  const url = `${urls.CATEGORY}/${id}`;
  return ajaxWrapper({
    method: 'GET',
    url,
    data,
  }).then(data => data.data)
};

export const getOneArticleById = (id) => {
  const url = `${urls.CATEGORY}/article/${id}`;
  return ajaxWrapper({
    method: 'GET',
    url,
  }).then(data => data.data)
};

export const countWatches = (id) => {
  const url = `${urls.CATEGORY}/article/${id}`;
  return ajaxWrapper({
    method: 'PATCH',
    url,
  }).then(data => data.data)
};

export const addOneArticle = (data) => {
  console.log('===>data', data);
  const url = `${urls.CATEGORY}`;
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


