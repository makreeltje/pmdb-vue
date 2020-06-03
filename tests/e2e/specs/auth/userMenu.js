module.exports = {
    'check items user menu': browser => {
        browser
            .url('127.0.0.1')
            .waitForElementVisible('#app')
            .assert.titleContains('pmdb-vue')
            .assert.visible('input[type=username]')
            .setValue('input[type=username]', 'user')
            .assert.visible('input[type=password]')
            .setValue('input[type=password]', 'Rsam.0255!')
            .assert.visible('button[type=submit]')
            .click('button[type=submit]')
            .assert.urlContains('/movies')
            .waitForElementVisible('.flex-item')
            .assert.visible('button[name=menu]')
            .click('button[name=menu]')
            .assert.elementCount('.v-list-item', 3)
            .pause(500)
            .end()
    }
}