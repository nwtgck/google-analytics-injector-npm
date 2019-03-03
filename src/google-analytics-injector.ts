import * as cheerio from "cheerio";

function getGaHtml(trackingId: string): string {
  return (
`<!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', '${trackingId}', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->`
  );
}

export function injectedHtml(html: string, trackingId: string): string {
  const cheerioStatic = cheerio.load(html);
  const gaHtml = getGaHtml(trackingId);
  const headHtml = cheerioStatic('html > head').html();
  cheerioStatic('html > head').html(headHtml + gaHtml);

  return cheerioStatic.html();
}
