const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const { getTemperature } = require("./api");

const token = process.env.BOT_API_KEY;

if (token === undefined) {
  throw new Error("Bot token must be provided!");
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply(
    "Введите город или предоставьте ваше местоположение, а я скажу, какая там погода <3",
    Markup.keyboard([
      Markup.button.locationRequest("Поделиться местоположением"),
    ])
  );
});

bot.on(message("text"), async (ctx) => {
  return ctx.reply(await getTemperature(ctx.message.text))
});

bot.on(message("location"), async (ctx) => {
  const location = `${ctx.message.location.latitude},${ctx.message.location.longitude}`;
  return ctx.reply(await getTemperature(location))
});

bot.help((ctx) => ctx.reply("Введите город или предоставьте ваше местоположение, а я скажу, какая там погода <3"));


bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
