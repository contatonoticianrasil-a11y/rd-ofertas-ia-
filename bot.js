import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import cron from 'node-cron';
import { buscarProdutos } from './produtos.js';

const GRUPO = 'SEU_GRUPO@g.us';

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');

  const sock = makeWASocket({ auth: state });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ qr, connection }) => {
    if (qr) {
      console.clear();
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'open') {
      console.log('WhatsApp conectado!');
    }
  });

  cron.schedule('*/20 * * * *', async () => {
    const produtos = await buscarProdutos();

    for (const p of produtos) {
      const msg = `🔥 OFERTA RELÂMPAGO\\n\\n📦 ${p.titulo}\\n💰 R$ ${p.preco}\\n\\n🛒 ${p.link}\\n\\n🤖 RD Ofertas IA`;

      await sock.sendMessage(GRUPO, { text: msg });

      await new Promise(r => setTimeout(r, 30000));
    }
  });
}

start();
