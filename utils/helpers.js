export const generateId = (abc, xyz) => {
  let id = abc + Math.random().toString(36) + xyz;
  return id
}

export const removeWhitespace = (string) => {
  let word = string.replace(/ +/g, "");
  if (word.length <= 6) {
    return word;
  } else {
    return word.slice(0, 6);
  }
}

export const convertToUppercase = (word) => {
  if (word == null || word == undefined) {
    return null
  }
  const string = word.split(" ");
  
  const combinedString = string.map(str => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)} `
  })

  return combinedString;
}

export const extractInitials = (word) => {
  if (word == null || word == undefined) {
    return null
  }
  const string = word.split(" ");
  
  const combinedString = string.map(str => {
    return `${str.charAt(0).toUpperCase()}`
  })

  return combinedString;
}

export const getTime = () => {
  let today = new Date()
  let currentHour = today.getHours()

  if (currentHour < 12) {
    const morning = "morning";
    return morning;
  } else if (currentHour < 18) {
    const afternoon = "afternoon";
    return afternoon;
  } else {
    const evening = "evening";
    return evening;
  }
}