import express from "express";
import eventController from './controller/eventController.js'
let router = express.Router();
import { generateUrl } from '../s3.js'
import models from '../src/models/index.js'
let eventcontroller = new eventController();



router.get('/s3Url', async (req, res) => {
  const url = await generateUrl()
  res.send({ url })
})


router.get(
  "/gettingEvent",
  eventcontroller.getEventData
);

router.post('/upload', async (req, res, next) => {
  console.log(req.body);
  const user1 = new models.user({
    user_id:req.body.id,
    user_name:req.body.name,
    user_image:req.body.imageUrl
  })
  try{
     const successful = await user1.save()
     res.json(successful)
  }
  catch(err){
      res.send(err)
  }
});



export default router;