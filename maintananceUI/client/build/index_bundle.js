!function(t){function e(e){for(var a,l,i=e[0],u=e[1],s=e[2],f=0,d=[];f<i.length;f++)l=i[f],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&d.push(r[l][0]),r[l]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(t[a]=u[a]);for(c&&c(e);d.length;)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var u=n[i];0!==r[u]&&(a=!1)}a&&(o.splice(e--,1),t=l(l.s=n[0]))}return t}var a={},r={0:0},o=[];function l(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=t,l.c=a,l.d=function(t,e,n){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},l.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)l.d(n,a,function(e){return t[e]}.bind(null,a));return n},l.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="";var i=window.webpackJsonp=window.webpackJsonp||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var s=0;s<i.length;s++)e(i[s]);var c=u;o.push([49,1]),n()}({107:function(t,e,n){var a=n(108);"string"==typeof a&&(a=[[t.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(47)(a,r);a.locals&&(t.exports=a.locals)},108:function(t,e,n){(t.exports=n(46)(!1)).push([t.i,"html,body{margin:0px;padding:0px}.flex-container{display:flex;flex-direction:row}.leaflet-container{width:100%;height:100vh}.alertContainer{overflow-y:scroll;background-color:white;width:200px;max-height:100vh;color:black}.alertContainer div{border:1px solid black}.alertContainer div:hover{background-color:black;color:white}\n",""])},49:function(t,e,n){"use strict";var a=l(n(50)),r=l(n(14)),o=l(n(56));function l(t){return t&&t.__esModule?t:{default:t}}n(104),n(107),r.default.render(a.default.createElement(o.default,null),document.getElementById("app"))},56:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=f(n(57)),r=f(n(62)),o=f(n(63)),l=f(n(67)),i=f(n(93)),u=n(1),s=f(u),c=n(109);function f(t){return t&&t.__esModule?t:{default:t}}var d=function(t){function e(t){(0,r.default)(this,e);var n=(0,l.default)(this,(e.__proto__||(0,a.default)(e)).call(this,t));return n.state={focus:[60.1855949,24.8248988],lat:60.1855949,lng:24.8248988,zoom:15,markers:[]},n.focusOnStation=n.focusOnStation.bind(n),n}return(0,i.default)(e,t),(0,o.default)(e,[{key:"componentDidMount",value:function(){var t=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){t.setState({lat:e.coords.latitude,lng:e.coords.longitude})})),fetch("http://137.135.248.74/api/stations").then((function(t){return t.json()})).then((function(e){var n=e;n.forEach((function(e){e.dist=t._calculateDistance({lat:e.Y,lng:e.X},{lat:t.state.lat,lng:t.state.lng}).toFixed(2)})),n.sort((function(t,e){return t.dist-e.dist})),t.setState({markers:n})}))}},{key:"focusOnStation",value:function(t){console.log(t),this.setState({focus:[t[0],t[1]]})}},{key:"_calculateDistance",value:function(t,e){var n=this.toRad(e.lat-t.lat),a=this.toRad(e.lng-t.lng),r=this.toRad(t.lat),o=this.toRad(e.lat),l=Math.sin(n/2)*Math.sin(n/2)+Math.sin(a/2)*Math.sin(a/2)*Math.cos(r)*Math.cos(o);return 6371*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)))}},{key:"toRad",value:function(t){return t*Math.PI/180}},{key:"render",value:function(){var t=this,e=(this.state.lat,this.state.lng,this.state.markers.map((function(t,e){return s.default.createElement(c.Marker,{position:[t.Y,t.X],key:e},s.default.createElement(c.Popup,null,"Name: ",t.data.name," ",s.default.createElement("br",null)," EmptySlots: ",t.data.free_slots,s.default.createElement("p",null,"Distance: ",t.dist,"Km")))}))),n=this.state.markers.map((function(e,n){return s.default.createElement("div",{key:n,onClick:function(){return t.focusOnStation([e.Y,e.X])},className:"stationsList"},s.default.createElement("p",null,"Name: ",e.data.name),s.default.createElement("p",null,"EmptySlots:",e.data.free_slots),s.default.createElement("p",null,"Distance:"," ",t._calculateDistance({lat:e.Y,lng:e.X},{lat:t.state.lat,lng:t.state.lng}).toFixed(2)," ","Km"))}));return s.default.createElement("div",{className:"flex-container"},s.default.createElement("div",{className:"alertContainer"},n),s.default.createElement(c.Map,{center:this.state.focus,zoom:this.state.zoom},s.default.createElement(c.TileLayer,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e))}}]),e}(u.Component);e.default=d}});