module.exports = {
    'check if page reverts back to login when not authenticated': browser => {
        browser
            .url('127.0.0.1'+'movies/')
            .waitForElementVisible('#app')
            .assert.urlContains('/login')
            .pause(500)
            .end()
    }
}