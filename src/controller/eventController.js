import models from "../models/index.js";
import moment from "moment";

class eventController{
    
    async filter_events_by_date (request,response)
    {
        try{
            
            let result = await models.event.find({event_start_date:{$gte:moment.utc(`${request.body.date} 00:00:00.000`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()},event_end_date:{$lte:moment.utc(`${request.body.date} 23:59:59.999`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()}}).populate("event_category_id").populate("event_user_ids").exec()
            return response.json({events:result})
        }
        catch(e){
            return response.status(400).json({ error: e.message });
        }
    }
    //creating
    async find_birthdays_by_date (request,response)
    {   
        try{
            let filter_date = moment.utc(`${request.body.date} 00:00:00.000`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()
            let result = await models.user.aggregate(
                [
                    { 
                      $match: {
                        $expr: {
                          $and: [
                            { $eq: [{ $dayOfMonth: '$user_dob' }, { $dayOfMonth: filter_date }] },
                            { $eq: [{ $month: '$user_dob' }, { $month: filter_date }] },
                            { $eq: ['$is_user_active',true]}
                          ],
                        }
                      },
                      
                    },
                    {
                        $project:{
                            _id:1
                        }
                    }
                    
                ]
            )
            return response.json({events:result})
        }
        catch(e){
            return response.status(400).json({ error: e.message });
        }
    }
    async find_date_of_join_by_date(request,response)
    {
        try{
            let filter_date = moment.utc(`${request.body.date} 00:00:00.000`, "DD/MM/YYYY HH:mm:ss.SSS").toDate()
            let result = await models.user.aggregate(
                [
                    { 
                      $match: {
                        $expr: {
                          $and: [
                            { $eq: [{ $dayOfMonth: '$user_doj' }, { $dayOfMonth: filter_date }] },
                            { $eq: [{ $month: '$user_doj' }, { $month: filter_date }] },
                            { $eq: ['$is_user_active',true]}
                          ],
                        }
                      },
                      
                    },
                    {
                        $project:{
                            _id:1
                        }
                    }
                    
                ]
            )
            return response.json({events:result})

        }
        catch(e){
            return response.status(400).json({ error: e.message });
        }
    }
}
export default eventController;