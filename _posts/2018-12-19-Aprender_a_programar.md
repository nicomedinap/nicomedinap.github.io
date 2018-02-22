---
layout: post
mathjax: true
comments: true
title:  "Prueba 100000"
---
{% include mathjax.html %}

<!DOCTYPE html>
<html>
<head><meta charset="utf-8" />
<title>Aprender_a_programar</title><script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

<style type="text/css">
    /*!
*
* Twitter Bootstrap
*
*/
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden],
template {
  display: none;
}
a {
  background-color: transparent;
}
a:active,
a:hover {
  outline: 0;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: bold;
}
dfn {
  font-style: italic;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
mark {
  background: #ff0;
  color: #000;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 1em 40px;
}
hr {
  box-sizing: content-box;
  height: 0;
}
pre {
  overflow: auto;
}
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}
button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: textfield;
  box-sizing: content-box;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
legend {
  border: 0;
  padding: 0;
}
textarea {
  overflow: auto;
}
optgroup {
  font-weight: bold;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
}
/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */
@media print {
  *,
  *:before,
  *:after {
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  a,
  a:visited {
    text-decoration: underline;
  }
  a[href]:after {
    content: " (" attr(href) ")";
  }
  abbr[title]:after {
    content: " (" attr(title) ")";
  }
  a[href^="#"]:after,
  a[href^="javascript:"]:after {
    content: "";
  }
  pre,
  blockquote {
    border: 1px solid #999;
    page-break-inside: avoid;
  }
  thead {
    display: table-header-group;
  }
  tr,
  img {
    page-break-inside: avoid;
  }
  img {
    max-width: 100% !important;
  }
  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3;
  }
  h2,
  h3 {
    page-break-after: avoid;
  }
  .navbar {
    display: none;
  }
  .btn > .caret,
  .dropup > .btn > .caret {
    border-top-color: #000 !important;
  }
  .label {
    border: 1px solid #000;
  }
  .table {
    border-collapse: collapse !important;
  }
  .table td,
  .table th {
    background-color: #fff !important;
  }
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #ddd !important;
  }
}
@font-face {
  font-family: 'Glyphicons Halflings';
  src: url('../components/bootstrap/fonts/glyphicons-halflings-regular.eot');
  src: url('../components/bootstrap/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.woff') format('woff'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
}
.glyphicon {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: 'Glyphicons Halflings';
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.glyphicon-asterisk:before {
  content: "\002a";
}
.glyphicon-plus:before {
  content: "\002b";
}
.glyphicon-euro:before,
.glyphicon-eur:before {
  content: "\20ac";
}
.glyphicon-minus:before {
  content: "\2212";
}
.glyphicon-cloud:before {
  content: "\2601";
}
.glyphicon-envelope:before {
  content: "\2709";
}
.glyphicon-pencil:before {
  content: "\270f";
}
.glyphicon-glass:before {
  content: "\e001";
}
.glyphicon-music:before {
  content: "\e002";
}
.glyphicon-search:before {
  content: "\e003";
}
.glyphicon-heart:before {
  content: "\e005";
}
.glyphicon-star:before {
  content: "\e006";
}
.glyphicon-star-empty:before {
  content: "\e007";
}
.glyphicon-user:before {
  content: "\e008";
}
.glyphicon-film:before {
  content: "\e009";
}
.glyphicon-th-large:before {
  content: "\e010";
}
.glyphicon-th:before {
  content: "\e011";
}
.glyphicon-th-list:before {
  content: "\e012";
}
.glyphicon-ok:before {
  content: "\e013";
}
.glyphicon-remove:before {
  content: "\e014";
}
.glyphicon-zoom-in:before {
  content: "\e015";
}
.glyphicon-zoom-out:before {
  content: "\e016";
}
.glyphicon-off:before {
  content: "\e017";
}
.glyphicon-signal:before {
  content: "\e018";
}
.glyphicon-cog:before {
  content: "\e019";
}
.glyphicon-trash:before {
  content: "\e020";
}
.glyphicon-home:before {
  content: "\e021";
}
.glyphicon-file:before {
  content: "\e022";
}
.glyphicon-time:before {
  content: "\e023";
}
.glyphicon-road:before {
  content: "\e024";
}
.glyphicon-download-alt:before {
  content: "\e025";
}
.glyphicon-download:before {
  content: "\e026";
}
.glyphicon-upload:before {
  content: "\e027";
}
.glyphicon-inbox:before {
  content: "\e028";
}
.glyphicon-play-circle:before {
  content: "\e029";
}
.glyphicon-repeat:before {
  content: "\e030";
}
.glyphicon-refresh:before {
  content: "\e031";
}
.glyphicon-list-alt:before {
  content: "\e032";
}
.glyphicon-lock:before {
  content: "\e033";
}
.glyphicon-flag:before {
  content: "\e034";
}
.glyphicon-headphones:before {
  content: "\e035";
}
.glyphicon-volume-off:before {
  content: "\e036";
}
.glyphicon-volume-down:before {
  content: "\e037";
}
.glyphicon-volume-up:before {
  content: "\e038";
}
.glyphicon-qrcode:before {
  content: "\e039";
}
.glyphicon-barcode:before {
  content: "\e040";
}
.glyphicon-tag:before {
  content: "\e041";
}
.glyphicon-tags:before {
  content: "\e042";
}
.glyphicon-book:before {
  content: "\e043";
}
.glyphicon-bookmark:before {
  content: "\e044";
}
.glyphicon-print:before {
  content: "\e045";
}
.glyphicon-camera:before {
  content: "\e046";
}
.glyphicon-font:before {
  content: "\e047";
}
.glyphicon-bold:before {
  content: "\e048";
}
.glyphicon-italic:before {
  content: "\e049";
}
.glyphicon-text-height:before {
  content: "\e050";
}
.glyphicon-text-width:before {
  content: "\e051";
}
.glyphicon-align-left:before {
  content: "\e052";
}
.glyphicon-align-center:before {
  content: "\e053";
}
.glyphicon-align-right:before {
  content: "\e054";
}
.glyphicon-align-justify:before {
  content: "\e055";
}
.glyphicon-list:before {
  content: "\e056";
}
.glyphicon-indent-left:before {
  content: "\e057";
}
.glyphicon-indent-right:before {
  content: "\e058";
}
.glyphicon-facetime-video:before {
  content: "\e059";
}
.glyphicon-picture:before {
  content: "\e060";
}
.glyphicon-map-marker:before {
  content: "\e062";
}
.glyphicon-adjust:before {
  content: "\e063";
}
.glyphicon-tint:before {
  content: "\e064";
}
.glyphicon-edit:before {
  content: "\e065";
}
.glyphicon-share:before {
  content: "\e066";
}
.glyphicon-check:before {
  content: "\e067";
}
.glyphicon-move:before {
  content: "\e068";
}
.glyphicon-step-backward:before {
  content: "\e069";
}
.glyphicon-fast-backward:before {
  content: "\e070";
}
.glyphicon-backward:before {
  content: "\e071";
}
.glyphicon-play:before {
  content: "\e072";
}
.glyphicon-pause:before {
  content: "\e073";
}
.glyphicon-stop:before {
  content: "\e074";
}
.glyphicon-forward:before {
  content: "\e075";
}
.glyphicon-fast-forward:before {
  content: "\e076";
}
.glyphicon-step-forward:before {
  content: "\e077";
}
.glyphicon-eject:before {
  content: "\e078";
}
.glyphicon-chevron-left:before {
  content: "\e079";
}
.glyphicon-chevron-right:before {
  content: "\e080";
}
.glyphicon-plus-sign:before {
  content: "\e081";
}
.glyphicon-minus-sign:before {
  content: "\e082";
}
.glyphicon-remove-sign:before {
  content: "\e083";
}
.glyphicon-ok-sign:before {
  content: "\e084";
}
.glyphicon-question-sign:before {
  content: "\e085";
}
.glyphicon-info-sign:before {
  content: "\e086";
}
.glyphicon-screenshot:before {
  content: "\e087";
}
.glyphicon-remove-circle:before {
  content: "\e088";
}
.glyphicon-ok-circle:before {
  content: "\e089";
}
.glyphicon-ban-circle:before {
  content: "\e090";
}
.glyphicon-arrow-left:before {
  content: "\e091";
}
.glyphicon-arrow-right:before {
  content: "\e092";
}
.glyphicon-arrow-up:before {
  content: "\e093";
}
.glyphicon-arrow-down:before {
  content: "\e094";
}
.glyphicon-share-alt:before {
  content: "\e095";
}
.glyphicon-resize-full:before {
  content: "\e096";
}
.glyphicon-resize-small:before {
  content: "\e097";
}
.glyphicon-exclamation-sign:before {
  content: "\e101";
}
.glyphicon-gift:before {
  content: "\e102";
}
.glyphicon-leaf:before {
  content: "\e103";
}
.glyphicon-fire:before {
  content: "\e104";
}
.glyphicon-eye-open:before {
  content: "\e105";
}
.glyphicon-eye-close:before {
  content: "\e106";
}
.glyphicon-warning-sign:before {
  content: "\e107";
}
.glyphicon-plane:before {
  content: "\e108";
}
.glyphicon-calendar:before {
  content: "\e109";
}
.glyphicon-random:before {
  content: "\e110";
}
.glyphicon-comment:before {
  content: "\e111";
}
.glyphicon-magnet:before {
  content: "\e112";
}
.glyphicon-chevron-up:before {
  content: "\e113";
}
.glyphicon-chevron-down:before {
  content: "\e114";
}
.glyphicon-retweet:before {
  content: "\e115";
}
.glyphicon-shopping-cart:before {
  content: "\e116";
}
.glyphicon-folder-close:before {
  content: "\e117";
}
.glyphicon-folder-open:before {
  content: "\e118";
}
.glyphicon-resize-vertical:before {
  content: "\e119";
}
.glyphicon-resize-horizontal:before {
  content: "\e120";
}
.glyphicon-hdd:before {
  content: "\e121";
}
.glyphicon-bullhorn:before {
  content: "\e122";
}
.glyphicon-bell:before {
  content: "\e123";
}
.glyphicon-certificate:before {
  content: "\e124";
}
.glyphicon-thumbs-up:before {
  content: "\e125";
}
.glyphicon-thumbs-down:before {
  content: "\e126";
}
.glyphicon-hand-right:before {
  content: "\e127";
}
.glyphicon-hand-left:before {
  content: "\e128";
}
.glyphicon-hand-up:before {
  content: "\e129";
}
.glyphicon-hand-down:before {
  content: "\e130";
}
.glyphicon-circle-arrow-right:before {
  content: "\e131";
}
.glyphicon-circle-arrow-left:before {
  content: "\e132";
}
.glyphicon-circle-arrow-up:before {
  content: "\e133";
}
.glyphicon-circle-arrow-down:before {
  content: "\e134";
}
.glyphicon-globe:before {
  content: "\e135";
}
.glyphicon-wrench:before {
  content: "\e136";
}
.glyphicon-tasks:before {
  content: "\e137";
}
.glyphicon-filter:before {
  content: "\e138";
}
.glyphicon-briefcase:before {
  content: "\e139";
}
.glyphicon-fullscreen:before {
  content: "\e140";
}
.glyphicon-dashboard:before {
  content: "\e141";
}
.glyphicon-paperclip:before {
  content: "\e142";
}
.glyphicon-heart-empty:before {
  content: "\e143";
}
.glyphicon-link:before {
  content: "\e144";
}
.glyphicon-phone:before {
  content: "\e145";
}
.glyphicon-pushpin:before {
  content: "\e146";
}
.glyphicon-usd:before {
  content: "\e148";
}
.glyphicon-gbp:before {
  content: "\e149";
}
.glyphicon-sort:before {
  content: "\e150";
}
.glyphicon-sort-by-alphabet:before {
  content: "\e151";
}
.glyphicon-sort-by-alphabet-alt:before {
  content: "\e152";
}
.glyphicon-sort-by-order:before {
  content: "\e153";
}
.glyphicon-sort-by-order-alt:before {
  content: "\e154";
}
.glyphicon-sort-by-attributes:before {
  content: "\e155";
}
.glyphicon-sort-by-attributes-alt:before {
  content: "\e156";
}
.glyphicon-unchecked:before {
  content: "\e157";
}
.glyphicon-expand:before {
  content: "\e158";
}
.glyphicon-collapse-down:before {
  content: "\e159";
}
.glyphicon-collapse-up:before {
  content: "\e160";
}
.glyphicon-log-in:before {
  content: "\e161";
}
.glyphicon-flash:before {
  content: "\e162";
}
.glyphicon-log-out:before {
  content: "\e163";
}
.glyphicon-new-window:before {
  content: "\e164";
}
.glyphicon-record:before {
  content: "\e165";
}
.glyphicon-save:before {
  content: "\e166";
}
.glyphicon-open:before {
  content: "\e167";
}
.glyphicon-saved:before {
  content: "\e168";
}
.glyphicon-import:before {
  content: "\e169";
}
.glyphicon-export:before {
  content: "\e170";
}
.glyphicon-send:before {
  content: "\e171";
}
.glyphicon-floppy-disk:before {
  content: "\e172";
}
.glyphicon-floppy-saved:before {
  content: "\e173";
}
.glyphicon-floppy-remove:before {
  content: "\e174";
}
.glyphicon-floppy-save:before {
  content: "\e175";
}
.glyphicon-floppy-open:before {
  content: "\e176";
}
.glyphicon-credit-card:before {
  content: "\e177";
}
.glyphicon-transfer:before {
  content: "\e178";
}
.glyphicon-cutlery:before {
  content: "\e179";
}
.glyphicon-header:before {
  content: "\e180";
}
.glyphicon-compressed:before {
  content: "\e181";
}
.glyphicon-earphone:before {
  content: "\e182";
}
.glyphicon-phone-alt:before {
  content: "\e183";
}
.glyphicon-tower:before {
  content: "\e184";
}
.glyphicon-stats:before {
  content: "\e185";
}
.glyphicon-sd-video:before {
  content: "\e186";
}
.glyphicon-hd-video:before {
  content: "\e187";
}
.glyphicon-subtitles:before {
  content: "\e188";
}
.glyphicon-sound-stereo:before {
  content: "\e189";
}
.glyphicon-sound-dolby:before {
  content: "\e190";
}
.glyphicon-sound-5-1:before {
  content: "\e191";
}
.glyphicon-sound-6-1:before {
  content: "\e192";
}
.glyphicon-sound-7-1:before {
  content: "\e193";
}
.glyphicon-copyright-mark:before {
  content: "\e194";
}
.glyphicon-registration-mark:before {
  content: "\e195";
}
.glyphicon-cloud-download:before {
  content: "\e197";
}
.glyphicon-cloud-upload:before {
  content: "\e198";
}
.glyphicon-tree-conifer:before {
  content: "\e199";
}
.glyphicon-tree-deciduous:before {
  content: "\e200";
}
.glyphicon-cd:before {
  content: "\e201";
}
.glyphicon-save-file:before {
  content: "\e202";
}
.glyphicon-open-file:before {
  content: "\e203";
}
.glyphicon-level-up:before {
  content: "\e204";
}
.glyphicon-copy:before {
  content: "\e205";
}
.glyphicon-paste:before {
  content: "\e206";
}
.glyphicon-alert:before {
  content: "\e209";
}
.glyphicon-equalizer:before {
  content: "\e210";
}
.glyphicon-king:before {
  content: "\e211";
}
.glyphicon-queen:before {
  content: "\e212";
}
.glyphicon-pawn:before {
  content: "\e213";
}
.glyphicon-bishop:before {
  content: "\e214";
}
.glyphicon-knight:before {
  content: "\e215";
}
.glyphicon-baby-formula:before {
  content: "\e216";
}
.glyphicon-tent:before {
  content: "\26fa";
}
.glyphicon-blackboard:before {
  content: "\e218";
}
.glyphicon-bed:before {
  content: "\e219";
}
.glyphicon-apple:before {
  content: "\f8ff";
}
.glyphicon-erase:before {
  content: "\e221";
}
.glyphicon-hourglass:before {
  content: "\231b";
}
.glyphicon-lamp:before {
  content: "\e223";
}
.glyphicon-duplicate:before {
  content: "\e224";
}
.glyphicon-piggy-bank:before {
  content: "\e225";
}
.glyphicon-scissors:before {
  content: "\e226";
}
.glyphicon-bitcoin:before {
  content: "\e227";
}
.glyphicon-btc:before {
  content: "\e227";
}
.glyphicon-xbt:before {
  content: "\e227";
}
.glyphicon-yen:before {
  content: "\00a5";
}
.glyphicon-jpy:before {
  content: "\00a5";
}
.glyphicon-ruble:before {
  content: "\20bd";
}
.glyphicon-rub:before {
  content: "\20bd";
}
.glyphicon-scale:before {
  content: "\e230";
}
.glyphicon-ice-lolly:before {
  content: "\e231";
}
.glyphicon-ice-lolly-tasted:before {
  content: "\e232";
}
.glyphicon-education:before {
  content: "\e233";
}
.glyphicon-option-horizontal:before {
  content: "\e234";
}
.glyphicon-option-vertical:before {
  content: "\e235";
}
.glyphicon-menu-hamburger:before {
  content: "\e236";
}
.glyphicon-modal-window:before {
  content: "\e237";
}
.glyphicon-oil:before {
  content: "\e238";
}
.glyphicon-grain:before {
  content: "\e239";
}
.glyphicon-sunglasses:before {
  content: "\e240";
}
.glyphicon-text-size:before {
  content: "\e241";
}
.glyphicon-text-color:before {
  content: "\e242";
}
.glyphicon-text-background:before {
  content: "\e243";
}
.glyphicon-object-align-top:before {
  content: "\e244";
}
.glyphicon-object-align-bottom:before {
  content: "\e245";
}
.glyphicon-object-align-horizontal:before {
  content: "\e246";
}
.glyphicon-object-align-left:before {
  content: "\e247";
}
.glyphicon-object-align-vertical:before {
  content: "\e248";
}
.glyphicon-object-align-right:before {
  content: "\e249";
}
.glyphicon-triangle-right:before {
  content: "\e250";
}
.glyphicon-triangle-left:before {
  content: "\e251";
}
.glyphicon-triangle-bottom:before {
  content: "\e252";
}
.glyphicon-triangle-top:before {
  content: "\e253";
}
.glyphicon-console:before {
  content: "\e254";
}
.glyphicon-superscript:before {
  content: "\e255";
}
.glyphicon-subscript:before {
  content: "\e256";
}
.glyphicon-menu-left:before {
  content: "\e257";
}
.glyphicon-menu-right:before {
  content: "\e258";
}
.glyphicon-menu-down:before {
  content: "\e259";
}
.glyphicon-menu-up:before {
  content: "\e260";
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html {
  font-size: 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.42857143;
  color: #000;
  background-color: #fff;
}
input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
a {
  color: #337ab7;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #23527c;
  text-decoration: underline;
}
a:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
figure {
  margin: 0;
}
img {
  vertical-align: middle;
}
.img-responsive,
.thumbnail > img,
.thumbnail a > img,
.carousel-inner > .item > img,
.carousel-inner > .item > a > img {
  display: block;
  max-width: 100%;
  height: auto;
}
.img-rounded {
  border-radius: 3px;
}
.img-thumbnail {
  padding: 4px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  max-width: 100%;
  height: auto;
}
.img-circle {
  border-radius: 50%;
}
hr {
  margin-top: 18px;
  margin-bottom: 18px;
  border: 0;
  border-top: 1px solid #eeeeee;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
[role="button"] {
  cursor: pointer;
}
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}
h1 small,
h2 small,
h3 small,
h4 small,
h5 small,
h6 small,
.h1 small,
.h2 small,
.h3 small,
.h4 small,
.h5 small,
.h6 small,
h1 .small,
h2 .small,
h3 .small,
h4 .small,
h5 .small,
h6 .small,
.h1 .small,
.h2 .small,
.h3 .small,
.h4 .small,
.h5 .small,
.h6 .small {
  font-weight: normal;
  line-height: 1;
  color: #777777;
}
h1,
.h1,
h2,
.h2,
h3,
.h3 {
  margin-top: 18px;
  margin-bottom: 9px;
}
h1 small,
.h1 small,
h2 small,
.h2 small,
h3 small,
.h3 small,
h1 .small,
.h1 .small,
h2 .small,
.h2 .small,
h3 .small,
.h3 .small {
  font-size: 65%;
}
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  margin-top: 9px;
  margin-bottom: 9px;
}
h4 small,
.h4 small,
h5 small,
.h5 small,
h6 small,
.h6 small,
h4 .small,
.h4 .small,
h5 .small,
.h5 .small,
h6 .small,
.h6 .small {
  font-size: 75%;
}
h1,
.h1 {
  font-size: 33px;
}
h2,
.h2 {
  font-size: 27px;
}
h3,
.h3 {
  font-size: 23px;
}
h4,
.h4 {
  font-size: 17px;
}
h5,
.h5 {
  font-size: 13px;
}
h6,
.h6 {
  font-size: 12px;
}
p {
  margin: 0 0 9px;
}
.lead {
  margin-bottom: 18px;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.4;
}
@media (min-width: 768px) {
  .lead {
    font-size: 19.5px;
  }
}
small,
.small {
  font-size: 92%;
}
mark,
.mark {
  background-color: #fcf8e3;
  padding: .2em;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.text-justify {
  text-align: justify;
}
.text-nowrap {
  white-space: nowrap;
}
.text-lowercase {
  text-transform: lowercase;
}
.text-uppercase {
  text-transform: uppercase;
}
.text-capitalize {
  text-transform: capitalize;
}
.text-muted {
  color: #777777;
}
.text-primary {
  color: #337ab7;
}
a.text-primary:hover,
a.text-primary:focus {
  color: #286090;
}
.text-success {
  color: #3c763d;
}
a.text-success:hover,
a.text-success:focus {
  color: #2b542c;
}
.text-info {
  color: #31708f;
}
a.text-info:hover,
a.text-info:focus {
  color: #245269;
}
.text-warning {
  color: #8a6d3b;
}
a.text-warning:hover,
a.text-warning:focus {
  color: #66512c;
}
.text-danger {
  color: #a94442;
}
a.text-danger:hover,
a.text-danger:focus {
  color: #843534;
}
.bg-primary {
  color: #fff;
  background-color: #337ab7;
}
a.bg-primary:hover,
a.bg-primary:focus {
  background-color: #286090;
}
.bg-success {
  background-color: #dff0d8;
}
a.bg-success:hover,
a.bg-success:focus {
  background-color: #c1e2b3;
}
.bg-info {
  background-color: #d9edf7;
}
a.bg-info:hover,
a.bg-info:focus {
  background-color: #afd9ee;
}
.bg-warning {
  background-color: #fcf8e3;
}
a.bg-warning:hover,
a.bg-warning:focus {
  background-color: #f7ecb5;
}
.bg-danger {
  background-color: #f2dede;
}
a.bg-danger:hover,
a.bg-danger:focus {
  background-color: #e4b9b9;
}
.page-header {
  padding-bottom: 8px;
  margin: 36px 0 18px;
  border-bottom: 1px solid #eeeeee;
}
ul,
ol {
  margin-top: 0;
  margin-bottom: 9px;
}
ul ul,
ol ul,
ul ol,
ol ol {
  margin-bottom: 0;
}
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
.list-inline {
  padding-left: 0;
  list-style: none;
  margin-left: -5px;
}
.list-inline > li {
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
}
dl {
  margin-top: 0;
  margin-bottom: 18px;
}
dt,
dd {
  line-height: 1.42857143;
}
dt {
  font-weight: bold;
}
dd {
  margin-left: 0;
}
@media (min-width: 541px) {
  .dl-horizontal dt {
    float: left;
    width: 160px;
    clear: left;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dl-horizontal dd {
    margin-left: 180px;
  }
}
abbr[title],
abbr[data-original-title] {
  cursor: help;
  border-bottom: 1px dotted #777777;
}
.initialism {
  font-size: 90%;
  text-transform: uppercase;
}
blockquote {
  padding: 9px 18px;
  margin: 0 0 18px;
  font-size: inherit;
  border-left: 5px solid #eeeeee;
}
blockquote p:last-child,
blockquote ul:last-child,
blockquote ol:last-child {
  margin-bottom: 0;
}
blockquote footer,
blockquote small,
blockquote .small {
  display: block;
  font-size: 80%;
  line-height: 1.42857143;
  color: #777777;
}
blockquote footer:before,
blockquote small:before,
blockquote .small:before {
  content: '\2014 \00A0';
}
.blockquote-reverse,
blockquote.pull-right {
  padding-right: 15px;
  padding-left: 0;
  border-right: 5px solid #eeeeee;
  border-left: 0;
  text-align: right;
}
.blockquote-reverse footer:before,
blockquote.pull-right footer:before,
.blockquote-reverse small:before,
blockquote.pull-right small:before,
.blockquote-reverse .small:before,
blockquote.pull-right .small:before {
  content: '';
}
.blockquote-reverse footer:after,
blockquote.pull-right footer:after,
.blockquote-reverse small:after,
blockquote.pull-right small:after,
.blockquote-reverse .small:after,
blockquote.pull-right .small:after {
  content: '\00A0 \2014';
}
address {
  margin-bottom: 18px;
  font-style: normal;
  line-height: 1.42857143;
}
code,
kbd,
pre,
samp {
  font-family: monospace;
}
code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 2px;
}
kbd {
  padding: 2px 4px;
  font-size: 90%;
  color: #888;
  background-color: transparent;
  border-radius: 1px;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}
kbd kbd {
  padding: 0;
  font-size: 100%;
  font-weight: bold;
  box-shadow: none;
}
pre {
  display: block;
  padding: 8.5px;
  margin: 0 0 9px;
  font-size: 12px;
  line-height: 1.42857143;
  word-break: break-all;
  word-wrap: break-word;
  color: #333333;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px;
}
pre code {
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
  border-radius: 0;
}
.pre-scrollable {
  max-height: 340px;
  overflow-y: scroll;
}
.container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 0px;
  padding-right: 0px;
}
@media (min-width: 768px) {
  .container {
    width: 768px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 940px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1140px;
  }
}
.container-fluid {
  margin-right: auto;
  margin-left: auto;
  padding-left: 0px;
  padding-right: 0px;
}
.row {
  margin-left: 0px;
  margin-right: 0px;
}
.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
  position: relative;
  min-height: 1px;
  padding-left: 0px;
  padding-right: 0px;
}
.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {
  float: left;
}
.col-xs-12 {
  width: 100%;
}
.col-xs-11 {
  width: 91.66666667%;
}
.col-xs-10 {
  width: 83.33333333%;
}
.col-xs-9 {
  width: 75%;
}
.col-xs-8 {
  width: 66.66666667%;
}
.col-xs-7 {
  width: 58.33333333%;
}
.col-xs-6 {
  width: 50%;
}
.col-xs-5 {
  width: 41.66666667%;
}
.col-xs-4 {
  width: 33.33333333%;
}
.col-xs-3 {
  width: 25%;
}
.col-xs-2 {
  width: 16.66666667%;
}
.col-xs-1 {
  width: 8.33333333%;
}
.col-xs-pull-12 {
  right: 100%;
}
.col-xs-pull-11 {
  right: 91.66666667%;
}
.col-xs-pull-10 {
  right: 83.33333333%;
}
.col-xs-pull-9 {
  right: 75%;
}
.col-xs-pull-8 {
  right: 66.66666667%;
}
.col-xs-pull-7 {
  right: 58.33333333%;
}
.col-xs-pull-6 {
  right: 50%;
}
.col-xs-pull-5 {
  right: 41.66666667%;
}
.col-xs-pull-4 {
  right: 33.33333333%;
}
.col-xs-pull-3 {
  right: 25%;
}
.col-xs-pull-2 {
  right: 16.66666667%;
}
.col-xs-pull-1 {
  right: 8.33333333%;
}
.col-xs-pull-0 {
  right: auto;
}
.col-xs-push-12 {
  left: 100%;
}
.col-xs-push-11 {
  left: 91.66666667%;
}
.col-xs-push-10 {
  left: 83.33333333%;
}
.col-xs-push-9 {
  left: 75%;
}
.col-xs-push-8 {
  left: 66.66666667%;
}
.col-xs-push-7 {
  left: 58.33333333%;
}
.col-xs-push-6 {
  left: 50%;
}
.col-xs-push-5 {
  left: 41.66666667%;
}
.col-xs-push-4 {
  left: 33.33333333%;
}
.col-xs-push-3 {
  left: 25%;
}
.col-xs-push-2 {
  left: 16.66666667%;
}
.col-xs-push-1 {
  left: 8.33333333%;
}
.col-xs-push-0 {
  left: auto;
}
.col-xs-offset-12 {
  margin-left: 100%;
}
.col-xs-offset-11 {
  margin-left: 91.66666667%;
}
.col-xs-offset-10 {
  margin-left: 83.33333333%;
}
.col-xs-offset-9 {
  margin-left: 75%;
}
.col-xs-offset-8 {
  margin-left: 66.66666667%;
}
.col-xs-offset-7 {
  margin-left: 58.33333333%;
}
.col-xs-offset-6 {
  margin-left: 50%;
}
.col-xs-offset-5 {
  margin-left: 41.66666667%;
}
.col-xs-offset-4 {
  margin-left: 33.33333333%;
}
.col-xs-offset-3 {
  margin-left: 25%;
}
.col-xs-offset-2 {
  margin-left: 16.66666667%;
}
.col-xs-offset-1 {
  margin-left: 8.33333333%;
}
.col-xs-offset-0 {
  margin-left: 0%;
}
@media (min-width: 768px) {
  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
    float: left;
  }
  .col-sm-12 {
    width: 100%;
  }
  .col-sm-11 {
    width: 91.66666667%;
  }
  .col-sm-10 {
    width: 83.33333333%;
  }
  .col-sm-9 {
    width: 75%;
  }
  .col-sm-8 {
    width: 66.66666667%;
  }
  .col-sm-7 {
    width: 58.33333333%;
  }
  .col-sm-6 {
    width: 50%;
  }
  .col-sm-5 {
    width: 41.66666667%;
  }
  .col-sm-4 {
    width: 33.33333333%;
  }
  .col-sm-3 {
    width: 25%;
  }
  .col-sm-2 {
    width: 16.66666667%;
  }
  .col-sm-1 {
    width: 8.33333333%;
  }
  .col-sm-pull-12 {
    right: 100%;
  }
  .col-sm-pull-11 {
    right: 91.66666667%;
  }
  .col-sm-pull-10 {
    right: 83.33333333%;
  }
  .col-sm-pull-9 {
    right: 75%;
  }
  .col-sm-pull-8 {
    right: 66.66666667%;
  }
  .col-sm-pull-7 {
    right: 58.33333333%;
  }
  .col-sm-pull-6 {
    right: 50%;
  }
  .col-sm-pull-5 {
    right: 41.66666667%;
  }
  .col-sm-pull-4 {
    right: 33.33333333%;
  }
  .col-sm-pull-3 {
    right: 25%;
  }
  .col-sm-pull-2 {
    right: 16.66666667%;
  }
  .col-sm-pull-1 {
    right: 8.33333333%;
  }
  .col-sm-pull-0 {
    right: auto;
  }
  .col-sm-push-12 {
    left: 100%;
  }
  .col-sm-push-11 {
    left: 91.66666667%;
  }
  .col-sm-push-10 {
    left: 83.33333333%;
  }
  .col-sm-push-9 {
    left: 75%;
  }
  .col-sm-push-8 {
    left: 66.66666667%;
  }
  .col-sm-push-7 {
    left: 58.33333333%;
  }
  .col-sm-push-6 {
    left: 50%;
  }
  .col-sm-push-5 {
    left: 41.66666667%;
  }
  .col-sm-push-4 {
    left: 33.33333333%;
  }
  .col-sm-push-3 {
    left: 25%;
  }
  .col-sm-push-2 {
    left: 16.66666667%;
  }
  .col-sm-push-1 {
    left: 8.33333333%;
  }
  .col-sm-push-0 {
    left: auto;
  }
  .col-sm-offset-12 {
    margin-left: 100%;
  }
  .col-sm-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-sm-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-sm-offset-9 {
    margin-left: 75%;
  }
  .col-sm-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-sm-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-sm-offset-6 {
    margin-left: 50%;
  }
  .col-sm-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-sm-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-sm-offset-3 {
    margin-left: 25%;
  }
  .col-sm-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-sm-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-sm-offset-0 {
    margin-left: 0%;
  }
}
@media (min-width: 992px) {
  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left;
  }
  .col-md-12 {
    width: 100%;
  }
  .col-md-11 {
    width: 91.66666667%;
  }
  .col-md-10 {
    width: 83.33333333%;
  }
  .col-md-9 {
    width: 75%;
  }
  .col-md-8 {
    width: 66.66666667%;
  }
  .col-md-7 {
    width: 58.33333333%;
  }
  .col-md-6 {
    width: 50%;
  }
  .col-md-5 {
    width: 41.66666667%;
  }
  .col-md-4 {
    width: 33.33333333%;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-2 {
    width: 16.66666667%;
  }
  .col-md-1 {
    width: 8.33333333%;
  }
  .col-md-pull-12 {
    right: 100%;
  }
  .col-md-pull-11 {
    right: 91.66666667%;
  }
  .col-md-pull-10 {
    right: 83.33333333%;
  }
  .col-md-pull-9 {
    right: 75%;
  }
  .col-md-pull-8 {
    right: 66.66666667%;
  }
  .col-md-pull-7 {
    right: 58.33333333%;
  }
  .col-md-pull-6 {
    right: 50%;
  }
  .col-md-pull-5 {
    right: 41.66666667%;
  }
  .col-md-pull-4 {
    right: 33.33333333%;
  }
  .col-md-pull-3 {
    right: 25%;
  }
  .col-md-pull-2 {
    right: 16.66666667%;
  }
  .col-md-pull-1 {
    right: 8.33333333%;
  }
  .col-md-pull-0 {
    right: auto;
  }
  .col-md-push-12 {
    left: 100%;
  }
  .col-md-push-11 {
    left: 91.66666667%;
  }
  .col-md-push-10 {
    left: 83.33333333%;
  }
  .col-md-push-9 {
    left: 75%;
  }
  .col-md-push-8 {
    left: 66.66666667%;
  }
  .col-md-push-7 {
    left: 58.33333333%;
  }
  .col-md-push-6 {
    left: 50%;
  }
  .col-md-push-5 {
    left: 41.66666667%;
  }
  .col-md-push-4 {
    left: 33.33333333%;
  }
  .col-md-push-3 {
    left: 25%;
  }
  .col-md-push-2 {
    left: 16.66666667%;
  }
  .col-md-push-1 {
    left: 8.33333333%;
  }
  .col-md-push-0 {
    left: auto;
  }
  .col-md-offset-12 {
    margin-left: 100%;
  }
  .col-md-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-md-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-md-offset-9 {
    margin-left: 75%;
  }
  .col-md-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-md-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-md-offset-6 {
    margin-left: 50%;
  }
  .col-md-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-md-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-md-offset-3 {
    margin-left: 25%;
  }
  .col-md-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-md-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-md-offset-0 {
    margin-left: 0%;
  }
}
@media (min-width: 1200px) {
  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {
    float: left;
  }
  .col-lg-12 {
    width: 100%;
  }
  .col-lg-11 {
    width: 91.66666667%;
  }
  .col-lg-10 {
    width: 83.33333333%;
  }
  .col-lg-9 {
    width: 75%;
  }
  .col-lg-8 {
    width: 66.66666667%;
  }
  .col-lg-7 {
    width: 58.33333333%;
  }
  .col-lg-6 {
    width: 50%;
  }
  .col-lg-5 {
    width: 41.66666667%;
  }
  .col-lg-4 {
    width: 33.33333333%;
  }
  .col-lg-3 {
    width: 25%;
  }
  .col-lg-2 {
    width: 16.66666667%;
  }
  .col-lg-1 {
    width: 8.33333333%;
  }
  .col-lg-pull-12 {
    right: 100%;
  }
  .col-lg-pull-11 {
    right: 91.66666667%;
  }
  .col-lg-pull-10 {
    right: 83.33333333%;
  }
  .col-lg-pull-9 {
    right: 75%;
  }
  .col-lg-pull-8 {
    right: 66.66666667%;
  }
  .col-lg-pull-7 {
    right: 58.33333333%;
  }
  .col-lg-pull-6 {
    right: 50%;
  }
  .col-lg-pull-5 {
    right: 41.66666667%;
  }
  .col-lg-pull-4 {
    right: 33.33333333%;
  }
  .col-lg-pull-3 {
    right: 25%;
  }
  .col-lg-pull-2 {
    right: 16.66666667%;
  }
  .col-lg-pull-1 {
    right: 8.33333333%;
  }
  .col-lg-pull-0 {
    right: auto;
  }
  .col-lg-push-12 {
    left: 100%;
  }
  .col-lg-push-11 {
    left: 91.66666667%;
  }
  .col-lg-push-10 {
    left: 83.33333333%;
  }
  .col-lg-push-9 {
    left: 75%;
  }
  .col-lg-push-8 {
    left: 66.66666667%;
  }
  .col-lg-push-7 {
    left: 58.33333333%;
  }
  .col-lg-push-6 {
    left: 50%;
  }
  .col-lg-push-5 {
    left: 41.66666667%;
  }
  .col-lg-push-4 {
    left: 33.33333333%;
  }
  .col-lg-push-3 {
    left: 25%;
  }
  .col-lg-push-2 {
    left: 16.66666667%;
  }
  .col-lg-push-1 {
    left: 8.33333333%;
  }
  .col-lg-push-0 {
    left: auto;
  }
  .col-lg-offset-12 {
    margin-left: 100%;
  }
  .col-lg-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-lg-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-lg-offset-9 {
    margin-left: 75%;
  }
  .col-lg-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-lg-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-lg-offset-6 {
    margin-left: 50%;
  }
  .col-lg-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-lg-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-lg-offset-3 {
    margin-left: 25%;
  }
  .col-lg-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-lg-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-lg-offset-0 {
    margin-left: 0%;
  }
}
table {
  background-color: transparent;
}
caption {
  padding-top: 8px;
  padding-bottom: 8px;
  color: #777777;
  text-align: left;
}
th {
  text-align: left;
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 18px;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.table > caption + thead > tr:first-child > th,
.table > colgroup + thead > tr:first-child > th,
.table > thead:first-child > tr:first-child > th,
.table > caption + thead > tr:first-child > td,
.table > colgroup + thead > tr:first-child > td,
.table > thead:first-child > tr:first-child > td {
  border-top: 0;
}
.table > tbody + tbody {
  border-top: 2px solid #ddd;
}
.table .table {
  background-color: #fff;
}
.table-condensed > thead > tr > th,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > tbody > tr > td,
.table-condensed > tfoot > tr > td {
  padding: 5px;
}
.table-bordered {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.table-hover > tbody > tr:hover {
  background-color: #f5f5f5;
}
table col[class*="col-"] {
  position: static;
  float: none;
  display: table-column;
}
table td[class*="col-"],
table th[class*="col-"] {
  position: static;
  float: none;
  display: table-cell;
}
.table > thead > tr > td.active,
.table > tbody > tr > td.active,
.table > tfoot > tr > td.active,
.table > thead > tr > th.active,
.table > tbody > tr > th.active,
.table > tfoot > tr > th.active,
.table > thead > tr.active > td,
.table > tbody > tr.active > td,
.table > tfoot > tr.active > td,
.table > thead > tr.active > th,
.table > tbody > tr.active > th,
.table > tfoot > tr.active > th {
  background-color: #f5f5f5;
}
.table-hover > tbody > tr > td.active:hover,
.table-hover > tbody > tr > th.active:hover,
.table-hover > tbody > tr.active:hover > td,
.table-hover > tbody > tr:hover > .active,
.table-hover > tbody > tr.active:hover > th {
  background-color: #e8e8e8;
}
.table > thead > tr > td.success,
.table > tbody > tr > td.success,
.table > tfoot > tr > td.success,
.table > thead > tr > th.success,
.table > tbody > tr > th.success,
.table > tfoot > tr > th.success,
.table > thead > tr.success > td,
.table > tbody > tr.success > td,
.table > tfoot > tr.success > td,
.table > thead > tr.success > th,
.table > tbody > tr.success > th,
.table > tfoot > tr.success > th {
  background-color: #dff0d8;
}
.table-hover > tbody > tr > td.success:hover,
.table-hover > tbody > tr > th.success:hover,
.table-hover > tbody > tr.success:hover > td,
.table-hover > tbody > tr:hover > .success,
.table-hover > tbody > tr.success:hover > th {
  background-color: #d0e9c6;
}
.table > thead > tr > td.info,
.table > tbody > tr > td.info,
.table > tfoot > tr > td.info,
.table > thead > tr > th.info,
.table > tbody > tr > th.info,
.table > tfoot > tr > th.info,
.table > thead > tr.info > td,
.table > tbody > tr.info > td,
.table > tfoot > tr.info > td,
.table > thead > tr.info > th,
.table > tbody > tr.info > th,
.table > tfoot > tr.info > th {
  background-color: #d9edf7;
}
.table-hover > tbody > tr > td.info:hover,
.table-hover > tbody > tr > th.info:hover,
.table-hover > tbody > tr.info:hover > td,
.table-hover > tbody > tr:hover > .info,
.table-hover > tbody > tr.info:hover > th {
  background-color: #c4e3f3;
}
.table > thead > tr > td.warning,
.table > tbody > tr > td.warning,
.table > tfoot > tr > td.warning,
.table > thead > tr > th.warning,
.table > tbody > tr > th.warning,
.table > tfoot > tr > th.warning,
.table > thead > tr.warning > td,
.table > tbody > tr.warning > td,
.table > tfoot > tr.warning > td,
.table > thead > tr.warning > th,
.table > tbody > tr.warning > th,
.table > tfoot > tr.warning > th {
  background-color: #fcf8e3;
}
.table-hover > tbody > tr > td.warning:hover,
.table-hover > tbody > tr > th.warning:hover,
.table-hover > tbody > tr.warning:hover > td,
.table-hover > tbody > tr:hover > .warning,
.table-hover > tbody > tr.warning:hover > th {
  background-color: #faf2cc;
}
.table > thead > tr > td.danger,
.table > tbody > tr > td.danger,
.table > tfoot > tr > td.danger,
.table > thead > tr > th.danger,
.table > tbody > tr > th.danger,
.table > tfoot > tr > th.danger,
.table > thead > tr.danger > td,
.table > tbody > tr.danger > td,
.table > tfoot > tr.danger > td,
.table > thead > tr.danger > th,
.table > tbody > tr.danger > th,
.table > tfoot > tr.danger > th {
  background-color: #f2dede;
}
.table-hover > tbody > tr > td.danger:hover,
.table-hover > tbody > tr > th.danger:hover,
.table-hover > tbody > tr.danger:hover > td,
.table-hover > tbody > tr:hover > .danger,
.table-hover > tbody > tr.danger:hover > th {
  background-color: #ebcccc;
}
.table-responsive {
  overflow-x: auto;
  min-height: 0.01%;
}
@media screen and (max-width: 767px) {
  .table-responsive {
    width: 100%;
    margin-bottom: 13.5px;
    overflow-y: hidden;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    border: 1px solid #ddd;
  }
  .table-responsive > .table {
    margin-bottom: 0;
  }
  .table-responsive > .table > thead > tr > th,
  .table-responsive > .table > tbody > tr > th,
  .table-responsive > .table > tfoot > tr > th,
  .table-responsive > .table > thead > tr > td,
  .table-responsive > .table > tbody > tr > td,
  .table-responsive > .table > tfoot > tr > td {
    white-space: nowrap;
  }
  .table-responsive > .table-bordered {
    border: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:first-child,
  .table-responsive > .table-bordered > tbody > tr > th:first-child,
  .table-responsive > .table-bordered > tfoot > tr > th:first-child,
  .table-responsive > .table-bordered > thead > tr > td:first-child,
  .table-responsive > .table-bordered > tbody > tr > td:first-child,
  .table-responsive > .table-bordered > tfoot > tr > td:first-child {
    border-left: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:last-child,
  .table-responsive > .table-bordered > tbody > tr > th:last-child,
  .table-responsive > .table-bordered > tfoot > tr > th:last-child,
  .table-responsive > .table-bordered > thead > tr > td:last-child,
  .table-responsive > .table-bordered > tbody > tr > td:last-child,
  .table-responsive > .table-bordered > tfoot > tr > td:last-child {
    border-right: 0;
  }
  .table-responsive > .table-bordered > tbody > tr:last-child > th,
  .table-responsive > .table-bordered > tfoot > tr:last-child > th,
  .table-responsive > .table-bordered > tbody > tr:last-child > td,
  .table-responsive > .table-bordered > tfoot > tr:last-child > td {
    border-bottom: 0;
  }
}
fieldset {
  padding: 0;
  margin: 0;
  border: 0;
  min-width: 0;
}
legend {
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: 18px;
  font-size: 19.5px;
  line-height: inherit;
  color: #333333;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type="search"] {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
input[type="radio"],
input[type="checkbox"] {
  margin: 4px 0 0;
  margin-top: 1px \9;
  line-height: normal;
}
input[type="file"] {
  display: block;
}
input[type="range"] {
  display: block;
  width: 100%;
}
select[multiple],
select[size] {
  height: auto;
}
input[type="file"]:focus,
input[type="radio"]:focus,
input[type="checkbox"]:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
output {
  display: block;
  padding-top: 7px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
}
.form-control {
  display: block;
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.form-control::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.form-control:-ms-input-placeholder {
  color: #999;
}
.form-control::-webkit-input-placeholder {
  color: #999;
}
.form-control::-ms-expand {
  border: 0;
  background-color: transparent;
}
.form-control[disabled],
.form-control[readonly],
fieldset[disabled] .form-control {
  background-color: #eeeeee;
  opacity: 1;
}
.form-control[disabled],
fieldset[disabled] .form-control {
  cursor: not-allowed;
}
textarea.form-control {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: none;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="date"].form-control,
  input[type="time"].form-control,
  input[type="datetime-local"].form-control,
  input[type="month"].form-control {
    line-height: 32px;
  }
  input[type="date"].input-sm,
  input[type="time"].input-sm,
  input[type="datetime-local"].input-sm,
  input[type="month"].input-sm,
  .input-group-sm input[type="date"],
  .input-group-sm input[type="time"],
  .input-group-sm input[type="datetime-local"],
  .input-group-sm input[type="month"] {
    line-height: 30px;
  }
  input[type="date"].input-lg,
  input[type="time"].input-lg,
  input[type="datetime-local"].input-lg,
  input[type="month"].input-lg,
  .input-group-lg input[type="date"],
  .input-group-lg input[type="time"],
  .input-group-lg input[type="datetime-local"],
  .input-group-lg input[type="month"] {
    line-height: 45px;
  }
}
.form-group {
  margin-bottom: 15px;
}
.radio,
.checkbox {
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.radio label,
.checkbox label {
  min-height: 18px;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: normal;
  cursor: pointer;
}
.radio input[type="radio"],
.radio-inline input[type="radio"],
.checkbox input[type="checkbox"],
.checkbox-inline input[type="checkbox"] {
  position: absolute;
  margin-left: -20px;
  margin-top: 4px \9;
}
.radio + .radio,
.checkbox + .checkbox {
  margin-top: -5px;
}
.radio-inline,
.checkbox-inline {
  position: relative;
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 0;
  vertical-align: middle;
  font-weight: normal;
  cursor: pointer;
}
.radio-inline + .radio-inline,
.checkbox-inline + .checkbox-inline {
  margin-top: 0;
  margin-left: 10px;
}
input[type="radio"][disabled],
input[type="checkbox"][disabled],
input[type="radio"].disabled,
input[type="checkbox"].disabled,
fieldset[disabled] input[type="radio"],
fieldset[disabled] input[type="checkbox"] {
  cursor: not-allowed;
}
.radio-inline.disabled,
.checkbox-inline.disabled,
fieldset[disabled] .radio-inline,
fieldset[disabled] .checkbox-inline {
  cursor: not-allowed;
}
.radio.disabled label,
.checkbox.disabled label,
fieldset[disabled] .radio label,
fieldset[disabled] .checkbox label {
  cursor: not-allowed;
}
.form-control-static {
  padding-top: 7px;
  padding-bottom: 7px;
  margin-bottom: 0;
  min-height: 31px;
}
.form-control-static.input-lg,
.form-control-static.input-sm {
  padding-left: 0;
  padding-right: 0;
}
.input-sm {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
select.input-sm {
  height: 30px;
  line-height: 30px;
}
textarea.input-sm,
select[multiple].input-sm {
  height: auto;
}
.form-group-sm .form-control {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
.form-group-sm select.form-control {
  height: 30px;
  line-height: 30px;
}
.form-group-sm textarea.form-control,
.form-group-sm select[multiple].form-control {
  height: auto;
}
.form-group-sm .form-control-static {
  height: 30px;
  min-height: 30px;
  padding: 6px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.input-lg {
  height: 45px;
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
select.input-lg {
  height: 45px;
  line-height: 45px;
}
textarea.input-lg,
select[multiple].input-lg {
  height: auto;
}
.form-group-lg .form-control {
  height: 45px;
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
.form-group-lg select.form-control {
  height: 45px;
  line-height: 45px;
}
.form-group-lg textarea.form-control,
.form-group-lg select[multiple].form-control {
  height: auto;
}
.form-group-lg .form-control-static {
  height: 45px;
  min-height: 35px;
  padding: 11px 16px;
  font-size: 17px;
  line-height: 1.3333333;
}
.has-feedback {
  position: relative;
}
.has-feedback .form-control {
  padding-right: 40px;
}
.form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  pointer-events: none;
}
.input-lg + .form-control-feedback,
.input-group-lg + .form-control-feedback,
.form-group-lg .form-control + .form-control-feedback {
  width: 45px;
  height: 45px;
  line-height: 45px;
}
.input-sm + .form-control-feedback,
.input-group-sm + .form-control-feedback,
.form-group-sm .form-control + .form-control-feedback {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.has-success .help-block,
.has-success .control-label,
.has-success .radio,
.has-success .checkbox,
.has-success .radio-inline,
.has-success .checkbox-inline,
.has-success.radio label,
.has-success.checkbox label,
.has-success.radio-inline label,
.has-success.checkbox-inline label {
  color: #3c763d;
}
.has-success .form-control {
  border-color: #3c763d;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-success .form-control:focus {
  border-color: #2b542c;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
}
.has-success .input-group-addon {
  color: #3c763d;
  border-color: #3c763d;
  background-color: #dff0d8;
}
.has-success .form-control-feedback {
  color: #3c763d;
}
.has-warning .help-block,
.has-warning .control-label,
.has-warning .radio,
.has-warning .checkbox,
.has-warning .radio-inline,
.has-warning .checkbox-inline,
.has-warning.radio label,
.has-warning.checkbox label,
.has-warning.radio-inline label,
.has-warning.checkbox-inline label {
  color: #8a6d3b;
}
.has-warning .form-control {
  border-color: #8a6d3b;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-warning .form-control:focus {
  border-color: #66512c;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;
}
.has-warning .input-group-addon {
  color: #8a6d3b;
  border-color: #8a6d3b;
  background-color: #fcf8e3;
}
.has-warning .form-control-feedback {
  color: #8a6d3b;
}
.has-error .help-block,
.has-error .control-label,
.has-error .radio,
.has-error .checkbox,
.has-error .radio-inline,
.has-error .checkbox-inline,
.has-error.radio label,
.has-error.checkbox label,
.has-error.radio-inline label,
.has-error.checkbox-inline label {
  color: #a94442;
}
.has-error .form-control {
  border-color: #a94442;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-error .form-control:focus {
  border-color: #843534;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
}
.has-error .input-group-addon {
  color: #a94442;
  border-color: #a94442;
  background-color: #f2dede;
}
.has-error .form-control-feedback {
  color: #a94442;
}
.has-feedback label ~ .form-control-feedback {
  top: 23px;
}
.has-feedback label.sr-only ~ .form-control-feedback {
  top: 0;
}
.help-block {
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #404040;
}
@media (min-width: 768px) {
  .form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  .form-inline .form-control-static {
    display: inline-block;
  }
  .form-inline .input-group {
    display: inline-table;
    vertical-align: middle;
  }
  .form-inline .input-group .input-group-addon,
  .form-inline .input-group .input-group-btn,
  .form-inline .input-group .form-control {
    width: auto;
  }
  .form-inline .input-group > .form-control {
    width: 100%;
  }
  .form-inline .control-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .radio,
  .form-inline .checkbox {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .radio label,
  .form-inline .checkbox label {
    padding-left: 0;
  }
  .form-inline .radio input[type="radio"],
  .form-inline .checkbox input[type="checkbox"] {
    position: relative;
    margin-left: 0;
  }
  .form-inline .has-feedback .form-control-feedback {
    top: 0;
  }
}
.form-horizontal .radio,
.form-horizontal .checkbox,
.form-horizontal .radio-inline,
.form-horizontal .checkbox-inline {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 7px;
}
.form-horizontal .radio,
.form-horizontal .checkbox {
  min-height: 25px;
}
.form-horizontal .form-group {
  margin-left: 0px;
  margin-right: 0px;
}
@media (min-width: 768px) {
  .form-horizontal .control-label {
    text-align: right;
    margin-bottom: 0;
    padding-top: 7px;
  }
}
.form-horizontal .has-feedback .form-control-feedback {
  right: 0px;
}
@media (min-width: 768px) {
  .form-horizontal .form-group-lg .control-label {
    padding-top: 11px;
    font-size: 17px;
  }
}
@media (min-width: 768px) {
  .form-horizontal .form-group-sm .control-label {
    padding-top: 6px;
    font-size: 12px;
  }
}
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  border-radius: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.btn:hover,
.btn:focus,
.btn.focus {
  color: #333;
  text-decoration: none;
}
.btn:active,
.btn.active {
  outline: 0;
  background-image: none;
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.btn.disabled,
.btn[disabled],
fieldset[disabled] .btn {
  cursor: not-allowed;
  opacity: 0.65;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;
}
a.btn.disabled,
fieldset[disabled] a.btn {
  pointer-events: none;
}
.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-default:focus,
.btn-default.focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
.btn-default:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.btn-default:active,
.btn-default.active,
.open > .dropdown-toggle.btn-default {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.btn-default:active:hover,
.btn-default.active:hover,
.open > .dropdown-toggle.btn-default:hover,
.btn-default:active:focus,
.btn-default.active:focus,
.open > .dropdown-toggle.btn-default:focus,
.btn-default:active.focus,
.btn-default.active.focus,
.open > .dropdown-toggle.btn-default.focus {
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
.btn-default:active,
.btn-default.active,
.open > .dropdown-toggle.btn-default {
  background-image: none;
}
.btn-default.disabled:hover,
.btn-default[disabled]:hover,
fieldset[disabled] .btn-default:hover,
.btn-default.disabled:focus,
.btn-default[disabled]:focus,
fieldset[disabled] .btn-default:focus,
.btn-default.disabled.focus,
.btn-default[disabled].focus,
fieldset[disabled] .btn-default.focus {
  background-color: #fff;
  border-color: #ccc;
}
.btn-default .badge {
  color: #fff;
  background-color: #333;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-primary:focus,
.btn-primary.focus {
  color: #fff;
  background-color: #286090;
  border-color: #122b40;
}
.btn-primary:hover {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
.btn-primary:active:hover,
.btn-primary.active:hover,
.open > .dropdown-toggle.btn-primary:hover,
.btn-primary:active:focus,
.btn-primary.active:focus,
.open > .dropdown-toggle.btn-primary:focus,
.btn-primary:active.focus,
.btn-primary.active.focus,
.open > .dropdown-toggle.btn-primary.focus {
  color: #fff;
  background-color: #204d74;
  border-color: #122b40;
}
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  background-image: none;
}
.btn-primary.disabled:hover,
.btn-primary[disabled]:hover,
fieldset[disabled] .btn-primary:hover,
.btn-primary.disabled:focus,
.btn-primary[disabled]:focus,
fieldset[disabled] .btn-primary:focus,
.btn-primary.disabled.focus,
.btn-primary[disabled].focus,
fieldset[disabled] .btn-primary.focus {
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-primary .badge {
  color: #337ab7;
  background-color: #fff;
}
.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-success:focus,
.btn-success.focus {
  color: #fff;
  background-color: #449d44;
  border-color: #255625;
}
.btn-success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-success:active,
.btn-success.active,
.open > .dropdown-toggle.btn-success {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-success:active:hover,
.btn-success.active:hover,
.open > .dropdown-toggle.btn-success:hover,
.btn-success:active:focus,
.btn-success.active:focus,
.open > .dropdown-toggle.btn-success:focus,
.btn-success:active.focus,
.btn-success.active.focus,
.open > .dropdown-toggle.btn-success.focus {
  color: #fff;
  background-color: #398439;
  border-color: #255625;
}
.btn-success:active,
.btn-success.active,
.open > .dropdown-toggle.btn-success {
  background-image: none;
}
.btn-success.disabled:hover,
.btn-success[disabled]:hover,
fieldset[disabled] .btn-success:hover,
.btn-success.disabled:focus,
.btn-success[disabled]:focus,
fieldset[disabled] .btn-success:focus,
.btn-success.disabled.focus,
.btn-success[disabled].focus,
fieldset[disabled] .btn-success.focus {
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-success .badge {
  color: #5cb85c;
  background-color: #fff;
}
.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-info:focus,
.btn-info.focus {
  color: #fff;
  background-color: #31b0d5;
  border-color: #1b6d85;
}
.btn-info:hover {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.btn-info:active:hover,
.btn-info.active:hover,
.open > .dropdown-toggle.btn-info:hover,
.btn-info:active:focus,
.btn-info.active:focus,
.open > .dropdown-toggle.btn-info:focus,
.btn-info:active.focus,
.btn-info.active.focus,
.open > .dropdown-toggle.btn-info.focus {
  color: #fff;
  background-color: #269abc;
  border-color: #1b6d85;
}
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  background-image: none;
}
.btn-info.disabled:hover,
.btn-info[disabled]:hover,
fieldset[disabled] .btn-info:hover,
.btn-info.disabled:focus,
.btn-info[disabled]:focus,
fieldset[disabled] .btn-info:focus,
.btn-info.disabled.focus,
.btn-info[disabled].focus,
fieldset[disabled] .btn-info.focus {
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-info .badge {
  color: #5bc0de;
  background-color: #fff;
}
.btn-warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
.btn-warning:focus,
.btn-warning.focus {
  color: #fff;
  background-color: #ec971f;
  border-color: #985f0d;
}
.btn-warning:hover {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.btn-warning:active,
.btn-warning.active,
.open > .dropdown-toggle.btn-warning {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.btn-warning:active:hover,
.btn-warning.active:hover,
.open > .dropdown-toggle.btn-warning:hover,
.btn-warning:active:focus,
.btn-warning.active:focus,
.open > .dropdown-toggle.btn-warning:focus,
.btn-warning:active.focus,
.btn-warning.active.focus,
.open > .dropdown-toggle.btn-warning.focus {
  color: #fff;
  background-color: #d58512;
  border-color: #985f0d;
}
.btn-warning:active,
.btn-warning.active,
.open > .dropdown-toggle.btn-warning {
  background-image: none;
}
.btn-warning.disabled:hover,
.btn-warning[disabled]:hover,
fieldset[disabled] .btn-warning:hover,
.btn-warning.disabled:focus,
.btn-warning[disabled]:focus,
fieldset[disabled] .btn-warning:focus,
.btn-warning.disabled.focus,
.btn-warning[disabled].focus,
fieldset[disabled] .btn-warning.focus {
  background-color: #f0ad4e;
  border-color: #eea236;
}
.btn-warning .badge {
  color: #f0ad4e;
  background-color: #fff;
}
.btn-danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
.btn-danger:focus,
.btn-danger.focus {
  color: #fff;
  background-color: #c9302c;
  border-color: #761c19;
}
.btn-danger:hover {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.btn-danger:active,
.btn-danger.active,
.open > .dropdown-toggle.btn-danger {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.btn-danger:active:hover,
.btn-danger.active:hover,
.open > .dropdown-toggle.btn-danger:hover,
.btn-danger:active:focus,
.btn-danger.active:focus,
.open > .dropdown-toggle.btn-danger:focus,
.btn-danger:active.focus,
.btn-danger.active.focus,
.open > .dropdown-toggle.btn-danger.focus {
  color: #fff;
  background-color: #ac2925;
  border-color: #761c19;
}
.btn-danger:active,
.btn-danger.active,
.open > .dropdown-toggle.btn-danger {
  background-image: none;
}
.btn-danger.disabled:hover,
.btn-danger[disabled]:hover,
fieldset[disabled] .btn-danger:hover,
.btn-danger.disabled:focus,
.btn-danger[disabled]:focus,
fieldset[disabled] .btn-danger:focus,
.btn-danger.disabled.focus,
.btn-danger[disabled].focus,
fieldset[disabled] .btn-danger.focus {
  background-color: #d9534f;
  border-color: #d43f3a;
}
.btn-danger .badge {
  color: #d9534f;
  background-color: #fff;
}
.btn-link {
  color: #337ab7;
  font-weight: normal;
  border-radius: 0;
}
.btn-link,
.btn-link:active,
.btn-link.active,
.btn-link[disabled],
fieldset[disabled] .btn-link {
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.btn-link,
.btn-link:hover,
.btn-link:focus,
.btn-link:active {
  border-color: transparent;
}
.btn-link:hover,
.btn-link:focus {
  color: #23527c;
  text-decoration: underline;
  background-color: transparent;
}
.btn-link[disabled]:hover,
fieldset[disabled] .btn-link:hover,
.btn-link[disabled]:focus,
fieldset[disabled] .btn-link:focus {
  color: #777777;
  text-decoration: none;
}
.btn-lg,
.btn-group-lg > .btn {
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
.btn-sm,
.btn-group-sm > .btn {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
.btn-xs,
.btn-group-xs > .btn {
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
.btn-block {
  display: block;
  width: 100%;
}
.btn-block + .btn-block {
  margin-top: 5px;
}
input[type="submit"].btn-block,
input[type="reset"].btn-block,
input[type="button"].btn-block {
  width: 100%;
}
.fade {
  opacity: 0;
  -webkit-transition: opacity 0.15s linear;
  -o-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
}
.fade.in {
  opacity: 1;
}
.collapse {
  display: none;
}
.collapse.in {
  display: block;
}
tr.collapse.in {
  display: table-row;
}
tbody.collapse.in {
  display: table-row-group;
}
.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  -webkit-transition-property: height, visibility;
  transition-property: height, visibility;
  -webkit-transition-duration: 0.35s;
  transition-duration: 0.35s;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease;
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
.dropup,
.dropdown {
  position: relative;
}
.dropdown-toggle:focus {
  outline: 0;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 13px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}
.dropdown-menu.pull-right {
  right: 0;
  left: auto;
}
.dropdown-menu .divider {
  height: 1px;
  margin: 8px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.dropdown-menu > li > a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333333;
  white-space: nowrap;
}
.dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
  text-decoration: none;
  color: #262626;
  background-color: #f5f5f5;
}
.dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus {
  color: #fff;
  text-decoration: none;
  outline: 0;
  background-color: #337ab7;
}
.dropdown-menu > .disabled > a,
.dropdown-menu > .disabled > a:hover,
.dropdown-menu > .disabled > a:focus {
  color: #777777;
}
.dropdown-menu > .disabled > a:hover,
.dropdown-menu > .disabled > a:focus {
  text-decoration: none;
  background-color: transparent;
  background-image: none;
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  cursor: not-allowed;
}
.open > .dropdown-menu {
  display: block;
}
.open > a {
  outline: 0;
}
.dropdown-menu-right {
  left: auto;
  right: 0;
}
.dropdown-menu-left {
  left: 0;
  right: auto;
}
.dropdown-header {
  display: block;
  padding: 3px 20px;
  font-size: 12px;
  line-height: 1.42857143;
  color: #777777;
  white-space: nowrap;
}
.dropdown-backdrop {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 990;
}
.pull-right > .dropdown-menu {
  right: 0;
  left: auto;
}
.dropup .caret,
.navbar-fixed-bottom .dropdown .caret {
  border-top: 0;
  border-bottom: 4px dashed;
  border-bottom: 4px solid \9;
  content: "";
}
.dropup .dropdown-menu,
.navbar-fixed-bottom .dropdown .dropdown-menu {
  top: auto;
  bottom: 100%;
  margin-bottom: 2px;
}
@media (min-width: 541px) {
  .navbar-right .dropdown-menu {
    left: auto;
    right: 0;
  }
  .navbar-right .dropdown-menu-left {
    left: 0;
    right: auto;
  }
}
.btn-group,
.btn-group-vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.btn-group > .btn,
.btn-group-vertical > .btn {
  position: relative;
  float: left;
}
.btn-group > .btn:hover,
.btn-group-vertical > .btn:hover,
.btn-group > .btn:focus,
.btn-group-vertical > .btn:focus,
.btn-group > .btn:active,
.btn-group-vertical > .btn:active,
.btn-group > .btn.active,
.btn-group-vertical > .btn.active {
  z-index: 2;
}
.btn-group .btn + .btn,
.btn-group .btn + .btn-group,
.btn-group .btn-group + .btn,
.btn-group .btn-group + .btn-group {
  margin-left: -1px;
}
.btn-toolbar {
  margin-left: -5px;
}
.btn-toolbar .btn,
.btn-toolbar .btn-group,
.btn-toolbar .input-group {
  float: left;
}
.btn-toolbar > .btn,
.btn-toolbar > .btn-group,
.btn-toolbar > .input-group {
  margin-left: 5px;
}
.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {
  border-radius: 0;
}
.btn-group > .btn:first-child {
  margin-left: 0;
}
.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.btn-group > .btn:last-child:not(:first-child),
.btn-group > .dropdown-toggle:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.btn-group > .btn-group {
  float: left;
}
.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}
.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.btn-group .dropdown-toggle:active,
.btn-group.open .dropdown-toggle {
  outline: 0;
}
.btn-group > .btn + .dropdown-toggle {
  padding-left: 8px;
  padding-right: 8px;
}
.btn-group > .btn-lg + .dropdown-toggle {
  padding-left: 12px;
  padding-right: 12px;
}
.btn-group.open .dropdown-toggle {
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.btn-group.open .dropdown-toggle.btn-link {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.btn .caret {
  margin-left: 0;
}
.btn-lg .caret {
  border-width: 5px 5px 0;
  border-bottom-width: 0;
}
.dropup .btn-lg .caret {
  border-width: 0 5px 5px;
}
.btn-group-vertical > .btn,
.btn-group-vertical > .btn-group,
.btn-group-vertical > .btn-group > .btn {
  display: block;
  float: none;
  width: 100%;
  max-width: 100%;
}
.btn-group-vertical > .btn-group > .btn {
  float: none;
}
.btn-group-vertical > .btn + .btn,
.btn-group-vertical > .btn + .btn-group,
.btn-group-vertical > .btn-group + .btn,
.btn-group-vertical > .btn-group + .btn-group {
  margin-top: -1px;
  margin-left: 0;
}
.btn-group-vertical > .btn:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.btn-group-vertical > .btn:first-child:not(:last-child) {
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group-vertical > .btn:last-child:not(:first-child) {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}
.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.btn-group-justified {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
}
.btn-group-justified > .btn,
.btn-group-justified > .btn-group {
  float: none;
  display: table-cell;
  width: 1%;
}
.btn-group-justified > .btn-group .btn {
  width: 100%;
}
.btn-group-justified > .btn-group .dropdown-menu {
  left: auto;
}
[data-toggle="buttons"] > .btn input[type="radio"],
[data-toggle="buttons"] > .btn-group > .btn input[type="radio"],
[data-toggle="buttons"] > .btn input[type="checkbox"],
[data-toggle="buttons"] > .btn-group > .btn input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}
.input-group {
  position: relative;
  display: table;
  border-collapse: separate;
}
.input-group[class*="col-"] {
  float: none;
  padding-left: 0;
  padding-right: 0;
}
.input-group .form-control {
  position: relative;
  z-index: 2;
  float: left;
  width: 100%;
  margin-bottom: 0;
}
.input-group .form-control:focus {
  z-index: 3;
}
.input-group-lg > .form-control,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .btn {
  height: 45px;
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
select.input-group-lg > .form-control,
select.input-group-lg > .input-group-addon,
select.input-group-lg > .input-group-btn > .btn {
  height: 45px;
  line-height: 45px;
}
textarea.input-group-lg > .form-control,
textarea.input-group-lg > .input-group-addon,
textarea.input-group-lg > .input-group-btn > .btn,
select[multiple].input-group-lg > .form-control,
select[multiple].input-group-lg > .input-group-addon,
select[multiple].input-group-lg > .input-group-btn > .btn {
  height: auto;
}
.input-group-sm > .form-control,
.input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .btn {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
select.input-group-sm > .form-control,
select.input-group-sm > .input-group-addon,
select.input-group-sm > .input-group-btn > .btn {
  height: 30px;
  line-height: 30px;
}
textarea.input-group-sm > .form-control,
textarea.input-group-sm > .input-group-addon,
textarea.input-group-sm > .input-group-btn > .btn,
select[multiple].input-group-sm > .form-control,
select[multiple].input-group-sm > .input-group-addon,
select[multiple].input-group-sm > .input-group-btn > .btn {
  height: auto;
}
.input-group-addon,
.input-group-btn,
.input-group .form-control {
  display: table-cell;
}
.input-group-addon:not(:first-child):not(:last-child),
.input-group-btn:not(:first-child):not(:last-child),
.input-group .form-control:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.input-group-addon,
.input-group-btn {
  width: 1%;
  white-space: nowrap;
  vertical-align: middle;
}
.input-group-addon {
  padding: 6px 12px;
  font-size: 13px;
  font-weight: normal;
  line-height: 1;
  color: #555555;
  text-align: center;
  background-color: #eeeeee;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.input-group-addon.input-sm {
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 1px;
}
.input-group-addon.input-lg {
  padding: 10px 16px;
  font-size: 17px;
  border-radius: 3px;
}
.input-group-addon input[type="radio"],
.input-group-addon input[type="checkbox"] {
  margin-top: 0;
}
.input-group .form-control:first-child,
.input-group-addon:first-child,
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group > .btn,
.input-group-btn:first-child > .dropdown-toggle,
.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),
.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.input-group-addon:first-child {
  border-right: 0;
}
.input-group .form-control:last-child,
.input-group-addon:last-child,
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group > .btn,
.input-group-btn:last-child > .dropdown-toggle,
.input-group-btn:first-child > .btn:not(:first-child),
.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.input-group-addon:last-child {
  border-left: 0;
}
.input-group-btn {
  position: relative;
  font-size: 0;
  white-space: nowrap;
}
.input-group-btn > .btn {
  position: relative;
}
.input-group-btn > .btn + .btn {
  margin-left: -1px;
}
.input-group-btn > .btn:hover,
.input-group-btn > .btn:focus,
.input-group-btn > .btn:active {
  z-index: 2;
}
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group {
  margin-right: -1px;
}
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group {
  z-index: 2;
  margin-left: -1px;
}
.nav {
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
}
.nav > li {
  position: relative;
  display: block;
}
.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
}
.nav > li > a:hover,
.nav > li > a:focus {
  text-decoration: none;
  background-color: #eeeeee;
}
.nav > li.disabled > a {
  color: #777777;
}
.nav > li.disabled > a:hover,
.nav > li.disabled > a:focus {
  color: #777777;
  text-decoration: none;
  background-color: transparent;
  cursor: not-allowed;
}
.nav .open > a,
.nav .open > a:hover,
.nav .open > a:focus {
  background-color: #eeeeee;
  border-color: #337ab7;
}
.nav .nav-divider {
  height: 1px;
  margin: 8px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.nav > li > a > img {
  max-width: none;
}
.nav-tabs {
  border-bottom: 1px solid #ddd;
}
.nav-tabs > li {
  float: left;
  margin-bottom: -1px;
}
.nav-tabs > li > a {
  margin-right: 2px;
  line-height: 1.42857143;
  border: 1px solid transparent;
  border-radius: 2px 2px 0 0;
}
.nav-tabs > li > a:hover {
  border-color: #eeeeee #eeeeee #ddd;
}
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:hover,
.nav-tabs > li.active > a:focus {
  color: #555555;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: transparent;
  cursor: default;
}
.nav-tabs.nav-justified {
  width: 100%;
  border-bottom: 0;
}
.nav-tabs.nav-justified > li {
  float: none;
}
.nav-tabs.nav-justified > li > a {
  text-align: center;
  margin-bottom: 5px;
}
.nav-tabs.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}
@media (min-width: 768px) {
  .nav-tabs.nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .nav-tabs.nav-justified > li > a {
    margin-bottom: 0;
  }
}
.nav-tabs.nav-justified > li > a {
  margin-right: 0;
  border-radius: 2px;
}
.nav-tabs.nav-justified > .active > a,
.nav-tabs.nav-justified > .active > a:hover,
.nav-tabs.nav-justified > .active > a:focus {
  border: 1px solid #ddd;
}
@media (min-width: 768px) {
  .nav-tabs.nav-justified > li > a {
    border-bottom: 1px solid #ddd;
    border-radius: 2px 2px 0 0;
  }
  .nav-tabs.nav-justified > .active > a,
  .nav-tabs.nav-justified > .active > a:hover,
  .nav-tabs.nav-justified > .active > a:focus {
    border-bottom-color: #fff;
  }
}
.nav-pills > li {
  float: left;
}
.nav-pills > li > a {
  border-radius: 2px;
}
.nav-pills > li + li {
  margin-left: 2px;
}
.nav-pills > li.active > a,
.nav-pills > li.active > a:hover,
.nav-pills > li.active > a:focus {
  color: #fff;
  background-color: #337ab7;
}
.nav-stacked > li {
  float: none;
}
.nav-stacked > li + li {
  margin-top: 2px;
  margin-left: 0;
}
.nav-justified {
  width: 100%;
}
.nav-justified > li {
  float: none;
}
.nav-justified > li > a {
  text-align: center;
  margin-bottom: 5px;
}
.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}
@media (min-width: 768px) {
  .nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .nav-justified > li > a {
    margin-bottom: 0;
  }
}
.nav-tabs-justified {
  border-bottom: 0;
}
.nav-tabs-justified > li > a {
  margin-right: 0;
  border-radius: 2px;
}
.nav-tabs-justified > .active > a,
.nav-tabs-justified > .active > a:hover,
.nav-tabs-justified > .active > a:focus {
  border: 1px solid #ddd;
}
@media (min-width: 768px) {
  .nav-tabs-justified > li > a {
    border-bottom: 1px solid #ddd;
    border-radius: 2px 2px 0 0;
  }
  .nav-tabs-justified > .active > a,
  .nav-tabs-justified > .active > a:hover,
  .nav-tabs-justified > .active > a:focus {
    border-bottom-color: #fff;
  }
}
.tab-content > .tab-pane {
  display: none;
}
.tab-content > .active {
  display: block;
}
.nav-tabs .dropdown-menu {
  margin-top: -1px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.navbar {
  position: relative;
  min-height: 30px;
  margin-bottom: 18px;
  border: 1px solid transparent;
}
@media (min-width: 541px) {
  .navbar {
    border-radius: 2px;
  }
}
@media (min-width: 541px) {
  .navbar-header {
    float: left;
  }
}
.navbar-collapse {
  overflow-x: visible;
  padding-right: 0px;
  padding-left: 0px;
  border-top: 1px solid transparent;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  -webkit-overflow-scrolling: touch;
}
.navbar-collapse.in {
  overflow-y: auto;
}
@media (min-width: 541px) {
  .navbar-collapse {
    width: auto;
    border-top: 0;
    box-shadow: none;
  }
  .navbar-collapse.collapse {
    display: block !important;
    height: auto !important;
    padding-bottom: 0;
    overflow: visible !important;
  }
  .navbar-collapse.in {
    overflow-y: visible;
  }
  .navbar-fixed-top .navbar-collapse,
  .navbar-static-top .navbar-collapse,
  .navbar-fixed-bottom .navbar-collapse {
    padding-left: 0;
    padding-right: 0;
  }
}
.navbar-fixed-top .navbar-collapse,
.navbar-fixed-bottom .navbar-collapse {
  max-height: 340px;
}
@media (max-device-width: 540px) and (orientation: landscape) {
  .navbar-fixed-top .navbar-collapse,
  .navbar-fixed-bottom .navbar-collapse {
    max-height: 200px;
  }
}
.container > .navbar-header,
.container-fluid > .navbar-header,
.container > .navbar-collapse,
.container-fluid > .navbar-collapse {
  margin-right: 0px;
  margin-left: 0px;
}
@media (min-width: 541px) {
  .container > .navbar-header,
  .container-fluid > .navbar-header,
  .container > .navbar-collapse,
  .container-fluid > .navbar-collapse {
    margin-right: 0;
    margin-left: 0;
  }
}
.navbar-static-top {
  z-index: 1000;
  border-width: 0 0 1px;
}
@media (min-width: 541px) {
  .navbar-static-top {
    border-radius: 0;
  }
}
.navbar-fixed-top,
.navbar-fixed-bottom {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
}
@media (min-width: 541px) {
  .navbar-fixed-top,
  .navbar-fixed-bottom {
    border-radius: 0;
  }
}
.navbar-fixed-top {
  top: 0;
  border-width: 0 0 1px;
}
.navbar-fixed-bottom {
  bottom: 0;
  margin-bottom: 0;
  border-width: 1px 0 0;
}
.navbar-brand {
  float: left;
  padding: 6px 0px;
  font-size: 17px;
  line-height: 18px;
  height: 30px;
}
.navbar-brand:hover,
.navbar-brand:focus {
  text-decoration: none;
}
.navbar-brand > img {
  display: block;
}
@media (min-width: 541px) {
  .navbar > .container .navbar-brand,
  .navbar > .container-fluid .navbar-brand {
    margin-left: 0px;
  }
}
.navbar-toggle {
  position: relative;
  float: right;
  margin-right: 0px;
  padding: 9px 10px;
  margin-top: -2px;
  margin-bottom: -2px;
  background-color: transparent;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 2px;
}
.navbar-toggle:focus {
  outline: 0;
}
.navbar-toggle .icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
}
.navbar-toggle .icon-bar + .icon-bar {
  margin-top: 4px;
}
@media (min-width: 541px) {
  .navbar-toggle {
    display: none;
  }
}
.navbar-nav {
  margin: 3px 0px;
}
.navbar-nav > li > a {
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 18px;
}
@media (max-width: 540px) {
  .navbar-nav .open .dropdown-menu {
    position: static;
    float: none;
    width: auto;
    margin-top: 0;
    background-color: transparent;
    border: 0;
    box-shadow: none;
  }
  .navbar-nav .open .dropdown-menu > li > a,
  .navbar-nav .open .dropdown-menu .dropdown-header {
    padding: 5px 15px 5px 25px;
  }
  .navbar-nav .open .dropdown-menu > li > a {
    line-height: 18px;
  }
  .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-nav .open .dropdown-menu > li > a:focus {
    background-image: none;
  }
}
@media (min-width: 541px) {
  .navbar-nav {
    float: left;
    margin: 0;
  }
  .navbar-nav > li {
    float: left;
  }
  .navbar-nav > li > a {
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
.navbar-form {
  margin-left: 0px;
  margin-right: 0px;
  padding: 10px 0px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: -1px;
  margin-bottom: -1px;
}
@media (min-width: 768px) {
  .navbar-form .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  .navbar-form .form-control-static {
    display: inline-block;
  }
  .navbar-form .input-group {
    display: inline-table;
    vertical-align: middle;
  }
  .navbar-form .input-group .input-group-addon,
  .navbar-form .input-group .input-group-btn,
  .navbar-form .input-group .form-control {
    width: auto;
  }
  .navbar-form .input-group > .form-control {
    width: 100%;
  }
  .navbar-form .control-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .radio,
  .navbar-form .checkbox {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .radio label,
  .navbar-form .checkbox label {
    padding-left: 0;
  }
  .navbar-form .radio input[type="radio"],
  .navbar-form .checkbox input[type="checkbox"] {
    position: relative;
    margin-left: 0;
  }
  .navbar-form .has-feedback .form-control-feedback {
    top: 0;
  }
}
@media (max-width: 540px) {
  .navbar-form .form-group {
    margin-bottom: 5px;
  }
  .navbar-form .form-group:last-child {
    margin-bottom: 0;
  }
}
@media (min-width: 541px) {
  .navbar-form {
    width: auto;
    border: 0;
    margin-left: 0;
    margin-right: 0;
    padding-top: 0;
    padding-bottom: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}
.navbar-nav > li > .dropdown-menu {
  margin-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {
  margin-bottom: 0;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.navbar-btn {
  margin-top: -1px;
  margin-bottom: -1px;
}
.navbar-btn.btn-sm {
  margin-top: 0px;
  margin-bottom: 0px;
}
.navbar-btn.btn-xs {
  margin-top: 4px;
  margin-bottom: 4px;
}
.navbar-text {
  margin-top: 6px;
  margin-bottom: 6px;
}
@media (min-width: 541px) {
  .navbar-text {
    float: left;
    margin-left: 0px;
    margin-right: 0px;
  }
}
@media (min-width: 541px) {
  .navbar-left {
    float: left !important;
    float: left;
  }
  .navbar-right {
    float: right !important;
    float: right;
    margin-right: 0px;
  }
  .navbar-right ~ .navbar-right {
    margin-right: 0;
  }
}
.navbar-default {
  background-color: #f8f8f8;
  border-color: #e7e7e7;
}
.navbar-default .navbar-brand {
  color: #777;
}
.navbar-default .navbar-brand:hover,
.navbar-default .navbar-brand:focus {
  color: #5e5e5e;
  background-color: transparent;
}
.navbar-default .navbar-text {
  color: #777;
}
.navbar-default .navbar-nav > li > a {
  color: #777;
}
.navbar-default .navbar-nav > li > a:hover,
.navbar-default .navbar-nav > li > a:focus {
  color: #333;
  background-color: transparent;
}
.navbar-default .navbar-nav > .active > a,
.navbar-default .navbar-nav > .active > a:hover,
.navbar-default .navbar-nav > .active > a:focus {
  color: #555;
  background-color: #e7e7e7;
}
.navbar-default .navbar-nav > .disabled > a,
.navbar-default .navbar-nav > .disabled > a:hover,
.navbar-default .navbar-nav > .disabled > a:focus {
  color: #ccc;
  background-color: transparent;
}
.navbar-default .navbar-toggle {
  border-color: #ddd;
}
.navbar-default .navbar-toggle:hover,
.navbar-default .navbar-toggle:focus {
  background-color: #ddd;
}
.navbar-default .navbar-toggle .icon-bar {
  background-color: #888;
}
.navbar-default .navbar-collapse,
.navbar-default .navbar-form {
  border-color: #e7e7e7;
}
.navbar-default .navbar-nav > .open > a,
.navbar-default .navbar-nav > .open > a:hover,
.navbar-default .navbar-nav > .open > a:focus {
  background-color: #e7e7e7;
  color: #555;
}
@media (max-width: 540px) {
  .navbar-default .navbar-nav .open .dropdown-menu > li > a {
    color: #777;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {
    color: #333;
    background-color: transparent;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {
    color: #555;
    background-color: #e7e7e7;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {
    color: #ccc;
    background-color: transparent;
  }
}
.navbar-default .navbar-link {
  color: #777;
}
.navbar-default .navbar-link:hover {
  color: #333;
}
.navbar-default .btn-link {
  color: #777;
}
.navbar-default .btn-link:hover,
.navbar-default .btn-link:focus {
  color: #333;
}
.navbar-default .btn-link[disabled]:hover,
fieldset[disabled] .navbar-default .btn-link:hover,
.navbar-default .btn-link[disabled]:focus,
fieldset[disabled] .navbar-default .btn-link:focus {
  color: #ccc;
}
.navbar-inverse {
  background-color: #222;
  border-color: #080808;
}
.navbar-inverse .navbar-brand {
  color: #9d9d9d;
}
.navbar-inverse .navbar-brand:hover,
.navbar-inverse .navbar-brand:focus {
  color: #fff;
  background-color: transparent;
}
.navbar-inverse .navbar-text {
  color: #9d9d9d;
}
.navbar-inverse .navbar-nav > li > a {
  color: #9d9d9d;
}
.navbar-inverse .navbar-nav > li > a:hover,
.navbar-inverse .navbar-nav > li > a:focus {
  color: #fff;
  background-color: transparent;
}
.navbar-inverse .navbar-nav > .active > a,
.navbar-inverse .navbar-nav > .active > a:hover,
.navbar-inverse .navbar-nav > .active > a:focus {
  color: #fff;
  background-color: #080808;
}
.navbar-inverse .navbar-nav > .disabled > a,
.navbar-inverse .navbar-nav > .disabled > a:hover,
.navbar-inverse .navbar-nav > .disabled > a:focus {
  color: #444;
  background-color: transparent;
}
.navbar-inverse .navbar-toggle {
  border-color: #333;
}
.navbar-inverse .navbar-toggle:hover,
.navbar-inverse .navbar-toggle:focus {
  background-color: #333;
}
.navbar-inverse .navbar-toggle .icon-bar {
  background-color: #fff;
}
.navbar-inverse .navbar-collapse,
.navbar-inverse .navbar-form {
  border-color: #101010;
}
.navbar-inverse .navbar-nav > .open > a,
.navbar-inverse .navbar-nav > .open > a:hover,
.navbar-inverse .navbar-nav > .open > a:focus {
  background-color: #080808;
  color: #fff;
}
@media (max-width: 540px) {
  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {
    border-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {
    background-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {
    color: #9d9d9d;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {
    color: #fff;
    background-color: transparent;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {
    color: #444;
    background-color: transparent;
  }
}
.navbar-inverse .navbar-link {
  color: #9d9d9d;
}
.navbar-inverse .navbar-link:hover {
  color: #fff;
}
.navbar-inverse .btn-link {
  color: #9d9d9d;
}
.navbar-inverse .btn-link:hover,
.navbar-inverse .btn-link:focus {
  color: #fff;
}
.navbar-inverse .btn-link[disabled]:hover,
fieldset[disabled] .navbar-inverse .btn-link:hover,
.navbar-inverse .btn-link[disabled]:focus,
fieldset[disabled] .navbar-inverse .btn-link:focus {
  color: #444;
}
.breadcrumb {
  padding: 8px 15px;
  margin-bottom: 18px;
  list-style: none;
  background-color: #f5f5f5;
  border-radius: 2px;
}
.breadcrumb > li {
  display: inline-block;
}
.breadcrumb > li + li:before {
  content: "/\00a0";
  padding: 0 5px;
  color: #5e5e5e;
}
.breadcrumb > .active {
  color: #777777;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 18px 0;
  border-radius: 2px;
}
.pagination > li {
  display: inline;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  line-height: 1.42857143;
  text-decoration: none;
  color: #337ab7;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-left: -1px;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
}
.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  z-index: 2;
  color: #23527c;
  background-color: #eeeeee;
  border-color: #ddd;
}
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 3;
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
  cursor: default;
}
.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
  color: #777777;
  background-color: #fff;
  border-color: #ddd;
  cursor: not-allowed;
}
.pagination-lg > li > a,
.pagination-lg > li > span {
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
}
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-bottom-left-radius: 1px;
  border-top-left-radius: 1px;
}
.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
  border-bottom-right-radius: 1px;
  border-top-right-radius: 1px;
}
.pager {
  padding-left: 0;
  margin: 18px 0;
  list-style: none;
  text-align: center;
}
.pager li {
  display: inline;
}
.pager li > a,
.pager li > span {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
}
.pager li > a:hover,
.pager li > a:focus {
  text-decoration: none;
  background-color: #eeeeee;
}
.pager .next > a,
.pager .next > span {
  float: right;
}
.pager .previous > a,
.pager .previous > span {
  float: left;
}
.pager .disabled > a,
.pager .disabled > a:hover,
.pager .disabled > a:focus,
.pager .disabled > span {
  color: #777777;
  background-color: #fff;
  cursor: not-allowed;
}
.label {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 75%;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}
a.label:hover,
a.label:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.label:empty {
  display: none;
}
.btn .label {
  position: relative;
  top: -1px;
}
.label-default {
  background-color: #777777;
}
.label-default[href]:hover,
.label-default[href]:focus {
  background-color: #5e5e5e;
}
.label-primary {
  background-color: #337ab7;
}
.label-primary[href]:hover,
.label-primary[href]:focus {
  background-color: #286090;
}
.label-success {
  background-color: #5cb85c;
}
.label-success[href]:hover,
.label-success[href]:focus {
  background-color: #449d44;
}
.label-info {
  background-color: #5bc0de;
}
.label-info[href]:hover,
.label-info[href]:focus {
  background-color: #31b0d5;
}
.label-warning {
  background-color: #f0ad4e;
}
.label-warning[href]:hover,
.label-warning[href]:focus {
  background-color: #ec971f;
}
.label-danger {
  background-color: #d9534f;
}
.label-danger[href]:hover,
.label-danger[href]:focus {
  background-color: #c9302c;
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  line-height: 1;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
  background-color: #777777;
  border-radius: 10px;
}
.badge:empty {
  display: none;
}
.btn .badge {
  position: relative;
  top: -1px;
}
.btn-xs .badge,
.btn-group-xs > .btn .badge {
  top: 0;
  padding: 1px 5px;
}
a.badge:hover,
a.badge:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.list-group-item.active > .badge,
.nav-pills > .active > a > .badge {
  color: #337ab7;
  background-color: #fff;
}
.list-group-item > .badge {
  float: right;
}
.list-group-item > .badge + .badge {
  margin-right: 5px;
}
.nav-pills > li > a > .badge {
  margin-left: 3px;
}
.jumbotron {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  color: inherit;
  background-color: #eeeeee;
}
.jumbotron h1,
.jumbotron .h1 {
  color: inherit;
}
.jumbotron p {
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 200;
}
.jumbotron > hr {
  border-top-color: #d5d5d5;
}
.container .jumbotron,
.container-fluid .jumbotron {
  border-radius: 3px;
  padding-left: 0px;
  padding-right: 0px;
}
.jumbotron .container {
  max-width: 100%;
}
@media screen and (min-width: 768px) {
  .jumbotron {
    padding-top: 48px;
    padding-bottom: 48px;
  }
  .container .jumbotron,
  .container-fluid .jumbotron {
    padding-left: 60px;
    padding-right: 60px;
  }
  .jumbotron h1,
  .jumbotron .h1 {
    font-size: 59px;
  }
}
.thumbnail {
  display: block;
  padding: 4px;
  margin-bottom: 18px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  -webkit-transition: border 0.2s ease-in-out;
  -o-transition: border 0.2s ease-in-out;
  transition: border 0.2s ease-in-out;
}
.thumbnail > img,
.thumbnail a > img {
  margin-left: auto;
  margin-right: auto;
}
a.thumbnail:hover,
a.thumbnail:focus,
a.thumbnail.active {
  border-color: #337ab7;
}
.thumbnail .caption {
  padding: 9px;
  color: #000;
}
.alert {
  padding: 15px;
  margin-bottom: 18px;
  border: 1px solid transparent;
  border-radius: 2px;
}
.alert h4 {
  margin-top: 0;
  color: inherit;
}
.alert .alert-link {
  font-weight: bold;
}
.alert > p,
.alert > ul {
  margin-bottom: 0;
}
.alert > p + p {
  margin-top: 5px;
}
.alert-dismissable,
.alert-dismissible {
  padding-right: 35px;
}
.alert-dismissable .close,
.alert-dismissible .close {
  position: relative;
  top: -2px;
  right: -21px;
  color: inherit;
}
.alert-success {
  background-color: #dff0d8;
  border-color: #d6e9c6;
  color: #3c763d;
}
.alert-success hr {
  border-top-color: #c9e2b3;
}
.alert-success .alert-link {
  color: #2b542c;
}
.alert-info {
  background-color: #d9edf7;
  border-color: #bce8f1;
  color: #31708f;
}
.alert-info hr {
  border-top-color: #a6e1ec;
}
.alert-info .alert-link {
  color: #245269;
}
.alert-warning {
  background-color: #fcf8e3;
  border-color: #faebcc;
  color: #8a6d3b;
}
.alert-warning hr {
  border-top-color: #f7e1b5;
}
.alert-warning .alert-link {
  color: #66512c;
}
.alert-danger {
  background-color: #f2dede;
  border-color: #ebccd1;
  color: #a94442;
}
.alert-danger hr {
  border-top-color: #e4b9c0;
}
.alert-danger .alert-link {
  color: #843534;
}
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
.progress {
  overflow: hidden;
  height: 18px;
  margin-bottom: 18px;
  background-color: #f5f5f5;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}
.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  text-align: center;
  background-color: #337ab7;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: width 0.6s ease;
  -o-transition: width 0.6s ease;
  transition: width 0.6s ease;
}
.progress-striped .progress-bar,
.progress-bar-striped {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
}
.progress.active .progress-bar,
.progress-bar.active {
  -webkit-animation: progress-bar-stripes 2s linear infinite;
  -o-animation: progress-bar-stripes 2s linear infinite;
  animation: progress-bar-stripes 2s linear infinite;
}
.progress-bar-success {
  background-color: #5cb85c;
}
.progress-striped .progress-bar-success {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-info {
  background-color: #5bc0de;
}
.progress-striped .progress-bar-info {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-warning {
  background-color: #f0ad4e;
}
.progress-striped .progress-bar-warning {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-danger {
  background-color: #d9534f;
}
.progress-striped .progress-bar-danger {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.media {
  margin-top: 15px;
}
.media:first-child {
  margin-top: 0;
}
.media,
.media-body {
  zoom: 1;
  overflow: hidden;
}
.media-body {
  width: 10000px;
}
.media-object {
  display: block;
}
.media-object.img-thumbnail {
  max-width: none;
}
.media-right,
.media > .pull-right {
  padding-left: 10px;
}
.media-left,
.media > .pull-left {
  padding-right: 10px;
}
.media-left,
.media-right,
.media-body {
  display: table-cell;
  vertical-align: top;
}
.media-middle {
  vertical-align: middle;
}
.media-bottom {
  vertical-align: bottom;
}
.media-heading {
  margin-top: 0;
  margin-bottom: 5px;
}
.media-list {
  padding-left: 0;
  list-style: none;
}
.list-group {
  margin-bottom: 20px;
  padding-left: 0;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
}
.list-group-item:first-child {
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
}
.list-group-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
a.list-group-item,
button.list-group-item {
  color: #555;
}
a.list-group-item .list-group-item-heading,
button.list-group-item .list-group-item-heading {
  color: #333;
}
a.list-group-item:hover,
button.list-group-item:hover,
a.list-group-item:focus,
button.list-group-item:focus {
  text-decoration: none;
  color: #555;
  background-color: #f5f5f5;
}
button.list-group-item {
  width: 100%;
  text-align: left;
}
.list-group-item.disabled,
.list-group-item.disabled:hover,
.list-group-item.disabled:focus {
  background-color: #eeeeee;
  color: #777777;
  cursor: not-allowed;
}
.list-group-item.disabled .list-group-item-heading,
.list-group-item.disabled:hover .list-group-item-heading,
.list-group-item.disabled:focus .list-group-item-heading {
  color: inherit;
}
.list-group-item.disabled .list-group-item-text,
.list-group-item.disabled:hover .list-group-item-text,
.list-group-item.disabled:focus .list-group-item-text {
  color: #777777;
}
.list-group-item.active,
.list-group-item.active:hover,
.list-group-item.active:focus {
  z-index: 2;
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}
.list-group-item.active .list-group-item-heading,
.list-group-item.active:hover .list-group-item-heading,
.list-group-item.active:focus .list-group-item-heading,
.list-group-item.active .list-group-item-heading > small,
.list-group-item.active:hover .list-group-item-heading > small,
.list-group-item.active:focus .list-group-item-heading > small,
.list-group-item.active .list-group-item-heading > .small,
.list-group-item.active:hover .list-group-item-heading > .small,
.list-group-item.active:focus .list-group-item-heading > .small {
  color: inherit;
}
.list-group-item.active .list-group-item-text,
.list-group-item.active:hover .list-group-item-text,
.list-group-item.active:focus .list-group-item-text {
  color: #c7ddef;
}
.list-group-item-success {
  color: #3c763d;
  background-color: #dff0d8;
}
a.list-group-item-success,
button.list-group-item-success {
  color: #3c763d;
}
a.list-group-item-success .list-group-item-heading,
button.list-group-item-success .list-group-item-heading {
  color: inherit;
}
a.list-group-item-success:hover,
button.list-group-item-success:hover,
a.list-group-item-success:focus,
button.list-group-item-success:focus {
  color: #3c763d;
  background-color: #d0e9c6;
}
a.list-group-item-success.active,
button.list-group-item-success.active,
a.list-group-item-success.active:hover,
button.list-group-item-success.active:hover,
a.list-group-item-success.active:focus,
button.list-group-item-success.active:focus {
  color: #fff;
  background-color: #3c763d;
  border-color: #3c763d;
}
.list-group-item-info {
  color: #31708f;
  background-color: #d9edf7;
}
a.list-group-item-info,
button.list-group-item-info {
  color: #31708f;
}
a.list-group-item-info .list-group-item-heading,
button.list-group-item-info .list-group-item-heading {
  color: inherit;
}
a.list-group-item-info:hover,
button.list-group-item-info:hover,
a.list-group-item-info:focus,
button.list-group-item-info:focus {
  color: #31708f;
  background-color: #c4e3f3;
}
a.list-group-item-info.active,
button.list-group-item-info.active,
a.list-group-item-info.active:hover,
button.list-group-item-info.active:hover,
a.list-group-item-info.active:focus,
button.list-group-item-info.active:focus {
  color: #fff;
  background-color: #31708f;
  border-color: #31708f;
}
.list-group-item-warning {
  color: #8a6d3b;
  background-color: #fcf8e3;
}
a.list-group-item-warning,
button.list-group-item-warning {
  color: #8a6d3b;
}
a.list-group-item-warning .list-group-item-heading,
button.list-group-item-warning .list-group-item-heading {
  color: inherit;
}
a.list-group-item-warning:hover,
button.list-group-item-warning:hover,
a.list-group-item-warning:focus,
button.list-group-item-warning:focus {
  color: #8a6d3b;
  background-color: #faf2cc;
}
a.list-group-item-warning.active,
button.list-group-item-warning.active,
a.list-group-item-warning.active:hover,
button.list-group-item-warning.active:hover,
a.list-group-item-warning.active:focus,
button.list-group-item-warning.active:focus {
  color: #fff;
  background-color: #8a6d3b;
  border-color: #8a6d3b;
}
.list-group-item-danger {
  color: #a94442;
  background-color: #f2dede;
}
a.list-group-item-danger,
button.list-group-item-danger {
  color: #a94442;
}
a.list-group-item-danger .list-group-item-heading,
button.list-group-item-danger .list-group-item-heading {
  color: inherit;
}
a.list-group-item-danger:hover,
button.list-group-item-danger:hover,
a.list-group-item-danger:focus,
button.list-group-item-danger:focus {
  color: #a94442;
  background-color: #ebcccc;
}
a.list-group-item-danger.active,
button.list-group-item-danger.active,
a.list-group-item-danger.active:hover,
button.list-group-item-danger.active:hover,
a.list-group-item-danger.active:focus,
button.list-group-item-danger.active:focus {
  color: #fff;
  background-color: #a94442;
  border-color: #a94442;
}
.list-group-item-heading {
  margin-top: 0;
  margin-bottom: 5px;
}
.list-group-item-text {
  margin-bottom: 0;
  line-height: 1.3;
}
.panel {
  margin-bottom: 18px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.panel-body {
  padding: 15px;
}
.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
.panel-heading > .dropdown .dropdown-toggle {
  color: inherit;
}
.panel-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 15px;
  color: inherit;
}
.panel-title > a,
.panel-title > small,
.panel-title > .small,
.panel-title > small > a,
.panel-title > .small > a {
  color: inherit;
}
.panel-footer {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}
.panel > .list-group,
.panel > .panel-collapse > .list-group {
  margin-bottom: 0;
}
.panel > .list-group .list-group-item,
.panel > .panel-collapse > .list-group .list-group-item {
  border-width: 1px 0;
  border-radius: 0;
}
.panel > .list-group:first-child .list-group-item:first-child,
.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {
  border-top: 0;
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
.panel > .list-group:last-child .list-group-item:last-child,
.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {
  border-bottom: 0;
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}
.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.panel-heading + .list-group .list-group-item:first-child {
  border-top-width: 0;
}
.list-group + .panel-footer {
  border-top-width: 0;
}
.panel > .table,
.panel > .table-responsive > .table,
.panel > .panel-collapse > .table {
  margin-bottom: 0;
}
.panel > .table caption,
.panel > .table-responsive > .table caption,
.panel > .panel-collapse > .table caption {
  padding-left: 15px;
  padding-right: 15px;
}
.panel > .table:first-child,
.panel > .table-responsive:first-child > .table:first-child {
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
.panel > .table:first-child > thead:first-child > tr:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
}
.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,
.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {
  border-top-left-radius: 1px;
}
.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,
.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,
.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,
.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {
  border-top-right-radius: 1px;
}
.panel > .table:last-child,
.panel > .table-responsive:last-child > .table:last-child {
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {
  border-bottom-left-radius: 1px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {
  border-bottom-right-radius: 1px;
}
.panel > .panel-body + .table,
.panel > .panel-body + .table-responsive,
.panel > .table + .panel-body,
.panel > .table-responsive + .panel-body {
  border-top: 1px solid #ddd;
}
.panel > .table > tbody:first-child > tr:first-child th,
.panel > .table > tbody:first-child > tr:first-child td {
  border-top: 0;
}
.panel > .table-bordered,
.panel > .table-responsive > .table-bordered {
  border: 0;
}
.panel > .table-bordered > thead > tr > th:first-child,
.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,
.panel > .table-bordered > tbody > tr > th:first-child,
.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,
.panel > .table-bordered > tfoot > tr > th:first-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,
.panel > .table-bordered > thead > tr > td:first-child,
.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,
.panel > .table-bordered > tbody > tr > td:first-child,
.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,
.panel > .table-bordered > tfoot > tr > td:first-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {
  border-left: 0;
}
.panel > .table-bordered > thead > tr > th:last-child,
.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,
.panel > .table-bordered > tbody > tr > th:last-child,
.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,
.panel > .table-bordered > tfoot > tr > th:last-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,
.panel > .table-bordered > thead > tr > td:last-child,
.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,
.panel > .table-bordered > tbody > tr > td:last-child,
.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,
.panel > .table-bordered > tfoot > tr > td:last-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {
  border-right: 0;
}
.panel > .table-bordered > thead > tr:first-child > td,
.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,
.panel > .table-bordered > tbody > tr:first-child > td,
.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,
.panel > .table-bordered > thead > tr:first-child > th,
.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,
.panel > .table-bordered > tbody > tr:first-child > th,
.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {
  border-bottom: 0;
}
.panel > .table-bordered > tbody > tr:last-child > td,
.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,
.panel > .table-bordered > tfoot > tr:last-child > td,
.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,
.panel > .table-bordered > tbody > tr:last-child > th,
.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,
.panel > .table-bordered > tfoot > tr:last-child > th,
.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {
  border-bottom: 0;
}
.panel > .table-responsive {
  border: 0;
  margin-bottom: 0;
}
.panel-group {
  margin-bottom: 18px;
}
.panel-group .panel {
  margin-bottom: 0;
  border-radius: 2px;
}
.panel-group .panel + .panel {
  margin-top: 5px;
}
.panel-group .panel-heading {
  border-bottom: 0;
}
.panel-group .panel-heading + .panel-collapse > .panel-body,
.panel-group .panel-heading + .panel-collapse > .list-group {
  border-top: 1px solid #ddd;
}
.panel-group .panel-footer {
  border-top: 0;
}
.panel-group .panel-footer + .panel-collapse .panel-body {
  border-bottom: 1px solid #ddd;
}
.panel-default {
  border-color: #ddd;
}
.panel-default > .panel-heading {
  color: #333333;
  background-color: #f5f5f5;
  border-color: #ddd;
}
.panel-default > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #ddd;
}
.panel-default > .panel-heading .badge {
  color: #f5f5f5;
  background-color: #333333;
}
.panel-default > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #ddd;
}
.panel-primary {
  border-color: #337ab7;
}
.panel-primary > .panel-heading {
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}
.panel-primary > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #337ab7;
}
.panel-primary > .panel-heading .badge {
  color: #337ab7;
  background-color: #fff;
}
.panel-primary > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #337ab7;
}
.panel-success {
  border-color: #d6e9c6;
}
.panel-success > .panel-heading {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
.panel-success > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #d6e9c6;
}
.panel-success > .panel-heading .badge {
  color: #dff0d8;
  background-color: #3c763d;
}
.panel-success > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #d6e9c6;
}
.panel-info {
  border-color: #bce8f1;
}
.panel-info > .panel-heading {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
.panel-info > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #bce8f1;
}
.panel-info > .panel-heading .badge {
  color: #d9edf7;
  background-color: #31708f;
}
.panel-info > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #bce8f1;
}
.panel-warning {
  border-color: #faebcc;
}
.panel-warning > .panel-heading {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
.panel-warning > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #faebcc;
}
.panel-warning > .panel-heading .badge {
  color: #fcf8e3;
  background-color: #8a6d3b;
}
.panel-warning > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #faebcc;
}
.panel-danger {
  border-color: #ebccd1;
}
.panel-danger > .panel-heading {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
.panel-danger > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #ebccd1;
}
.panel-danger > .panel-heading .badge {
  color: #f2dede;
  background-color: #a94442;
}
.panel-danger > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #ebccd1;
}
.embed-responsive {
  position: relative;
  display: block;
  height: 0;
  padding: 0;
  overflow: hidden;
}
.embed-responsive .embed-responsive-item,
.embed-responsive iframe,
.embed-responsive embed,
.embed-responsive object,
.embed-responsive video {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  border: 0;
}
.embed-responsive-16by9 {
  padding-bottom: 56.25%;
}
.embed-responsive-4by3 {
  padding-bottom: 75%;
}
.well {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
}
.well blockquote {
  border-color: #ddd;
  border-color: rgba(0, 0, 0, 0.15);
}
.well-lg {
  padding: 24px;
  border-radius: 3px;
}
.well-sm {
  padding: 9px;
  border-radius: 1px;
}
.close {
  float: right;
  font-size: 19.5px;
  font-weight: bold;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.2;
  filter: alpha(opacity=20);
}
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.5;
  filter: alpha(opacity=50);
}
button.close {
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  -webkit-appearance: none;
}
.modal-open {
  overflow: hidden;
}
.modal {
  display: none;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}
.modal.fade .modal-dialog {
  -webkit-transform: translate(0, -25%);
  -ms-transform: translate(0, -25%);
  -o-transform: translate(0, -25%);
  transform: translate(0, -25%);
  -webkit-transition: -webkit-transform 0.3s ease-out;
  -moz-transition: -moz-transform 0.3s ease-out;
  -o-transition: -o-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
}
.modal.in .modal-dialog {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
}
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}
.modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid #999;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  outline: 0;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: #000;
}
.modal-backdrop.fade {
  opacity: 0;
  filter: alpha(opacity=0);
}
.modal-backdrop.in {
  opacity: 0.5;
  filter: alpha(opacity=50);
}
.modal-header {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.modal-header .close {
  margin-top: -2px;
}
.modal-title {
  margin: 0;
  line-height: 1.42857143;
}
.modal-body {
  position: relative;
  padding: 15px;
}
.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}
.modal-footer .btn + .btn {
  margin-left: 5px;
  margin-bottom: 0;
}
.modal-footer .btn-group .btn + .btn {
  margin-left: -1px;
}
.modal-footer .btn-block + .btn-block {
  margin-left: 0;
}
.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}
@media (min-width: 768px) {
  .modal-dialog {
    width: 600px;
    margin: 30px auto;
  }
  .modal-content {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }
  .modal-sm {
    width: 300px;
  }
}
@media (min-width: 992px) {
  .modal-lg {
    width: 900px;
  }
}
.tooltip {
  position: absolute;
  z-index: 1070;
  display: block;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-break: auto;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 12px;
  opacity: 0;
  filter: alpha(opacity=0);
}
.tooltip.in {
  opacity: 0.9;
  filter: alpha(opacity=90);
}
.tooltip.top {
  margin-top: -3px;
  padding: 5px 0;
}
.tooltip.right {
  margin-left: 3px;
  padding: 0 5px;
}
.tooltip.bottom {
  margin-top: 3px;
  padding: 5px 0;
}
.tooltip.left {
  margin-left: -3px;
  padding: 0 5px;
}
.tooltip-inner {
  max-width: 200px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  background-color: #000;
  border-radius: 2px;
}
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.tooltip.top .tooltip-arrow {
  bottom: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.top-left .tooltip-arrow {
  bottom: 0;
  right: 5px;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.top-right .tooltip-arrow {
  bottom: 0;
  left: 5px;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.right .tooltip-arrow {
  top: 50%;
  left: 0;
  margin-top: -5px;
  border-width: 5px 5px 5px 0;
  border-right-color: #000;
}
.tooltip.left .tooltip-arrow {
  top: 50%;
  right: 0;
  margin-top: -5px;
  border-width: 5px 0 5px 5px;
  border-left-color: #000;
}
.tooltip.bottom .tooltip-arrow {
  top: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.tooltip.bottom-left .tooltip-arrow {
  top: 0;
  right: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.tooltip.bottom-right .tooltip-arrow {
  top: 0;
  left: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.popover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1060;
  display: none;
  max-width: 276px;
  padding: 1px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-break: auto;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 13px;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.popover.top {
  margin-top: -10px;
}
.popover.right {
  margin-left: 10px;
}
.popover.bottom {
  margin-top: 10px;
}
.popover.left {
  margin-left: -10px;
}
.popover-title {
  margin: 0;
  padding: 8px 14px;
  font-size: 13px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ebebeb;
  border-radius: 2px 2px 0 0;
}
.popover-content {
  padding: 9px 14px;
}
.popover > .arrow,
.popover > .arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.popover > .arrow {
  border-width: 11px;
}
.popover > .arrow:after {
  border-width: 10px;
  content: "";
}
.popover.top > .arrow {
  left: 50%;
  margin-left: -11px;
  border-bottom-width: 0;
  border-top-color: #999999;
  border-top-color: rgba(0, 0, 0, 0.25);
  bottom: -11px;
}
.popover.top > .arrow:after {
  content: " ";
  bottom: 1px;
  margin-left: -10px;
  border-bottom-width: 0;
  border-top-color: #fff;
}
.popover.right > .arrow {
  top: 50%;
  left: -11px;
  margin-top: -11px;
  border-left-width: 0;
  border-right-color: #999999;
  border-right-color: rgba(0, 0, 0, 0.25);
}
.popover.right > .arrow:after {
  content: " ";
  left: 1px;
  bottom: -10px;
  border-left-width: 0;
  border-right-color: #fff;
}
.popover.bottom > .arrow {
  left: 50%;
  margin-left: -11px;
  border-top-width: 0;
  border-bottom-color: #999999;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  top: -11px;
}
.popover.bottom > .arrow:after {
  content: " ";
  top: 1px;
  margin-left: -10px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
.popover.left > .arrow {
  top: 50%;
  right: -11px;
  margin-top: -11px;
  border-right-width: 0;
  border-left-color: #999999;
  border-left-color: rgba(0, 0, 0, 0.25);
}
.popover.left > .arrow:after {
  content: " ";
  right: 1px;
  border-right-width: 0;
  border-left-color: #fff;
  bottom: -10px;
}
.carousel {
  position: relative;
}
.carousel-inner {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.carousel-inner > .item {
  display: none;
  position: relative;
  -webkit-transition: 0.6s ease-in-out left;
  -o-transition: 0.6s ease-in-out left;
  transition: 0.6s ease-in-out left;
}
.carousel-inner > .item > img,
.carousel-inner > .item > a > img {
  line-height: 1;
}
@media all and (transform-3d), (-webkit-transform-3d) {
  .carousel-inner > .item {
    -webkit-transition: -webkit-transform 0.6s ease-in-out;
    -moz-transition: -moz-transform 0.6s ease-in-out;
    -o-transition: -o-transform 0.6s ease-in-out;
    transition: transform 0.6s ease-in-out;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000px;
    -moz-perspective: 1000px;
    perspective: 1000px;
  }
  .carousel-inner > .item.next,
  .carousel-inner > .item.active.right {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    left: 0;
  }
  .carousel-inner > .item.prev,
  .carousel-inner > .item.active.left {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    left: 0;
  }
  .carousel-inner > .item.next.left,
  .carousel-inner > .item.prev.right,
  .carousel-inner > .item.active {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    left: 0;
  }
}
.carousel-inner > .active,
.carousel-inner > .next,
.carousel-inner > .prev {
  display: block;
}
.carousel-inner > .active {
  left: 0;
}
.carousel-inner > .next,
.carousel-inner > .prev {
  position: absolute;
  top: 0;
  width: 100%;
}
.carousel-inner > .next {
  left: 100%;
}
.carousel-inner > .prev {
  left: -100%;
}
.carousel-inner > .next.left,
.carousel-inner > .prev.right {
  left: 0;
}
.carousel-inner > .active.left {
  left: -100%;
}
.carousel-inner > .active.right {
  left: 100%;
}
.carousel-control {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 15%;
  opacity: 0.5;
  filter: alpha(opacity=50);
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  background-color: rgba(0, 0, 0, 0);
}
.carousel-control.left {
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);
  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);
}
.carousel-control.right {
  left: auto;
  right: 0;
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);
}
.carousel-control:hover,
.carousel-control:focus {
  outline: 0;
  color: #fff;
  text-decoration: none;
  opacity: 0.9;
  filter: alpha(opacity=90);
}
.carousel-control .icon-prev,
.carousel-control .icon-next,
.carousel-control .glyphicon-chevron-left,
.carousel-control .glyphicon-chevron-right {
  position: absolute;
  top: 50%;
  margin-top: -10px;
  z-index: 5;
  display: inline-block;
}
.carousel-control .icon-prev,
.carousel-control .glyphicon-chevron-left {
  left: 50%;
  margin-left: -10px;
}
.carousel-control .icon-next,
.carousel-control .glyphicon-chevron-right {
  right: 50%;
  margin-right: -10px;
}
.carousel-control .icon-prev,
.carousel-control .icon-next {
  width: 20px;
  height: 20px;
  line-height: 1;
  font-family: serif;
}
.carousel-control .icon-prev:before {
  content: '\2039';
}
.carousel-control .icon-next:before {
  content: '\203a';
}
.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  z-index: 15;
  width: 60%;
  margin-left: -30%;
  padding-left: 0;
  list-style: none;
  text-align: center;
}
.carousel-indicators li {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 1px;
  text-indent: -999px;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  background-color: #000 \9;
  background-color: rgba(0, 0, 0, 0);
}
.carousel-indicators .active {
  margin: 0;
  width: 12px;
  height: 12px;
  background-color: #fff;
}
.carousel-caption {
  position: absolute;
  left: 15%;
  right: 15%;
  bottom: 20px;
  z-index: 10;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}
.carousel-caption .btn {
  text-shadow: none;
}
@media screen and (min-width: 768px) {
  .carousel-control .glyphicon-chevron-left,
  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-prev,
  .carousel-control .icon-next {
    width: 30px;
    height: 30px;
    margin-top: -10px;
    font-size: 30px;
  }
  .carousel-control .glyphicon-chevron-left,
  .carousel-control .icon-prev {
    margin-left: -10px;
  }
  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-next {
    margin-right: -10px;
  }
  .carousel-caption {
    left: 20%;
    right: 20%;
    padding-bottom: 30px;
  }
  .carousel-indicators {
    bottom: 20px;
  }
}
.clearfix:before,
.clearfix:after,
.dl-horizontal dd:before,
.dl-horizontal dd:after,
.container:before,
.container:after,
.container-fluid:before,
.container-fluid:after,
.row:before,
.row:after,
.form-horizontal .form-group:before,
.form-horizontal .form-group:after,
.btn-toolbar:before,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:before,
.btn-group-vertical > .btn-group:after,
.nav:before,
.nav:after,
.navbar:before,
.navbar:after,
.navbar-header:before,
.navbar-header:after,
.navbar-collapse:before,
.navbar-collapse:after,
.pager:before,
.pager:after,
.panel-body:before,
.panel-body:after,
.modal-header:before,
.modal-header:after,
.modal-footer:before,
.modal-footer:after,
.item_buttons:before,
.item_buttons:after {
  content: " ";
  display: table;
}
.clearfix:after,
.dl-horizontal dd:after,
.container:after,
.container-fluid:after,
.row:after,
.form-horizontal .form-group:after,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:after,
.nav:after,
.navbar:after,
.navbar-header:after,
.navbar-collapse:after,
.pager:after,
.panel-body:after,
.modal-header:after,
.modal-footer:after,
.item_buttons:after {
  clear: both;
}
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.pull-right {
  float: right !important;
}
.pull-left {
  float: left !important;
}
.hide {
  display: none !important;
}
.show {
  display: block !important;
}
.invisible {
  visibility: hidden;
}
.text-hide {
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
.hidden {
  display: none !important;
}
.affix {
  position: fixed;
}
@-ms-viewport {
  width: device-width;
}
.visible-xs,
.visible-sm,
.visible-md,
.visible-lg {
  display: none !important;
}
.visible-xs-block,
.visible-xs-inline,
.visible-xs-inline-block,
.visible-sm-block,
.visible-sm-inline,
.visible-sm-inline-block,
.visible-md-block,
.visible-md-inline,
.visible-md-inline-block,
.visible-lg-block,
.visible-lg-inline,
.visible-lg-inline-block {
  display: none !important;
}
@media (max-width: 767px) {
  .visible-xs {
    display: block !important;
  }
  table.visible-xs {
    display: table !important;
  }
  tr.visible-xs {
    display: table-row !important;
  }
  th.visible-xs,
  td.visible-xs {
    display: table-cell !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-block {
    display: block !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline {
    display: inline !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm {
    display: block !important;
  }
  table.visible-sm {
    display: table !important;
  }
  tr.visible-sm {
    display: table-row !important;
  }
  th.visible-sm,
  td.visible-sm {
    display: table-cell !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-block {
    display: block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline {
    display: inline !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md {
    display: block !important;
  }
  table.visible-md {
    display: table !important;
  }
  tr.visible-md {
    display: table-row !important;
  }
  th.visible-md,
  td.visible-md {
    display: table-cell !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-block {
    display: block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline {
    display: inline !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg {
    display: block !important;
  }
  table.visible-lg {
    display: table !important;
  }
  tr.visible-lg {
    display: table-row !important;
  }
  th.visible-lg,
  td.visible-lg {
    display: table-cell !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-block {
    display: block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline {
    display: inline !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline-block {
    display: inline-block !important;
  }
}
@media (max-width: 767px) {
  .hidden-xs {
    display: none !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .hidden-sm {
    display: none !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .hidden-md {
    display: none !important;
  }
}
@media (min-width: 1200px) {
  .hidden-lg {
    display: none !important;
  }
}
.visible-print {
  display: none !important;
}
@media print {
  .visible-print {
    display: block !important;
  }
  table.visible-print {
    display: table !important;
  }
  tr.visible-print {
    display: table-row !important;
  }
  th.visible-print,
  td.visible-print {
    display: table-cell !important;
  }
}
.visible-print-block {
  display: none !important;
}
@media print {
  .visible-print-block {
    display: block !important;
  }
}
.visible-print-inline {
  display: none !important;
}
@media print {
  .visible-print-inline {
    display: inline !important;
  }
}
.visible-print-inline-block {
  display: none !important;
}
@media print {
  .visible-print-inline-block {
    display: inline-block !important;
  }
}
@media print {
  .hidden-print {
    display: none !important;
  }
}
/*!
*
* Font Awesome
*
*/
/*!
 *  Font Awesome 4.2.0 by @davegandy - http://fontawesome.io - @fontawesome
 *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
 */
/* FONT PATH
 * -------------------------- */
@font-face {
  font-family: 'FontAwesome';
  src: url('../components/font-awesome/fonts/fontawesome-webfont.eot?v=4.2.0');
  src: url('../components/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.2.0') format('embedded-opentype'), url('../components/font-awesome/fonts/fontawesome-webfont.woff?v=4.2.0') format('woff'), url('../components/font-awesome/fonts/fontawesome-webfont.ttf?v=4.2.0') format('truetype'), url('../components/font-awesome/fonts/fontawesome-webfont.svg?v=4.2.0#fontawesomeregular') format('svg');
  font-weight: normal;
  font-style: normal;
}
.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* makes the font 33% larger relative to the icon container */
.fa-lg {
  font-size: 1.33333333em;
  line-height: 0.75em;
  vertical-align: -15%;
}
.fa-2x {
  font-size: 2em;
}
.fa-3x {
  font-size: 3em;
}
.fa-4x {
  font-size: 4em;
}
.fa-5x {
  font-size: 5em;
}
.fa-fw {
  width: 1.28571429em;
  text-align: center;
}
.fa-ul {
  padding-left: 0;
  margin-left: 2.14285714em;
  list-style-type: none;
}
.fa-ul > li {
  position: relative;
}
.fa-li {
  position: absolute;
  left: -2.14285714em;
  width: 2.14285714em;
  top: 0.14285714em;
  text-align: center;
}
.fa-li.fa-lg {
  left: -1.85714286em;
}
.fa-border {
  padding: .2em .25em .15em;
  border: solid 0.08em #eee;
  border-radius: .1em;
}
.pull-right {
  float: right;
}
.pull-left {
  float: left;
}
.fa.pull-left {
  margin-right: .3em;
}
.fa.pull-right {
  margin-left: .3em;
}
.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
.fa-rotate-90 {
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.fa-rotate-180 {
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.fa-rotate-270 {
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.fa-flip-horizontal {
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);
  -webkit-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}
.fa-flip-vertical {
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);
  -webkit-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
:root .fa-rotate-90,
:root .fa-rotate-180,
:root .fa-rotate-270,
:root .fa-flip-horizontal,
:root .fa-flip-vertical {
  filter: none;
}
.fa-stack {
  position: relative;
  display: inline-block;
  width: 2em;
  height: 2em;
  line-height: 2em;
  vertical-align: middle;
}
.fa-stack-1x,
.fa-stack-2x {
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
}
.fa-stack-1x {
  line-height: inherit;
}
.fa-stack-2x {
  font-size: 2em;
}
.fa-inverse {
  color: #fff;
}
/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen
   readers do not read off random characters that represent icons */
.fa-glass:before {
  content: "\f000";
}
.fa-music:before {
  content: "\f001";
}
.fa-search:before {
  content: "\f002";
}
.fa-envelope-o:before {
  content: "\f003";
}
.fa-heart:before {
  content: "\f004";
}
.fa-star:before {
  content: "\f005";
}
.fa-star-o:before {
  content: "\f006";
}
.fa-user:before {
  content: "\f007";
}
.fa-film:before {
  content: "\f008";
}
.fa-th-large:before {
  content: "\f009";
}
.fa-th:before {
  content: "\f00a";
}
.fa-th-list:before {
  content: "\f00b";
}
.fa-check:before {
  content: "\f00c";
}
.fa-remove:before,
.fa-close:before,
.fa-times:before {
  content: "\f00d";
}
.fa-search-plus:before {
  content: "\f00e";
}
.fa-search-minus:before {
  content: "\f010";
}
.fa-power-off:before {
  content: "\f011";
}
.fa-signal:before {
  content: "\f012";
}
.fa-gear:before,
.fa-cog:before {
  content: "\f013";
}
.fa-trash-o:before {
  content: "\f014";
}
.fa-home:before {
  content: "\f015";
}
.fa-file-o:before {
  content: "\f016";
}
.fa-clock-o:before {
  content: "\f017";
}
.fa-road:before {
  content: "\f018";
}
.fa-download:before {
  content: "\f019";
}
.fa-arrow-circle-o-down:before {
  content: "\f01a";
}
.fa-arrow-circle-o-up:before {
  content: "\f01b";
}
.fa-inbox:before {
  content: "\f01c";
}
.fa-play-circle-o:before {
  content: "\f01d";
}
.fa-rotate-right:before,
.fa-repeat:before {
  content: "\f01e";
}
.fa-refresh:before {
  content: "\f021";
}
.fa-list-alt:before {
  content: "\f022";
}
.fa-lock:before {
  content: "\f023";
}
.fa-flag:before {
  content: "\f024";
}
.fa-headphones:before {
  content: "\f025";
}
.fa-volume-off:before {
  content: "\f026";
}
.fa-volume-down:before {
  content: "\f027";
}
.fa-volume-up:before {
  content: "\f028";
}
.fa-qrcode:before {
  content: "\f029";
}
.fa-barcode:before {
  content: "\f02a";
}
.fa-tag:before {
  content: "\f02b";
}
.fa-tags:before {
  content: "\f02c";
}
.fa-book:before {
  content: "\f02d";
}
.fa-bookmark:before {
  content: "\f02e";
}
.fa-print:before {
  content: "\f02f";
}
.fa-camera:before {
  content: "\f030";
}
.fa-font:before {
  content: "\f031";
}
.fa-bold:before {
  content: "\f032";
}
.fa-italic:before {
  content: "\f033";
}
.fa-text-height:before {
  content: "\f034";
}
.fa-text-width:before {
  content: "\f035";
}
.fa-align-left:before {
  content: "\f036";
}
.fa-align-center:before {
  content: "\f037";
}
.fa-align-right:before {
  content: "\f038";
}
.fa-align-justify:before {
  content: "\f039";
}
.fa-list:before {
  content: "\f03a";
}
.fa-dedent:before,
.fa-outdent:before {
  content: "\f03b";
}
.fa-indent:before {
  content: "\f03c";
}
.fa-video-camera:before {
  content: "\f03d";
}
.fa-photo:before,
.fa-image:before,
.fa-picture-o:before {
  content: "\f03e";
}
.fa-pencil:before {
  content: "\f040";
}
.fa-map-marker:before {
  content: "\f041";
}
.fa-adjust:before {
  content: "\f042";
}
.fa-tint:before {
  content: "\f043";
}
.fa-edit:before,
.fa-pencil-square-o:before {
  content: "\f044";
}
.fa-share-square-o:before {
  content: "\f045";
}
.fa-check-square-o:before {
  content: "\f046";
}
.fa-arrows:before {
  content: "\f047";
}
.fa-step-backward:before {
  content: "\f048";
}
.fa-fast-backward:before {
  content: "\f049";
}
.fa-backward:before {
  content: "\f04a";
}
.fa-play:before {
  content: "\f04b";
}
.fa-pause:before {
  content: "\f04c";
}
.fa-stop:before {
  content: "\f04d";
}
.fa-forward:before {
  content: "\f04e";
}
.fa-fast-forward:before {
  content: "\f050";
}
.fa-step-forward:before {
  content: "\f051";
}
.fa-eject:before {
  content: "\f052";
}
.fa-chevron-left:before {
  content: "\f053";
}
.fa-chevron-right:before {
  content: "\f054";
}
.fa-plus-circle:before {
  content: "\f055";
}
.fa-minus-circle:before {
  content: "\f056";
}
.fa-times-circle:before {
  content: "\f057";
}
.fa-check-circle:before {
  content: "\f058";
}
.fa-question-circle:before {
  content: "\f059";
}
.fa-info-circle:before {
  content: "\f05a";
}
.fa-crosshairs:before {
  content: "\f05b";
}
.fa-times-circle-o:before {
  content: "\f05c";
}
.fa-check-circle-o:before {
  content: "\f05d";
}
.fa-ban:before {
  content: "\f05e";
}
.fa-arrow-left:before {
  content: "\f060";
}
.fa-arrow-right:before {
  content: "\f061";
}
.fa-arrow-up:before {
  content: "\f062";
}
.fa-arrow-down:before {
  content: "\f063";
}
.fa-mail-forward:before,
.fa-share:before {
  content: "\f064";
}
.fa-expand:before {
  content: "\f065";
}
.fa-compress:before {
  content: "\f066";
}
.fa-plus:before {
  content: "\f067";
}
.fa-minus:before {
  content: "\f068";
}
.fa-asterisk:before {
  content: "\f069";
}
.fa-exclamation-circle:before {
  content: "\f06a";
}
.fa-gift:before {
  content: "\f06b";
}
.fa-leaf:before {
  content: "\f06c";
}
.fa-fire:before {
  content: "\f06d";
}
.fa-eye:before {
  content: "\f06e";
}
.fa-eye-slash:before {
  content: "\f070";
}
.fa-warning:before,
.fa-exclamation-triangle:before {
  content: "\f071";
}
.fa-plane:before {
  content: "\f072";
}
.fa-calendar:before {
  content: "\f073";
}
.fa-random:before {
  content: "\f074";
}
.fa-comment:before {
  content: "\f075";
}
.fa-magnet:before {
  content: "\f076";
}
.fa-chevron-up:before {
  content: "\f077";
}
.fa-chevron-down:before {
  content: "\f078";
}
.fa-retweet:before {
  content: "\f079";
}
.fa-shopping-cart:before {
  content: "\f07a";
}
.fa-folder:before {
  content: "\f07b";
}
.fa-folder-open:before {
  content: "\f07c";
}
.fa-arrows-v:before {
  content: "\f07d";
}
.fa-arrows-h:before {
  content: "\f07e";
}
.fa-bar-chart-o:before,
.fa-bar-chart:before {
  content: "\f080";
}
.fa-twitter-square:before {
  content: "\f081";
}
.fa-facebook-square:before {
  content: "\f082";
}
.fa-camera-retro:before {
  content: "\f083";
}
.fa-key:before {
  content: "\f084";
}
.fa-gears:before,
.fa-cogs:before {
  content: "\f085";
}
.fa-comments:before {
  content: "\f086";
}
.fa-thumbs-o-up:before {
  content: "\f087";
}
.fa-thumbs-o-down:before {
  content: "\f088";
}
.fa-star-half:before {
  content: "\f089";
}
.fa-heart-o:before {
  content: "\f08a";
}
.fa-sign-out:before {
  content: "\f08b";
}
.fa-linkedin-square:before {
  content: "\f08c";
}
.fa-thumb-tack:before {
  content: "\f08d";
}
.fa-external-link:before {
  content: "\f08e";
}
.fa-sign-in:before {
  content: "\f090";
}
.fa-trophy:before {
  content: "\f091";
}
.fa-github-square:before {
  content: "\f092";
}
.fa-upload:before {
  content: "\f093";
}
.fa-lemon-o:before {
  content: "\f094";
}
.fa-phone:before {
  content: "\f095";
}
.fa-square-o:before {
  content: "\f096";
}
.fa-bookmark-o:before {
  content: "\f097";
}
.fa-phone-square:before {
  content: "\f098";
}
.fa-twitter:before {
  content: "\f099";
}
.fa-facebook:before {
  content: "\f09a";
}
.fa-github:before {
  content: "\f09b";
}
.fa-unlock:before {
  content: "\f09c";
}
.fa-credit-card:before {
  content: "\f09d";
}
.fa-rss:before {
  content: "\f09e";
}
.fa-hdd-o:before {
  content: "\f0a0";
}
.fa-bullhorn:before {
  content: "\f0a1";
}
.fa-bell:before {
  content: "\f0f3";
}
.fa-certificate:before {
  content: "\f0a3";
}
.fa-hand-o-right:before {
  content: "\f0a4";
}
.fa-hand-o-left:before {
  content: "\f0a5";
}
.fa-hand-o-up:before {
  content: "\f0a6";
}
.fa-hand-o-down:before {
  content: "\f0a7";
}
.fa-arrow-circle-left:before {
  content: "\f0a8";
}
.fa-arrow-circle-right:before {
  content: "\f0a9";
}
.fa-arrow-circle-up:before {
  content: "\f0aa";
}
.fa-arrow-circle-down:before {
  content: "\f0ab";
}
.fa-globe:before {
  content: "\f0ac";
}
.fa-wrench:before {
  content: "\f0ad";
}
.fa-tasks:before {
  content: "\f0ae";
}
.fa-filter:before {
  content: "\f0b0";
}
.fa-briefcase:before {
  content: "\f0b1";
}
.fa-arrows-alt:before {
  content: "\f0b2";
}
.fa-group:before,
.fa-users:before {
  content: "\f0c0";
}
.fa-chain:before,
.fa-link:before {
  content: "\f0c1";
}
.fa-cloud:before {
  content: "\f0c2";
}
.fa-flask:before {
  content: "\f0c3";
}
.fa-cut:before,
.fa-scissors:before {
  content: "\f0c4";
}
.fa-copy:before,
.fa-files-o:before {
  content: "\f0c5";
}
.fa-paperclip:before {
  content: "\f0c6";
}
.fa-save:before,
.fa-floppy-o:before {
  content: "\f0c7";
}
.fa-square:before {
  content: "\f0c8";
}
.fa-navicon:before,
.fa-reorder:before,
.fa-bars:before {
  content: "\f0c9";
}
.fa-list-ul:before {
  content: "\f0ca";
}
.fa-list-ol:before {
  content: "\f0cb";
}
.fa-strikethrough:before {
  content: "\f0cc";
}
.fa-underline:before {
  content: "\f0cd";
}
.fa-table:before {
  content: "\f0ce";
}
.fa-magic:before {
  content: "\f0d0";
}
.fa-truck:before {
  content: "\f0d1";
}
.fa-pinterest:before {
  content: "\f0d2";
}
.fa-pinterest-square:before {
  content: "\f0d3";
}
.fa-google-plus-square:before {
  content: "\f0d4";
}
.fa-google-plus:before {
  content: "\f0d5";
}
.fa-money:before {
  content: "\f0d6";
}
.fa-caret-down:before {
  content: "\f0d7";
}
.fa-caret-up:before {
  content: "\f0d8";
}
.fa-caret-left:before {
  content: "\f0d9";
}
.fa-caret-right:before {
  content: "\f0da";
}
.fa-columns:before {
  content: "\f0db";
}
.fa-unsorted:before,
.fa-sort:before {
  content: "\f0dc";
}
.fa-sort-down:before,
.fa-sort-desc:before {
  content: "\f0dd";
}
.fa-sort-up:before,
.fa-sort-asc:before {
  content: "\f0de";
}
.fa-envelope:before {
  content: "\f0e0";
}
.fa-linkedin:before {
  content: "\f0e1";
}
.fa-rotate-left:before,
.fa-undo:before {
  content: "\f0e2";
}
.fa-legal:before,
.fa-gavel:before {
  content: "\f0e3";
}
.fa-dashboard:before,
.fa-tachometer:before {
  content: "\f0e4";
}
.fa-comment-o:before {
  content: "\f0e5";
}
.fa-comments-o:before {
  content: "\f0e6";
}
.fa-flash:before,
.fa-bolt:before {
  content: "\f0e7";
}
.fa-sitemap:before {
  content: "\f0e8";
}
.fa-umbrella:before {
  content: "\f0e9";
}
.fa-paste:before,
.fa-clipboard:before {
  content: "\f0ea";
}
.fa-lightbulb-o:before {
  content: "\f0eb";
}
.fa-exchange:before {
  content: "\f0ec";
}
.fa-cloud-download:before {
  content: "\f0ed";
}
.fa-cloud-upload:before {
  content: "\f0ee";
}
.fa-user-md:before {
  content: "\f0f0";
}
.fa-stethoscope:before {
  content: "\f0f1";
}
.fa-suitcase:before {
  content: "\f0f2";
}
.fa-bell-o:before {
  content: "\f0a2";
}
.fa-coffee:before {
  content: "\f0f4";
}
.fa-cutlery:before {
  content: "\f0f5";
}
.fa-file-text-o:before {
  content: "\f0f6";
}
.fa-building-o:before {
  content: "\f0f7";
}
.fa-hospital-o:before {
  content: "\f0f8";
}
.fa-ambulance:before {
  content: "\f0f9";
}
.fa-medkit:before {
  content: "\f0fa";
}
.fa-fighter-jet:before {
  content: "\f0fb";
}
.fa-beer:before {
  content: "\f0fc";
}
.fa-h-square:before {
  content: "\f0fd";
}
.fa-plus-square:before {
  content: "\f0fe";
}
.fa-angle-double-left:before {
  content: "\f100";
}
.fa-angle-double-right:before {
  content: "\f101";
}
.fa-angle-double-up:before {
  content: "\f102";
}
.fa-angle-double-down:before {
  content: "\f103";
}
.fa-angle-left:before {
  content: "\f104";
}
.fa-angle-right:before {
  content: "\f105";
}
.fa-angle-up:before {
  content: "\f106";
}
.fa-angle-down:before {
  content: "\f107";
}
.fa-desktop:before {
  content: "\f108";
}
.fa-laptop:before {
  content: "\f109";
}
.fa-tablet:before {
  content: "\f10a";
}
.fa-mobile-phone:before,
.fa-mobile:before {
  content: "\f10b";
}
.fa-circle-o:before {
  content: "\f10c";
}
.fa-quote-left:before {
  content: "\f10d";
}
.fa-quote-right:before {
  content: "\f10e";
}
.fa-spinner:before {
  content: "\f110";
}
.fa-circle:before {
  content: "\f111";
}
.fa-mail-reply:before,
.fa-reply:before {
  content: "\f112";
}
.fa-github-alt:before {
  content: "\f113";
}
.fa-folder-o:before {
  content: "\f114";
}
.fa-folder-open-o:before {
  content: "\f115";
}
.fa-smile-o:before {
  content: "\f118";
}
.fa-frown-o:before {
  content: "\f119";
}
.fa-meh-o:before {
  content: "\f11a";
}
.fa-gamepad:before {
  content: "\f11b";
}
.fa-keyboard-o:before {
  content: "\f11c";
}
.fa-flag-o:before {
  content: "\f11d";
}
.fa-flag-checkered:before {
  content: "\f11e";
}
.fa-terminal:before {
  content: "\f120";
}
.fa-code:before {
  content: "\f121";
}
.fa-mail-reply-all:before,
.fa-reply-all:before {
  content: "\f122";
}
.fa-star-half-empty:before,
.fa-star-half-full:before,
.fa-star-half-o:before {
  content: "\f123";
}
.fa-location-arrow:before {
  content: "\f124";
}
.fa-crop:before {
  content: "\f125";
}
.fa-code-fork:before {
  content: "\f126";
}
.fa-unlink:before,
.fa-chain-broken:before {
  content: "\f127";
}
.fa-question:before {
  content: "\f128";
}
.fa-info:before {
  content: "\f129";
}
.fa-exclamation:before {
  content: "\f12a";
}
.fa-superscript:before {
  content: "\f12b";
}
.fa-subscript:before {
  content: "\f12c";
}
.fa-eraser:before {
  content: "\f12d";
}
.fa-puzzle-piece:before {
  content: "\f12e";
}
.fa-microphone:before {
  content: "\f130";
}
.fa-microphone-slash:before {
  content: "\f131";
}
.fa-shield:before {
  content: "\f132";
}
.fa-calendar-o:before {
  content: "\f133";
}
.fa-fire-extinguisher:before {
  content: "\f134";
}
.fa-rocket:before {
  content: "\f135";
}
.fa-maxcdn:before {
  content: "\f136";
}
.fa-chevron-circle-left:before {
  content: "\f137";
}
.fa-chevron-circle-right:before {
  content: "\f138";
}
.fa-chevron-circle-up:before {
  content: "\f139";
}
.fa-chevron-circle-down:before {
  content: "\f13a";
}
.fa-html5:before {
  content: "\f13b";
}
.fa-css3:before {
  content: "\f13c";
}
.fa-anchor:before {
  content: "\f13d";
}
.fa-unlock-alt:before {
  content: "\f13e";
}
.fa-bullseye:before {
  content: "\f140";
}
.fa-ellipsis-h:before {
  content: "\f141";
}
.fa-ellipsis-v:before {
  content: "\f142";
}
.fa-rss-square:before {
  content: "\f143";
}
.fa-play-circle:before {
  content: "\f144";
}
.fa-ticket:before {
  content: "\f145";
}
.fa-minus-square:before {
  content: "\f146";
}
.fa-minus-square-o:before {
  content: "\f147";
}
.fa-level-up:before {
  content: "\f148";
}
.fa-level-down:before {
  content: "\f149";
}
.fa-check-square:before {
  content: "\f14a";
}
.fa-pencil-square:before {
  content: "\f14b";
}
.fa-external-link-square:before {
  content: "\f14c";
}
.fa-share-square:before {
  content: "\f14d";
}
.fa-compass:before {
  content: "\f14e";
}
.fa-toggle-down:before,
.fa-caret-square-o-down:before {
  content: "\f150";
}
.fa-toggle-up:before,
.fa-caret-square-o-up:before {
  content: "\f151";
}
.fa-toggle-right:before,
.fa-caret-square-o-right:before {
  content: "\f152";
}
.fa-euro:before,
.fa-eur:before {
  content: "\f153";
}
.fa-gbp:before {
  content: "\f154";
}
.fa-dollar:before,
.fa-usd:before {
  content: "\f155";
}
.fa-rupee:before,
.fa-inr:before {
  content: "\f156";
}
.fa-cny:before,
.fa-rmb:before,
.fa-yen:before,
.fa-jpy:before {
  content: "\f157";
}
.fa-ruble:before,
.fa-rouble:before,
.fa-rub:before {
  content: "\f158";
}
.fa-won:before,
.fa-krw:before {
  content: "\f159";
}
.fa-bitcoin:before,
.fa-btc:before {
  content: "\f15a";
}
.fa-file:before {
  content: "\f15b";
}
.fa-file-text:before {
  content: "\f15c";
}
.fa-sort-alpha-asc:before {
  content: "\f15d";
}
.fa-sort-alpha-desc:before {
  content: "\f15e";
}
.fa-sort-amount-asc:before {
  content: "\f160";
}
.fa-sort-amount-desc:before {
  content: "\f161";
}
.fa-sort-numeric-asc:before {
  content: "\f162";
}
.fa-sort-numeric-desc:before {
  content: "\f163";
}
.fa-thumbs-up:before {
  content: "\f164";
}
.fa-thumbs-down:before {
  content: "\f165";
}
.fa-youtube-square:before {
  content: "\f166";
}
.fa-youtube:before {
  content: "\f167";
}
.fa-xing:before {
  content: "\f168";
}
.fa-xing-square:before {
  content: "\f169";
}
.fa-youtube-play:before {
  content: "\f16a";
}
.fa-dropbox:before {
  content: "\f16b";
}
.fa-stack-overflow:before {
  content: "\f16c";
}
.fa-instagram:before {
  content: "\f16d";
}
.fa-flickr:before {
  content: "\f16e";
}
.fa-adn:before {
  content: "\f170";
}
.fa-bitbucket:before {
  content: "\f171";
}
.fa-bitbucket-square:before {
  content: "\f172";
}
.fa-tumblr:before {
  content: "\f173";
}
.fa-tumblr-square:before {
  content: "\f174";
}
.fa-long-arrow-down:before {
  content: "\f175";
}
.fa-long-arrow-up:before {
  content: "\f176";
}
.fa-long-arrow-left:before {
  content: "\f177";
}
.fa-long-arrow-right:before {
  content: "\f178";
}
.fa-apple:before {
  content: "\f179";
}
.fa-windows:before {
  content: "\f17a";
}
.fa-android:before {
  content: "\f17b";
}
.fa-linux:before {
  content: "\f17c";
}
.fa-dribbble:before {
  content: "\f17d";
}
.fa-skype:before {
  content: "\f17e";
}
.fa-foursquare:before {
  content: "\f180";
}
.fa-trello:before {
  content: "\f181";
}
.fa-female:before {
  content: "\f182";
}
.fa-male:before {
  content: "\f183";
}
.fa-gittip:before {
  content: "\f184";
}
.fa-sun-o:before {
  content: "\f185";
}
.fa-moon-o:before {
  content: "\f186";
}
.fa-archive:before {
  content: "\f187";
}
.fa-bug:before {
  content: "\f188";
}
.fa-vk:before {
  content: "\f189";
}
.fa-weibo:before {
  content: "\f18a";
}
.fa-renren:before {
  content: "\f18b";
}
.fa-pagelines:before {
  content: "\f18c";
}
.fa-stack-exchange:before {
  content: "\f18d";
}
.fa-arrow-circle-o-right:before {
  content: "\f18e";
}
.fa-arrow-circle-o-left:before {
  content: "\f190";
}
.fa-toggle-left:before,
.fa-caret-square-o-left:before {
  content: "\f191";
}
.fa-dot-circle-o:before {
  content: "\f192";
}
.fa-wheelchair:before {
  content: "\f193";
}
.fa-vimeo-square:before {
  content: "\f194";
}
.fa-turkish-lira:before,
.fa-try:before {
  content: "\f195";
}
.fa-plus-square-o:before {
  content: "\f196";
}
.fa-space-shuttle:before {
  content: "\f197";
}
.fa-slack:before {
  content: "\f198";
}
.fa-envelope-square:before {
  content: "\f199";
}
.fa-wordpress:before {
  content: "\f19a";
}
.fa-openid:before {
  content: "\f19b";
}
.fa-institution:before,
.fa-bank:before,
.fa-university:before {
  content: "\f19c";
}
.fa-mortar-board:before,
.fa-graduation-cap:before {
  content: "\f19d";
}
.fa-yahoo:before {
  content: "\f19e";
}
.fa-google:before {
  content: "\f1a0";
}
.fa-reddit:before {
  content: "\f1a1";
}
.fa-reddit-square:before {
  content: "\f1a2";
}
.fa-stumbleupon-circle:before {
  content: "\f1a3";
}
.fa-stumbleupon:before {
  content: "\f1a4";
}
.fa-delicious:before {
  content: "\f1a5";
}
.fa-digg:before {
  content: "\f1a6";
}
.fa-pied-piper:before {
  content: "\f1a7";
}
.fa-pied-piper-alt:before {
  content: "\f1a8";
}
.fa-drupal:before {
  content: "\f1a9";
}
.fa-joomla:before {
  content: "\f1aa";
}
.fa-language:before {
  content: "\f1ab";
}
.fa-fax:before {
  content: "\f1ac";
}
.fa-building:before {
  content: "\f1ad";
}
.fa-child:before {
  content: "\f1ae";
}
.fa-paw:before {
  content: "\f1b0";
}
.fa-spoon:before {
  content: "\f1b1";
}
.fa-cube:before {
  content: "\f1b2";
}
.fa-cubes:before {
  content: "\f1b3";
}
.fa-behance:before {
  content: "\f1b4";
}
.fa-behance-square:before {
  content: "\f1b5";
}
.fa-steam:before {
  content: "\f1b6";
}
.fa-steam-square:before {
  content: "\f1b7";
}
.fa-recycle:before {
  content: "\f1b8";
}
.fa-automobile:before,
.fa-car:before {
  content: "\f1b9";
}
.fa-cab:before,
.fa-taxi:before {
  content: "\f1ba";
}
.fa-tree:before {
  content: "\f1bb";
}
.fa-spotify:before {
  content: "\f1bc";
}
.fa-deviantart:before {
  content: "\f1bd";
}
.fa-soundcloud:before {
  content: "\f1be";
}
.fa-database:before {
  content: "\f1c0";
}
.fa-file-pdf-o:before {
  content: "\f1c1";
}
.fa-file-word-o:before {
  content: "\f1c2";
}
.fa-file-excel-o:before {
  content: "\f1c3";
}
.fa-file-powerpoint-o:before {
  content: "\f1c4";
}
.fa-file-photo-o:before,
.fa-file-picture-o:before,
.fa-file-image-o:before {
  content: "\f1c5";
}
.fa-file-zip-o:before,
.fa-file-archive-o:before {
  content: "\f1c6";
}
.fa-file-sound-o:before,
.fa-file-audio-o:before {
  content: "\f1c7";
}
.fa-file-movie-o:before,
.fa-file-video-o:before {
  content: "\f1c8";
}
.fa-file-code-o:before {
  content: "\f1c9";
}
.fa-vine:before {
  content: "\f1ca";
}
.fa-codepen:before {
  content: "\f1cb";
}
.fa-jsfiddle:before {
  content: "\f1cc";
}
.fa-life-bouy:before,
.fa-life-buoy:before,
.fa-life-saver:before,
.fa-support:before,
.fa-life-ring:before {
  content: "\f1cd";
}
.fa-circle-o-notch:before {
  content: "\f1ce";
}
.fa-ra:before,
.fa-rebel:before {
  content: "\f1d0";
}
.fa-ge:before,
.fa-empire:before {
  content: "\f1d1";
}
.fa-git-square:before {
  content: "\f1d2";
}
.fa-git:before {
  content: "\f1d3";
}
.fa-hacker-news:before {
  content: "\f1d4";
}
.fa-tencent-weibo:before {
  content: "\f1d5";
}
.fa-qq:before {
  content: "\f1d6";
}
.fa-wechat:before,
.fa-weixin:before {
  content: "\f1d7";
}
.fa-send:before,
.fa-paper-plane:before {
  content: "\f1d8";
}
.fa-send-o:before,
.fa-paper-plane-o:before {
  content: "\f1d9";
}
.fa-history:before {
  content: "\f1da";
}
.fa-circle-thin:before {
  content: "\f1db";
}
.fa-header:before {
  content: "\f1dc";
}
.fa-paragraph:before {
  content: "\f1dd";
}
.fa-sliders:before {
  content: "\f1de";
}
.fa-share-alt:before {
  content: "\f1e0";
}
.fa-share-alt-square:before {
  content: "\f1e1";
}
.fa-bomb:before {
  content: "\f1e2";
}
.fa-soccer-ball-o:before,
.fa-futbol-o:before {
  content: "\f1e3";
}
.fa-tty:before {
  content: "\f1e4";
}
.fa-binoculars:before {
  content: "\f1e5";
}
.fa-plug:before {
  content: "\f1e6";
}
.fa-slideshare:before {
  content: "\f1e7";
}
.fa-twitch:before {
  content: "\f1e8";
}
.fa-yelp:before {
  content: "\f1e9";
}
.fa-newspaper-o:before {
  content: "\f1ea";
}
.fa-wifi:before {
  content: "\f1eb";
}
.fa-calculator:before {
  content: "\f1ec";
}
.fa-paypal:before {
  content: "\f1ed";
}
.fa-google-wallet:before {
  content: "\f1ee";
}
.fa-cc-visa:before {
  content: "\f1f0";
}
.fa-cc-mastercard:before {
  content: "\f1f1";
}
.fa-cc-discover:before {
  content: "\f1f2";
}
.fa-cc-amex:before {
  content: "\f1f3";
}
.fa-cc-paypal:before {
  content: "\f1f4";
}
.fa-cc-stripe:before {
  content: "\f1f5";
}
.fa-bell-slash:before {
  content: "\f1f6";
}
.fa-bell-slash-o:before {
  content: "\f1f7";
}
.fa-trash:before {
  content: "\f1f8";
}
.fa-copyright:before {
  content: "\f1f9";
}
.fa-at:before {
  content: "\f1fa";
}
.fa-eyedropper:before {
  content: "\f1fb";
}
.fa-paint-brush:before {
  content: "\f1fc";
}
.fa-birthday-cake:before {
  content: "\f1fd";
}
.fa-area-chart:before {
  content: "\f1fe";
}
.fa-pie-chart:before {
  content: "\f200";
}
.fa-line-chart:before {
  content: "\f201";
}
.fa-lastfm:before {
  content: "\f202";
}
.fa-lastfm-square:before {
  content: "\f203";
}
.fa-toggle-off:before {
  content: "\f204";
}
.fa-toggle-on:before {
  content: "\f205";
}
.fa-bicycle:before {
  content: "\f206";
}
.fa-bus:before {
  content: "\f207";
}
.fa-ioxhost:before {
  content: "\f208";
}
.fa-angellist:before {
  content: "\f209";
}
.fa-cc:before {
  content: "\f20a";
}
.fa-shekel:before,
.fa-sheqel:before,
.fa-ils:before {
  content: "\f20b";
}
.fa-meanpath:before {
  content: "\f20c";
}
/*!
*
* IPython base
*
*/
.modal.fade .modal-dialog {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
}
code {
  color: #000;
}
pre {
  font-size: inherit;
  line-height: inherit;
}
label {
  font-weight: normal;
}
/* Make the page background atleast 100% the height of the view port */
/* Make the page itself atleast 70% the height of the view port */
.border-box-sizing {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.corner-all {
  border-radius: 2px;
}
.no-padding {
  padding: 0px;
}
/* Flexible box model classes */
/* Taken from Alex Russell http://infrequently.org/2009/08/css-3-progress/ */
/* This file is a compatability layer.  It allows the usage of flexible box 
model layouts accross multiple browsers, including older browsers.  The newest,
universal implementation of the flexible box model is used when available (see
`Modern browsers` comments below).  Browsers that are known to implement this 
new spec completely include:

    Firefox 28.0+
    Chrome 29.0+
    Internet Explorer 11+ 
    Opera 17.0+

Browsers not listed, including Safari, are supported via the styling under the
`Old browsers` comments below.
*/
.hbox {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.hbox > * {
  /* Old browsers */
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  box-flex: 0;
  /* Modern browsers */
  flex: none;
}
.vbox {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.vbox > * {
  /* Old browsers */
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  box-flex: 0;
  /* Modern browsers */
  flex: none;
}
.hbox.reverse,
.vbox.reverse,
.reverse {
  /* Old browsers */
  -webkit-box-direction: reverse;
  -moz-box-direction: reverse;
  box-direction: reverse;
  /* Modern browsers */
  flex-direction: row-reverse;
}
.hbox.box-flex0,
.vbox.box-flex0,
.box-flex0 {
  /* Old browsers */
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  box-flex: 0;
  /* Modern browsers */
  flex: none;
  width: auto;
}
.hbox.box-flex1,
.vbox.box-flex1,
.box-flex1 {
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
.hbox.box-flex,
.vbox.box-flex,
.box-flex {
  /* Old browsers */
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
.hbox.box-flex2,
.vbox.box-flex2,
.box-flex2 {
  /* Old browsers */
  -webkit-box-flex: 2;
  -moz-box-flex: 2;
  box-flex: 2;
  /* Modern browsers */
  flex: 2;
}
.box-group1 {
  /*  Deprecated */
  -webkit-box-flex-group: 1;
  -moz-box-flex-group: 1;
  box-flex-group: 1;
}
.box-group2 {
  /* Deprecated */
  -webkit-box-flex-group: 2;
  -moz-box-flex-group: 2;
  box-flex-group: 2;
}
.hbox.start,
.vbox.start,
.start {
  /* Old browsers */
  -webkit-box-pack: start;
  -moz-box-pack: start;
  box-pack: start;
  /* Modern browsers */
  justify-content: flex-start;
}
.hbox.end,
.vbox.end,
.end {
  /* Old browsers */
  -webkit-box-pack: end;
  -moz-box-pack: end;
  box-pack: end;
  /* Modern browsers */
  justify-content: flex-end;
}
.hbox.center,
.vbox.center,
.center {
  /* Old browsers */
  -webkit-box-pack: center;
  -moz-box-pack: center;
  box-pack: center;
  /* Modern browsers */
  justify-content: center;
}
.hbox.baseline,
.vbox.baseline,
.baseline {
  /* Old browsers */
  -webkit-box-pack: baseline;
  -moz-box-pack: baseline;
  box-pack: baseline;
  /* Modern browsers */
  justify-content: baseline;
}
.hbox.stretch,
.vbox.stretch,
.stretch {
  /* Old browsers */
  -webkit-box-pack: stretch;
  -moz-box-pack: stretch;
  box-pack: stretch;
  /* Modern browsers */
  justify-content: stretch;
}
.hbox.align-start,
.vbox.align-start,
.align-start {
  /* Old browsers */
  -webkit-box-align: start;
  -moz-box-align: start;
  box-align: start;
  /* Modern browsers */
  align-items: flex-start;
}
.hbox.align-end,
.vbox.align-end,
.align-end {
  /* Old browsers */
  -webkit-box-align: end;
  -moz-box-align: end;
  box-align: end;
  /* Modern browsers */
  align-items: flex-end;
}
.hbox.align-center,
.vbox.align-center,
.align-center {
  /* Old browsers */
  -webkit-box-align: center;
  -moz-box-align: center;
  box-align: center;
  /* Modern browsers */
  align-items: center;
}
.hbox.align-baseline,
.vbox.align-baseline,
.align-baseline {
  /* Old browsers */
  -webkit-box-align: baseline;
  -moz-box-align: baseline;
  box-align: baseline;
  /* Modern browsers */
  align-items: baseline;
}
.hbox.align-stretch,
.vbox.align-stretch,
.align-stretch {
  /* Old browsers */
  -webkit-box-align: stretch;
  -moz-box-align: stretch;
  box-align: stretch;
  /* Modern browsers */
  align-items: stretch;
}
div.error {
  margin: 2em;
  text-align: center;
}
div.error > h1 {
  font-size: 500%;
  line-height: normal;
}
div.error > p {
  font-size: 200%;
  line-height: normal;
}
div.traceback-wrapper {
  text-align: left;
  max-width: 800px;
  margin: auto;
}
/**
 * Primary styles
 *
 * Author: Jupyter Development Team
 */
body {
  background-color: #fff;
  /* This makes sure that the body covers the entire window and needs to
       be in a different element than the display: box in wrapper below */
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  overflow: visible;
}
body > #header {
  /* Initially hidden to prevent FLOUC */
  display: none;
  background-color: #fff;
  /* Display over codemirror */
  position: relative;
  z-index: 100;
}
body > #header #header-container {
  padding-bottom: 5px;
  padding-top: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
body > #header .header-bar {
  width: 100%;
  height: 1px;
  background: #e7e7e7;
  margin-bottom: -1px;
}
@media print {
  body > #header {
    display: none !important;
  }
}
#header-spacer {
  width: 100%;
  visibility: hidden;
}
@media print {
  #header-spacer {
    display: none;
  }
}
#ipython_notebook {
  padding-left: 0px;
  padding-top: 1px;
  padding-bottom: 1px;
}
@media (max-width: 991px) {
  #ipython_notebook {
    margin-left: 10px;
  }
}
#noscript {
  width: auto;
  padding-top: 16px;
  padding-bottom: 16px;
  text-align: center;
  font-size: 22px;
  color: red;
  font-weight: bold;
}
#ipython_notebook img {
  height: 28px;
}
#site {
  width: 100%;
  display: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow: auto;
}
@media print {
  #site {
    height: auto !important;
  }
}
/* Smaller buttons */
.ui-button .ui-button-text {
  padding: 0.2em 0.8em;
  font-size: 77%;
}
input.ui-button {
  padding: 0.3em 0.9em;
}
span#login_widget {
  float: right;
}
span#login_widget > .button,
#logout {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
span#login_widget > .button:focus,
#logout:focus,
span#login_widget > .button.focus,
#logout.focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
span#login_widget > .button:hover,
#logout:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
span#login_widget > .button:active,
#logout:active,
span#login_widget > .button.active,
#logout.active,
.open > .dropdown-togglespan#login_widget > .button,
.open > .dropdown-toggle#logout {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
span#login_widget > .button:active:hover,
#logout:active:hover,
span#login_widget > .button.active:hover,
#logout.active:hover,
.open > .dropdown-togglespan#login_widget > .button:hover,
.open > .dropdown-toggle#logout:hover,
span#login_widget > .button:active:focus,
#logout:active:focus,
span#login_widget > .button.active:focus,
#logout.active:focus,
.open > .dropdown-togglespan#login_widget > .button:focus,
.open > .dropdown-toggle#logout:focus,
span#login_widget > .button:active.focus,
#logout:active.focus,
span#login_widget > .button.active.focus,
#logout.active.focus,
.open > .dropdown-togglespan#login_widget > .button.focus,
.open > .dropdown-toggle#logout.focus {
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
span#login_widget > .button:active,
#logout:active,
span#login_widget > .button.active,
#logout.active,
.open > .dropdown-togglespan#login_widget > .button,
.open > .dropdown-toggle#logout {
  background-image: none;
}
span#login_widget > .button.disabled:hover,
#logout.disabled:hover,
span#login_widget > .button[disabled]:hover,
#logout[disabled]:hover,
fieldset[disabled] span#login_widget > .button:hover,
fieldset[disabled] #logout:hover,
span#login_widget > .button.disabled:focus,
#logout.disabled:focus,
span#login_widget > .button[disabled]:focus,
#logout[disabled]:focus,
fieldset[disabled] span#login_widget > .button:focus,
fieldset[disabled] #logout:focus,
span#login_widget > .button.disabled.focus,
#logout.disabled.focus,
span#login_widget > .button[disabled].focus,
#logout[disabled].focus,
fieldset[disabled] span#login_widget > .button.focus,
fieldset[disabled] #logout.focus {
  background-color: #fff;
  border-color: #ccc;
}
span#login_widget > .button .badge,
#logout .badge {
  color: #fff;
  background-color: #333;
}
.nav-header {
  text-transform: none;
}
#header > span {
  margin-top: 10px;
}
.modal_stretch .modal-dialog {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 80vh;
}
.modal_stretch .modal-dialog .modal-body {
  max-height: calc(100vh - 200px);
  overflow: auto;
  flex: 1;
}
@media (min-width: 768px) {
  .modal .modal-dialog {
    width: 700px;
  }
}
@media (min-width: 768px) {
  select.form-control {
    margin-left: 12px;
    margin-right: 12px;
  }
}
/*!
*
* IPython auth
*
*/
.center-nav {
  display: inline-block;
  margin-bottom: -4px;
}
/*!
*
* IPython tree view
*
*/
/* We need an invisible input field on top of the sentense*/
/* "Drag file onto the list ..." */
.alternate_upload {
  background-color: none;
  display: inline;
}
.alternate_upload.form {
  padding: 0;
  margin: 0;
}
.alternate_upload input.fileinput {
  text-align: center;
  vertical-align: middle;
  display: inline;
  opacity: 0;
  z-index: 2;
  width: 12ex;
  margin-right: -12ex;
}
.alternate_upload .btn-upload {
  height: 22px;
}
/**
 * Primary styles
 *
 * Author: Jupyter Development Team
 */
ul#tabs {
  margin-bottom: 4px;
}
ul#tabs a {
  padding-top: 6px;
  padding-bottom: 4px;
}
ul.breadcrumb a:focus,
ul.breadcrumb a:hover {
  text-decoration: none;
}
ul.breadcrumb i.icon-home {
  font-size: 16px;
  margin-right: 4px;
}
ul.breadcrumb span {
  color: #5e5e5e;
}
.list_toolbar {
  padding: 4px 0 4px 0;
  vertical-align: middle;
}
.list_toolbar .tree-buttons {
  padding-top: 1px;
}
.dynamic-buttons {
  padding-top: 3px;
  display: inline-block;
}
.list_toolbar [class*="span"] {
  min-height: 24px;
}
.list_header {
  font-weight: bold;
  background-color: #EEE;
}
.list_placeholder {
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
}
.list_container {
  margin-top: 4px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
}
.list_container > div {
  border-bottom: 1px solid #ddd;
}
.list_container > div:hover .list-item {
  background-color: red;
}
.list_container > div:last-child {
  border: none;
}
.list_item:hover .list_item {
  background-color: #ddd;
}
.list_item a {
  text-decoration: none;
}
.list_item:hover {
  background-color: #fafafa;
}
.list_header > div,
.list_item > div {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
  line-height: 22px;
}
.list_header > div input,
.list_item > div input {
  margin-right: 7px;
  margin-left: 14px;
  vertical-align: baseline;
  line-height: 22px;
  position: relative;
  top: -1px;
}
.list_header > div .item_link,
.list_item > div .item_link {
  margin-left: -1px;
  vertical-align: baseline;
  line-height: 22px;
}
.new-file input[type=checkbox] {
  visibility: hidden;
}
.item_name {
  line-height: 22px;
  height: 24px;
}
.item_icon {
  font-size: 14px;
  color: #5e5e5e;
  margin-right: 7px;
  margin-left: 7px;
  line-height: 22px;
  vertical-align: baseline;
}
.item_buttons {
  line-height: 1em;
  margin-left: -5px;
}
.item_buttons .btn,
.item_buttons .btn-group,
.item_buttons .input-group {
  float: left;
}
.item_buttons > .btn,
.item_buttons > .btn-group,
.item_buttons > .input-group {
  margin-left: 5px;
}
.item_buttons .btn {
  min-width: 13ex;
}
.item_buttons .running-indicator {
  padding-top: 4px;
  color: #5cb85c;
}
.item_buttons .kernel-name {
  padding-top: 4px;
  color: #5bc0de;
  margin-right: 7px;
  float: left;
}
.toolbar_info {
  height: 24px;
  line-height: 24px;
}
.list_item input:not([type=checkbox]) {
  padding-top: 3px;
  padding-bottom: 3px;
  height: 22px;
  line-height: 14px;
  margin: 0px;
}
.highlight_text {
  color: blue;
}
#project_name {
  display: inline-block;
  padding-left: 7px;
  margin-left: -2px;
}
#project_name > .breadcrumb {
  padding: 0px;
  margin-bottom: 0px;
  background-color: transparent;
  font-weight: bold;
}
#tree-selector {
  padding-right: 0px;
}
#button-select-all {
  min-width: 50px;
}
#select-all {
  margin-left: 7px;
  margin-right: 2px;
}
.menu_icon {
  margin-right: 2px;
}
.tab-content .row {
  margin-left: 0px;
  margin-right: 0px;
}
.folder_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f114";
}
.folder_icon:before.pull-left {
  margin-right: .3em;
}
.folder_icon:before.pull-right {
  margin-left: .3em;
}
.notebook_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f02d";
  position: relative;
  top: -1px;
}
.notebook_icon:before.pull-left {
  margin-right: .3em;
}
.notebook_icon:before.pull-right {
  margin-left: .3em;
}
.running_notebook_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f02d";
  position: relative;
  top: -1px;
  color: #5cb85c;
}
.running_notebook_icon:before.pull-left {
  margin-right: .3em;
}
.running_notebook_icon:before.pull-right {
  margin-left: .3em;
}
.file_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f016";
  position: relative;
  top: -2px;
}
.file_icon:before.pull-left {
  margin-right: .3em;
}
.file_icon:before.pull-right {
  margin-left: .3em;
}
#notebook_toolbar .pull-right {
  padding-top: 0px;
  margin-right: -1px;
}
ul#new-menu {
  left: auto;
  right: 0;
}
.kernel-menu-icon {
  padding-right: 12px;
  width: 24px;
  content: "\f096";
}
.kernel-menu-icon:before {
  content: "\f096";
}
.kernel-menu-icon-current:before {
  content: "\f00c";
}
#tab_content {
  padding-top: 20px;
}
#running .panel-group .panel {
  margin-top: 3px;
  margin-bottom: 1em;
}
#running .panel-group .panel .panel-heading {
  background-color: #EEE;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
  line-height: 22px;
}
#running .panel-group .panel .panel-heading a:focus,
#running .panel-group .panel .panel-heading a:hover {
  text-decoration: none;
}
#running .panel-group .panel .panel-body {
  padding: 0px;
}
#running .panel-group .panel .panel-body .list_container {
  margin-top: 0px;
  margin-bottom: 0px;
  border: 0px;
  border-radius: 0px;
}
#running .panel-group .panel .panel-body .list_container .list_item {
  border-bottom: 1px solid #ddd;
}
#running .panel-group .panel .panel-body .list_container .list_item:last-child {
  border-bottom: 0px;
}
.delete-button {
  display: none;
}
.duplicate-button {
  display: none;
}
.rename-button {
  display: none;
}
.shutdown-button {
  display: none;
}
.dynamic-instructions {
  display: inline-block;
  padding-top: 4px;
}
/*!
*
* IPython text editor webapp
*
*/
.selected-keymap i.fa {
  padding: 0px 5px;
}
.selected-keymap i.fa:before {
  content: "\f00c";
}
#mode-menu {
  overflow: auto;
  max-height: 20em;
}
.edit_app #header {
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
}
.edit_app #menubar .navbar {
  /* Use a negative 1 bottom margin, so the border overlaps the border of the
    header */
  margin-bottom: -1px;
}
.dirty-indicator {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 20px;
}
.dirty-indicator.pull-left {
  margin-right: .3em;
}
.dirty-indicator.pull-right {
  margin-left: .3em;
}
.dirty-indicator-dirty {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 20px;
}
.dirty-indicator-dirty.pull-left {
  margin-right: .3em;
}
.dirty-indicator-dirty.pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 20px;
}
.dirty-indicator-clean.pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean.pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f00c";
}
.dirty-indicator-clean:before.pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean:before.pull-right {
  margin-left: .3em;
}
#filename {
  font-size: 16pt;
  display: table;
  padding: 0px 5px;
}
#current-mode {
  padding-left: 5px;
  padding-right: 5px;
}
#texteditor-backdrop {
  padding-top: 20px;
  padding-bottom: 20px;
}
@media not print {
  #texteditor-backdrop {
    background-color: #EEE;
  }
}
@media print {
  #texteditor-backdrop #texteditor-container .CodeMirror-gutter,
  #texteditor-backdrop #texteditor-container .CodeMirror-gutters {
    background-color: #fff;
  }
}
@media not print {
  #texteditor-backdrop #texteditor-container .CodeMirror-gutter,
  #texteditor-backdrop #texteditor-container .CodeMirror-gutters {
    background-color: #fff;
  }
}
@media not print {
  #texteditor-backdrop #texteditor-container {
    padding: 0px;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
    box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  }
}
/*!
*
* IPython notebook
*
*/
/* CSS font colors for translated ANSI colors. */
.ansibold {
  font-weight: bold;
}
/* use dark versions for foreground, to improve visibility */
.ansiblack {
  color: black;
}
.ansired {
  color: darkred;
}
.ansigreen {
  color: darkgreen;
}
.ansiyellow {
  color: #c4a000;
}
.ansiblue {
  color: darkblue;
}
.ansipurple {
  color: darkviolet;
}
.ansicyan {
  color: steelblue;
}
.ansigray {
  color: gray;
}
/* and light for background, for the same reason */
.ansibgblack {
  background-color: black;
}
.ansibgred {
  background-color: red;
}
.ansibggreen {
  background-color: green;
}
.ansibgyellow {
  background-color: yellow;
}
.ansibgblue {
  background-color: blue;
}
.ansibgpurple {
  background-color: magenta;
}
.ansibgcyan {
  background-color: cyan;
}
.ansibggray {
  background-color: gray;
}
div.cell {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 2px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  width: 100%;
  padding: 5px;
  /* This acts as a spacer between cells, that is outside the border */
  margin: 0px;
  outline: none;
  border-left-width: 1px;
  padding-left: 5px;
  background: linear-gradient(to right, transparent -40px, transparent 1px, transparent 1px, transparent 100%);
}
div.cell.jupyter-soft-selected {
  border-left-color: #90CAF9;
  border-left-color: #E3F2FD;
  border-left-width: 1px;
  padding-left: 5px;
  border-right-color: #E3F2FD;
  border-right-width: 1px;
  background: #E3F2FD;
}
@media print {
  div.cell.jupyter-soft-selected {
    border-color: transparent;
  }
}
div.cell.selected {
  border-color: #ababab;
  border-left-width: 0px;
  padding-left: 6px;
  background: linear-gradient(to right, #42A5F5 -40px, #42A5F5 5px, transparent 5px, transparent 100%);
}
@media print {
  div.cell.selected {
    border-color: transparent;
  }
}
div.cell.selected.jupyter-soft-selected {
  border-left-width: 0;
  padding-left: 6px;
  background: linear-gradient(to right, #42A5F5 -40px, #42A5F5 7px, #E3F2FD 7px, #E3F2FD 100%);
}
.edit_mode div.cell.selected {
  border-color: #66BB6A;
  border-left-width: 0px;
  padding-left: 6px;
  background: linear-gradient(to right, #66BB6A -40px, #66BB6A 5px, transparent 5px, transparent 100%);
}
@media print {
  .edit_mode div.cell.selected {
    border-color: transparent;
  }
}
.prompt {
  /* This needs to be wide enough for 3 digit prompt numbers: In[100]: */
  min-width: 14ex;
  /* This padding is tuned to match the padding on the CodeMirror editor. */
  padding: 0.4em;
  margin: 0px;
  font-family: monospace;
  text-align: right;
  /* This has to match that of the the CodeMirror class line-height below */
  line-height: 1.21429em;
  /* Don't highlight prompt number selection */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* Use default cursor */
  cursor: default;
}
@media (max-width: 540px) {
  .prompt {
    text-align: left;
  }
}
div.inner_cell {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
@-moz-document url-prefix() {
  div.inner_cell {
    overflow-x: hidden;
  }
}
/* input_area and input_prompt must match in top border and margin for alignment */
div.input_area {
  border: 1px solid #cfcfcf;
  border-radius: 2px;
  background: #f7f7f7;
  line-height: 1.21429em;
}
/* This is needed so that empty prompt areas can collapse to zero height when there
   is no content in the output_subarea and the prompt. The main purpose of this is
   to make sure that empty JavaScript output_subareas have no height. */
div.prompt:empty {
  padding-top: 0;
  padding-bottom: 0;
}
div.unrecognized_cell {
  padding: 5px 5px 5px 0px;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
div.unrecognized_cell .inner_cell {
  border-radius: 2px;
  padding: 5px;
  font-weight: bold;
  color: red;
  border: 1px solid #cfcfcf;
  background: #eaeaea;
}
div.unrecognized_cell .inner_cell a {
  color: inherit;
  text-decoration: none;
}
div.unrecognized_cell .inner_cell a:hover {
  color: inherit;
  text-decoration: none;
}
@media (max-width: 540px) {
  div.unrecognized_cell > div.prompt {
    display: none;
  }
}
div.code_cell {
  /* avoid page breaking on code cells when printing */
}
@media print {
  div.code_cell {
    page-break-inside: avoid;
  }
}
/* any special styling for code cells that are currently running goes here */
div.input {
  page-break-inside: avoid;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
@media (max-width: 540px) {
  div.input {
    /* Old browsers */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-align: stretch;
    display: -moz-box;
    -moz-box-orient: vertical;
    -moz-box-align: stretch;
    display: box;
    box-orient: vertical;
    box-align: stretch;
    /* Modern browsers */
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}
/* input_area and input_prompt must match in top border and margin for alignment */
div.input_prompt {
  color: #303F9F;
  border-top: 1px solid transparent;
}
div.input_area > div.highlight {
  margin: 0.4em;
  border: none;
  padding: 0px;
  background-color: transparent;
}
div.input_area > div.highlight > pre {
  margin: 0px;
  border: none;
  padding: 0px;
  background-color: transparent;
}
/* The following gets added to the <head> if it is detected that the user has a
 * monospace font with inconsistent normal/bold/italic height.  See
 * notebookmain.js.  Such fonts will have keywords vertically offset with
 * respect to the rest of the text.  The user should select a better font.
 * See: https://github.com/ipython/ipython/issues/1503
 *
 * .CodeMirror span {
 *      vertical-align: bottom;
 * }
 */
.CodeMirror {
  line-height: 1.21429em;
  /* Changed from 1em to our global default */
  font-size: 14px;
  height: auto;
  /* Changed to auto to autogrow */
  background: none;
  /* Changed from white to allow our bg to show through */
}
.CodeMirror-scroll {
  /*  The CodeMirror docs are a bit fuzzy on if overflow-y should be hidden or visible.*/
  /*  We have found that if it is visible, vertical scrollbars appear with font size changes.*/
  overflow-y: hidden;
  overflow-x: auto;
}
.CodeMirror-lines {
  /* In CM2, this used to be 0.4em, but in CM3 it went to 4px. We need the em value because */
  /* we have set a different line-height and want this to scale with that. */
  padding: 0.4em;
}
.CodeMirror-linenumber {
  padding: 0 8px 0 4px;
}
.CodeMirror-gutters {
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.CodeMirror pre {
  /* In CM3 this went to 4px from 0 in CM2. We need the 0 value because of how we size */
  /* .CodeMirror-lines */
  padding: 0;
  border: 0;
  border-radius: 0;
}
/*

Original style from softwaremaniacs.org (c) Ivan Sagalaev <Maniac@SoftwareManiacs.Org>
Adapted from GitHub theme

*/
.highlight-base {
  color: #000;
}
.highlight-variable {
  color: #000;
}
.highlight-variable-2 {
  color: #1a1a1a;
}
.highlight-variable-3 {
  color: #333333;
}
.highlight-string {
  color: #BA2121;
}
.highlight-comment {
  color: #408080;
  font-style: italic;
}
.highlight-number {
  color: #080;
}
.highlight-atom {
  color: #88F;
}
.highlight-keyword {
  color: #008000;
  font-weight: bold;
}
.highlight-builtin {
  color: #008000;
}
.highlight-error {
  color: #f00;
}
.highlight-operator {
  color: #AA22FF;
  font-weight: bold;
}
.highlight-meta {
  color: #AA22FF;
}
/* previously not defined, copying from default codemirror */
.highlight-def {
  color: #00f;
}
.highlight-string-2 {
  color: #f50;
}
.highlight-qualifier {
  color: #555;
}
.highlight-bracket {
  color: #997;
}
.highlight-tag {
  color: #170;
}
.highlight-attribute {
  color: #00c;
}
.highlight-header {
  color: blue;
}
.highlight-quote {
  color: #090;
}
.highlight-link {
  color: #00c;
}
/* apply the same style to codemirror */
.cm-s-ipython span.cm-keyword {
  color: #008000;
  font-weight: bold;
}
.cm-s-ipython span.cm-atom {
  color: #88F;
}
.cm-s-ipython span.cm-number {
  color: #080;
}
.cm-s-ipython span.cm-def {
  color: #00f;
}
.cm-s-ipython span.cm-variable {
  color: #000;
}
.cm-s-ipython span.cm-operator {
  color: #AA22FF;
  font-weight: bold;
}
.cm-s-ipython span.cm-variable-2 {
  color: #1a1a1a;
}
.cm-s-ipython span.cm-variable-3 {
  color: #333333;
}
.cm-s-ipython span.cm-comment {
  color: #408080;
  font-style: italic;
}
.cm-s-ipython span.cm-string {
  color: #BA2121;
}
.cm-s-ipython span.cm-string-2 {
  color: #f50;
}
.cm-s-ipython span.cm-meta {
  color: #AA22FF;
}
.cm-s-ipython span.cm-qualifier {
  color: #555;
}
.cm-s-ipython span.cm-builtin {
  color: #008000;
}
.cm-s-ipython span.cm-bracket {
  color: #997;
}
.cm-s-ipython span.cm-tag {
  color: #170;
}
.cm-s-ipython span.cm-attribute {
  color: #00c;
}
.cm-s-ipython span.cm-header {
  color: blue;
}
.cm-s-ipython span.cm-quote {
  color: #090;
}
.cm-s-ipython span.cm-link {
  color: #00c;
}
.cm-s-ipython span.cm-error {
  color: #f00;
}
.cm-s-ipython span.cm-tab {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAMCAYAAAAkuj5RAAAAAXNSR0IArs4c6QAAAGFJREFUSMft1LsRQFAQheHPowAKoACx3IgEKtaEHujDjORSgWTH/ZOdnZOcM/sgk/kFFWY0qV8foQwS4MKBCS3qR6ixBJvElOobYAtivseIE120FaowJPN75GMu8j/LfMwNjh4HUpwg4LUAAAAASUVORK5CYII=);
  background-position: right;
  background-repeat: no-repeat;
}
div.output_wrapper {
  /* this position must be relative to enable descendents to be absolute within it */
  position: relative;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 1;
}
/* class for the output area when it should be height-limited */
div.output_scroll {
  /* ideally, this would be max-height, but FF barfs all over that */
  height: 24em;
  /* FF needs this *and the wrapper* to specify full width, or it will shrinkwrap */
  width: 100%;
  overflow: auto;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.8);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.8);
  display: block;
}
/* output div while it is collapsed */
div.output_collapsed {
  margin: 0px;
  padding: 0px;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
div.out_prompt_overlay {
  height: 100%;
  padding: 0px 0.4em;
  position: absolute;
  border-radius: 2px;
}
div.out_prompt_overlay:hover {
  /* use inner shadow to get border that is computed the same on WebKit/FF */
  -webkit-box-shadow: inset 0 0 1px #000;
  box-shadow: inset 0 0 1px #000;
  background: rgba(240, 240, 240, 0.5);
}
div.output_prompt {
  color: #D84315;
}
/* This class is the outer container of all output sections. */
div.output_area {
  padding: 0px;
  page-break-inside: avoid;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
div.output_area .MathJax_Display {
  text-align: left !important;
}
div.output_area .rendered_html table {
  margin-left: 0;
  margin-right: 0;
}
div.output_area .rendered_html img {
  margin-left: 0;
  margin-right: 0;
}
div.output_area img,
div.output_area svg {
  max-width: 100%;
  height: auto;
}
div.output_area img.unconfined,
div.output_area svg.unconfined {
  max-width: none;
}
/* This is needed to protect the pre formating from global settings such
   as that of bootstrap */
.output {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
@media (max-width: 540px) {
  div.output_area {
    /* Old browsers */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-align: stretch;
    display: -moz-box;
    -moz-box-orient: vertical;
    -moz-box-align: stretch;
    display: box;
    box-orient: vertical;
    box-align: stretch;
    /* Modern browsers */
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}
div.output_area pre {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  color: black;
  background-color: transparent;
  border-radius: 0;
}
/* This class is for the output subarea inside the output_area and after
   the prompt div. */
div.output_subarea {
  overflow-x: auto;
  padding: 0.4em;
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
  max-width: calc(100% - 14ex);
}
div.output_scroll div.output_subarea {
  overflow-x: visible;
}
/* The rest of the output_* classes are for special styling of the different
   output types */
/* all text output has this class: */
div.output_text {
  text-align: left;
  color: #000;
  /* This has to match that of the the CodeMirror class line-height below */
  line-height: 1.21429em;
}
/* stdout/stderr are 'text' as well as 'stream', but execute_result/error are *not* streams */
div.output_stderr {
  background: #fdd;
  /* very light red background for stderr */
}
div.output_latex {
  text-align: left;
}
/* Empty output_javascript divs should have no height */
div.output_javascript:empty {
  padding: 0;
}
.js-error {
  color: darkred;
}
/* raw_input styles */
div.raw_input_container {
  line-height: 1.21429em;
  padding-top: 5px;
}
pre.raw_input_prompt {
  /* nothing needed here. */
}
input.raw_input {
  font-family: monospace;
  font-size: inherit;
  color: inherit;
  width: auto;
  /* make sure input baseline aligns with prompt */
  vertical-align: baseline;
  /* padding + margin = 0.5em between prompt and cursor */
  padding: 0em 0.25em;
  margin: 0em 0.25em;
}
input.raw_input:focus {
  box-shadow: none;
}
p.p-space {
  margin-bottom: 10px;
}
div.output_unrecognized {
  padding: 5px;
  font-weight: bold;
  color: red;
}
div.output_unrecognized a {
  color: inherit;
  text-decoration: none;
}
div.output_unrecognized a:hover {
  color: inherit;
  text-decoration: none;
}
.rendered_html {
  color: #000;
  /* any extras will just be numbers: */
}
.rendered_html em {
  font-style: italic;
}
.rendered_html strong {
  font-weight: bold;
}
.rendered_html u {
  text-decoration: underline;
}
.rendered_html :link {
  text-decoration: underline;
}
.rendered_html :visited {
  text-decoration: underline;
}
.rendered_html h1 {
  font-size: 185.7%;
  margin: 1.08em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h2 {
  font-size: 157.1%;
  margin: 1.27em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h3 {
  font-size: 128.6%;
  margin: 1.55em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h4 {
  font-size: 100%;
  margin: 2em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h5 {
  font-size: 100%;
  margin: 2em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
  font-style: italic;
}
.rendered_html h6 {
  font-size: 100%;
  margin: 2em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
  font-style: italic;
}
.rendered_html h1:first-child {
  margin-top: 0.538em;
}
.rendered_html h2:first-child {
  margin-top: 0.636em;
}
.rendered_html h3:first-child {
  margin-top: 0.777em;
}
.rendered_html h4:first-child {
  margin-top: 1em;
}
.rendered_html h5:first-child {
  margin-top: 1em;
}
.rendered_html h6:first-child {
  margin-top: 1em;
}
.rendered_html ul {
  list-style: disc;
  margin: 0em 2em;
  padding-left: 0px;
}
.rendered_html ul ul {
  list-style: square;
  margin: 0em 2em;
}
.rendered_html ul ul ul {
  list-style: circle;
  margin: 0em 2em;
}
.rendered_html ol {
  list-style: decimal;
  margin: 0em 2em;
  padding-left: 0px;
}
.rendered_html ol ol {
  list-style: upper-alpha;
  margin: 0em 2em;
}
.rendered_html ol ol ol {
  list-style: lower-alpha;
  margin: 0em 2em;
}
.rendered_html ol ol ol ol {
  list-style: lower-roman;
  margin: 0em 2em;
}
.rendered_html ol ol ol ol ol {
  list-style: decimal;
  margin: 0em 2em;
}
.rendered_html * + ul {
  margin-top: 1em;
}
.rendered_html * + ol {
  margin-top: 1em;
}
.rendered_html hr {
  color: black;
  background-color: black;
}
.rendered_html pre {
  margin: 1em 2em;
}
.rendered_html pre,
.rendered_html code {
  border: 0;
  background-color: #fff;
  color: #000;
  font-size: 100%;
  padding: 0px;
}
.rendered_html blockquote {
  margin: 1em 2em;
}
.rendered_html table {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  border-collapse: collapse;
}
.rendered_html tr,
.rendered_html th,
.rendered_html td {
  border: 1px solid black;
  border-collapse: collapse;
  margin: 1em 2em;
}
.rendered_html td,
.rendered_html th {
  text-align: left;
  vertical-align: middle;
  padding: 4px;
}
.rendered_html th {
  font-weight: bold;
}
.rendered_html * + table {
  margin-top: 1em;
}
.rendered_html p {
  text-align: left;
}
.rendered_html * + p {
  margin-top: 1em;
}
.rendered_html img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.rendered_html * + img {
  margin-top: 1em;
}
.rendered_html img,
.rendered_html svg {
  max-width: 100%;
  height: auto;
}
.rendered_html img.unconfined,
.rendered_html svg.unconfined {
  max-width: none;
}
div.text_cell {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
@media (max-width: 540px) {
  div.text_cell > div.prompt {
    display: none;
  }
}
div.text_cell_render {
  /*font-family: "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;*/
  outline: none;
  resize: none;
  width: inherit;
  border-style: none;
  padding: 0.5em 0.5em 0.5em 0.4em;
  color: #000;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
a.anchor-link:link {
  text-decoration: none;
  padding: 0px 20px;
  visibility: hidden;
}
h1:hover .anchor-link,
h2:hover .anchor-link,
h3:hover .anchor-link,
h4:hover .anchor-link,
h5:hover .anchor-link,
h6:hover .anchor-link {
  visibility: visible;
}
.text_cell.rendered .input_area {
  display: none;
}
.text_cell.rendered .rendered_html {
  overflow-x: auto;
  overflow-y: hidden;
}
.text_cell.unrendered .text_cell_render {
  display: none;
}
.cm-header-1,
.cm-header-2,
.cm-header-3,
.cm-header-4,
.cm-header-5,
.cm-header-6 {
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.cm-header-1 {
  font-size: 185.7%;
}
.cm-header-2 {
  font-size: 157.1%;
}
.cm-header-3 {
  font-size: 128.6%;
}
.cm-header-4 {
  font-size: 110%;
}
.cm-header-5 {
  font-size: 100%;
  font-style: italic;
}
.cm-header-6 {
  font-size: 100%;
  font-style: italic;
}
/*!
*
* IPython notebook webapp
*
*/
@media (max-width: 767px) {
  .notebook_app {
    padding-left: 0px;
    padding-right: 0px;
  }
}
#ipython-main-app {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 100%;
}
div#notebook_panel {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 100%;
}
div#notebook {
  font-size: 14px;
  line-height: 20px;
  overflow-y: hidden;
  overflow-x: auto;
  width: 100%;
  /* This spaces the page away from the edge of the notebook area */
  padding-top: 20px;
  margin: 0px;
  outline: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  min-height: 100%;
}
@media not print {
  #notebook-container {
    padding: 15px;
    background-color: #fff;
    min-height: 0;
    -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
    box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  }
}
@media print {
  #notebook-container {
    width: 100%;
  }
}
div.ui-widget-content {
  border: 1px solid #ababab;
  outline: none;
}
pre.dialog {
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0.4em;
  padding-left: 2em;
}
p.dialog {
  padding: 0.2em;
}
/* Word-wrap output correctly.  This is the CSS3 spelling, though Firefox seems
   to not honor it correctly.  Webkit browsers (Chrome, rekonq, Safari) do.
 */
pre,
code,
kbd,
samp {
  white-space: pre-wrap;
}
#fonttest {
  font-family: monospace;
}
p {
  margin-bottom: 0;
}
.end_space {
  min-height: 100px;
  transition: height .2s ease;
}
.notebook_app > #header {
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
}
@media not print {
  .notebook_app {
    background-color: #EEE;
  }
}
kbd {
  border-style: solid;
  border-width: 1px;
  box-shadow: none;
  margin: 2px;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
}
/* CSS for the cell toolbar */
.celltoolbar {
  border: thin solid #CFCFCF;
  border-bottom: none;
  background: #EEE;
  border-radius: 2px 2px 0px 0px;
  width: 100%;
  height: 29px;
  padding-right: 4px;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
  /* Old browsers */
  -webkit-box-pack: end;
  -moz-box-pack: end;
  box-pack: end;
  /* Modern browsers */
  justify-content: flex-end;
  display: -webkit-flex;
}
@media print {
  .celltoolbar {
    display: none;
  }
}
.ctb_hideshow {
  display: none;
  vertical-align: bottom;
}
/* ctb_show is added to the ctb_hideshow div to show the cell toolbar.
   Cell toolbars are only shown when the ctb_global_show class is also set.
*/
.ctb_global_show .ctb_show.ctb_hideshow {
  display: block;
}
.ctb_global_show .ctb_show + .input_area,
.ctb_global_show .ctb_show + div.text_cell_input,
.ctb_global_show .ctb_show ~ div.text_cell_render {
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
}
.ctb_global_show .ctb_show ~ div.text_cell_render {
  border: 1px solid #cfcfcf;
}
.celltoolbar {
  font-size: 87%;
  padding-top: 3px;
}
.celltoolbar select {
  display: block;
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
  width: inherit;
  font-size: inherit;
  height: 22px;
  padding: 0px;
  display: inline-block;
}
.celltoolbar select:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.celltoolbar select::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.celltoolbar select:-ms-input-placeholder {
  color: #999;
}
.celltoolbar select::-webkit-input-placeholder {
  color: #999;
}
.celltoolbar select::-ms-expand {
  border: 0;
  background-color: transparent;
}
.celltoolbar select[disabled],
.celltoolbar select[readonly],
fieldset[disabled] .celltoolbar select {
  background-color: #eeeeee;
  opacity: 1;
}
.celltoolbar select[disabled],
fieldset[disabled] .celltoolbar select {
  cursor: not-allowed;
}
textarea.celltoolbar select {
  height: auto;
}
select.celltoolbar select {
  height: 30px;
  line-height: 30px;
}
textarea.celltoolbar select,
select[multiple].celltoolbar select {
  height: auto;
}
.celltoolbar label {
  margin-left: 5px;
  margin-right: 5px;
}
.completions {
  position: absolute;
  z-index: 110;
  overflow: hidden;
  border: 1px solid #ababab;
  border-radius: 2px;
  -webkit-box-shadow: 0px 6px 10px -1px #adadad;
  box-shadow: 0px 6px 10px -1px #adadad;
  line-height: 1;
}
.completions select {
  background: white;
  outline: none;
  border: none;
  padding: 0px;
  margin: 0px;
  overflow: auto;
  font-family: monospace;
  font-size: 110%;
  color: #000;
  width: auto;
}
.completions select option.context {
  color: #286090;
}
#kernel_logo_widget {
  float: right !important;
  float: right;
}
#kernel_logo_widget .current_kernel_logo {
  display: none;
  margin-top: -1px;
  margin-bottom: -1px;
  width: 32px;
  height: 32px;
}
#menubar {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin-top: 1px;
}
#menubar .navbar {
  border-top: 1px;
  border-radius: 0px 0px 2px 2px;
  margin-bottom: 0px;
}
#menubar .navbar-toggle {
  float: left;
  padding-top: 7px;
  padding-bottom: 7px;
  border: none;
}
#menubar .navbar-collapse {
  clear: left;
}
.nav-wrapper {
  border-bottom: 1px solid #e7e7e7;
}
i.menu-icon {
  padding-top: 4px;
}
ul#help_menu li a {
  overflow: hidden;
  padding-right: 2.2em;
}
ul#help_menu li a i {
  margin-right: -1.2em;
}
.dropdown-submenu {
  position: relative;
}
.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  margin-left: -1px;
}
.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}
.dropdown-submenu > a:after {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  content: "\f0da";
  float: right;
  color: #333333;
  margin-top: 2px;
  margin-right: -10px;
}
.dropdown-submenu > a:after.pull-left {
  margin-right: .3em;
}
.dropdown-submenu > a:after.pull-right {
  margin-left: .3em;
}
.dropdown-submenu:hover > a:after {
  color: #262626;
}
.dropdown-submenu.pull-left {
  float: none;
}
.dropdown-submenu.pull-left > .dropdown-menu {
  left: -100%;
  margin-left: 10px;
}
#notification_area {
  float: right !important;
  float: right;
  z-index: 10;
}
.indicator_area {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
}
#kernel_indicator {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
  border-left: 1px solid;
}
#kernel_indicator .kernel_indicator_name {
  padding-left: 5px;
  padding-right: 5px;
}
#modal_indicator {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
}
#readonly-indicator {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
  margin-top: 2px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  display: none;
}
.modal_indicator:before {
  width: 1.28571429em;
  text-align: center;
}
.edit_mode .modal_indicator:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f040";
}
.edit_mode .modal_indicator:before.pull-left {
  margin-right: .3em;
}
.edit_mode .modal_indicator:before.pull-right {
  margin-left: .3em;
}
.command_mode .modal_indicator:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: ' ';
}
.command_mode .modal_indicator:before.pull-left {
  margin-right: .3em;
}
.command_mode .modal_indicator:before.pull-right {
  margin-left: .3em;
}
.kernel_idle_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f10c";
}
.kernel_idle_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_idle_icon:before.pull-right {
  margin-left: .3em;
}
.kernel_busy_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f111";
}
.kernel_busy_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_busy_icon:before.pull-right {
  margin-left: .3em;
}
.kernel_dead_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f1e2";
}
.kernel_dead_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_dead_icon:before.pull-right {
  margin-left: .3em;
}
.kernel_disconnected_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f127";
}
.kernel_disconnected_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_disconnected_icon:before.pull-right {
  margin-left: .3em;
}
.notification_widget {
  color: #777;
  z-index: 10;
  background: rgba(240, 240, 240, 0.5);
  margin-right: 4px;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.notification_widget:focus,
.notification_widget.focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
.notification_widget:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.notification_widget:active,
.notification_widget.active,
.open > .dropdown-toggle.notification_widget {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.notification_widget:active:hover,
.notification_widget.active:hover,
.open > .dropdown-toggle.notification_widget:hover,
.notification_widget:active:focus,
.notification_widget.active:focus,
.open > .dropdown-toggle.notification_widget:focus,
.notification_widget:active.focus,
.notification_widget.active.focus,
.open > .dropdown-toggle.notification_widget.focus {
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
.notification_widget:active,
.notification_widget.active,
.open > .dropdown-toggle.notification_widget {
  background-image: none;
}
.notification_widget.disabled:hover,
.notification_widget[disabled]:hover,
fieldset[disabled] .notification_widget:hover,
.notification_widget.disabled:focus,
.notification_widget[disabled]:focus,
fieldset[disabled] .notification_widget:focus,
.notification_widget.disabled.focus,
.notification_widget[disabled].focus,
fieldset[disabled] .notification_widget.focus {
  background-color: #fff;
  border-color: #ccc;
}
.notification_widget .badge {
  color: #fff;
  background-color: #333;
}
.notification_widget.warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
.notification_widget.warning:focus,
.notification_widget.warning.focus {
  color: #fff;
  background-color: #ec971f;
  border-color: #985f0d;
}
.notification_widget.warning:hover {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.notification_widget.warning:active,
.notification_widget.warning.active,
.open > .dropdown-toggle.notification_widget.warning {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.notification_widget.warning:active:hover,
.notification_widget.warning.active:hover,
.open > .dropdown-toggle.notification_widget.warning:hover,
.notification_widget.warning:active:focus,
.notification_widget.warning.active:focus,
.open > .dropdown-toggle.notification_widget.warning:focus,
.notification_widget.warning:active.focus,
.notification_widget.warning.active.focus,
.open > .dropdown-toggle.notification_widget.warning.focus {
  color: #fff;
  background-color: #d58512;
  border-color: #985f0d;
}
.notification_widget.warning:active,
.notification_widget.warning.active,
.open > .dropdown-toggle.notification_widget.warning {
  background-image: none;
}
.notification_widget.warning.disabled:hover,
.notification_widget.warning[disabled]:hover,
fieldset[disabled] .notification_widget.warning:hover,
.notification_widget.warning.disabled:focus,
.notification_widget.warning[disabled]:focus,
fieldset[disabled] .notification_widget.warning:focus,
.notification_widget.warning.disabled.focus,
.notification_widget.warning[disabled].focus,
fieldset[disabled] .notification_widget.warning.focus {
  background-color: #f0ad4e;
  border-color: #eea236;
}
.notification_widget.warning .badge {
  color: #f0ad4e;
  background-color: #fff;
}
.notification_widget.success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.notification_widget.success:focus,
.notification_widget.success.focus {
  color: #fff;
  background-color: #449d44;
  border-color: #255625;
}
.notification_widget.success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.notification_widget.success:active,
.notification_widget.success.active,
.open > .dropdown-toggle.notification_widget.success {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.notification_widget.success:active:hover,
.notification_widget.success.active:hover,
.open > .dropdown-toggle.notification_widget.success:hover,
.notification_widget.success:active:focus,
.notification_widget.success.active:focus,
.open > .dropdown-toggle.notification_widget.success:focus,
.notification_widget.success:active.focus,
.notification_widget.success.active.focus,
.open > .dropdown-toggle.notification_widget.success.focus {
  color: #fff;
  background-color: #398439;
  border-color: #255625;
}
.notification_widget.success:active,
.notification_widget.success.active,
.open > .dropdown-toggle.notification_widget.success {
  background-image: none;
}
.notification_widget.success.disabled:hover,
.notification_widget.success[disabled]:hover,
fieldset[disabled] .notification_widget.success:hover,
.notification_widget.success.disabled:focus,
.notification_widget.success[disabled]:focus,
fieldset[disabled] .notification_widget.success:focus,
.notification_widget.success.disabled.focus,
.notification_widget.success[disabled].focus,
fieldset[disabled] .notification_widget.success.focus {
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.notification_widget.success .badge {
  color: #5cb85c;
  background-color: #fff;
}
.notification_widget.info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
.notification_widget.info:focus,
.notification_widget.info.focus {
  color: #fff;
  background-color: #31b0d5;
  border-color: #1b6d85;
}
.notification_widget.info:hover {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.notification_widget.info:active,
.notification_widget.info.active,
.open > .dropdown-toggle.notification_widget.info {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.notification_widget.info:active:hover,
.notification_widget.info.active:hover,
.open > .dropdown-toggle.notification_widget.info:hover,
.notification_widget.info:active:focus,
.notification_widget.info.active:focus,
.open > .dropdown-toggle.notification_widget.info:focus,
.notification_widget.info:active.focus,
.notification_widget.info.active.focus,
.open > .dropdown-toggle.notification_widget.info.focus {
  color: #fff;
  background-color: #269abc;
  border-color: #1b6d85;
}
.notification_widget.info:active,
.notification_widget.info.active,
.open > .dropdown-toggle.notification_widget.info {
  background-image: none;
}
.notification_widget.info.disabled:hover,
.notification_widget.info[disabled]:hover,
fieldset[disabled] .notification_widget.info:hover,
.notification_widget.info.disabled:focus,
.notification_widget.info[disabled]:focus,
fieldset[disabled] .notification_widget.info:focus,
.notification_widget.info.disabled.focus,
.notification_widget.info[disabled].focus,
fieldset[disabled] .notification_widget.info.focus {
  background-color: #5bc0de;
  border-color: #46b8da;
}
.notification_widget.info .badge {
  color: #5bc0de;
  background-color: #fff;
}
.notification_widget.danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
.notification_widget.danger:focus,
.notification_widget.danger.focus {
  color: #fff;
  background-color: #c9302c;
  border-color: #761c19;
}
.notification_widget.danger:hover {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.notification_widget.danger:active,
.notification_widget.danger.active,
.open > .dropdown-toggle.notification_widget.danger {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.notification_widget.danger:active:hover,
.notification_widget.danger.active:hover,
.open > .dropdown-toggle.notification_widget.danger:hover,
.notification_widget.danger:active:focus,
.notification_widget.danger.active:focus,
.open > .dropdown-toggle.notification_widget.danger:focus,
.notification_widget.danger:active.focus,
.notification_widget.danger.active.focus,
.open > .dropdown-toggle.notification_widget.danger.focus {
  color: #fff;
  background-color: #ac2925;
  border-color: #761c19;
}
.notification_widget.danger:active,
.notification_widget.danger.active,
.open > .dropdown-toggle.notification_widget.danger {
  background-image: none;
}
.notification_widget.danger.disabled:hover,
.notification_widget.danger[disabled]:hover,
fieldset[disabled] .notification_widget.danger:hover,
.notification_widget.danger.disabled:focus,
.notification_widget.danger[disabled]:focus,
fieldset[disabled] .notification_widget.danger:focus,
.notification_widget.danger.disabled.focus,
.notification_widget.danger[disabled].focus,
fieldset[disabled] .notification_widget.danger.focus {
  background-color: #d9534f;
  border-color: #d43f3a;
}
.notification_widget.danger .badge {
  color: #d9534f;
  background-color: #fff;
}
div#pager {
  background-color: #fff;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  display: none;
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-height: 50%;
  padding-top: 8px;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  /* Display over codemirror */
  z-index: 100;
  /* Hack which prevents jquery ui resizable from changing top. */
  top: auto !important;
}
div#pager pre {
  line-height: 1.21429em;
  color: #000;
  background-color: #f7f7f7;
  padding: 0.4em;
}
div#pager #pager-button-area {
  position: absolute;
  top: 8px;
  right: 20px;
}
div#pager #pager-contents {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}
div#pager #pager-contents #pager-container {
  position: relative;
  padding: 15px 0px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
div#pager .ui-resizable-handle {
  top: 0px;
  height: 8px;
  background: #f7f7f7;
  border-top: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  /* This injects handle bars (a short, wide = symbol) for 
        the resize handle. */
}
div#pager .ui-resizable-handle::after {
  content: '';
  top: 2px;
  left: 50%;
  height: 3px;
  width: 30px;
  margin-left: -15px;
  position: absolute;
  border-top: 1px solid #cfcfcf;
}
.quickhelp {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
  line-height: 1.8em;
}
.shortcut_key {
  display: inline-block;
  width: 20ex;
  text-align: right;
  font-family: monospace;
}
.shortcut_descr {
  display: inline-block;
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
span.save_widget {
  margin-top: 6px;
}
span.save_widget span.filename {
  height: 1em;
  line-height: 1em;
  padding: 3px;
  margin-left: 16px;
  border: none;
  font-size: 146.5%;
  border-radius: 2px;
}
span.save_widget span.filename:hover {
  background-color: #e6e6e6;
}
span.checkpoint_status,
span.autosave_status {
  font-size: small;
}
@media (max-width: 767px) {
  span.save_widget {
    font-size: small;
  }
  span.checkpoint_status,
  span.autosave_status {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  span.checkpoint_status {
    display: none;
  }
  span.autosave_status {
    font-size: x-small;
  }
}
.toolbar {
  padding: 0px;
  margin-left: -5px;
  margin-top: 2px;
  margin-bottom: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.toolbar select,
.toolbar label {
  width: auto;
  vertical-align: middle;
  margin-right: 2px;
  margin-bottom: 0px;
  display: inline;
  font-size: 92%;
  margin-left: 0.3em;
  margin-right: 0.3em;
  padding: 0px;
  padding-top: 3px;
}
.toolbar .btn {
  padding: 2px 8px;
}
.toolbar .btn-group {
  margin-top: 0px;
  margin-left: 5px;
}
#maintoolbar {
  margin-bottom: -3px;
  margin-top: -8px;
  border: 0px;
  min-height: 27px;
  margin-left: 0px;
  padding-top: 11px;
  padding-bottom: 3px;
}
#maintoolbar .navbar-text {
  float: none;
  vertical-align: middle;
  text-align: right;
  margin-left: 5px;
  margin-right: 0px;
  margin-top: 0px;
}
.select-xs {
  height: 24px;
}
.pulse,
.dropdown-menu > li > a.pulse,
li.pulse > a.dropdown-toggle,
li.pulse.open > a.dropdown-toggle {
  background-color: #F37626;
  color: white;
}
/**
 * Primary styles
 *
 * Author: Jupyter Development Team
 */
/** WARNING IF YOU ARE EDITTING THIS FILE, if this is a .css file, It has a lot
 * of chance of beeing generated from the ../less/[samename].less file, you can
 * try to get back the less file by reverting somme commit in history
 **/
/*
 * We'll try to get something pretty, so we
 * have some strange css to have the scroll bar on
 * the left with fix button on the top right of the tooltip
 */
@-moz-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/*properties of tooltip after "expand"*/
.bigtooltip {
  overflow: auto;
  height: 200px;
  -webkit-transition-property: height;
  -webkit-transition-duration: 500ms;
  -moz-transition-property: height;
  -moz-transition-duration: 500ms;
  transition-property: height;
  transition-duration: 500ms;
}
/*properties of tooltip before "expand"*/
.smalltooltip {
  -webkit-transition-property: height;
  -webkit-transition-duration: 500ms;
  -moz-transition-property: height;
  -moz-transition-duration: 500ms;
  transition-property: height;
  transition-duration: 500ms;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 80px;
}
.tooltipbuttons {
  position: absolute;
  padding-right: 15px;
  top: 0px;
  right: 0px;
}
.tooltiptext {
  /*avoid the button to overlap on some docstring*/
  padding-right: 30px;
}
.ipython_tooltip {
  max-width: 700px;
  /*fade-in animation when inserted*/
  -webkit-animation: fadeOut 400ms;
  -moz-animation: fadeOut 400ms;
  animation: fadeOut 400ms;
  -webkit-animation: fadeIn 400ms;
  -moz-animation: fadeIn 400ms;
  animation: fadeIn 400ms;
  vertical-align: middle;
  background-color: #f7f7f7;
  overflow: visible;
  border: #ababab 1px solid;
  outline: none;
  padding: 3px;
  margin: 0px;
  padding-left: 7px;
  font-family: monospace;
  min-height: 50px;
  -moz-box-shadow: 0px 6px 10px -1px #adadad;
  -webkit-box-shadow: 0px 6px 10px -1px #adadad;
  box-shadow: 0px 6px 10px -1px #adadad;
  border-radius: 2px;
  position: absolute;
  z-index: 1000;
}
.ipython_tooltip a {
  float: right;
}
.ipython_tooltip .tooltiptext pre {
  border: 0;
  border-radius: 0;
  font-size: 100%;
  background-color: #f7f7f7;
}
.pretooltiparrow {
  left: 0px;
  margin: 0px;
  top: -16px;
  width: 40px;
  height: 16px;
  overflow: hidden;
  position: absolute;
}
.pretooltiparrow:before {
  background-color: #f7f7f7;
  border: 1px #ababab solid;
  z-index: 11;
  content: "";
  position: absolute;
  left: 15px;
  top: 10px;
  width: 25px;
  height: 25px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}
ul.typeahead-list i {
  margin-left: -10px;
  width: 18px;
}
ul.typeahead-list {
  max-height: 80vh;
  overflow: auto;
}
ul.typeahead-list > li > a {
  /** Firefox bug **/
  /* see https://github.com/jupyter/notebook/issues/559 */
  white-space: normal;
}
.cmd-palette .modal-body {
  padding: 7px;
}
.cmd-palette form {
  background: white;
}
.cmd-palette input {
  outline: none;
}
.no-shortcut {
  display: none;
}
.command-shortcut:before {
  content: "(command)";
  padding-right: 3px;
  color: #777777;
}
.edit-shortcut:before {
  content: "(edit)";
  padding-right: 3px;
  color: #777777;
}
#find-and-replace #replace-preview .match,
#find-and-replace #replace-preview .insert {
  background-color: #BBDEFB;
  border-color: #90CAF9;
  border-style: solid;
  border-width: 1px;
  border-radius: 0px;
}
#find-and-replace #replace-preview .replace .match {
  background-color: #FFCDD2;
  border-color: #EF9A9A;
  border-radius: 0px;
}
#find-and-replace #replace-preview .replace .insert {
  background-color: #C8E6C9;
  border-color: #A5D6A7;
  border-radius: 0px;
}
#find-and-replace #replace-preview {
  max-height: 60vh;
  overflow: auto;
}
#find-and-replace #replace-preview pre {
  padding: 5px 10px;
}
.terminal-app {
  background: #EEE;
}
.terminal-app #header {
  background: #fff;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
}
.terminal-app .terminal {
  float: left;
  font-family: monospace;
  color: white;
  background: black;
  padding: 0.4em;
  border-radius: 2px;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.4);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.4);
}
.terminal-app .terminal,
.terminal-app .terminal dummy-screen {
  line-height: 1em;
  font-size: 14px;
}
.terminal-app .terminal-cursor {
  color: black;
  background: white;
}
.terminal-app #terminado-container {
  margin-top: 20px;
}
/*# sourceMappingURL=style.min.css.map */
    </style>
