const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Item = require("../models/shoppingItem");
const { Router } = require("express");

const storage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1025 * 5,
  },
});

router.get("/items", (req, res, next) => {
  Item.find(function (err, items) {
    if (err) {
      res.json(err);
    } else {
      res.json(items);
    }
  });
});

router.post("/item", upload.array("itemImage", 3), (req, res, next) => {
  // router.post("/item", upload.single("itemImage"), (req, res, next) => {

  const { files, body } = req;

  console.log("file", files);
  console.log("body", body);

  const paths = files.map((a) => a.path);

  let newShoppingItem = new Item({
    itemName: body.itemName,
    itemQuantity: body.itemQuantity,
    itemBought: body.itemBought,
    itemImage: paths,
  });
  newShoppingItem.save((err, item) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ msg: "Item has been added to db" });
    }
  });
});

router.put("/item/:id", (req, res, next) => {
  Item.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought,
      },
    },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/image/:id");

router.delete("/item/:id", (req, res, next) => {
  Item.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.delete("/user/:id/image/:path", async (req, res) => {
  try {
    const { id, path } = req.params;
    console.log("path: ", path);

    let item = await Item.findById(id);

    console.log("item: ", item);

    let images = Item.itemImage;
    console.log("images: ", images);

    // images = images.filter((e) => e != path);
    // console.log("images: ", images);

    res.json(item);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
