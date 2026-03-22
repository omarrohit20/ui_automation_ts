import ZapClient from 'zaproxy';

const ZAP_API_KEY = process.env.ZAP_API_KEY || '';
const ZAP_HOST = process.env.ZAP_HOST || 'localhost';
const ZAP_PORT = Number(process.env.ZAP_PORT || 8080);

export const zap = new ZapClient({
  apiKey: ZAP_API_KEY,
  proxy: `http://${ZAP_HOST}:${ZAP_PORT}`,
});

