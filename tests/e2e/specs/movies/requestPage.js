module.exports = {
    'check if request page loads properly': browser => {
        browser
            .url('localhost:8080')
            .waitForElementVisible('#app')
            .assert.titleContains('pmdb-vue')
            .assert.visible('input[type=username]')
            .setValue('input[type=username]', 'admin')
            .assert.visible('input[type=password]')
            .setValue('input[type=password]', 'Rsam.0255!')
            .assert.visible('button[type=submit]')
            .click('button[type=submit]')
            .waitForElementVisible('.flex-item')
            .assert.visible('button[name=menu]')
            .click('button[name=menu]')
            .pause(500)
            .assert.elementPresent('a[href="/request"]')
            .click('a[href="/request"]')
            .waitForElementVisible('#app')
            .assert.containsText('.v-toolbar__title', 'Request')
            .assert.elementCount('.row .mb-6', 10)
            .pause(500)
            .end()
    }
}