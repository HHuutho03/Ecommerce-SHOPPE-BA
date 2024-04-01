import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import BrandController from "../controllers/BrandController";
import ProductController from "../controllers/ProductController";
import BannerController from "../controllers/BannerController";
import TopicController from "../controllers/TopicController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.post("/signup", userController.signup);
  router.post("/login", userController.login);
  router.get("/logout", userController.logout);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  ///get api db
  router.post("/api/login", userController.handleLoging);
  router.get("/api/logout", userController.logout);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  //? get api customer
  router.get("/api/get-customer", userController.handleGetCustomer);
  router.post("/api/save-customer", userController.handleSaveUser);

  //?save brand
  router.get("/api/get-all-brand-delete", BrandController.handleGetAllBrandDelete);
  router.delete("/api/delete-brand-soft", BrandController.handleDeleteBrandSoft);

  router.patch("/api/restore-brand", BrandController.handleRestoreBrand);

  router.get("/api/get-all-category-delete", BrandController.handleGetAllCategoryDelete);
  router.delete("/api/delete-category-soft", BrandController.handleDeleteCategorySoft);

  router.patch("/api/restore-category", BrandController.handleRestoreCategory);

  router.post("/api/save-brand", BrandController.handleSaveBrand);
  router.post("/api/save-trademark", BrandController.handleSaveTrademark);
  router.get("/api/get-all-brand", BrandController.handleGetAllBrand);
  router.get("/api/get-all-Trademark", BrandController.handleGetAllTrademark);
  router.get("/products/categories", BrandController.handleGetAllCategories);
  router.delete("/api/delete-brand", BrandController.handleDeleteBrand);
  router.delete("/api/delete-Trademark", BrandController.handleDeleteTrademark);
  //? Post
  router.post("/api/save-topic", TopicController.handleSaveTopic);
  router.post("/api/save-post", TopicController.handleSavePost);
  router.get("/api/get-all-topic", TopicController.handleGetAllTopic);
  router.get("/api/get-all-post", TopicController.handleGetAllPost);
  router.delete("/api/delete-topic", TopicController.handleDeleteTopic);
  router.delete("/api/delete-post", TopicController.handleDeletePost);

  //? product
  router.get("/api/get-all-product", ProductController.handleGetAllProduct);
  router.get("/api/get-all-product-by-id/:id", ProductController.handleGetAllProductById);
  router.get("/api/get-all-product-search", ProductController.handleGetAllProductSearch);
  router.get("/products/category", ProductController.handleProductCategorySearch);
  router.get("/products", ProductController.handleGetAllProductTop);
  router.get("/api/get-all-product-relation", ProductController.handleGetAllProductRelation);
  router.get("/api/get-all-product-delete", ProductController.handleGetAllProductDelete);
  router.post("/api/save-product", ProductController.handleSaveProduct);
  router.post("/api/edit-product", ProductController.handleEditProduct);
  router.delete("/api/delete-product", ProductController.handleDeleteProduct);
  router.get("/api/get-all-product-delete", ProductController.handleGetAllProductDelete);
  router.delete("/api/delete-product-soft", ProductController.handleDeleteProductSoft);
  router.patch("/api/restore-product", ProductController.handleRestoreProduct);
  //? order
  router.get("/api/get-all-order", ProductController.handleGetAllOrder);

  //? banner
  router.get("/api/get-all-banner", BannerController.handleGetAllBanner);
  router.get("/api/get-all-banner-delete", BannerController.handleGetAllBannerDelete);
  router.post("/api/save-banner", BannerController.handleSaveBanner);
  router.delete("/api/delete-banner", BannerController.handleDeleteBanner);
  router.get("/api/get-all-banner-delete", BannerController.handleGetAllBannerDelete);
  router.delete("/api/delete-banner-soft", BannerController.handleDeleteBannerSoft);
  router.patch("/api/restore-banner", BannerController.handleRestoreBanner);

  // ? send email contact
  router.post("/api/send-remedy", userController.postVerifyBookAppointment);
  router.post("/api/save-contract", userController.handleSaveContract);
  router.get("/api/get-all-contact", userController.handleGetAllContact);

  router.post("/api/save-all-order", ProductController.bulkCreateOrder);

  return app.use("/", router);
};

module.exports = initWebRoutes;
