class eventController{
    async getEventData (request,response)
    {
        try{
          return response.status(200).json({message : "Done successfully"})
        }
        catch(e){
            return response.status(400).json({ error: e.message });
        }
    }
}
export default eventController;