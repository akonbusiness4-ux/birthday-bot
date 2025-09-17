const fetch = require("node-fetch");
const db = require("./firebase-config"); // Firebase ulash

// 🔑 Telegram token va chat_id
const TELEGRAM_TOKEN = "8337711727:AAEMGO_tAWp78iYTc1in-6uQqf4YDawxdbQ";
const CHAT_ID = "6533899767"; // sizni user id

// 📩 Xabar yuborish funksiyasi
async function sendMessage(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: "HTML" })
  });
}

// 🎂 Tug‘ilgan kun tekshirish
function checkBirthdays() {
  const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 2);

  const todayStr = today.toISOString().slice(5, 10);
  const twoDaysStr = twoDaysLater.toISOString().slice(5, 10);

  db.ref("users").once("value", snapshot => {
    const users = snapshot.val() || {};
    Object.values(users).forEach(user => {
      if (!user.birthday) return;
      const bd = user.birthday.slice(5, 10);

      if (bd === todayStr) {
        sendMessage(`🎉 Bugun <b>${user.firstname} ${user.lastname}</b> ning tug‘ilgan kuni!`);
      } else if (bd === twoDaysStr) {
        sendMessage(`⏰ 2 kundan keyin <b>${user.firstname} ${user.lastname}</b> ning tug‘ilgan kuni bo‘ladi!`);
      }
    });
  });
}

// ⏱ Har 30 sekundda tekshiradi
setInterval(checkBirthdays, 30000);
console.log("🤖 Birthday bot ishlayapti...");
