import { Kafka } from "kafkajs"

const kafka = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9094"]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "order-service" });

const run = async () => {
    try {
        await producer.connect();
        await consumer.connect();
        await consumer.subscribe({
            topic: "payment-successful",
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value.toString();
                const { userId, cart } = JSON.parse(value);

                // TODO: Create order on DB
                const dummyOrderId = "12345678";

                await producer.send({
                    topic: 'order-successful',
                    messages: [{ value: JSON.stringify({ userId, orderId: dummyOrderId }) }]
                })

            }
        });
    } catch (error) {
        console.log(error);

    }
}

run();