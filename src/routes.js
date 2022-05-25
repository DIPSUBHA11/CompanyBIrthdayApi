import express from "express";
import EventController from './controller/eventController.js'
import models from '../src/models/index.js'
import multer from "multer";


let router = express.Router();
let eventController = new EventController();
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
  "/get-today-events",
  eventController.getTodayEvents
);

router.get(
  "/get-events-by-Date",
  eventController.filterEventsByDate
);

router.get(
  "/get-event-categories",
  eventController.getEventCategories
)

// router.get(
//   "/work-anniversary",
//   eventcontroller.find_date_of_join_by_date
// );

router.post('/templateData', upload.fields([{name: 'templatename', maxCount: 1}, {name: 'templatename2', maxCount: 1},{name:'templatename3',maxCount:1}]), async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  //  const response=new models.event_category({
  //    event_category:"Birthday",
  //    event_templates: { template_id: req.body.id, template: url + '/public/images/' + req.file.filename }
  //   })
  try {
    // const successful = await response.save()
    // models.event_category.update(
    //   { event_category: "Birthday" },
    //   {
    //     $push: {
    //       event_templates: { template_id: req.body.id, template: url + '/public/images/' + req.file.filename }
    //     }
    //   }
    // )
    // res.json(successful)
    models.event_category.updateOne({_id:req.body.id},{
      $push: {
        event_templates: {
          template_bg: url + '/public/images/' + req.files.templatename[0].filename ,
          template_fg: url + '/public/images/' + req.files.templatename2[0].filename ,
          template_placeholder: url + '/public/images/' + req.files.templatename3[0].filename
        }
      }
    }).exec()
    res.json(successful)
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
    birth_date: req.body.birthday,
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