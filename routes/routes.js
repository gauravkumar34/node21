const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require('multer');
const Item = require('../models/shoppingItem');

const storage = multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage, limits:{
    fileSize:1024*1025*5
}
})



router.get('/items', (req, res, next)=>{
   Item.find(function(err, items){
       if(err){
           res.json(err);
       }
       else{
           res.json(items);
       }
   });
});


// router.post('/item', upload.array('itemImage',3),(req, res, next)=>{
router.post('/item', upload.single('itemImage'),(req, res, next)=>{

    console.log("file", req.files)
    console.log("body", req.body)
    let newShoppingItem = new Item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought,
        itemImage: req.file.path
    });
    newShoppingItem.save((err, item)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg: 'Item has been added to db'});
        }
    });
})

router.put('/item/:id',(req, res, next)=>{
    Item.findOneAndUpdate({_id: req.params.id},{
        $set: {
            itemName: req.body.itemName,
            itemQuantity: req.body.itemQuantity,
            itemBought: req.body.itemBought
        }

    },
        function(err, result){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        }

    );
    
});

router.get('/image/:id')

router.delete('/item/:id',(req, res, next)=>{
    Item.remove({_id:req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})

module.exports = router;