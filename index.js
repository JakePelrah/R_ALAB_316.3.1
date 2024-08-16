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


// populate menu links
for (let link of menuLinks) {
  const a = document.createElement('a')
  a.href = link.href
  a.textContent = link.text
  topMenuEl.append(a)
}

const topMenuLinks = document.querySelectorAll('a')

topMenuEl.addEventListener('click', (e) => {
  e.preventDefault()

  if (!e.target.matches('a')) { return }

  e.target.classList.toggle('active')

  topMenuLinks.forEach(link => {
    if (link !== e.target) {
      link.classList.remove('active')
    }
  })

  const clickedLink = menuLinks.find(link => link.text === e.target.textContent)
  if (e.target.classList.contains('active')) {
    console.log()
    subMenuEl.style.top = '100%'
  }
  else {
    if (clickedLink.subLinks.length === 0) {
      subMenuEl.style.top = 0
    }
  }

})

