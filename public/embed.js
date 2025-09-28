(function() {
  const widgetUrl = 'https://your-domain.vercel.app/widget';

  const iframe = document.createElement('iframe');
  iframe.src = widgetUrl;
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';

  const container = document.getElementById('gpt-magnet-widget');
  if (container) {
    container.appendChild(iframe);
  }
})();