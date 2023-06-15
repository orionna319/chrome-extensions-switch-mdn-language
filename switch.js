const switchBox = document.querySelector('.switch')
const switchButton = document.getElementById('switch')
const status = document.getElementById('status')
const tip = document.getElementById('tip')

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const url = new URL(tabs[0].url)
  if (url.hostname !== 'developer.mozilla.org') {
    switchBox.style.display = 'none'
    tip.innerText = 'The current page is not an MDN webpage.'
    return
  }

  const pathnames = url.pathname.split('/')
  const language = pathnames[1]
  const isEnglish = language === 'en-US'
  status.innerHTML = `Current page use ${isEnglish ? 'English' : 'Chinese'}.`
})

switchButton.addEventListener('change', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = new URL(tabs[0].url)
    const pathnames = url.pathname.split('/')
    const language = pathnames[1]

    if (this.checked) {
      if (language === 'en-US') {
        pathnames[1] = 'zh-CN'
      } else {
        pathnames[1] = 'en-US'
      }
    } else {
      if (language === 'en-US') {
        pathnames[1] = 'zh-CN'
      } else {
        pathnames[1] = 'en-US'
      }
    }

    const newUrl = url.origin + pathnames.join('/')
    changeUrl(newUrl)

    const isEnglish = pathnames[1] === 'en-US'
    status.innerHTML = `Current page use ${isEnglish ? 'English' : 'Chinese'}.`
  })
})

function changeUrl(url) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.update(tabs[0].id, { url: url })
  })
}
