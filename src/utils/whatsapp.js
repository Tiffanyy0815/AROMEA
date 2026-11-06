import { SITE } from '../data/site.js';
import { formatPrice } from './format.js';

export function buildOrderUrl({ lines, total, paymentMethod, user }) {
  const items = lines
    .map((l, i) => `${i + 1}. ${l.product.nombre} x${l.qty} - ${formatPrice(l.product.precio * l.qty)}`)
    .join('\n');

  const parts = [
    '¡Hola! Quisiera realizar el siguiente pedido en AROMÉA:',
    '',
    items,
    '',
    `Total: ${formatPrice(total)}`,
    `Método de Pago: ${paymentMethod}`,
  ];
  if (user) parts.push(`Cliente: ${user.nombre} (${user.email})`);

  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(parts.join('\n'))}`;
}
