function translationClicked (event) {
  console.log(document.getElementById('translationMenu'))
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
