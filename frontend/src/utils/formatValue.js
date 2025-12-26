export function formatValue(value, format) {
  if (value === null || value === undefined || value === '') return 'N/A';

  const num = Number(value);
  if (isNaN(num)) return String(value);

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(num);
    case 'percentage':
      return `${(num * 100).toFixed(2)}%`;
    case 'number':
      return new Intl.NumberFormat('en-US').format(num);
    default:
      return String(value);
  }
}