# google-analytics-injector
[![CircleCI](https://circleci.com/gh/nwtgck/google-analytics-injector-npm.svg?style=shield)](https://circleci.com/gh/nwtgck/google-analytics-injector-npm)

Inject Google Analytics Tracking Snippet

## Installation

Install `google-analytics-injector` command as follows.

```bash
npm i -g google-analytics-injector
```

## Usage

Suppose your have `myfile.html` as follows.

```html
<!-- myfile.html -->
<body>
  <h1>My File</h1>
</body>
```

Type the following command to inject tracking ID, `"UA-XXXXX-Y"` to `myfile.html`.

```bash
google-analytics-injector -t UA-XXXXX-Y myfile.html
```

Then, you have injected `myfile.html` as follows.

```html
<!-- myfile.html --><html><head><!-- Google Analytics -->
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
</body></html>
```

### Inject recursively

Suupose `mydist` is a directory which contains .html files. The files injected recursively. 

```bash
google-analytics-injector -t UA-XXXXX-Y ./mydist/
```
