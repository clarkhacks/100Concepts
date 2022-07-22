const instance = ackeeTracker.create('https://ackee.weckmann.me/');
document.querySelector('#ackee_devto').addEventListener('click', () => {
    instance.action('355d6bb5-af12-498c-bd8a-38160150ea69', {
        key: 'Click',
        value: 1
    })
})
document.querySelector('#ackee_devto').addEventListener('mousover', () => {
    instance.action('355d6bb5-af12-498c-bd8a-38160150ea69', {
        key: 'Hovered',
        value: 1
    })
})