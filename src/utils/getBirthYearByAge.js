/**
 * 
 * @param {number} age 
 * @returns number
 */

const getBirthYearByAge = (age) => {
  const date = new Date()

  date.setFullYear(date.getFullYear() - age)

  return date.getFullYear()

}

export default getBirthYearByAge