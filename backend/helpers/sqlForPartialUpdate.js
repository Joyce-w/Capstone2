const { BadRequestError } = require("../ExpressError");


/**Passes in data that will need to be update and formats the correct sql column name if different */
function sqlForPartialUpdate(dataToUpdate) {
    console.log('dataupdate',dataToUpdate)

    /**Creates an array of data to be updated */
  const keys = Object.keys(dataToUpdate);
  // checks when there is no user data
  if (keys.length === 0) throw new BadRequestError("No data");

  /**Maps through the keys to return the column name and the index in the */
  const cols = keys.map((colName, idx) =>
      `"colName}"=$${idx + 1}`,
  );

    // Formats the columns with the values
    return {
        setCols: cols.join(", "),
        values: Object.values(dataToUpdate),
    };
    
}

module.exports = { sqlForPartialUpdate };