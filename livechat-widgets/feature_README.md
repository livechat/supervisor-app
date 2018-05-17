# Feature Request

## Description
  
**Feature request** is a simple widget you can use in your website, that will be collecting information from your clients about new features they would like to see. 

This widget is designed to be simple and powerful at the same time.

There is option **'Sketch your idea'** that will allow your clients to draw what they have in mind for extra description of their feature request.

## Preview

![Preview](https://raw.githubusercontent.com/livechat/sample-apps/master/livechat-widgets/feature_preview.png)

## Demo

You can check this widget *in action* on this site ->  [https://livechat-widgets.firebaseapp.com/](https://livechat-widgets.firebaseapp.com/)

## Instalation

If you want to use this widget on your site, all you have to do is just to include below code snippet in your `<head>` tag.

```js
window.__lc = window.__lc || {};  
window.__lc.license = your_license_id;  
(function() {  
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;  
  lc.src = "https://livechat-widgets.firebaseapp.com/feature.min.js";  
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);  
})();
```
### Note
You have to replace `your_license_id` with your actual [LiveChat license id](https://my.livechatinc.com/settings/code).

*After reloading website your widget will appear in bottom-right side of the screen ;)*


