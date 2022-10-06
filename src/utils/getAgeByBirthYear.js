const getAgeByBirthYear = (year) => {
  const date = new Date()

  const age = date.getFullYear() - year

  return age
}

export default getAgeByBirthYear