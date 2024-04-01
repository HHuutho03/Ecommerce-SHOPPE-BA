require("dotenv").config();
import { reject } from "lodash";
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"jame03 👻" <thanhbinh290603@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Thông tin lời nhắc liên hệ ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  console.log("dataSend", dataSend);
  let result = "";
  if (dataSend) {
    result = `
    <h3>xin chào ${dataSend.name}</h3>
    <pBạn nhận được email này vì đã liên hệ tới trang bán hàng của chúng tôii</p>
    <p>thông tin liên hệ ${dataSend.title}</p>
    <div><b>nội dung liên hệ:${dataSend.content}</b></div>
    <div><b>Phản hồi của chung tôi:${dataSend.reply}</b></div>

    <div>Xin chân thành cảm ơn</div>
    `;
  }

  return result;
};
// let getBodyHTMLEmailRemedy = (dataSend) => {
//   let result = "";
//   if (dataSend.languages === "vi") {
//     result = `
//   <h3>xin chào ${dataSend.patientName}</h3>
//   <pBạn nhận được email này vì đã đặt lịch khám trên trang BookingCare</p>
//   <p>thông tin khám bệnh</p>
//   <div>Xin chân thành cảm ơn</div>
//   `;
//   }
//   if (dataSend.languages === "en") {
//     result = `
//   <h3>Dear ${dataSend.patientName}</h3>
//   <p>You received this email because you booked an appointment on the BookingCare site</p>
//   <p>medical examination information</p>
//   <div>Sincerely thank</div>
//   `;
//   }
//   return result;
// };
// let sendAttachment = (dataSend) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//           user: process.env.EMAIL_APP,
//           pass: process.env.EMAIL_APP_PASSWORD,
//         },
//       });

//       let info = await transporter.sendMail({
//         from: '"HuuTTho03 👻" <huuttho03@gmail.com>', // sender address
//         to: dataSend.email, // list of receivers
//         subject: "Kết quả khám bệnh khám bệnh ✔", // Subject line
//         html: getBodyHTMLEmailRemedy(dataSend),
//         attachments: [
//           {
//             filename: `remedy ${
//               dataSend.patientId
//             }-${new Date().getTime()}.png`,
//             content: dataSend.imgBase64.split("base64")[1],
//             encoding: "base64",
//           },
//         ],
//       });
//       resolve(true);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
module.exports = {
  sendSimpleEmail,
  // getBodyHTMLEmailRemedy,
  // sendAttachment,
};
