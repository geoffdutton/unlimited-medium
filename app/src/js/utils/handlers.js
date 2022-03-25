import browser from "webextension-polyfill";
import clearAllCookiesFromDomain from "./cookie";
import reloadTabsIfExist from "./tab";

// Handle onInstalledEvent
const handleInstalled = async () => {
    // Refresh everything on first install (or refresh)
    // To inject the content script
    console.log('handleInstalled')
    // const allTabs = await browser.tabs.query({});
    // for await (const tab of allTabs) {
    //     browser.tabs.reload(tab.id);
    // }
};

// Handle incoming messages
const handleMessage = async (request, sender) => {
    // Found a medium blog
    console.log({ request, sender })
    if (request.type === "medium-blog") {
        // Store the infos locally
        await browser.storage.local.set({
            [request.data.domain]: request.data.url,
        });
    }
};

// Handle icon click
const handleBrowserActionClick = async () => {
    // Get any stored domains (medium blogs)
    const storedBlogs = await browser.storage.local.get();
    const domains = Object.keys(storedBlogs);

    if (domains.length > 0) {
        for (let storedBlog in storedBlogs) {
            // clear cookies for domain
            await clearAllCookiesFromDomain(
                storedBlog,
                storedBlogs[storedBlog]
            );
            console.log(`Cleared cookies from ${storedBlog}`)
        }
        // // clear my local storage
        // await browser.storage.local.clear();
        // // reload all stored pages
        // await reloadTabsIfExist(domains);
    }
};

const handleCookieChanged = async (changeInfo) => {
    if (changeInfo.cookie.domain.includes('medium.com') || changeInfo.cookie.domain.includes('towardsdatascience.com')) {
        console.log({ changeInfo })
    }
};

export { handleInstalled, handleMessage, handleBrowserActionClick, handleCookieChanged };
