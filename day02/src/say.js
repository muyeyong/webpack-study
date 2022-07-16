export default function (name) {
  const element = document.createElement('div');
  element.style.color = 'red'
  element.innerText = `${name}, 你好啊`
  return element
}