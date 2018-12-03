function translationClicked (event) {
  if (document.getElementById('translationMenu').style.display === 'none') {
    document.getElementById('translationMenu').style.display = 'inline-block'
    document.getElementById('menuDropUp').style.display = 'inline-block'
    document.getElementById('menuDropDown').style.display = 'none'
  } else {
    document.getElementById('translationMenu').style.display = 'none'
    document.getElementById('menuDropUp').style.display = 'none'
    document.getElementById('menuDropDown').style.display = 'inline-block'
  }
}

function goToTranslation (event, currentLang, lang) {
  event.preventDefault()

  let tmp = window.location.href.split('/')

  if (currentLang === 'en') {
    // For zeronet.io/docs/ and zeronet.io/docs-dev/
    if (tmp[3].startsWith('docs')) {
      tmp.splice(4,0, lang)
    } else {
      tmp.splice(3,0, lang)
    }
    window.location.href = tmp.join('/')
  } else {
    if (lang === 'en') {
      window.location.href = window.location.href.replace('/'+currentLang+'/', '/')
    } else {
      window.location.href = window.location.href.replace('/'+currentLang+'/', '/'+lang+'/')
    }
  }
}

function goToHowTo (event, currentLang) {
  event.preventDefault()

  console.log(currentLang)

  let tmp = window.location.href.split('/')
  // For zeronet.io/docs/ and zeronet.io/docs-dev/
  if (tmp[3].startsWith('docs')) {
    if (currentLang === 'en') {
      window.location.href = '/'+tmp[3]+'/translation'
    } else {
      window.location.href = '/'+tmp[3]+'/'+ currentLang +'/translation'
    }
  } else {
    window.location.href = '/translation'
  }
}
