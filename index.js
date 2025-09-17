const fetch = require("node-fetch");
const db = require("./firebase-config");
const express = require("express");
const app = express();

// 🔑 Telegram token va chat_id
const TELEGRAM_TOKEN = "8337711727:AAEMGO_tAWp78iYTc1in-6uQqf4YDawxdbQ";
const CHAT_ID = "6533899767";

// 📩 Xabar yuborish funksiyasi
async function sendMessage(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML"
      })
    });
  } catch (err) {
    console.error("❌ Xabar yuborishda xato:", err.message);
  }
}

// 🎂 Tug‘ilgan kun tekshirish va eslatma qo‘yish
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

      // 🎯 2 kun oldin → 2 marta (har 3 soatda)
      if (bd === twoDaysStr) {
        for (let i = 0; i < 2; i++) {
          setTimeout(() => {
            sendMessage(
              `⏰ 2 kundan keyin <b>${user.firstname} ${user.lastname}</b> ning tug‘ilgan kuni bo‘ladi!`
            );
          }, i * 3 * 60 * 60 * 1000);
        }
      }

      // 🎯 Tug‘ilgan kuni → 5 marta (har 2 soatda)
      if (bd === todayStr) {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            sendMessage(
              `🎉 Bugun <b>${user.firstname} ${user.lastname}</b> ning tug‘ilgan kuni!`
            );
          }, i * 2 * 60 * 60 * 1000);
        }
      }
    });
  });
}

// ⏱ Har kuni 1 marta tekshiradi (86400000 ms = 1 kun)
setInterval(checkBirthdays, 24 * 60 * 60 * 1000);

// 🚀 Dastur ishga tushganda ham darhol tekshiradi
checkBirthdays();

console.log("🤖 Birthday bot ishlayapti...");

// 🌐 Express server (Render uxlamasligi uchun)
app.get("/", (req, res) => {
  res.send("Bot tirik ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Web server ${PORT}-portda ishlayapti...`));
