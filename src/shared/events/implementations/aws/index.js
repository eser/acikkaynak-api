function enqueue(topic, payload) {
    console.log(`aws enqueue: ${topic} ${JSON.stringify(payload, null, 4)}`);
}

function dequeue(topic) {
    console.log(`aws dequeue: ${topic}`);
}

module.exports = {
    enqueue,
    dequeue,
};
