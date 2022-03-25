import browser from 'webextension-polyfill'
import {
  handleInstalled,
  handleMessage,
  handleBrowserActionClick,
  handleCookieChanged
} from './utils/handlers'

window.browser = browser

// Listen for click event
browser.browserAction.onClicked.addListener(handleBrowserActionClick)

// Listen for messages from content script
browser.runtime.onMessage.addListener(handleMessage)

// Listen for install event
browser.runtime.onInstalled.addListener(handleInstalled)

browser.cookies.onChanged.addListener(handleCookieChanged)
