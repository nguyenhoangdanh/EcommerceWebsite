const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandle = require("../utils/ErrorHandle");
const catchAsyncError = require("../middleware/catchAsyncError");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const sendShopToken = require("../utils/sendShopToken");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Shop = require("../model/shop");
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ messgage: "Error deleting file" });
        }
      });
      return next(new ErrorHandle("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `https://be-ndshop.vercel.app/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to  activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandle(error.message, 400));
  }
});

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//active shop
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandle("Invalid token", 400));
      }
      const { name, email, password, avatar, address, zipCode, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandle("Seller already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        password,
        avatar,
        address,
        zipCode,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);

//Login Seller
router.post(
  "/login-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandle("Please provide the all fields", 400));
      }

      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandle("Seller doesn't exists", 400));
      }
      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandle("Please provide the correct infomation", 400)
        );
      }
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);

//Load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandle("Seller doesn't exists", 400));
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);

//logout user
// router.get("/logout", isAuthenticated, catchAsyncError(async(req, res, next) => {
//     try {
//         res.cookie("token", null, {
//             expires: new Date(Date.now()),
//             httpOnly: true,
//         });
//         res.status(201).json({
//             success: true,
//             message: "Log out Successfully!"
//         })
//     } catch (error) {
//         return next(new ErrorHandle(error.message, 500))
//     }
// }))

//logout from shop
router.get(
  "/logout",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);

//get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {

      const existsSeller = await Shop.findById(req.user.id);
      const existsAvatarPath = `uploads/${existsSeller.avatar}`;

      fs.unlinkSync(existsAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        avatar: fileUrl,
      })
        // const imageId = existsSeller.avatar.public_id;

        // await cloudinary.v2.uploader.destroy(imageId);

        // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        //   folder: "avatars",
        //   width: 150,
        // });

        // existsSeller.avatar = {
        //   public_id: myCloud.public_id,
        //   url: myCloud.secure_url,
        // };

  
      // await existsSeller.save();

      res.status(200).json({
        success: true,
        seller:existsSeller
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandle("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);




// all sellers --- for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);

// delete seller ---admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandle("Seller is not available with this id", 400)
        );
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);

// update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandle("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 500));
    }
  })
);


module.exports = router;
