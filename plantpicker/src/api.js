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

  /**Login users */
  static async userLogin(formData) {
    let res = await this.request(`users`, formData, "post")
    console.log(formData)
    return res.token;
  }

  /**Get user info if loggedin */
  static async getUserInfo(formData) {
    let res = await this.request(`users`, formData, "post");
    console.log(res.user)
    return res.user
  }

  // /**Apply user to job */
  // static async appliedJob(username, id) {
  //   console.log(username, id)
  //   let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
  //   console.log(res)

  //   return res;
  // }


  // /**Get list of companies */
  // static async getCompanies(searchData) {

  //   let res = await this.request(`companies/`, searchData, "get");
  //   return res.companies;
  // }

  // /** Get details on a company by handle. */
  // static async getCompany(handle) {
  //   let res = await this.request(`companies/${handle}`);
  //   return res.company;
  // }

  // /**Get list of jobs */
  // static async getJobs() {
  //   let res = await this.request(`jobs/`);
  //   return res.jobs;
  // }

  // /**Get list of jobs */
  // static async getJob(id) {
  //   let res = await this.request(`jobs/${id}`);
  //   return res.job;
  // }
}

// for now, put token ("testuser" / "password" on class)
// PlantsApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default PlantsApi;