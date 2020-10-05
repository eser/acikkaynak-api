function enqueue(topic, message) {
    console.log('aws enqueue');
}

function dequeue(topic) {
    console.log('aws dequeue');
}

module.exports = {
    enqueue,
    dequeue,
};
