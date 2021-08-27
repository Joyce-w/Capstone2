

/**Class that handles  */
class PlantList {

    /**Create a list of plants for a user with a list title, user, and the plant_list_id*/
    static async createList(title, user, plant_list_id)

    /**Gets a list based off the id (or username?)
     * Additional Implementations**
    */
    static async getPlantList()

    /**Edit list name if it is own user*/
    static async updateListName(user_id)

    /**Delete the plant list if it is own user */
    static async deletePlantList(user_id)
    
    /**Add plant to plant_list */
    static async addPlantToList(list_id, plant_id)

    static async removePlantFromList(list_id, plant_id)

}

