import BannerService from "../services/BannerService";

let handleSaveBanner = async (req, res) => {
  try {
    let response = await BannerService.handleSaveBanner(req.body);
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
let handleGetAllBanner = async (req, res) => {
  try {
    let info = await BannerService.handleGetAllBanner();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};

let handleDeleteBanner = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await BannerService.handleDeleteBanner(req.query.id);
  return res.status(200).json(message);
};
let handleGetAllBannerDelete = async (req, res) => {
  try {
    let info = await BannerService.handleGetAllBannerDelete();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleDeleteBannerSoft = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await BannerService.handleDeleteBannerSoft(req.query.id);
  return res.status(200).json(message);
};
let handleRestoreBanner = async (req, res) => {
  try {
    const recordId = req.query.id;
    if (!recordId) {
      return res.status(200).json({
        errCode: 2,
        errMessage: "Missing required parameter",
      });
    } else {
      const restoredRecord = await BannerService.restoreRecord(recordId);
      return res.status(200).json({
        restoredRecord,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Failed to restore record" });
  }
};
module.exports = {
  handleRestoreBanner,
  handleGetAllBannerDelete,
  handleSaveBanner,
  handleGetAllBanner,
  handleDeleteBanner,
  handleDeleteBannerSoft,
};
