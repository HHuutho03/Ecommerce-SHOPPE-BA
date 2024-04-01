import db from "../models/index";
import { Op } from "sequelize";
import _ from "lodash";
let handleSaveBanner = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        let banner = await db.Banner.findAll({
          where: { status: "1" },
        });
        // if (_.isEmpty(banner)) {
        await db.Banner.create({
          name: data.name,
          image: data.image,
          link: data.link,
          status: data.status,
          position: data.position,
          description: data.description,
        });
        resolve({
          errCode: 0,
          message: "ok",
        });
        // } else {
        //   resolve({
        //     errCode: -2,
        //     message: "exists already ",
        //   });
        // }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetAllBanner = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Banner.findAll({});
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
let handleDeleteBanner = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let brand = await db.Banner.findOne({
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
    await db.Banner.destroy({
      where: { id: brandId },
      force: false,
    });
    resolve({
      errCode: 0,
      message: "the brand is deleted",
    });
  });
};
let handleDeleteBannerSoft = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    if (!brandId) {
      resolve({
        errCode: 2,
        errMessage: `input missing parameter: ${brandId}`,
      });
    } else {
      await db.Banner.destroy({
        where: { id: brandId },
        force: true,
      });
    }
    resolve({
      errCode: 0,
      message: "the brand is deleted",
    });
  });
};
let handleGetAllBannerDelete = () => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let data = await db.Banner.findAll({
      where: {
        deletedAt: {
          [Op.not]: null, // Retrieve records where deletedAt is not null (soft-deleted)
        },
      },
      paranoid: false,
    });
    if (!data) {
      resolve({
        errCode: 2,
        errMessage: `nothing in trash`,
      });
    } else {
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        data: data,
        errCode: 0,
      });
    }
  });
};
let restoreRecord = async (recordId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!recordId) {
        resolve({
          errCode: 2,
          errMessage: "input missing parameter",
        });
      } else {
        const restoredRecord = await db.Banner.restore({
          where: { id: recordId },
        });
        resolve({
          data: restoredRecord,
          errCode: 0,
          message: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  restoreRecord,
  handleGetAllBannerDelete,
  handleGetAllBanner,
  handleSaveBanner,
  handleDeleteBanner,
  handleDeleteBannerSoft,
};
