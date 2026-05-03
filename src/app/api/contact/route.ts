import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, issue, message } = body;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not set");
      return NextResponse.json({ ok: false, error: "Webhook not configured" }, { status: 500 });
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "📬 New Contact Form Submission",
          color: 0x2563eb,
          fields: [
            { name: "👤 Name",    value: name    || "Not provided", inline: true  },
            { name: "📞 Phone",   value: phone   || "Not provided", inline: true  },
            { name: "📧 Email",   value: email   || "Not provided", inline: false },
            { name: "🔧 Issue",   value: issue   || "Not selected",  inline: false },
            { name: "💬 Message", value: message || "No message",    inline: false },
          ],
          footer: { text: "Trini System LLC — Contact Form" },
          timestamp: new Date().toISOString(),
        }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Discord error:", res.status, text);
      return NextResponse.json({ ok: false, error: "Discord rejected the request" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
