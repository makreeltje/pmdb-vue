module.exports = {
    'check if movie information shows up': browser => {
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
            .waitForElementVisible('.flex-item')
            .assert.elementPresent('a[href="/movies/488"]')
            .click('a[href="/movies/488"]')
            .waitForElementVisible('#app')
            .assert.visible('.v-parallax__content')
            .assert.containsText('h2', 'Overview')
            .pause(500)
            .end()
    }
}