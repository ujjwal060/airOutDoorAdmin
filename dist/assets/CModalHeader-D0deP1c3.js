import{r as n,_ as y,R as t,b,c as C,P as o}from"./index-DMQZN-YT.js";import{u as ee,T as oe,g as j,h as ne,f as le}from"./DefaultLayout-DUEFxvKU.js";var k=n.forwardRef(function(e,c){var r=e.children,d=e.className,s=y(e,["children","className"]);return t.createElement("div",b({className:C("modal-content",d)},s,{ref:c}),r)});k.propTypes={children:o.node,className:o.string};k.displayName="CModalContent";var x=n.forwardRef(function(e,c){var r,d=e.children,s=e.alignment,a=e.className,u=e.fullscreen,m=e.scrollable,f=e.size,p=y(e,["children","alignment","className","fullscreen","scrollable","size"]);return t.createElement("div",b({className:C("modal-dialog",(r={"modal-dialog-centered":s==="center"},r[typeof u=="boolean"?"modal-fullscreen":"modal-fullscreen-".concat(u,"-down")]=u,r["modal-dialog-scrollable"]=m,r["modal-".concat(f)]=f,r),a)},p,{ref:c}),d)});x.propTypes={alignment:o.oneOf(["top","center"]),children:o.node,className:o.string,fullscreen:o.oneOfType([o.bool,o.oneOf(["sm","md","lg","xl","xxl"])]),scrollable:o.bool,size:o.oneOf(["sm","lg","xl"])};x.displayName="CModalDialog";var I=n.createContext({}),K=n.forwardRef(function(e,c){var r=e.children,d=e.alignment,s=e.backdrop,a=s===void 0?!0:s,u=e.className,m=e.duration,f=m===void 0?150:m,p=e.focus,A=p===void 0?!0:p,G=e.fullscreen,O=e.keyboard,J=O===void 0?!0:O,g=e.onClose,w=e.onClosePrevented,Q=e.onShow,R=e.portal,P=R===void 0?!0:R,U=e.scrollable,W=e.size,T=e.transition,h=T===void 0?!0:T,z=e.unmountOnClose,X=z===void 0?!0:z,E=e.visible,Y=y(e,["children","alignment","backdrop","className","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),L=n.useRef(null),v=n.useRef(null),Z=n.useRef(null),$=ee(c,v),M=n.useState(E),i=M[0],N=M[1],B=n.useState(!1),S=B[0],V=B[1],_={visible:i,setVisible:N};n.useEffect(function(){N(E)},[E]),n.useEffect(function(){var l;return i?(L.current=document.activeElement,document.addEventListener("mouseup",F),document.addEventListener("keydown",H)):(l=L.current)===null||l===void 0||l.focus(),function(){document.removeEventListener("mouseup",F),document.removeEventListener("keydown",H)}},[i]);var D=function(){return a==="static"?V(!0):(N(!1),g&&g())};n.useLayoutEffect(function(){w&&w(),setTimeout(function(){return V(!1)},f)},[S]),n.useLayoutEffect(function(){return i?(document.body.classList.add("modal-open"),a&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout(function(){var l;A&&((l=v.current)===null||l===void 0||l.focus())},h?f:0)):(document.body.classList.remove("modal-open"),a&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),a&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}},[i]);var F=function(l){v.current&&v.current==l.target&&D()},H=function(l){l.key==="Escape"&&J&&D()};return t.createElement(t.Fragment,null,t.createElement(oe,{in:i,mountOnEnter:!0,nodeRef:v,onEnter:Q,onExit:g,unmountOnExit:X,timeout:h?f:0},function(l){return t.createElement(j,{portal:P},t.createElement(I.Provider,{value:_},t.createElement("div",b({className:C("modal",{"modal-static":S,fade:h,show:l==="entered"},u),tabIndex:-1},i?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:b({},l!=="exited"&&{display:"block"})},Y,{ref:$}),t.createElement(x,{alignment:d,fullscreen:G,scrollable:U,size:W},t.createElement(k,{ref:Z},r)))))}),a&&t.createElement(j,{portal:P},t.createElement(ne,{visible:i})))});K.propTypes={alignment:o.oneOf(["top","center"]),backdrop:o.oneOfType([o.bool,o.oneOf(["static"])]),children:o.node,className:o.string,duration:o.number,focus:o.bool,fullscreen:o.oneOfType([o.bool,o.oneOf(["sm","md","lg","xl","xxl"])]),keyboard:o.bool,onClose:o.func,onClosePrevented:o.func,onShow:o.func,portal:o.bool,scrollable:o.bool,size:o.oneOf(["sm","lg","xl"]),transition:o.bool,unmountOnClose:o.bool,visible:o.bool};K.displayName="CModal";var q=n.forwardRef(function(e,c){var r=e.children,d=e.className,s=e.closeButton,a=s===void 0?!0:s,u=y(e,["children","className","closeButton"]),m=n.useContext(I).setVisible;return t.createElement("div",b({className:C("modal-header",d)},u,{ref:c}),r,a&&t.createElement(le,{onClick:function(){return m(!1)}}))});q.propTypes={children:o.node,className:o.string,closeButton:o.bool};q.displayName="CModalHeader";export{K as C,q as a};