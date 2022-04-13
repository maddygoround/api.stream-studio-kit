var y=Object.defineProperty,u=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var j=(e,t,o)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,l=(e,t)=>{for(var o in t||(t={}))w.call(t,o)&&j(e,o,t[o]);if(d)for(var o of d(t))P.call(t,o)&&j(e,o,t[o]);return e},m=(e,t)=>u(e,I(t));import{C as a,h as g}from"./compositor.a94ae655.js";const v=async(e,t,o)=>{const{backgroundImage:n,layout:c,layoutProps:s={}}=o,i=await a.compositor.createProject({props:{name:"Root",type:"sceneless-project",layout:"Layered",size:t,isRoot:!0}},e),r=i.getRoot(),p=await Promise.all([i.insert({name:"Background",id:"bg",tagName:"img",sourceType:"Element",attributes:{src:n},style:{objectFit:"cover"}},r.id),i.insert({id:"content",name:"Content",layout:c,layoutProps:s},r.id),i.insert({id:"foreground",name:"Overlays",layout:"Free"},r.id)]);return await i.reorder(r.id,p),i},b=async e=>{const{projectId:t,collectionId:o,props:n={}}=e,{project:c}=await a.clients.LiveApi().project.getProject({collectionId:o,projectId:t}),s=c.metadata,i=s.props||{},r=l(l({},i),n);a.clients.LiveApi().project.updateProject({collectionId:c.collectionId,projectId:c.projectId,updateMask:["metadata"],metadata:{layoutId:s.layoutId,props:r}})},h=async e=>{const t=e.type||"sceneless",o=e.size||{x:1280,y:720},n=e.props||{};let c=await a.clients.LiveApi().project.createProject({collectionId:e.collectionId,rendering:{video:{width:o.x,height:o.y,framerate:30}},composition:{studioSdk:{}},metadata:{},webrtc:{hosted:{}}});const s=await a.clients.LayoutApi().layout.createLayout({layout:{projectId:c.project.projectId,collectionId:c.project.collectionId}}),{displayName:i}=a.clients.getAccessToken(),r=l({type:t,layoutId:s.id,hostDisplayName:i},e.meta||{});let p=await a.clients.LiveApi().project.updateProject({collectionId:e.collectionId,projectId:c.project.projectId,updateMask:["metadata"],metadata:r});return c.project=p.project,c.project.metadata=r,t==="sceneless"?await v(s.id,o,n):await a.compositor.createProject({props:m(l({name:"Root",layout:"Free"},n),{isRoot:!0,size:o})},s.id),c},k=async()=>{const e=await L();let t;const{displayName:o,serviceUserId:n}=a.clients.getAccessToken();e.length===0?t=(await a.clients.LiveApi().collection.createCollection({metadata:{serviceUserId:n,displayName:o}})).collection:t=e[0],await a.clients.LiveApi().subscribeToCollection(t.collectionId);const c=await Promise.all(t.projects.map(s=>g(s)));return{collectionId:t.collectionId,userProps:t.metadata||{},projects:c}},L=async()=>(await a.clients.LiveApi().collection.getCollections({})).collections;export{h as createProject,L as loadCollections,k as loadProjects,b as updateProject};
//# sourceMappingURL=requests.02f6b5b3.js.map
