export const generateId = (abc, xyz) => {
  let id = abc + Math.random().toString(36) + xyz;
  return id
}

export const removeWhitespace = (string) => {
  let word = string.replace(/ +/g, "");
  if (word.length <= 6){
    return word;
  } else {
    return word.slice(0, 6);
  }
}