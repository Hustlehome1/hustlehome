// SERVER ONLY — delivery content for paid orders.
// Never import this file in client components.
// Content is only revealed after Stripe payment verification.

if (typeof window !== "undefined") {
  throw new Error("lib/delivery-content.ts must never run in the browser.");
}

export const DELIVERY_CONTENT: Record<string, string> = {
  "electronics-bundle": `🔗 Electronics Supplier

Head to your verified electronics supplier:
https://www.qyintech.com/?parent_user_id=21786796&utm_source=sns_share&utm_medium=share_url

Browse their full catalog — phones, tech accessories, and more at wholesale pricing.`,

  "vinted-unban-bundle": `📱 Vinted Unban Guide

head over to vinted.com using 4g only log in on the browser once logged in click share - add to home screen NOTE do not conntect to ur home wifi we recomed using a spare phone.`,

  "receipt-bundle": `🧾 Receipt Authentication Guide

Join our private Discord for the full receipt authentication breakdown:
https://discord.gg/fneyemNQaT

Inside you'll find guides covering every major brand — how to spot fakes, what to look for, and real vs fake comparisons.`,

  "accessories-bundle": `🔧 Accessories Suppliers

BMW Wheel Caps:
https://detail.1688.com/offer/951916100648.html

PS5 Controllers:
https://weidian.com/item.html?itemID=7297527279

Google Review Cards:
https://detail.1688.com/offer/1049355436502.html`,

  "sportswear-bundle": `👟 Sportswear Supplier

Nike Miler Tracksuit:
https://detail.1688.com/offer/989124718618.html`,

  "shoes-bundle": `👟 Shoes Supplier

Browse the full shoe catalog here:
https://k.youshop10.com/fkD32W8y

They stock Asics, Nike, On Cloud, Saucony — all the hot sellers.

HOW TO ORDER:
1. Sign up for Superbuy (500¥ worth of coupons): https://m.superbuy.com/en/register/index?partnercode=EV6bVu
2. Find a shoe you like on the k.shop link above
3. Copy the product link (it will have "weidian" or "taobao" in it)
4. Paste it into Superbuy — it auto-detects the link
5. Order through Superbuy

NOTE: Once purchased, it ships to the Superbuy warehouse first, then you ship it to yourself.`,

  "all-in-one-bundle": `🏆 ALL IN ONE BUNDLE — Full Vendor List

━━━ FREE SUPPLIER ━━━
https://www.qyintech.com/?parent_user_id=21786796&utm_source=sns_share&utm_medium=share_url

━━━ PERFORMANCE SHOES ━━━
https://k.youshop10.com/fkD32W8y
They have all shoes — Asics, Nike, On Cloud, Saucony (all hot sellers)

HOW TO ORDER SHOES:
1. Sign up for Superbuy (500¥ coupons): https://m.superbuy.com/en/register/index?partnercode=EV6bVu
2. Find a shoe on the k.shop link
3. Copy the product link (weidian or taobao URL)
4. Paste into Superbuy — auto-detects
5. Order through Superbuy
NOTE: Ships to warehouse first, then to you.

━━━ ACCESSORIES ━━━
Phone Cases: https://www.qyintech.com/?parent_user_id=21786796&utm_source=sns_share&utm_medium=share_url
Superclone Rolex: https://geektime.io/
BMW Caps: https://detail.1688.com/offer/951916100648.html
PS5 Controller: https://weidian.com/item.html?itemID=7297527279
Stanley Cup GiftBox: https://detail.1688.com/offer/1060024756966.html
Venum Boxing Gloves: https://detail.1688.com/offer/643603787551.html
Dunlop Rackets: https://item.taobao.com/item.htm?id=728615690943
Google Review Cards: https://detail.1688.com/offer/1049355436502.html
Wahl Trimmer: https://item.taobao.com/item.htm?id=727292511288

━━━ SPORTSWEAR ━━━
Nike Miler Tracksuit: https://detail.1688.com/offer/989124718618.html
Asics Short Set: https://detail.1688.com/offer/1058393186318.html
Nike Miler Set: https://detail.1688.com/offer/979472327241.html
Tech Windbreakers: https://detail.1688.com/offer/1000060604678.html
On Running Tracksuit: https://detail.1688.com/offer/985838045950.html
Alo Tracksuit: https://item.taobao.com/item.htm?id=1028280857402
Nike Miller: https://weidian.com/item.html?itemID=7514922983
Nike Miller Tees: https://detail.1688.com/offer/963316228004.html
Alo Yoga Quarter Tracksuit: https://weidian.com/item.html?itemID=7831114034
Under Armour Tees: https://detail.1688.com/offer/941014122386.html

━━━ RANDOM GEMS ━━━
Dior Sauvage: https://weidian.com/item.html?itemID=5163056193
Tom Ford: https://weidian.com/item.html?itemID=6410998596
LV Imagination: https://weidian.com/item.html?itemID=7300619255
Mercedes Roof Spoiler: https://detail.1688.com/offer/826427770061.html
Mercedes Umbrella: https://item.taobao.com/item.htm?id=604322118078
Mercedes AMG Steering Wheel: https://item.taobao.com/item.htm?id=751975277186
BMW Steering Wheel: https://detail.1688.com/offer/913174340914.html
BMW Badges: https://detail.1688.com/offer/786214977371.html
BMW Aroma Therapy: https://detail.1688.com/offer/743795310778.html
BMW Gear Knob: https://detail.1688.com/offer/798656665382.html
Apple CarPlay: https://detail.1688.com/offer/795870312637.html`,
};
