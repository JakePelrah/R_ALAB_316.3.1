// main content
const mainEl = document.querySelector('main')
mainEl.style.backgroundColor = 'var(--main-bg)'
mainEl.innerHTML = '<h1>DOM Manipulation</h1>'
mainEl.classList.add('flex-ctr')


//menu bar
const topMenuEl = document.getElementById('top-menu')
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'
topMenuEl.style.height = '100%'
topMenuEl.classList.add('flex-around')

// sub menu
const subMenuEl = document.getElementById('sub-menu')
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'
subMenuEl.style.height = '100%'
subMenuEl.classList.add('flex-around')
subMenuEl.style.position = 'absolute'
subMenuEl.style.top = '0'


// links
var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];



// populate the top menu with links
populateLinks(topMenuEl, menuLinks)

// select and cache the all of the <a> elements inside 
// of topMenuEl in a variable named topMenuLinks.
const topMenuLinks = topMenuEl.querySelectorAll('a')

// Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click', (e) => {
  // The first line of code of the event listener function should 
  // call the event object's preventDefault() method.
  e.preventDefault()

  // the second line of code of the function should immediately 
  // return if the element clicked was not an <a> element.
  const target = e.target
  if (target.tagName.toLowerCase() !== 'a')
    return

  // log the content of the <a> to verify the handler is working.
  console.log(`The contents of target <a> are ${target.textContent}`)


  // Within the event listener, if the clicked <a> element does not yet have a 
  // class of "active" (it was inactive when clicked):
  if (!target.classList.contains('active')) {

    // extract sublinks
    const { subLinks } = menuLinks.find(link => link.text === target.textContent)
    if (subLinks) {
      // build the sub menu
      buildSubMenu(subLinks)
      // show the sub menu
      subMenuEl.style.top = '100%'
    }
    // if user clicked about
    else if (target.textContent === 'about') {
      // hide the sub menu
      subMenuEl.style.top = '0'
      // insert about into main element
      mainEl.innerHTML = `<h1>${toCamelCase(target.textContent)}</h1>`
    }
  }
  else {
    // hide the sub menu
    subMenuEl.style.top = '0'
  }

  // The event listener should add the active class to the <a> element
  // that was clicked, unless it was already active, in which case it should remove it.
  target.classList.toggle('active')

  // The event listener should remove the active class from each other <a> element in
  // topMenuLinks - whether the active class exists or not.
  topMenuLinks.forEach(link => {
    if (link !== e.target) {
      link.classList.remove('active')
    }
  })
})


subMenuEl.addEventListener('click', (e) => {
  // The first line of code of the event listener function should 
  // call the event object's preventDefault() method.
  e.preventDefault()

  // the second line of code of the function should immediately 
  // return if the element clicked was not an <a> element.
  const target = e.target
  if (target.tagName.toLowerCase() !== 'a')
    return

  // log the content of the <a> to verify the handler is working.
  console.log(`The contents of target <a> are ${target.textContent}`)

  // the event listener should set the CSS top property of subMenuEl to 0.
  subMenuEl.style.top = '0'

  // remove the active class from each <a> element in topMenuLinks.
  topMenuLinks.forEach(link => link.classList.remove('active'))

  // Update the contents of mainEl, within an <h1>, to the contents 
  // of the <a> element clicked within subMenuEl.
  mainEl.innerHTML = `<h1>${toCamelCase(target.textContent)}</h1>`

})


/////////////////////////////// HELPER FUNCTIONS ///////////////////////////////
function buildSubMenu(subLinks) {
  // clear the current contents of subMenuEl.
  subMenuEl.innerHTML = ''

  // populate subMenu links
  populateLinks(subMenuEl, subLinks)
}

function populateLinks(parent, links) {

  for (let link of links) {

    // create a new <a> element
    const a = document.createElement('a')

    // set the href
    a.href = link.href

    // set the text
    a.textContent = link.text

    // append to the parent
    parent.append(a)
  }
}

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function toCamelCase(str) {
  const strArray = str.split(' ')
  const camelArray = strArray.map(str => str.charAt(0).toUpperCase() + str.slice(1))
  return camelArray.join(' ')
}