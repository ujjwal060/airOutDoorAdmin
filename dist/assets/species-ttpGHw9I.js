import{r as t,j as e}from"./index-DMQZN-YT.js";import{a as g}from"./axios-B4uVmeYG.js";import{C as w,a as A}from"./CCardBody-DJt4bdLB.js";import{C as T}from"./CCardHeader-DaPF9maz.js";import{a as d}from"./index.es-Dr928r4n.js";import{C as F}from"./CCardText-B_2xx9bP.js";import{C as D,a as M,b as u,c as l,d as N,e as f}from"./CTable-CMobc8GF.js";import{C as B,a as i}from"./CPaginationItem-ixz3nRJf.js";import{C as E,a as H}from"./CModalHeader-D0deP1c3.js";import{C as I}from"./CModalTitle-eDClRaYZ.js";import{C as P}from"./CModalBody-cu4JkqK7.js";import{C as k}from"./CForm-BCH59H3k.js";import{C as m}from"./CCol-C5GETTd3.js";import{C as b}from"./CFormInput-BBxsUJtP.js";import{C as R}from"./CModalFooter-C3CBLEIu.js";import"./DefaultLayout-DUEFxvKU.js";import"./cil-user-Ddrdy7PS.js";import"./cil-lock-locked-DmxpJbVL.js";const ae=()=>{const[y,n]=t.useState(!1),[p,h]=t.useState([]),[o,x]=t.useState({name:"",image:null}),[V,C]=t.useState(null);t.useEffect(()=>{(async()=>{try{const s=await g.get("http://3.111.163.2:3002/api/species/getSpeciesCategories");h(s.data)}catch(s){C(s.response?s.response.data.message:"An error occurred while fetching species.")}})()},[]);const j=r=>{const{id:s,value:a,files:v}=r.target;x({...o,[s]:s==="image"?v[0]:a})},S=async r=>{r.preventDefault();const s=new FormData;s.append("name",o.name),s.append("image",o.image);try{const a=await g.post("http://3.111.163.2:3002/api/species/SpeciesCategories",s,{headers:{"Content-Type":"multipart/form-data"}});h([...p,a.data]),n(!1),c()}catch(a){C(a.response?a.response.data.message:"An error occurred while adding species.")}},c=()=>{x({name:"",image:null})};return e.jsxs(e.Fragment,{children:[e.jsxs(w,{children:[e.jsxs(T,{className:"d-flex justify-content-between align-items-center",children:[e.jsx("h3",{children:"Manage Species"}),e.jsx(d,{color:"primary",onClick:()=>n(!0),children:"Add Species"})]}),e.jsxs(A,{children:[e.jsx(F,{children:e.jsxs(D,{responsive:!0,striped:!0,hover:!0,bordered:!0,children:[e.jsx(M,{color:"dark",children:e.jsxs(u,{children:[e.jsx(l,{scope:"col",style:{textAlign:"center"},children:"S.No"}),e.jsx(l,{scope:"col",style:{textAlign:"center"},children:"Name"}),e.jsx(l,{scope:"col",style:{textAlign:"center"},children:"Image"})]})}),e.jsx(N,{children:p.map((r,s)=>e.jsxs(u,{children:[e.jsx(l,{scope:"row",style:{textAlign:"center"},children:s+1}),e.jsx(f,{style:{textAlign:"center"},children:r.name||"null"}),e.jsx(f,{style:{textAlign:"center"},children:r.image&&e.jsx("img",{src:`http://3.111.163.2:3002/${r.image}`,alt:r.name,style:{width:"50px",height:"50px",objectFit:"cover"}})})]},r._id))})]})}),e.jsxs(B,{align:"center","aria-label":"Page navigation example",children:[e.jsx(i,{disabled:!0,"aria-label":"Previous",children:e.jsx("span",{"aria-hidden":"true",children:"«"})}),e.jsx(i,{active:!0,children:"1"}),e.jsx(i,{children:"2"}),e.jsx(i,{children:"3"}),e.jsx(i,{"aria-label":"Next",children:e.jsx("span",{"aria-hidden":"true",children:"»"})})]})]})]}),e.jsxs(E,{visible:y,onClose:()=>{n(!1),c()},children:[e.jsx(H,{closeButton:!0,children:e.jsx(I,{children:"Add Species"})}),e.jsx(P,{children:e.jsxs(k,{className:"row g-3",onSubmit:S,children:[e.jsx(m,{md:6,children:e.jsx(b,{type:"text",id:"name",label:"Name",value:o.name,onChange:j})}),e.jsx(m,{md:6,children:e.jsx(b,{type:"file",id:"image",label:"Image",onChange:j})}),e.jsx(m,{xs:12,children:e.jsx(d,{color:"primary",type:"submit",children:"Submit"})})]})}),e.jsx(R,{children:e.jsx(d,{color:"secondary",onClick:()=>{n(!1),c()},children:"Close"})})]})]})};export{ae as default};
