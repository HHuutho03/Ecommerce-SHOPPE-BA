import db from "../models/index";
import { Op, Sequelize } from "sequelize";
import _ from "lodash";
let handleSaveProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        let dataProduct = await db.Product.create({
          name: data.name,
          category_id: data.category_id,
          brand_id: data.brand_id,
          image: data.image,
          detail: data.detail,
          price: data.price,
          description: data.description,
        });
        try {
          let dataProductCopy = await dataProduct.dataValues;
          if (dataProductCopy) {
            await db.ProductSale.create({
              product_id: dataProductCopy.id,
              pricesale: data.pricesale,
              qty: data.number,
            });
            await db.ProductStore.create({
              product_id: dataProductCopy.id,
              price: data.price,
              qty: data.number,
              image: data.image,
            });
          }
        } catch (error) {}

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
let handleEditProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        let productInfo = await db.Product.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (productInfo) {
          (productInfo.name = data.name),
            (productInfo.category_id = data.category_id),
            (productInfo.brand_id = data.brand_id),
            (productInfo.image = data.image),
            (productInfo.detail = data.detail),
            (productInfo.price = data.price),
            (productInfo.description = data.description),
            await productInfo.save();
          try {
            let productSale = await db.ProductSale.findOne({
              where: { product_id: data.id },
              raw: false,
            });
            let productStore = await db.ProductStore.findOne({
              where: { product_id: data.id },
              raw: false,
            });
            if (productSale && productStore) {
              (productSale.product_id = dataProductCopy.id),
                (productSale.pricesale = data.pricesale),
                (productSale.qty = data.number),
                await productSale.save();

              (productStore.product_id = dataProductCopy.id),
                (productStore.price = data.price),
                (productStore.qty = data.number),
                (productStore.image = data.image),
                await productStore.save();
            }
          } catch (error) {}
        }

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
let handleProductCategorySearch = async (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll({
        where: {
          name: { [Op.like]: `%${keyword}%` }, // Case-insensitive search
        },
        include: [
          {
            model: db.Brand,
            as: "brandIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.Category,
            as: "CategoryIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "parent_id", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.ProductSale,
            as: "productIdSale",
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
let handleGetAllProductSearch = async (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll({
        where: {
          name: { [Op.like]: `%${keyword}%` }, // Case-insensitive search
        },
        include: [
          {
            model: db.Brand,
            as: "brandIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.Category,
            as: "CategoryIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "parent_id", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.ProductSale,
            as: "productIdSale",
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
let handleGetAllProductById = async (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findOne({
        where: { id: input },
        include: [
          {
            model: db.Brand,
            as: "brandIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.Category,
            as: "CategoryIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "parent_id", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.ProductSale,
            as: "productIdSale",
          },
        ],

        raw: true,
        nest: true,
      });
      if (data && data.length > 0) {
        console.log("data", data);
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
let handleGetAllProduct = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll({
        include: [
          {
            model: db.Brand,
            as: "brandIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.Category,
            as: "CategoryIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "parent_id", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.ProductSale,
            as: "productIdSale",
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
let handleGetAllOrder = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Order.findAll({
        include: [
          {
            model: db.User,
            as: "userIdIdData",
          },
          {
            model: db.OrderDetail,
            as: "orderIdData",
          },
        ],

        raw: true,
        nest: true,
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

let handleGetAllProductTop = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll({
        include: [
          {
            model: db.Brand,
            as: "brandIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.Category,
            as: "CategoryIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "parent_id", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.ProductSale,
            as: "productIdSale",
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
let handleGetAllProductRelation = async (limitInput, productId, categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll({
        order: [[Sequelize.literal("RAND()")]],
        limit: limitInput,
        where: {
          category_id: categoryId,
        },
        include: [
          {
            model: db.Brand,
            as: "brandIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.Category,
            as: "CategoryIdData",
            attributes: {
              exclude: ["image", "id", "slug", "sort_order", "description", "parent_id", "createdAt", "updatedAt"],
            },
          },
          {
            model: db.ProductSale,
            as: "productIdSale",
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
let handleDeleteProduct = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let brand = await db.Product.findOne({
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
    await db.Product.destroy({
      where: { id: brandId },
      force: false,
    });
    resolve({
      errCode: 0,
      message: "the brand is deleted",
    });
  });
};
let handleDeleteProductSoft = (brandId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    if (!brandId) {
      resolve({
        errCode: 2,
        errMessage: `input missing parameter: ${brandId}`,
      });
    } else {
      await db.Product.destroy({
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
let handleGetAllProductDelete = () => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let data = await db.Product.findAll({
      where: {
        deletedAt: {
          [Op.not]: null, // Retrieve records where deletedAt is not null (soft-deleted)
        },
      },
      paranoid: false,
      include: [
        {
          model: db.Brand,
          as: "brandIdData",
          attributes: {
            exclude: ["image", "id", "slug", "sort_order", "description", "createdAt", "updatedAt"],
          },
        },
        {
          model: db.Category,
          as: "CategoryIdData",
          attributes: {
            exclude: ["image", "id", "slug", "sort_order", "description", "parent_id", "createdAt", "updatedAt"],
          },
        },
      ],

      raw: true,
      nest: true,
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
        const restoredRecord = await db.Product.restore({
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
// let getBulkCreateOrder = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!data.arrOrder || !data.userInfo) {
//         resolve({
//           errCode: -1,
//           errMessage: "missing required parameters",
//         });
//       } else {
//         await db.Order.create({
//           user_id: data.userInfo.id,
//         }).then(async (newOrder) => {
//           let orders = data.arrOrder;
//           if (orders && orders.length > 0) {
//             orders = orders.map(
//               (item, index) => {
//                 console.log("orders", orders);
//                 const { image, ...newItem } = item;
//                 newItem.order_id = newOrder.id;
//               },

//               () => {
//                 db.OrderDetail.bulkCreate(orders);
//               }
//             );
//           }
//         });
//         resolve({
//           error: 0,
//           errMessage: "ok",
//         });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
let getBulkCreateOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrOrder || !data.userInfo) {
        resolve({
          errCode: -1,
          errMessage: "missing required parameters",
        });
      } else {
        const newOrder = await db.Order.create({
          user_id: data.userInfo.id,
        });

        let orders = data.arrOrder;
        if (orders && orders.length > 0) {
          orders = orders.map((item) => {
            const { image, ...newItem } = item;
            newItem.order_id = newOrder.id;
            newItem.product_id = item.productIdSale.id;
            newItem.qty = item.quantity;
            newItem.discount = item.productIdSale.pricesale;

            return newItem;
          });

          await db.OrderDetail.bulkCreate(orders);
        }

        resolve({
          error: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleProductCategorySearch,
  restoreRecord,
  handleGetAllProductDelete,
  handleGetAllProduct,
  handleSaveProduct,
  handleDeleteProduct,
  handleDeleteProductSoft,
  handleGetAllProductTop,
  handleGetAllProductRelation,
  handleGetAllProductSearch,
  getBulkCreateOrder,
  handleGetAllProductById,
  handleEditProduct,
  handleGetAllOrder,
};
