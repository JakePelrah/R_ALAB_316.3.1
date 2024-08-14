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

// menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '/catalog' },
    { text: 'orders', href: '/orders' },
    { text: 'account', href: '/account' },
];

// populate menu links
for (let link of menuLinks) {
    const a = document.createElement('a')
    a.href = link.href
    a.textContent = link.text
    topMenuEl.append(a)
}