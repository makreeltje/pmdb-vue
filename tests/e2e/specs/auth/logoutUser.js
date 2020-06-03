module.exports = {
    'logout user': browser => {
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
            .assert.visible('button[name=logout]')
            .click('button[name=logout]')
            .assert.urlContains('/login')
            .pause(500)
            .end()
    }
}