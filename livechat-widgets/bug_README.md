# Bug Report

## Description
  
**Bug report** is a simple widget you can use in your website, that will be collecting information about bugs and errors your clients encounter on your website.

This widget is designed to provide users, powerful tool with simple and easy to use interface.

In addition to describing error only using text, your users can take **Screenshot** of their current screen and also **Upload** additional images.


## Preview

![Preview](https://raw.githubusercontent.com/livechat/sample-apps/master/livechat-widgets/bug_preview.png)

## Demo

You can check this widget *in action* on this site ->  [https://livechat-widgets.firebaseapp.com/](https://livechat-widgets.firebaseapp.com/)

## Instalation

If you want to use this widget on your site, all you have to do is just to include below code snippet in your `<head>` tag.

```js
window.__lc = window.__lc || {};  
window.__lc.license = your_license_id;  
(function() {  
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;  
  lc.src = "https://livechat-widgets.firebaseapp.com/bug.min.js";  
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);  
})();
```
### Note
You have to replace `your_license_id` with your actual [LiveChat license id](https://my.livechatinc.com/settings/code).

*After reloading website your widget will appear in bottom-right side of the screen ;)*


