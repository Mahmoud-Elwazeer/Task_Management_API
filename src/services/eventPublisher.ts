import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const EXCHANGE_NAME = "task_events";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

        console.log("✅ Connected to RabbitMQ");
    } catch (error) {
        console.error("❌ RabbitMQ Connection Error:", error);
    }
};

const publishMessage = async (routingKey: string, message: object) => {
    if (!channel) {
        console.error("❌ RabbitMQ channel is not initialized.");
        return;
    }

    channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });

    console.log(`📤 Published message to RabbitMQ → ${routingKey}:`, message);
};

export default publishMessage
