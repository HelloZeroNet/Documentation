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

  if (currentLang === lang) {
    window.location.reload(false)
  }

  let tmp = window.location.pathname.split('/')

  if (currentLang === 'en') {
    // For zeronet.io/docs/ and zeronet.io/docs-dev/
    if (tmp[1].startsWith('docs') || window.inside_zeronet_wrapper) {
      tmp.splice(2, 0, lang)
    } else {
      tmp.splice(1, 0, lang)
    }
    window.top.location.href = tmp.join('/')
  } else {
    if (lang === 'en') {
      window.top.location.href = window.location.pathname.replace('/'+currentLang+'/', '/')
    } else {
      window.top.location.href = window.location.pathname.replace('/'+currentLang+'/', '/'+lang+'/')
    }
  }
}

function goToHowTo (event, currentLang) {
  event.preventDefault()

  console.log(currentLang)

  let tmp = window.location.pathname.split('/')
  // For zeronet.io/docs/ and zeronet.io/docs-dev/
  if (tmp[1].startsWith('docs') || window.inside_zeronet_wrapper) {
    if (currentLang === 'en') {
      window.top.location.href = '/'+tmp[1]+'/translation'
    } else {
      window.top.location.href = '/'+tmp[1]+'/'+ currentLang +'/translation'
    }
  } else {
    window.top.location.href = '/translation'
  }
}
