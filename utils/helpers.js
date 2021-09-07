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

export const convertToUppercase = (str) => {
  const str2 = `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

  return str2;
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