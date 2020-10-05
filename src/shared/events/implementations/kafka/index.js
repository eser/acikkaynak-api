function enqueue(topic, payload) {
    console.log(`kafka enqueue: ${topic} ${JSON.stringify(payload, null, 4)}`);
}

function dequeue(topic) {
    console.log(`kafka dequeue: ${topic}`);
}

module.exports = {
    enqueue,
    dequeue,
};
