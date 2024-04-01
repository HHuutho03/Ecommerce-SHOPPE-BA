import BrandService from "../services/BrandService";
// !?soft delete brand
let handleGetAllBrandDelete = async (req, res) => {
  try {
    let info = await BrandService.handleGetAllBrandDelete();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleDeleteBrandSoft = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await BrandService.handleDeleteBrandSoft(req.query.id);
  return res.status(200).json(message);
};
let handleRestoreBrand = async (req, res) => {
  try {
    const recordId = req.query.id;
    if (!recordId) {
      return res.status(200).json({
        errCode: 2,
        errMessage: "Missing required parameter",
      });
    } else {
      const restoredRecord = await BrandService.restoreRecord(recordId);
      return res.status(200).json({
        restoredRecord,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Failed to restore record" });
  }
};
// !?soft delete category
let handleGetAllCategoryDelete = async (req, res) => {
  try {
    let info = await BrandService.handleGetAllCategoryDelete();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleDeleteCategorySoft = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await BrandService.handleDeleteCategorySoft(req.query.id);
  return res.status(200).json(message);
};
let handleRestoreCategory = async (req, res) => {
  try {
    const recordId = req.query.id;
    if (!recordId) {
      return res.status(200).json({
        errCode: 2,
        errMessage: "Missing required parameter",
      });
    } else {
      const restoredRecord = await BrandService.restoreRecord(recordId);
      return res.status(200).json({
        restoredRecord,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Failed to restore record" });
  }
};
// !?CRUD
let handleSaveTrademark = async (req, res) => {
  try {
    let response = await BrandService.handleSaveTrademark(req.body);
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
let handleSaveBrand = async (req, res) => {
  try {
    let response = await BrandService.handleSaveBrandService(req.body);
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
let handleGetAllCategories = async (req, res) => {
  try {
    let info = await BrandService.handleGetAllCategories();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleGetAllTrademark = async (req, res) => {
  try {
    let info = await BrandService.handleGetAllTrademark(req.query.type);

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleGetAllBrand = async (req, res) => {
  try {
    let info = await BrandService.handleGetAllBrandService(req.query.type);

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};

let handleDeleteTrademark = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await BrandService.handleDeleteTrademark(req.query.id);
  return res.status(200).json(message);
};
let handleDeleteBrand = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await BrandService.handleDeleteBrand(req.query.id);
  return res.status(200).json(message);
};
module.exports = {
  handleRestoreCategory,
  handleDeleteTrademark,
  handleGetAllTrademark,
  handleSaveBrand,
  handleGetAllBrand,
  handleDeleteBrand,
  handleSaveTrademark,
  handleGetAllBrandDelete,
  handleDeleteBrandSoft,
  handleRestoreBrand,
  handleGetAllCategoryDelete,
  handleDeleteCategorySoft,
  handleGetAllCategories,
};