<style type="text/css">
    .highlight .hll { background-color: #ffffcc }
.highlight  { background: #f8f8f8; }
.highlight .c { color: #408080; font-style: italic } /* Comment */
.highlight .err { border: 1px solid #FF0000 } /* Error */
.highlight .k { color: #008000; font-weight: bold } /* Keyword */
.highlight .o { color: #666666 } /* Operator */
.highlight .ch { color: #408080; font-style: italic } /* Comment.Hashbang */
.highlight .cm { color: #408080; font-style: italic } /* Comment.Multiline */
.highlight .cp { color: #BC7A00 } /* Comment.Preproc */
.highlight .cpf { color: #408080; font-style: italic } /* Comment.PreprocFile */
.highlight .c1 { color: #408080; font-style: italic } /* Comment.Single */
.highlight .cs { color: #408080; font-style: italic } /* Comment.Special */
.highlight .gd { color: #A00000 } /* Generic.Deleted */
.highlight .ge { font-style: italic } /* Generic.Emph */
.highlight .gr { color: #FF0000 } /* Generic.Error */
.highlight .gh { color: #000080; font-weight: bold } /* Generic.Heading */
.highlight .gi { color: #00A000 } /* Generic.Inserted */
.highlight .go { color: #888888 } /* Generic.Output */
.highlight .gp { color: #000080; font-weight: bold } /* Generic.Prompt */
.highlight .gs { font-weight: bold } /* Generic.Strong */
.highlight .gu { color: #800080; font-weight: bold } /* Generic.Subheading */
.highlight .gt { color: #0044DD } /* Generic.Traceback */
.highlight .kc { color: #008000; font-weight: bold } /* Keyword.Constant */
.highlight .kd { color: #008000; font-weight: bold } /* Keyword.Declaration */
.highlight .kn { color: #008000; font-weight: bold } /* Keyword.Namespace */
.highlight .kp { color: #008000 } /* Keyword.Pseudo */
.highlight .kr { color: #008000; font-weight: bold } /* Keyword.Reserved */
.highlight .kt { color: #B00040 } /* Keyword.Type */
.highlight .m { color: #666666 } /* Literal.Number */
.highlight .s { color: #BA2121 } /* Literal.String */
.highlight .na { color: #7D9029 } /* Name.Attribute */
.highlight .nb { color: #008000 } /* Name.Builtin */
.highlight .nc { color: #0000FF; font-weight: bold } /* Name.Class */
.highlight .no { color: #880000 } /* Name.Constant */
.highlight .nd { color: #AA22FF } /* Name.Decorator */
.highlight .ni { color: #999999; font-weight: bold } /* Name.Entity */
.highlight .ne { color: #D2413A; font-weight: bold } /* Name.Exception */
.highlight .nf { color: #0000FF } /* Name.Function */
.highlight .nl { color: #A0A000 } /* Name.Label */
.highlight .nn { color: #0000FF; font-weight: bold } /* Name.Namespace */
.highlight .nt { color: #008000; font-weight: bold } /* Name.Tag */
.highlight .nv { color: #19177C } /* Name.Variable */
.highlight .ow { color: #AA22FF; font-weight: bold } /* Operator.Word */
.highlight .w { color: #bbbbbb } /* Text.Whitespace */
.highlight .mb { color: #666666 } /* Literal.Number.Bin */
.highlight .mf { color: #666666 } /* Literal.Number.Float */
.highlight .mh { color: #666666 } /* Literal.Number.Hex */
.highlight .mi { color: #666666 } /* Literal.Number.Integer */
.highlight .mo { color: #666666 } /* Literal.Number.Oct */
.highlight .sb { color: #BA2121 } /* Literal.String.Backtick */
.highlight .sc { color: #BA2121 } /* Literal.String.Char */
.highlight .sd { color: #BA2121; font-style: italic } /* Literal.String.Doc */
.highlight .s2 { color: #BA2121 } /* Literal.String.Double */
.highlight .se { color: #BB6622; font-weight: bold } /* Literal.String.Escape */
.highlight .sh { color: #BA2121 } /* Literal.String.Heredoc */
.highlight .si { color: #BB6688; font-weight: bold } /* Literal.String.Interpol */
.highlight .sx { color: #008000 } /* Literal.String.Other */
.highlight .sr { color: #BB6688 } /* Literal.String.Regex */
.highlight .s1 { color: #BA2121 } /* Literal.String.Single */
.highlight .ss { color: #19177C } /* Literal.String.Symbol */
.highlight .bp { color: #008000 } /* Name.Builtin.Pseudo */
.highlight .vc { color: #19177C } /* Name.Variable.Class */
.highlight .vg { color: #19177C } /* Name.Variable.Global */
.highlight .vi { color: #19177C } /* Name.Variable.Instance */
.highlight .il { color: #666666 } /* Literal.Number.Integer.Long */
    </style>
<style type="text/css">
    
/* Temporary definitions which will become obsolete with Notebook release 5.0 */
.ansi-black-fg { color: #3E424D; }
.ansi-black-bg { background-color: #3E424D; }
.ansi-black-intense-fg { color: #282C36; }
.ansi-black-intense-bg { background-color: #282C36; }
.ansi-red-fg { color: #E75C58; }
.ansi-red-bg { background-color: #E75C58; }
.ansi-red-intense-fg { color: #B22B31; }
.ansi-red-intense-bg { background-color: #B22B31; }
.ansi-green-fg { color: #00A250; }
.ansi-green-bg { background-color: #00A250; }
.ansi-green-intense-fg { color: #007427; }
.ansi-green-intense-bg { background-color: #007427; }
.ansi-yellow-fg { color: #DDB62B; }
.ansi-yellow-bg { background-color: #DDB62B; }
.ansi-yellow-intense-fg { color: #B27D12; }
.ansi-yellow-intense-bg { background-color: #B27D12; }
.ansi-blue-fg { color: #208FFB; }
.ansi-blue-bg { background-color: #208FFB; }
.ansi-blue-intense-fg { color: #0065CA; }
.ansi-blue-intense-bg { background-color: #0065CA; }
.ansi-magenta-fg { color: #D160C4; }
.ansi-magenta-bg { background-color: #D160C4; }
.ansi-magenta-intense-fg { color: #A03196; }
.ansi-magenta-intense-bg { background-color: #A03196; }
.ansi-cyan-fg { color: #60C6C8; }
.ansi-cyan-bg { background-color: #60C6C8; }
.ansi-cyan-intense-fg { color: #258F8F; }
.ansi-cyan-intense-bg { background-color: #258F8F; }
.ansi-white-fg { color: #C5C1B4; }
.ansi-white-bg { background-color: #C5C1B4; }
.ansi-white-intense-fg { color: #A1A6B2; }
.ansi-white-intense-bg { background-color: #A1A6B2; }

.ansi-bold { font-weight: bold; }

    </style>


<style type="text/css">
/* Overrides of notebook CSS for static HTML export */
body {
  overflow: visible;
  padding: 8px;
}

div#notebook {
  overflow: visible;
  border-top: none;
}

@media print {
  div.cell {
    display: block;
    page-break-inside: avoid;
  } 
  div.output_wrapper { 
    display: block;
    page-break-inside: avoid; 
  }
  div.output { 
    display: block;
    page-break-inside: avoid; 
  }
}
</style>

<!-- Custom stylesheet, it must be in the same directory as the html file -->
<link rel="stylesheet" href="custom.css">

<!-- Loading mathjax macro -->
<!-- Load mathjax -->
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>
    <!-- MathJax configuration -->
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [ ['$','$'], ["\\(","\\)"] ],
            displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
            processEscapes: true,
            processEnvironments: true
        },
        // Center justify equations in code and markdown cells. Elsewhere
        // we use CSS to left justify single line equations in code cells.
        displayAlign: 'center',
        "HTML-CSS": {
            styles: {'.MathJax_Display': {"margin": 0}},
            linebreaks: { automatic: true }
        }
    });
    </script>
    <!-- End of mathjax configuration --></head>
<body>
  <div tabindex="-1" id="notebook" class="border-box-sizing">
    <div class="container" id="notebook-container">

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[30]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="kn">from</span> <span class="nn">IPython.core.display</span> <span class="kn">import</span> <span class="n">HTML</span>
<span class="n">HTML</span><span class="p">(</span><span class="s2">&quot;&quot;&quot;</span>
<span class="s2">&lt;style&gt;</span>

<span class="s2">div.cell { /* Tunes the space between cells */</span>
<span class="s2">margin-top:1em;</span>
<span class="s2">margin-bottom:1em;</span>
<span class="s2">}</span>

<span class="s2">div.text_cell_render h1 { /* Main titles bigger, centered */</span>
<span class="s2">font-size: 2.2em;</span>
<span class="s2">line-height:1.4em;</span>
<span class="s2">text-align:center;</span>
<span class="s2">}</span>

<span class="s2">div.text_cell_render h2 { /*  Parts names nearer from text */</span>
<span class="s2">margin-bottom: -0.1em;</span>
<span class="s2">}</span>


<span class="s2">div.text_cell_render { /* Customize text cells */</span>
<span class="s2">font-family: &#39;new times roman&#39;;</span>
<span class="s2">font-size:1.1em;</span>
<span class="s2">line-height:1.2em;</span>
<span class="s2">padding-left:1em;</span>
<span class="s2">padding-right:1em;</span>
<span class="s2">}</span>
<span class="s2">&lt;/style&gt;</span>
<span class="s2">&quot;&quot;&quot;</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt output_prompt">Out[30]:</div>

<div class="output_html rendered_html output_subarea output_execute_result">

<style>

div.cell { /* Tunes the space between cells */
margin-top:1em;
margin-bottom:1em;
}

div.text_cell_render h1 { /* Main titles bigger, centered */
font-size: 2.2em;
line-height:1.4em;
text-align:center;
}

div.text_cell_render h2 { /*  Parts names nearer from text */
margin-bottom: -0.1em;
}


div.text_cell_render { /* Customize text cells */
font-family: 'new times roman';
font-size:1.1em;
line-height:1.2em;
padding-left:1em;
padding-right:1em;
}
</style>

</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[4]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="o">%</span><span class="k">matplotlib</span> inline
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="kn">as</span> <span class="nn">plt</span>
<span class="kn">import</span> <span class="nn">numpy</span> <span class="kn">as</span> <span class="nn">np</span>
</pre></div>

</div>
</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Generaremos una distribución que representará una base de datos la cual necesitamos analizar. Y luego representaremos su distribución mediante un histograma:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[17]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="c1">#media y desvio estandar:</span>
<span class="n">mu</span>    <span class="o">=</span> <span class="mi">0</span>
<span class="n">sigma</span> <span class="o">=</span> <span class="mi">1</span>
<span class="c1">#Número de datos de la muestra:</span>
<span class="n">Ndatos</span> <span class="o">=</span> <span class="mi">500</span>
<span class="c1">#Generamos una muestra de datos:</span>
<span class="n">datos</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">normal</span><span class="p">(</span><span class="n">mu</span><span class="p">,</span> <span class="n">sigma</span><span class="p">,</span> <span class="n">Ndatos</span><span class="p">)</span> 

<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span>
<span class="n">frecuencia</span><span class="p">,</span> <span class="n">largo</span><span class="p">,</span> <span class="n">ignorar</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">hist</span><span class="p">(</span><span class="n">datos</span><span class="p">,</span> <span class="mi">20</span><span class="p">,</span> <span class="n">normed</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">r&#39;$\rm Frequencia$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">r&#39;$\rm Valores\ de\ los\ datos$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">title</span><span class="p">(</span><span class="s1">&#39;Histograma&#39;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
RU5ErkJggg==
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="&#191;C&#243;mo-determinamos-que-distribuci&#243;n-debemos-utilizar?">&#191;C&#243;mo determinamos que distribuci&#243;n debemos utilizar?<a class="anchor-link" href="#&#191;C&#243;mo-determinamos-que-distribuci&#243;n-debemos-utilizar?">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Esta es una muy buena pregunta. De su respuesta depende el modelo que usaremos para entender los datos y sacar conclusiones. Por ende, debemos ser capacez de caracterizar nuestra distribución con el fin de obtener información inicial. Algunas preguntas útiles son si los datos son discretos o continuos, o si la distribución de los valores son simétricos con respecto a un eje. En nuestro caso, como los datos son generados po una distribución Gaussiana, el histograma muestra que los datos son simétricos en el eje $\mu=0$, y sus valores son contínuos.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h2 id="Matem&#225;ticamente-hablando">Matem&#225;ticamente hablando<a class="anchor-link" href="#Matem&#225;ticamente-hablando">&#182;</a></h2>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>La función de densidad de probabilidad (PDF por las siglas en inglés Probability Density Function) de la distribución normal, dada la información de un set de mediciones $X=[x_1,x_2,...,x_n]$, se define como sigue:</p>
$$f(X\ |\ \mu,\sigma)=\displaystyle \frac{1}{\sqrt{2\pi} \sigma} \ e^{-\frac{1}{2}\left(\frac{X-\mu}{\sigma}\right)^{2}}$$<p>Aquí, $\mu$ y $\sigma$ son la media y desviación estándar del set de datos $X$. Estos parámetros pueden ser interpretados como...</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[12]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="k">def</span> <span class="nf">Gaussiana</span><span class="p">(</span><span class="n">Distribucion</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma</span><span class="p">):</span>
    <span class="k">return</span> <span class="p">(</span><span class="mf">1.</span><span class="o">/</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">sqrt</span><span class="p">(</span><span class="mi">2</span><span class="o">*</span><span class="n">np</span><span class="o">.</span><span class="n">pi</span><span class="p">)</span><span class="o">*</span><span class="n">sigma</span><span class="p">))</span><span class="o">*</span><span class="n">np</span><span class="o">.</span><span class="n">exp</span><span class="p">(</span><span class="o">-</span><span class="mf">0.5</span><span class="o">*</span><span class="p">((</span><span class="n">Distribucion</span> <span class="o">-</span> <span class="n">media</span><span class="p">)</span><span class="o">/</span><span class="n">sigma</span><span class="p">)</span><span class="o">**</span><span class="mi">2</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Entonces, si fijamos los parámetros $\mu=0$ y $\sigma=1$ sobre un rango arbitrario $x_{i}$ que esté centrado en $\mu$ a modo de prueba, podemos ver el comportamiento de la función:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[19]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="n">media</span><span class="o">=</span><span class="mi">0</span>
<span class="n">sigma</span><span class="o">=</span><span class="mi">1</span>

<span class="n">xi</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span><span class="mi">10</span><span class="p">,</span><span class="mi">1000</span><span class="p">)</span>
<span class="n">yi</span> <span class="o">=</span> <span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span>

<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">yi</span><span class="p">,</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">color</span><span class="o">=</span><span class="s1">&#39;red&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">2</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;PDF Gaussiana&#39;</span><span class="p">)</span>

<span class="n">frecuencia</span><span class="p">,</span> <span class="n">largo</span><span class="p">,</span> <span class="n">ignorar</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">hist</span><span class="p">(</span><span class="n">datos</span><span class="p">,</span> <span class="mi">20</span><span class="p">,</span> <span class="n">normed</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span><span class="mi">5</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;best&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">10</span><span class="p">,</span> <span class="n">frameon</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">r&#39;$\rm x_{i}$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbYAAAEuCAYAAADiPDdeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz
AAAPYQAAD2EBqD+naQAAIABJREFUeJzt3Xd4FNX+x/F3ApGWxCBSBQSlCAgoCIoFG1ewIB2MoqAC
Kirm+uMiYsHGVa4XjF2xAALmUhQUVLBRREUkUWokUREQpQUCoROyvz/O7Gaz2U0yIcnsbj6v55mH
KWd2vlmS/e45c+YcEBERERERERERERERERERERERERERERERERERERERERERESlMLWAesBfYBbwA
VCjknHOBQ0Bnr32RQBZwwPo3C9gPVCnheEVERAq0GHgPqAw0BtYCjxdQvppV5gR5E9u5wBEKT4oi
IiKlpgmQA9Tx2tcf2FLAOVOAJ63zvBPb7cDKEo5PRESESBtlWwF7gO1e+1KB+kCsn/KDMLW6J/0c
64BpdlwJ7ASWAp1sxCIiIuKXncQWAxz02XfI+jfaZ/85wNPAzZjamq9DwAqgB9AQ+BhYBDSyEY+I
iEg+FW2UPQhU9dnn3s7y2lcFmAU8AGwDIqz9EV5lRvq8zgRM8+T1wKt+rl3XWkREpHz721pKRFNM
7auW174BwGafcpdhamR7vZYcTPJ7xSozDjjP57x0THLzVfecc85xAVq0aNGiRcsGCqnoRBR00I9l
wJ/AMKAmpglxNvBUIeflAFdY54N5ZKA6pvNJJvAQMBzThJnpc247IHn69Om0aNHCZrilLyEhgcTE
RKfDCDl63+zTe1Y8et/sC9b3LDU1lYEDBwK0B1IClbPTFAnQF1Pr2oRJVlMx99LA1MiGAUlFeJ3b
Mc2PqzGPBPwAdCF/UvNo0aIF7dq1sxlu6YuLiwvKuIKd3jf79J4Vj943+0L9PbOb2HZialn+xBRw
nm8nlb3AHTavLSIiUig7vSJFRESCnhKbiIiEFSW2kxQfH+90CCFJ75t9es+KR++bfaH+ntntFemE
dkBycnJySN/MFBGRk5OSkkL79u2hkF6RqrGJiEhYUWITEZGwosQmIiJhRYlNRETCihKbiIiEFSU2
kSCQnp5OSkpKkZf09HSnQw4LjRo1okqVKsTExBAbG0t0dDRnnHEGo0aNIifHzLj1xBNPUKFCBWJi
YoiJiaFq1arUr1+f4cOHs3fvXs9rTZkyhcjISE8572XZsmWBQuDbb7+lT58+1KtXj5iYGOrXr8+g
QYP49ddfS/3nL8iMGTM499xzHY0hnLUDXMnJyS6RcJSWllasUc7T0tKcDj3kNWrUyDV16tQ8+9au
XeuqVauWa+zYsS6Xy+UaO3as68orr8xTJjU11XXFFVe4zjvvPNexY8dcLpfLNXnyZFejRo1sXX/K
lCmuatWquZ5//nnXvn37XC6Xy/Xnn3+6xowZ46pRo4brr7/+KuZPFp6Sk5Pdv/8FPvulGpuIw7Ky
3NMZTgeSi7BM9zlPStK5557LZZddxk8//eTZ53K58pQ555xzmDt3Lr/++itTpkwp1nUyMzMZPnw4
EyZMYOTIkcTGxgJwxhlnMG7cOEaOHElGRgYA+/fvZ+jQoTRr1sxTq3v22Wc9r9WoUSOmTp3q2V6y
ZAmRkbkf70888QQNGzakRo0adOzYkfnz5wOQnZ3N8OHDqVu3LjVr1qRz58589913gKmBNm7c2PMa
7777LhdccAGnn346sbGxdO/end27d3tev2/fvtx6661Ur16dBg0aMGbMGM+5f/31FwMGDOCss86i
WrVqnH322UyePLlY71tRKLGJBI0WmC+ihS3BN31TkVxwAdSvX/LLBRecVFjeSev48eMsWbKExYsX
c8011xR4XlxcHJdccglff/11sa67YMECTpw4weDBg/0eHz16tKcpcPTo0WzevJlVq1aRlZXFSy+9
xCOPPMKmTZsAiIiIICLC/3gbixcv5q233uLHH38kIyODIUOGMGTIELKzs5k2bRrff/89GzduZMeO
HXTu3Jl7770332v88MMPjBgxgjfeeIPdu3eTmppKeno6L730kqfM3Llz6dq1K3v27GHSpEmMHz+e
lStXAjB06FAqV67Mhg0bOHDgAPfddx/33Xcfhw4dKtZ7Vxi7o/uLiBTP9u2wbZvTUeThcrkYPnw4
CQkJnn3169dn5MiRfj/gfdWoUcNTawHYsmUL1atXz1NmxIgRPPnkk/nO/fPPP6lRowaVKlXy7Hvy
ySc986AdP36cm2++mUmTJvHkk09SsWJFoqOj2bp1q+ecbdu25alV+VO5cmUyMjJ48803ueGGGxgy
ZAjDhg0DoEqVKmzatIm3336bbt268fTTT/PMM8/ke422bduyfv16zjzzTPbu3cu2bduoWbMmf/31
l6dM8+bN3XOlce2111K3bl3S0tLo2LEjb731FrGxsVSsWJE//viD6OhoDh8+zJ49e6hatWqB8ReH
EpuIlI06dYLudSMiInj99de57bbbinX+zp07qeN1/YYNG3pqUYWpW7cuGRkZHD9+nKioKADGjh3L
2LFjAbj99tvJzs4GYMeOHTzwwAP89NNPNG7cmA4dOgB4OrgUpFOnTrz//vtMmjSJ//znP1StWpUR
I0bwyCOPcNNNN3HgwAGmTZvGmDFjqFWrFo888gh33XVXnteIjIwkMTGR999/n+joaNq0acP+/fvz
XL927dp5zomKivIc/+233/jXv/5Feno6zZo1o2nTpkWOvziU2ESkbKxa5XQEJSojI4Pvv/+eV199
tVjnd+/enXvuuYepU6cyZMiQfMddLpenebF///706NGDL774gsjISDIyMpg0aZKnbIUKFTh69Khn
27sW+eeff9KoUSMWLlxIdnY2X3zxBb1796Zdu3Y0b96ciy++mCFDhnD06FFmzZrFoEGDuOyyy/LE
kpiYyBdffMG6deuoWbOmJ/6iOH78ODfccAPPPfcc99xzDwDJyclMnz69iO+UfXbvsdUC5mEmCt0F
vABUKOScc4FDQGef/aOArcABYDHQzGYsIiKOWLt2LX369KFNmzae5je7TjvtNN58800efPBBJkyY
wM6dOwHT0WLcuHHMnj2bevXqAbBv3z4qV65MREQEu3bt4v777wfg2LFjALRo0YKPPvqII0eOsH37
dl588UXPdb7//nu6du3KmjVrqFixIrVq1QKgZs2afPjhh/Tq1YvNmzdTqVIlTjvtNKKiooiLi8sT
6759+6hYsSJRUVFkZ2czffp0Pv/8c8/1C3Ls2DEOHz5MlSpVANNc+9BDDwHkScYlyW5imwnsB+oC
HYEuwCMFlK8GJAGVfPYPAu4H/gHUwHT1WkDhSVJEpExFRETwzTffeJ5Ji4uLo2/fvnTq1Ikvv/yS
ChUqeMoF6sARyK233srixYtJSUmhXbt2REdHc/7557Nq1Spmz57tud81efJkZs6cSfXq1enWrRtd
u3bl0ksvZe3atQCMHz+erKws6tSpw9VXX82tt97qiaVfv34kJCTQvXt3oqOjGTBgAC+++CIdOnTg
wQcf5Nprr6VTp05ER0czevRoZs6c6Umo7tcYOXIkDRs25Mwzz6R58+Z8//33PPvss57rF/SzV6tW
jcmTJ/PUU09Ro0YN4uPj+ec//0mDBg1Yt26dzf+NorHzv9AESAPqAdutff2B/wINA5wzBdgMPAZc
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
8SVHCQAAAABJRU5ErkJggg==
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>De esta misma manera, podemos estudiar cómo cada uno de esos parámetros afecta a la función $\mathtt{Gaussiana}$. Para cada caso, dejaremos uno de los parámetros fijo y variaremos el otro. En primer lugar, fijaremos $\sigma=1$ y evaluaremos La Funcion gaussiana con $\mu=[0,2,4,6]$ (izquerda). 
Luego, fijaremos $\mu=0$ y evaluaremos La Funcion gaussiana con $\sigma=[1,1.5,2,3]$ (derecha).</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[23]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span><span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">9</span><span class="p">,</span><span class="mi">3</span><span class="p">))</span>

<span class="n">sigma</span><span class="o">=</span><span class="mi">1</span>
<span class="n">media</span><span class="o">=</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span><span class="mi">2</span><span class="p">,</span><span class="mi">4</span><span class="p">,</span><span class="mi">6</span><span class="p">]</span>

<span class="n">plt</span><span class="o">.</span><span class="n">subplot</span><span class="p">(</span><span class="mi">121</span><span class="p">)</span>

<span class="k">for</span> <span class="n">media_i</span> <span class="ow">in</span> <span class="n">media</span><span class="p">:</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media_i</span><span class="p">,</span><span class="n">sigma</span><span class="p">),</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">r&#39;$\mu = </span><span class="si">%0.1f</span><span class="s1">$&#39;</span> <span class="o">%</span><span class="k">media_i</span>)
<span class="n">plt</span><span class="o">.</span><span class="n">title</span><span class="p">(</span><span class="s1">r&#39;$\rm Gaussianas\ con\ \sigma=1$&#39;</span><span class="p">,</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">r&#39;$\rm x_{i}$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span><span class="mi">14</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;best&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">,</span> <span class="n">frameon</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>  

<span class="c1">#----------------------------------------------------------</span>

<span class="n">media</span><span class="o">=</span><span class="mi">0</span>
<span class="n">sigma</span><span class="o">=</span><span class="p">[</span><span class="mi">1</span><span class="p">,</span><span class="mf">1.5</span><span class="p">,</span><span class="mi">2</span><span class="p">,</span><span class="mi">3</span><span class="p">]</span>

<span class="n">plt</span><span class="o">.</span><span class="n">subplot</span><span class="p">(</span><span class="mi">122</span><span class="p">)</span>

<span class="k">for</span> <span class="n">sigma_i</span> <span class="ow">in</span> <span class="n">sigma</span><span class="p">:</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">Gaussiana</span><span class="p">(</span><span class="n">xi</span><span class="p">,</span><span class="n">media</span><span class="p">,</span><span class="n">sigma_i</span><span class="p">),</span><span class="s1">&#39;-&#39;</span><span class="p">,</span><span class="n">linewidth</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">r&#39;$\sigma = </span><span class="si">%0.1f</span><span class="s1">$&#39;</span> <span class="o">%</span><span class="k">sigma_i</span>)
<span class="n">plt</span><span class="o">.</span><span class="n">title</span><span class="p">(</span><span class="s1">r&#39;$\rm Gaussianas\ con\ \mu=0$&#39;</span><span class="p">,</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">r&#39;$\rm x_{i}$&#39;</span><span class="p">,</span><span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">(</span><span class="n">loc</span><span class="o">=</span><span class="s1">&#39;best&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">12</span><span class="p">,</span> <span class="n">frameon</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>  

<span class="n">plt</span><span class="o">.</span><span class="n">show</span><span class="p">()</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area"><div class="prompt"></div>


<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
dpaz4YR9+dMVM85gO6Yymu9oNMcaC7TDzAIERyvJwzEt407agDkfvRwt+8LlPIWa64cVhF853WzK
vqrR5tMxB01r4CPMbU5Vd4uAtzC3bsJpNoGmpgOmALobk7g6Acsws0eo+qneOtESU4jehqmEnNQj
+tUJLQC+wlQC44A3MS3i4caJPvO18QCpwH849mLIaeFa/iRiLnZeJTwqoCfyGuEzm40b073rPcxd
6TaYsY3/cjKoatpiypQJmO5KXTBjXaY6GVSlZlv29cX0T8zHTOEzCx1wWF9JwD8xtztzMbMDNYXk
FY5+DizBnHC5hMfctU1R9YQGphVxMeZzzQDGORGUCgvxmJlisjHHwweYFspwM4nwmpryKsx5dYRj
n4NxCNMQ4ZRwLX/uxHxehXz/8wpH4VSZB1NhfhvT4JqPiS+cBjUPwDQM5GPuvDxEePRK0bJPKaWU
UkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJK
KaWUUkoppZRSSimllFJKKaWUUkopdSJ3AxmADbxQuW5O5c9LgBSH4lJKKRV6mvOVUuokFA9kAr+v
/PkG4HfOhaOUUqoBac5XSqmT0FDgAPBj4FGHY1FKKdWwNOcrpdRJ6B9APhDndCBKKaUanOZ81aS5
nA5AqTCUDhQA46qtiwV2ATGORKSUUqqhaM5XSqmTSA/MwKgfYW69dqn2uw6ORKSUUqqhaM5XSqmT
SEvgE47esXoU+AqIALoDlwHRzoSmlFIqxDTnK6XUSWQqsBcoBs6sXPcp4AdWYmY5yAA6ORKdUkqp
UNKcr5RSzZAPTexKKdVcaM5XTYIOgFVKKaWUUqqJ0sq8UvVjOR2AUkqpRqM5X4U9rcwrVTcXAV2B
650ORCmlVIPTnK+UUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWU
UkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppU5+/w8UEN41
gV7GUgAAAABJRU5ErkJggg==
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Podemos ver que cuando $\mu$ cambia, la forma de la curva se mantiene, pero se desplaza a lo largo del dominio de $X$. También podemos darnos cuenta que cuando $\sigma$ cambia, el ancho o forma de la 'campana' varía. Entender cómo estos parámetros afectan la distribución es importante para poder modelar datos reales.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered">
<div class="prompt input_prompt">
</div>
<div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Modelando-distribuciones">Modelando distribuciones<a class="anchor-link" href="#Modelando-distribuciones">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython2"><pre><span></span> 
</pre></div>

</div>
</div>
</div>

</div>
    </div>
  </div>
</body>

 


</html>
