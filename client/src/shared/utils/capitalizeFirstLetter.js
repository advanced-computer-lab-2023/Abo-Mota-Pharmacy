export default function capitalizeFirstLetter(string) {
    // Check if the string is empty or null
    if (!string) {
      return string;
    }
    let name = string.split(" ");
    let result = "";
  
    for (let i = 0; i < name.length; i++) {
      const string = name[i].charAt(0).toUpperCase() + name[i].slice(1);
      result = result + " " + string;
    }
  
    // Capitalize the first letter and concatenate it with the rest of the string
    return result;
  }