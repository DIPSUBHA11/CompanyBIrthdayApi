import express from "express";
import eventController from './controller/eventController.js'
import models from '../src/models/index.js'
import multer from "multer";


let router = express.Router();
let eventcontroller = new eventController();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage });

router.get(
  "/gettingEvent",
  eventcontroller.filter_events_by_date
);

router.get(
  "/birthdayEvent",
  eventcontroller.find_birthdays_by_date
);

router.get(
  "/work-anniversary",
  eventcontroller.find_date_of_join_by_date
);

router.post('/templateData', upload.single('ImageFile'), async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(req.file, req.body)
  //  const response=new models.event_category({
  //    event_category:"Birthday",
  //    event_templates: { template_id: req.body.id, template: url + '/public/images/' + req.file.filename }
  //   })
  try {
    // const successful = await response.save()
    models.event_category.update(
      { event_category: "Birthday" },
      {
        $push: {
          event_templates: { template_id: req.body.id, template: url + '/public/images/' + req.file.filename }
        }
      }
    )
    // res.json(successful)
  }
  catch (err) {
    res.send(err)
  }
});

router.post('/upload', upload.single('ImageFile'), async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const user1 = new models.user({
    user_id: req.body.id,
    user_name: req.body.name,
    user_date: req.body.birthday,
    user_image: url + '/public/images/' + req.file.filename,
    is_user_active: true,
    user_doj: req.body.doj,
    client_id: req.body.clientId === " " ? null : req.body.clientId
  })
  try {
    const successful = await user1.save()
    res.json(successful)
  }
  catch (err) {
    res.send(err)
  }
})



export default router;