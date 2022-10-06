const parseResponse = (data) => {
  const isArray = Array.isArray(data)

  if(isArray) {
    return data.map(user => ({ ...user, roles: JSON.parse(user.roles)}))
  }

  return data ? { ...data, roles: JSON.parse(data.roles) } : data
}

export default parseResponse