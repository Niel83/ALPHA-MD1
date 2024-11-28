const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0grejVERTE4YWtqTGtCcTlrL0FyaHNpUzljN0xSbWlZZmJva052ZHMzZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0dIY2NEYkpidEtIYzJXNUh4OW1ZakxKajhTTVlRaDE3bTI3aVcwcTdnVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSW5lV0ZSNDVOY2tGV3BpZzFFUVA4aTV5czgvMXJjSUNQbUpwMHBwY1YwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzZEcwSm1lUUlxSDVaRkhBcjNCTVA4cWJTN3J1WVk4NlVXZUZCbGo3bjJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9CdUhNbUtWc0lEZkJVd3JLT0RDK2VSZzJBemdnMnNQQTYveE9QcUVrWDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndTQ1dFVk9MUkErTUs2VklieEgwODVuR2NXVmY0UUF1SStZRzByNzZKQzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0hwK01FY0NhZW5OZy95bnJpU09tdlhoMmI1eUJZYlVaRHZIM1FEV0ttOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzI1VnFJd0dKN3JsSnpJVDlCZXBzcjFLL0lDQlIreTBjR3dTLytGZ1dTcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpxUE8vUlBIM1gra2tyMi8xNkZWckt4V1JodTJEVHlMVWNrWmoyaGRQMVM4OFhmc2xuM3pOZG1LME9FRWd2R2hML09BVzg3LzVQb3FvMGFaT1MvZWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMyLCJhZHZTZWNyZXRLZXkiOiJnT1BrTmtZUjFWYXoveHlTNElDb0g4OExFSTdDUXUwT1ZxdUJ6aS9RS3ZJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2anJwQnJzUlFFQ3lHemJqMi1MQ2VnIiwicGhvbmVJZCI6IjA0NWI4YzM5LTdhNDMtNGVmMC05YWIzLTU4YWI5MjU2M2MyOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEa0xBeWdTZlFDVGcyQTg1RGNVdlRYMFV5c3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUU5TlZ4V1YxNU4wdk5idlVkTFBTQ2JPYWY0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkwxNVpFRzJYIiwibWUiOnsiaWQiOiIyNTQ3MjkyNzcxNzM6N0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJkYW5uaWUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lqbWhia0NFT2lHb0xvR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InFYK01zTlBlNFhyTFYzY3ZiaGh1VSt6Q3BsNThFN1FNRFZCQ1dvem1UaHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im44cWhxTDRXRVJzbGMvaFRZWE00Wi94dENlRElRSDNqZ09sUXNSK1lUeEFHcGhmUzRhOGxUeHB6c2VtdGcwQUs5NWhrMVh3TnV1VzRMUXNTdEVoYkJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsQWVxM3d6V0pKR0ZDSmRBQlBJSlRQRE5KR0RsaTZXdE5rRGxObGErZlphNmNibEpPREsrWGZ0T2ZtL1V2WWpoZFVjY0VTdzgyWjZXMHErVm96Nm9pdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcyOTI3NzE3Mzo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFsL2pMRFQzdUY2eTFkM0wyNFlibFBzd3FaZWZCTzBEQTFRUWxxTTVrNGMifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzI3NzI3MjZ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "Keith",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254748387615",  
    ANTILINK : process.env.ANTILINK || "yes",
    ANTI_VV : process.env.ANTI_VV || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "yes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    CAPTION : process.env.CAPTION || "ALPHA-MD",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
