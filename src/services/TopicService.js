import db from "../models/index";

let handleSaveTopic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        await db.Topic.create({
          name: data.name,
          slug: data.name,
          description: data.description,
        });
        resolve({
          errCode: 0,
          message: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleSavePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.title) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        await db.Post.create({
          title: data.title,
          detail: data.detail,
          image: data.image,
          status: data.status,
          topic_id: data.topic_id,
          description: data.description,
        });
        resolve({
          errCode: 0,
          message: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetAllPost = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Post.findAll({
        include: [
          {
            model: db.Topic,
            as: "TopicIdData",
          },
        ],
        raw: true,
        nest: true,
      });

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetAllTopic = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Topic.findAll();

      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let handleDeletePost = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let brand = await db.Post.findOne({
      where: { id: brandId },
    });
    if (!brand) {
      resolve({
        errCode: 2,
        errMessage: `the brand is'n exist`,
      });
    } else {
    }
    // await user.destroy sai vi k theo form chuan squelize , khi ep user sang oject
    await db.Post.destroy({
      where: { id: brandId },
    });
    resolve({
      errCode: 0,
      message: "the brand is deleted",
    });
  });
};
let handleDeleteTopic = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let brand = await db.Topic.findOne({
      where: { id: brandId },
    });
    if (!brand) {
      resolve({
        errCode: 2,
        errMessage: `the brand is'n exist`,
      });
    } else {
    }
    // await user.destroy sai vi k theo form chuan squelize , khi ep user sang oject
    await db.Topic.destroy({
      where: { id: brandId },
    });
    resolve({
      errCode: 0,
      message: "the brand is deleted",
    });
  });
};
module.exports = {
  handleDeletePost,
  handleGetAllPost,
  handleGetAllTopic,
  handleDeleteTopic,
  handleSaveTopic,
  handleSavePost,
};
