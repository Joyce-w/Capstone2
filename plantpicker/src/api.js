import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/patch/post/delete to to the API.
 */

class PlantsApi {
  static token = localStorage.getItem('token') || null;

    static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PlantsApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /**Get all plants */
  static async getAllPlants() {
    let res = await this.request(`plants`);
    return res;
  }

  /**Get a single plant based off id */
  static async getPlant(plant_id) {
    let res = await this.request(`plants/${plant_id}`);
    return res;
  }


  /************** User Routes **************************/

  /**Login users */
  static async registerUser(formData) {

    let res = await this.request(`auth/register`, formData, "post")

    //if there is a res set the token to localStorage
    if (res) {
      localStorage.setItem('token', res.token);
      PlantsApi.token = res.token;
    }
    return res;
  }

  /**Get user info if loggedin */
  static async loginUser(formData) {
    
    let res = await this.request(`auth/login`, formData, "post");

    //if there is a res set the token to localStorage
    if (res) {
      localStorage.setItem('token', res.token);
      PlantsApi.token = res.token;
    }
    return res;
  }

  /**Get user info if loggedin */
  static async getUser(username) {
    
    let res = await this.request(`users/${username}`);
    return res;
  }


  /********************** Plant List Routes *********************/
  static async getUserLists(username) {

    let res = await this.request(`users/${username}/plant-list`);
    return res;
  }
  
  static async createList(title, user) {
    let data = {
      list_name: title,
      user_id: user
    }

    let res = await this.request(`lists/create`, data, "post");
  }

  static async editListTitle(list_id, new_title) {
    let data = {
      id: list_id,
      list_name: new_title
    }
    let res = await this.request(`lists/${list_id}`, data, "patch")
  }

  static async getList(list_id) {
    let res = await this.request(`lists/${list_id}`);
    return res;
  }

  static async deletePlantFromList(list, plant) {
    let res = await this.request(`lists/${list}/${plant}`, {}, "delete")
    return res;
    
  }

  static async deleteList(list_id) {
    let res = await this.request(`lists/${list_id}`, {}, "delete")
    return res;
  }

  static async addPlantToList(list_id, plant_id) {

  await this.request(`lists/${list_id}`, { plant_id: plant_id }, "post")

  }

  // fulter plants from quiz results
  static async quizResults(data) {
    let res = await this.request(`plants/results`, data , "post")
    return res;
  }
}


export default PlantsApi;