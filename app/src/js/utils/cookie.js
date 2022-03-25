import browser from 'webextension-polyfill'

const defaultMediumUrl = 'https://medium.com'
// Clear all cookies associated with domain
// This is how medium keeps track of the monthly counter
const clearAllCookiesFromDomain = async (domain, url) => {
  const cookies = await browser.cookies.getAll({ domain })
  for (let cookie of cookies) {
    console.log(`cookies.remove ${cookie.name}, ${url}`)
    await browser.cookies.remove({ name: cookie.name, url })
    console.log(`cookies.remove ${cookie.name}, ${defaultMediumUrl}`)
    await browser.cookies.remove({
      name: cookie.name,
      url: defaultMediumUrl
    })
  }
}

export default clearAllCookiesFromDomain
