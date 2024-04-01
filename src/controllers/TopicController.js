import TopicService from "../services/TopicService";

let handleSaveTopic = async (req, res) => {
  try {
    let response = await TopicService.handleSaveTopic(req.body);
    return res.status(200).json({
      errCode: 0,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMsg: "error from server",
    });
  }
};

let handleSavePost = async (req, res) => {
  try {
    let response = await TopicService.handleSavePost(req.body);
    return res.status(200).json({
      errCode: 0,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMsg: "error from server",
    });
  }
};
let handleGetAllPost = async (req, res) => {
  try {
    let info = await TopicService.handleGetAllPost();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleGetAllTopic = async (req, res) => {
  try {
    let info = await TopicService.handleGetAllTopic();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleDeletePost = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await TopicService.handleDeletePost(req.query.id);
  return res.status(200).json(message);
};
let handleDeleteTopic = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await TopicService.handleDeleteTopic(req.query.id);
  return res.status(200).json(message);
};
module.exports = {
  handleDeletePost,
  handleGetAllTopic,
  handleSaveTopic,
  handleDeleteTopic,
  handleSavePost,
  handleGetAllPost,
};
