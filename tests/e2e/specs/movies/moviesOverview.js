module.exports = {
    'check if movies load in page': browser => {
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
            .waitForElementVisible('#app')
            .assert.elementPresent('.flex-item')
            .end()
    }
}