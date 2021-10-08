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
  // Expand this to accomodate people with any length of names
  const string1 = word.split(" ")[0];
  const string2 = word.split(" ")[1];

  const str1 = `${string1.charAt(0).toUpperCase()}${string1.slice(1)}`;
  const str2 = string2 ? `${string2.charAt(0).toUpperCase()}${string2.slice(1)}` : "";

  const combinedString = `${str1} ${str2}`;

  return combinedString;
}

export const extractInitials = (word) => {
  if (word == null || word == undefined) {
    return null
  }
  const string1 = word.split(" ")[0];
  const string2 = word.split(" ")[1];

  const str1 = `${string1.charAt(0).toUpperCase()}`;
  const str2 = `${string2.charAt(0).toUpperCase()}`;

  const combinedString = `${str1}${str2}`;

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