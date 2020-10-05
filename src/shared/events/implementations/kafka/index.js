function enqueue(topic, message) {
    console.log('kafka enqueue');
}

function dequeue(topic) {
    console.log('kafka dequeue');
}

module.exports = {
    enqueue,
    dequeue,
};
