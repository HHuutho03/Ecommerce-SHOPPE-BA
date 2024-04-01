import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import { v4 as uuidv4 } from "uuid";
import emailService from "./emailService";
// let buildUrlEmail = () => {
//   let result = "";
//   // let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
//   return result;
// };

let handleGetAllContact = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Contact.findAll({
        include: [
          {
            model: db.User,
            as: "userIdData",
            attributes: {
              exclude: ["image", "password"],
            },
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
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //lưu ý, truyền vào đúng password cần hash
      // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
      let hashPassWord = await bcrypt.hashSync(password, salt);

      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compare(password, user.password);


          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in our system, plz try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check == true) {
        resolve({
          errCode: 1,
          message: "your email is already in used,plz another email",
        });
      } else {
        let hashPassWordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPassWordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,  
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: "R2",
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    //find id to delete
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: `the user is'n exist`,
      });
    }
    // await user.destroy sai vi k theo form chuan squelize , khi ep user sang oject
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      message: "the user is deleted",
    });
  });
};
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "missing required parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        (user.gender = data.gender),
          (user.roleId = data.roleId),
          (user.positionId = data.positionId),
          (user.image = data.avatar);
        await user.save();
        resolve({
          errCode: 0,
          message: "user updated successfully",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `user isn't found`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    if (!typeInput) {
      resolve({
        errCode: 1,
        errMessage: "Missing required parameter",
      });
    } else {
      try {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        (res.errCode = 0), (res.data = allCode);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    }
  });
};
let handleGetCustomer = (inputID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputID) {
        resolve({
          errCode: -2,
          errMessage: "input missing parameter",
        });
      } else {
        let data = db.User.findOne({
          where: { id: inputID },
        });
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleSaveUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        let hashPassWordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          firstName: data.username,
          password: hashPassWordFromBcrypt,
          email: data.email,
          phonenumber: data.phone,
          lastName: data.name,
          address: data.address,
          image: data.image,
          status: data.status,
          gender: data.gender,
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
let postVerifyBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        // ? SEND TO EMAIL
        await emailService.sendSimpleEmail({
          email: data.email,
          name: data.name,
          title: data.title,
          content: data.content,
          reply: data.reply,
          // redirectLink: buildUrlEmail(),
        });

        let contact = await db.Contact.findOne({
          where: { email: data.email, replay_id: "0" },
          raw: false,
        });
        if (contact) {
          contact.replay_id = 1;
          await contact.save();
          resolve({
            errCode: 0,
            message: "ok",
          });
        } else {
          resolve({
            errCode: -2,
            errMessage: "contact has been activated  or does not exist",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
// let postVerifyBookAppointmentService = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!data.email) {
//         resolve({
//           errCode: -1,
//           errMessage: "Missing input parameter",
//         });
//       } else {
//         let contact = await db.Contact.findOne({
//           where: { email: data.email, replay_id: "0" },
//           raw: false,
//         });
//         if (contact) {
//           contact.replay_id = 1;
//           await contact.save();
//           resolve({
//             errCode: 0,
//             errMessage: "save info contact successfully",
//           });
//         }
//         // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
//         //? SEND TO EMAIL
//         // await emailService.sendSimpleEmail({
//         //   reciverEmail: data.email,
//         //   patientName: data.name,
//         //   title: data.title,
//         //   message: data.message,
//         //   reply: data.reply,
//         // });
//         // let contact = await db.Contact.findOne({
//         //   where: { email: data.email, replay_id: "0" },
//         //   raw: false,
//         // });
//         // if (contact) {
//         //   contact.replay_id = 1;
//         //   await contact.save();
//         //   resolve({
//         //     errCode: 0,
//         //     errMessage: "save info contact successfully",
//         //   });
//         // } else {
//         //   resolve({
//         //     errCode: -2,
//         //     errMessage: "contact has been activated  or does not exist",
//         //   });
//         // }
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
let handleSaveContract = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.Name) {
        resolve({
          errCode: -2,
          errMsg: "input missing parameter",
        });
      } else {
        await db.Contact.create({
          user_id: data.idUser,
          name: data.Name,
          email: data.Email,
          content: data.Message,
          replay_id: 0,
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
module.exports = {
  handleSaveContract,
  handleSaveUser,
  handleGetCustomer,
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAllCodeService: getAllCodeService,
  postVerifyBookAppointmentService,
  handleGetAllContact,
};
