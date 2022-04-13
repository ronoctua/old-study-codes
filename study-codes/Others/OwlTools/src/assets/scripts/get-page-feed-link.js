var feedLinksFound = false;

void (d = document);
void (el = d.getElementsByTagName('link'));

for (i = 0; i < el.length; i++) {
  if (
    el[i].getAttribute('rel').indexOf('alternate') != -1 &&
    (el[i].getAttribute('type').indexOf('application/rss+xml') != -1 ||
      el[i].getAttribute('type').indexOf('text/xml') != -1)
  ) {
    void prompt('Feed link found:', el[i].getAttribute('href'));
    feedLinksFound = true;
  }
}

if (feedLinksFound === false) {
  alert('No feed links were found on this page.');
}
