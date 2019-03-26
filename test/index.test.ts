import * as assert from "power-assert";
import { injectedHtml } from "../src/google-analytics-injector";


describe('injectedHtml', () => {
  it('should inject tracking ID into HTML', () => {
    const html1 =
`<!-- myfile.html -->
<body>
  <h1>My File</h1>
</body>`;

const expect = 
`<!-- myfile.html --><html><head><!-- Google Analytics -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics --></head><body>
  <h1>My File</h1>
</body></html>`;

    assert.strictEqual(injectedHtml(html1, "UA-XXXXX-Y"), expect);
  });
});
