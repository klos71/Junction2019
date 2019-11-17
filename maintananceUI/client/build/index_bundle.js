!function(t){function e(e){for(var r,l,i=e[0],u=e[1],c=e[2],f=0,d=[];f<i.length;f++)l=i[f],Object.prototype.hasOwnProperty.call(a,l)&&a[l]&&d.push(a[l][0]),a[l]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);for(s&&s(e);d.length;)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,i=1;i<n.length;i++){var u=n[i];0!==a[u]&&(r=!1)}r&&(o.splice(e--,1),t=l(l.s=n[0]))}return t}var r={},a={0:0},o=[];function l(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=t,l.c=r,l.d=function(t,e,n){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},l.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)l.d(n,r,function(e){return t[e]}.bind(null,r));return n},l.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="";var i=window.webpackJsonp=window.webpackJsonp||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var s=u;o.push([49,1]),n()}({107:function(t,e,n){var r=n(108);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(47)(r,a);r.locals&&(t.exports=r.locals)},108:function(t,e,n){(t.exports=n(46)(!1)).push([t.i,"html,body{margin:0px;padding:0px}.flex-container{display:flex;flex-direction:row}.leaflet-container{width:100%;height:100vh}.alertContainer{overflow-y:scroll;background-color:white;width:300px;max-height:100vh;color:black}.alertContainer div{border:1px solid black;padding:7px}.alertContainer div:hover{background-color:black;color:white}\n",""])},49:function(t,e,n){"use strict";var r=l(n(50)),a=l(n(14)),o=l(n(56));function l(t){return t&&t.__esModule?t:{default:t}}n(104),n(107),a.default.render(r.default.createElement(o.default,null),document.getElementById("app"))},56:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=f(n(57)),a=f(n(62)),o=f(n(63)),l=f(n(67)),i=f(n(93)),u=n(1),c=f(u),s=n(109);function f(t){return t&&t.__esModule?t:{default:t}}var d=function(t){function e(t){(0,a.default)(this,e);var n=(0,l.default)(this,(e.__proto__||(0,r.default)(e)).call(this,t));return n.state={focus:[60.1855949,24.8248988],lat:60.1855949,lng:24.8248988,zoom:15,markers:[]},n.focusOnStation=n.focusOnStation.bind(n),n}return(0,i.default)(e,t),(0,o.default)(e,[{key:"componentDidMount",value:function(){var t=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(t){})),fetch("/stations").then((function(t){return t.json()})).then((function(e){var n=e;console.log(n),n.forEach((function(e){e.dist=t._calculateDistance({lat:e.lat,lng:e.lng},{lat:t.state.lat,lng:t.state.lng}).toFixed(2)})),n.sort((function(t,e){return t.dist-e.dist})),t.setState({markers:n})}))}},{key:"generatePredic",value:function(){var t=Math.floor(7*Math.random())+1;return t*=1==Math.floor(2*Math.random())?1:-1}},{key:"focusOnStation",value:function(t){console.log(t),this.setState({focus:[t[0],t[1]]})}},{key:"_calculateDistance",value:function(t,e){var n=this.toRad(e.lat-t.lat),r=this.toRad(e.lng-t.lng),a=this.toRad(t.lat),o=this.toRad(e.lat),l=Math.sin(n/2)*Math.sin(n/2)+Math.sin(r/2)*Math.sin(r/2)*Math.cos(a)*Math.cos(o);return 6371*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)))}},{key:"toRad",value:function(t){return t*Math.PI/180}},{key:"render",value:function(){var t=this,e=(this.state.lat,this.state.lng,this.state.markers.map((function(t,e){return c.default.createElement(s.Marker,{position:[t.lat,t.lng],key:e},c.default.createElement(s.Popup,null,"Name: ",t.name," ",c.default.createElement("br",null)," EmptySlots:"," ",t.maxNumOfSlots-t.currentNumOfBicycles,c.default.createElement("br",null),"predict in 3hour: ",t.predict.toFixed(0),c.default.createElement("p",null,"Distance: ",t.dist,"Km")))}))),n=this.state.markers.map((function(e,n){return c.default.createElement("div",{key:n,onClick:function(){return t.focusOnStation([e.lat,e.lng])},className:"stationsList"},c.default.createElement("p",null,"Name: ",e.name),c.default.createElement("p",null,"currentBikes:",e.currentNumOfBicycles),c.default.createElement("p",null,"predict in 3hour: ",(e.predict+e.currentNumOfBicycles).toFixed()),c.default.createElement("p",null,"Distance: ",e.dist," Km"))}));return c.default.createElement("div",{className:"flex-container"},c.default.createElement("div",{className:"alertContainer"},n),c.default.createElement(s.Map,{center:this.state.focus,zoom:this.state.zoom},c.default.createElement(s.TileLayer,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),e))}}]),e}(u.Component);e.default=d}});