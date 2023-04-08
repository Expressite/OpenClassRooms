export function findIndexByAttribute(array, attribute, value) {
  console.log("array to check");
  console.log(array);
  return array.findIndex(function (element) {
    return element[attribute] === value;
  });
}

export default findIndexByAttribute;
