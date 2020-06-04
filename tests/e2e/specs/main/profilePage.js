module.exports = {
    'show profile page': browser => {
        browser
            .init()
            .waitForElementVisible('#app')
            .assert.titleContains('pmdb-vue')
            .assert.visible('input[type=username]')
            .setValue('input[type=username]', 'user')
            .assert.visible('input[type=password]')
            .setValue('input[type=password]', 'Rsam.0255!')
            .assert.visible('button[type=submit]')
            .click('button[type=submit]')
            .assert.urlContains('/movies')
            .assert.visible('button[name=profile]')
            .click('button[name=profile]')
            .assert.urlContains('/profile')
            .pause(500)
            .end()
    }
}