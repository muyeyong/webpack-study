export default function (name) {
  const element = document.createElement('div');
  element.innerText = `${name}, 你好啊`
  return element
}