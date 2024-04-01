import db from "../models/index";
import { Op } from "sequelize";

// !? soft delete brand
let handleDeleteBrandSoft = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    if (!brandId) {
      resolve({
        errCode: 2,
        errMessage: `input missing parameter: ${brandId}`,
      });
    } else {
      await db.Brand.destroy({
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
let handleGetAllBrandDelete = () => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let data = await db.Brand.findAll({
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
  console.log("recordId", recordId);
  return new Promise(async (resolve, reject) => {
    try {
      if (!recordId) {
        resolve({
          errCode: 2,
          errMessage: "input missing parameter",
        });
      } else {
        const restoredRecord = await db.Brand.restore({
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

// !? soft delete category
let handleDeleteCategorySoft = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    if (!brandId) {
      resolve({
        errCode: 2,
        errMessage: `input missing parameter: ${brandId}`,
      });
    } else {
      await db.Category.destroy({
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
let handleGetAllCategoryDelete = () => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let data = await db.Category.findAll({
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
let restoreRecordCategory = async (recordId) => {
  console.log("recordId", recordId);
  return new Promise(async (resolve, reject) => {
    try {
      if (!recordId) {
        resolve({
          errCode: 2,
          errMessage: "input missing parameter",
        });
      } else {
        const restoredRecord = await db.Category.restore({
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

// !? CRUD
let handleSaveTrademark = (data) => {
  console.log("parent", data.parent_id);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        await db.Category.create({
          name: data.name,
          slug: data.slug,
          image: data.image,
          parent_id: data.parent_id,
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
let handleSaveBrandService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        await db.Brand.create({
          name: data.name,
          slug: data.slug,
          image: data.image,
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
let handleGetAllTrademark = async (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (inputData === "NONE") {
        let data = await db.Category.findAll({
          attributes: {
            exclude: ["image", "parent_id", "slug", "description", "sort_order"],
          },
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
          data,
        });
      } else {
        let data = await db.Category.findAll();
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
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetAllCategories = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.findAll({
        attributes: {
          exclude: ["id", "deletedAt", "createdAt", "updatedAt", "image", "parent_id", "slug", "description", "sort_order"],
        },
      });
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
let handleGetAllBrandService = async (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (inputData === "NONE") {
        let data = await db.Brand.findAll({
          attributes: {
            exclude: ["image", "slug", "description", "sort_order"],
          },
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
          data,
        });
      } else {
        let data = await db.Brand.findAll();

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
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteTrademark = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let brand = await db.Category.findOne({
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
    await db.Category.destroy({
      where: { id: brandId },
      force: false,
    });
    resolve({
      errCode: 0,
      message: "the brand is deleted",
    });
  });
};
let handleDeleteBrand = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let brand = await db.Brand.findOne({
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
    await db.Brand.destroy({
      where: { id: brandId },
      force: false,
    });
    resolve({
      errCode: 0,
      message: "the brand is deleted",
    });
  });
};
module.exports = {
  handleDeleteTrademark,
  handleGetAllTrademark,
  handleSaveBrandService,
  handleGetAllBrandService,
  handleDeleteBrand,
  handleSaveTrademark,
  handleDeleteBrandSoft,
  handleGetAllBrandDelete,
  restoreRecord,
  handleDeleteCategorySoft,
  handleGetAllCategoryDelete,
  restoreRecordCategory,
  handleGetAllCategories,
};
