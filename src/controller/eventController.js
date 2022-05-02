import models from "../models/index.js";
import moment from "moment";
import {
    create_birtthday_event,
    create_doj_date,
    events_changing
} from "../utils/create_event_functions.js";

class eventController {


    async get_today_events(request, response) {

        let today_date = moment().format('D/MM/YYYY')

        try {
            let result = await models.event.find({
                event_start_date: {
                    $lte: moment.utc(`${today_date} 00:00:00.000`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()
                },
                event_end_date: {
                    $gte: moment.utc(`${today_date} 23:59:59.999`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()
                }
            }).select({
                "event_description": 1,
                "_id": 0,
            }).populate("event_category_id", {
                "event_category": 1,
                "event_templates.template": 1,
                "_id": 0
            }).populate("event_user_ids", {
                "user_name": 1,
                "user_image": 1,
                "client_id": 1,
                "_id": 0
            }).exec()
            result = events_changing(result)
            // console.log(result)
            return response.json({
                events: result
            })
        } catch (e) {
            return response.status(400).json({
                error: e.message
            });
        }

    }

    async filter_events_by_date(request, response) {
        console.log(moment.utc(`${request.body.date} 00:00:00.000`, "DD/MM/YYYY HH:mm:ss.SSS").toDate())
        try {

            let result = await models.event.find({
                event_start_date: {
                    $lte: moment.utc(`${request.body.date} 00:00:00.000`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()
                },
                event_end_date: {
                    $gte: moment.utc(`${request.body.date} 23:59:59.999`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()
                }
            }).populate("event_category_id").populate("event_user_ids").exec()
            // console.log(result);
            result=events_changing(result)
            return response.json({
                events: result
            })
        } catch (e) {
            return response.status(400).json({
                error: e.message
            });
        }
    }
    //creating+
    // async find_birthdays_by_date(request, response) {
    //     try {
    //         await create_birtthday_event(request.body.date)
    //         await create_doj_date(request.body.date)
    //         return response.status(200).json({
    //             message: "The Events are succesfully created"
    //         })
    //     } catch (e) {
    //         return response.status(400).json({
    //             error: e.message
    //         });
    //     }
    // }
    // async find_date_of_join_by_date(request, response) {
    //     try {
    //         let filter_date = moment.utc(`${request.body.date} 00:00:00.000`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()
    //         let result = await models.user.aggregate(
    //             [{
    //                     $match: {
    //                         $expr: {
    //                             $and: [{
    //                                     $eq: [{
    //                                         $dayOfMonth: '$user_doj'
    //                                     }, {
    //                                         $dayOfMonth: filter_date
    //                                     }]
    //                                 },
    //                                 {
    //                                     $eq: [{
    //                                         $month: '$user_doj'
    //                                     }, {
    //                                         $month: filter_date
    //                                     }]
    //                                 },
    //                                 {
    //                                     $eq: ['$is_user_active', true]
    //                                 }
    //                             ],
    //                         }
    //                     },

    //                 },
    //                 {
    //                     $project: {
    //                         _id: 1
    //                     }
    //                 }

    //             ]
    //         )
    //         return response.json({
    //             events: result
    //         })

    //     } catch (e) {
    //         return response.status(400).json({
    //             error: e.message
    //         });
    //     }
    // }
}
export default eventController;