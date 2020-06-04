module.exports = {
    'check if page reverts back to login when not authenticated': browser => {
        browser
            .url('localhost:8080')
            .waitForElementVisible('#app')
            .assert.urlContains('/login')
            .pause(500)
            .end()
    }
}