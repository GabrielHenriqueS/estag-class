class InstanceError {

  /**
   * 
   * @param {string} message 
   * @param {number} statusCode 
   */
  constructor(message, statusCode = 400){
    this.message = message
    this.statusCode = statusCode
  }
}

export default InstanceError