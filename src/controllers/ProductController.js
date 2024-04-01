import ProductService from "../services/ProductService";

let handleSaveTrademark = async (req, res) => {
  try {
    let response = await ProductService.handleSaveTrademark(req.body);
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
let handleSaveProduct = async (req, res) => {
  try {
    let response = await ProductService.handleSaveProduct(req.body);
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
let handleEditProduct = async (req, res) => {
  try {
    let response = await ProductService.handleEditProduct(req.body);
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
let handleGetAllProductSearch = async (req, res) => {
  try {
    let itemSearchResult = req.query.searchTerm;
    let info = await ProductService.handleGetAllProductSearch(itemSearchResult);

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleProductCategorySearch = async (req, res) => {
  try {
    let itemSearchResult = req.params.category;
    console.log("itemSearchResult", req.params.category);
    let info = await ProductService.handleProductCategorySearch(itemSearchResult);

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleGetAllProduct = async (req, res) => {
  try {
    let info = await ProductService.handleGetAllProduct();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleGetAllOrder = async (req, res) => {
  try {
    let info = await ProductService.handleGetAllOrder();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};

let handleGetAllProductById = async (req, res) => {
  try {
    let info = await ProductService.handleGetAllProductById(req.params.id);

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};

let handleGetAllProductTop = async (req, res) => {
  try {
    let info = await ProductService.handleGetAllProductTop();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleGetAllProductRelation = async (req, res) => {
  try {
    let productId = await req.query.productId;
    let categoryId = await req.query.categoryId;
    let limit = 4;
    let info = await ProductService.handleGetAllProductRelation(limit, productId, categoryId);

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleDeleteProduct = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await ProductService.handleDeleteProduct(req.query.id);
  return res.status(200).json(message);
};
let handleGetAllProductDelete = async (req, res) => {
  try {
    let info = await ProductService.handleGetAllProductDelete();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleDeleteProductSoft = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await ProductService.handleDeleteProductSoft(req.query.id);
  return res.status(200).json(message);
};
let handleRestoreProduct = async (req, res) => {
  try {
    const recordId = req.query.id;
    if (!recordId) {
      return res.status(200).json({
        errCode: 2,
        errMessage: "Missing required parameter",
      });
    } else {
      const restoredRecord = await ProductService.restoreRecord(recordId);
      return res.status(200).json({
        restoredRecord,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Failed to restore record" });
  }
};
let bulkCreateOrder = async (req, res) => {
  try {
    let response = await ProductService.getBulkCreateOrder(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "error form server",
    });
  }
};
module.exports = {
  handleGetAllProductTop,
  handleProductCategorySearch,
  handleRestoreProduct,
  handleGetAllProductDelete,
  handleSaveProduct,
  handleGetAllProduct,
  handleSaveTrademark,
  handleDeleteProduct,
  handleDeleteProductSoft,
  handleGetAllProductRelation,
  handleGetAllProductSearch,
  bulkCreateOrder,
  handleGetAllProductById,
  handleEditProduct,
  handleGetAllOrder,
};
