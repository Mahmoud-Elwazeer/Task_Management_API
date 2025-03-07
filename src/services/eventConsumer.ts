import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const EXCHANGE_NAME = "task_events";
const QUEUE_NAME = "task_created_queue";
const ROUTING_KEY = "task.created";

const consumeMessages = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

        const q = await channel.assertQueue(QUEUE_NAME, { durable: true });
        await channel.bindQueue(q.queue, EXCHANGE_NAME, ROUTING_KEY);

        console.log(`✅ Waiting for messages in queue: ${q.queue}`);

        channel.consume(q.queue, (msg) => {
            if (msg) {
                const message = JSON.parse(msg.content.toString());
                console.log(`📩 Received:`, message);

                channel.ack(msg); // Acknowledge message
            }
        });
    } catch (error) {
        console.error("❌ RabbitMQ Consumer Error:", error);
    }
};

consumeMessages();
