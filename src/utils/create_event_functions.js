import models from "../models/index.js";
import moment from "moment";

export async function create_birtthday_event(date) {
    try {

        let filter_date = moment.utc(`${date} 00:00:00.000`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()
        let result = await models.user.aggregate(
            [{
                    $match: {
                        $expr: {
                            $and: [{
                                    $eq: [{
                                        $dayOfMonth: '$birth_date'
                                    }, {
                                        $dayOfMonth: filter_date
                                    }]
                                },
                                {
                                    $eq: [{
                                        $month: '$birth_date'
                                    }, {
                                        $month: filter_date
                                    }]
                                },
                                {
                                    $eq: ['$is_user_active', true]
                                }
                            ],
                        }
                    },

                },
                {
                    $project: {
                        _id: 1
                    }
                }

            ]
        )

        let event_category_id = await models.event_category.find({
            event_category: {
                $eq: 'Birthday'
            }
        }).select({
            _id: 1
        }).exec()
        if (result.length > 0) {
            result = result.map((item) => {
                return item._id
            })
            console.log(result)

            const event = new models.event({
                event_category_id: event_category_id[0]._id,
                event_user_ids: result,
                event_description: "Birthday Event",
                event_start_date: filter_date,
                event_end_date: moment.utc(`${date} 23:59:59.999`, "DD/MM/YYYY HH:mm:ss.SSS").toDate(),
                // created_at: new Date().getTime(),
                updated_at: null,
                deleted_at: null
            })
            const success = await event.save()
        }
        // return result
    } catch (e) {
        console.log(e);
    }
}

export async function create_doj_date(date) {
    try {

        let filter_date = moment.utc(`${date} 00:00:00.000`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()
        let result = await models.user.aggregate(
            [{
                    $match: {
                        $expr: {
                            $and: [{
                                    $eq: [{
                                        $dayOfMonth: '$user_doj'
                                    }, {
                                        $dayOfMonth: filter_date
                                    }]
                                },
                                {
                                    $eq: [{
                                        $month: '$user_doj'
                                    }, {
                                        $month: filter_date
                                    }]
                                },
                                {
                                    $eq: ['$is_user_active', true]
                                }
                            ],
                        }
                    },

                },
                {
                    $project: {
                        _id: 1
                    }
                }

            ]
        )

        let event_category_id = await models.event_category.find({
            event_category: {
                $eq: 'Birthday'
            }
        }).select({
            _id: 1
        }).exec()


        if (result.length > 0) {
            result = result.map((item) => {
                return item._id
            })


            const event = new models.event({
                event_category_id: event_category_id._id,
                event_user_ids: result,
                event_description: "Anniversary Event",
                event_start_date: filter_date,
                event_end_date: moment.utc(`${date} 23:59:59.999`, "DD/MM/YYYY HH:mm:ss.SSS").toDate(),
                // created_at: new Date().getTime(),
                updated_at: null,
                deleted_at: null
            })
            const success = await event.save()
        }
        // return result
    } catch (e) {
        console.log(e);
    }

}

export function events_changing(result) {
    return result
        .filter((item) => item.event_category_id !== null)
        .map((e, i, a) => {
            var details = e.event_user_ids;
            details = details.map((item, index, arr) => {
                var item_details = {
                    name: item.user_name,
                    img: item.user_image,
                };
                return item_details;
            });
            var new_event = {
                category: e.event_category_id.event_category,
                description: e.event_description,
                template: e.event_category_id.event_templates[0].template,
                items: details,
            };
            return new_event;
        });
}