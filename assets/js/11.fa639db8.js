(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{397:function(n,t,e){},398:function(n,t,e){},470:function(n,t,e){"use strict";e(397)},471:function(n,t,e){"use strict";e(398)},517:function(n,t,e){"use strict";e.r(t);var i={components:{PanAndZoom:e(513).default},data:function(){return{panAndZoom:!1,fullscreen:!1}},computed:{fullscreenClass:function(){return this.fullscreen?"diagram-maker fullscreen":"diagram-maker not-fullscreen"}},methods:{registerPanAndZoomApi:function(n){this.panAndZoom=n},fitDiagram:function(){this.panAndZoom.reset()},goFullscreen:function(){this.fullscreen=!0},exitFullscreen:function(){this.fullscreen=!1,this.fitDiagram()}}},c=(e(470),e(471),e(57)),s=Object(c.a)(i,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{class:n.fullscreenClass},[e("pan-and-zoom",{on:{apiReady:n.registerPanAndZoomApi}},[n._t("default",(function(){return[e("svg",{attrs:{width:"300px",height:"300px"}},[e("circle",{attrs:{cx:"150",cy:"150",r:"100",fill:"blue"}})])]}))],2),n._v(" "),e("div",{staticClass:"action-icons"},[e("div",{on:{click:n.fitDiagram}},[e("icon",{staticClass:"fit icon-button",attrs:{icon:"expand-alt",title:"Fit diagram content"}})],1),n._v(" "),n.fullscreen?n._e():e("div",{on:{click:n.goFullscreen}},[e("icon",{staticClass:"fit icon-button",attrs:{icon:"expand",title:"Go fullscreen"}})],1),n._v(" "),n.fullscreen?e("div",{on:{click:n.exitFullscreen}},[e("icon",{staticClass:"fit icon-button",attrs:{icon:"compress",title:"Exit fullscreen"}})],1):n._e()])],1)}),[],!1,null,"745735fc",null);t.default=s.exports}}]);