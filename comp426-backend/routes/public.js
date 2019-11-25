import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";

export const router = express.Router();
export const prefix = '/public';

const {publicStore} = require('../data/DataStore');
//const NewsAPI = require('newsapi');
//const newsapi = new NewsAPI('1f5ab45295f640fe8a9b397a85acfde5');
//should hold past articles in here.
router.get('/*', parseGet, function (req, res) {
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
  }
});

router.post('/*', parsePost, function (req, res) {
  const result = req.handlePost(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});
