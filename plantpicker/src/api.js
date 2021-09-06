import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/patch/post/delete to to the API.
 */

class PlantsApi {

    static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${PlantsApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params })).data;
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
    console.log('plant id ', plant_id)
    let res = await this.request(`plants/${plant_id}`);
    console.log(res)
    return res;
  }


  /************** User Routes **************************/

  /**Login users */
  static async registerUser(formData) {

    console.log(formData)
    let res = await this.request(`auth/register`, formData, "post")

    //if there is a res set the token to localStorage
    if (res) {
      localStorage.setItem('token', res.token);
    }
    return res;
  }

  /**Get user info if loggedin */
  static async loginUser(formData) {
    
    let res = await this.request(`auth/login`, formData, "post");

    //if there is a res set the token to localStorage
    if (res) {
      localStorage.setItem('token', res.token);
    }
    return res;
  }

  /**Get user info if loggedin */
  static async getUser(username) {
    
    let res = await this.request(`users/${username}`);
    return res;
  }


  /********************** Plant List Routes *********************/

  static async createList(title, user) {
    let data = {
      list_name: title,
      user_id: user
    }

    let res = await this.request(`lists/create`, data, "post");
    console.log(res)
  }

  static async editListTitle(list_id, new_title) {
    let data = {
      id: list_id,
      list_name: new_title
    }
    let res = await this.request(`lists/${list_id}`, data, "patch")
    console.log(res)
  }

  static async getList(list_id) {
    let res = await this.request(`lists/${list_id}`);
    return res;
  }

  static async deletePlantFromList(list, plant) {
    console.log('api', list, plant)
    let res = await this.request(`lists/${list}/${plant}`, {}, "delete")
    return res;
    
  }

  static async deleteList(list_id) {
    console.log('api', list_id)
    let res = await this.request(`lists/${list_id}`, {}, "delete")
    return res;
  }

}

// for now, put token ("testuser" / "password" on class)
// PlantsApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default PlantsApi;