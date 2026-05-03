import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, page } = body;

    if (!name || !phone) {
      return NextResponse.json({ ok: false, error: "Name and phone are required" }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not set");
      return NextResponse.json({ ok: false, error: "Webhook not configured" }, { status: 500 });
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📞 **CALLBACK REQUEST** — Call back **${name}** at **${phone}** ASAP!`,
        embeds: [{
          title: "🔔 New Callback Request",
          color: 0x22c55e,
          fields: [
            { name: "👤 Name",     value: name,               inline: true },
            { name: "📞 Phone",    value: phone,              inline: true },
            { name: "📄 Page",     value: page || "Unknown",  inline: true },
            { name: "⏰ Time",     value: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }), inline: false },
          ],
          footer: { text: "Trini System LLC — Callback Request" },
          timestamp: new Date().toISOString(),
        }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Discord webhook error:", res.status, text);
      return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Callback API error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
