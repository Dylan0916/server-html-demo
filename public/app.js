const catNames = ['A cat', 'B cat', 'C cat', 'D cat', 'E cat']

function onClick() {
  const index = Math.floor(Math.random() * catNames.length)
  const catName = catNames[index]

  document.body.innerText = catName
}

btn.addEventListener('click', onClick)
