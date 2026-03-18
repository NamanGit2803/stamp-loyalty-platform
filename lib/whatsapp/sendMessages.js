export async function sendWhatsAppTemplate({ phone, templateName, variables = [] }) {

    const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;

    const body = {
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "template",
        template: {
            name: templateName,
            language: { code: "en" },
            components: [
                {
                    type: "body",
                    parameters: variables.map(v => ({
                        type: "text",
                        text: v
                    }))
                }
            ]
        }
    };

    const response = await fetch(
        `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );

    return response.json();
}