module.exports = {
  capitalizeFirstLetter(string: string) {
    const words = string.split(" ");
    let newString = "";

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      newString += i < words.length - 1 ? words[i] + " " : words[i];
    }
    return newString;
  },
};
