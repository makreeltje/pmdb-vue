module.exports = {
    'check items admin menu': browser => {
        browser
            .init()
            .waitForElementVisible('#app')
            .assert.titleContains('pmdb-vue')
            .assert.visible('input[type=username]')
            .setValue('input[type=username]', 'admin')
            .assert.visible('input[type=password]')
            .setValue('input[type=password]', 'Rsam.0255!')
            .assert.visible('button[type=submit]')
            .click('button[type=submit]')
            .assert.urlContains('/movies')
            .waitForElementVisible('.flex-item')
            .assert.visible('button[type=button]')
            .click('button[type=button]')
            .assert.elementCount('.v-list-item', 5)
            .pause(500)
            .end()
    }
}