module.exports = {
    'check if page reverts back to login when not authenticated': browser => {
        browser
            .url(browser.launchUrl+'movies/')
            .waitForElementVisible('#app')
            .assert.urlContains('/login')
            .pause(500)
            .end()
    }
}