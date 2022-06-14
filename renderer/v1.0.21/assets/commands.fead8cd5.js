var C=Object.defineProperty,b=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var g=(o,t,e)=>t in o?C(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,u=(o,t)=>{for(var e in t||(t={}))N.call(t,e)&&g(o,e,t[e]);if(w)for(var e of w(t))f.call(t,e)&&g(o,e,t[e]);return o},m=(o,t)=>b(o,L(t));import{g as h,C as s,t as d,h as k,c as D,b as I,w as P,o as R,d as M,e as y,f as B}from"./compositor.35ecb646.js";const{state:a}=s,q=async o=>{const t=h();if(!t)return;const e=u(u({},t.props),o.props),c=await s.clients.LiveApi().collection.updateCollection({collectionId:t.id,updateMask:["metadata"],metadata:m(u({},t.metadata),{props:e})});await d("UserChanged",c.collection)},E=async(o={})=>{const{props:t={},size:e,settings:c={}}=o,n=await s.Request.createProject({settings:c,props:t,size:e});await d("ProjectAdded",n.project);const i=await k(n.project);return D(i)},F=async o=>{const{projectId:t}=o;await s.Request.deleteProject({projectId:t}),await d("ProjectRemoved",{projectId:t})},U=async o=>{const{projectId:t}=o,e=h().id,c=I(t),n=u(u({},c.props),o.props),i=await s.clients.LiveApi().project.updateProject({collectionId:e,projectId:t,updateMask:["metadata"],metadata:m(u({},c.videoApi.project.metadata),{props:n})});await d("ProjectChanged",{project:i.project})},S=o=>U({projectId:o.projectId,props:o.meta}),z=async o=>{const t=a.projects.find(c=>c.id===o.projectId);if(!t){a.activeProjectId=null,d("ActiveProjectChanged",{projectId:null});return}const e=a.projects.find(c=>c.id===a.activeProjectId);if(t!==e)return e&&(Array.from(P.rooms.keys()).map(P.removeRoom),await s.clients.LayoutApi().unsubscribeFromLayout(e.layoutApi.layoutId),await s.clients.LiveApi().unsubscribeFromProject(e.videoApi.project.collectionId,e.videoApi.project.projectId)),await s.clients.LayoutApi().subscribeToLayout(t.layoutApi.layoutId),await s.clients.LiveApi().subscribeToProject(t.videoApi.project.collectionId,t.videoApi.project.projectId),s.clients.LiveApi().project.getProject({collectionId:t.videoApi.project.collectionId,projectId:t.videoApi.project.projectId,status:!0}).then(c=>{var n;d("ProjectChanged",{project:c.project,phase:(n=c.status)==null?void 0:n.phase})}),d("ActiveProjectChanged",{projectId:t.id}),D(t)},G=async o=>{const{projectId:t,displayName:e="Guest"}=o,c=a.projects.find(A=>A.id===t);let n=c.sfuToken;if(!n){let{webrtcAccess:A}=await s.clients.LiveApi().authentication.createWebRtcAccessToken({collectionId:c.videoApi.project.collectionId,projectId:c.videoApi.project.projectId,displayName:e});n=A.accessToken}const r=R(n).video.room,j=new URL(s.clients.getLiveKitServer()),p=j.host+j.pathname,l=P.ensureRoom(p,r,n);l.bindApiClient(s.clients),await l.connect(),c.sfuToken=n,c.roomId=r;const v=M(r);return y("RoomJoined",{projectId:c.id,room:v}),v},J=async o=>{let{props:t={},parentId:e,index:c,projectId:n=a.activeProjectId}=o;const i=I(n);t=m(u({},t),{layoutId:i.layoutApi.layoutId,type:"child"});const r=await i.compositor.insert(t,e,c);return d("NodeAdded",{projectId:n,nodeId:r}),d("NodeChanged",{projectId:n,nodeId:e}),i.compositor.get(r)},W=async o=>{var i;let{nodeId:t,projectId:e=a.activeProjectId}=o;const c=I(e),n=(i=c.compositor.getParent(t))==null?void 0:i.id;c.compositor.remove(t),d("NodeRemoved",{projectId:e,nodeId:t}),d("NodeChanged",{projectId:e,nodeId:n})},H=async o=>{let{nodeId:t,props:e={},projectId:c=a.activeProjectId}=o;const n=I(c);return delete e.type,delete e.sourceType,n.compositor.update(t,e),d("NodeChanged",{projectId:c,nodeId:t}),n.compositor.get(t)},O=async o=>{let{nodeId:t,layout:e,projectId:c=a.activeProjectId,layoutProps:n={}}=o;I(c).compositor.update(t,{layout:e,layoutProps:n}),d("NodeChanged",{projectId:c,nodeId:t})},Q=async o=>{const{nodeId:t,parentId:e,projectId:c=a.activeProjectId,index:n}=o;I(c).compositor.move(t,e,n),d("NodeChanged",{projectId:c,nodeId:t})},V=async o=>{var j,p;const{nodeAId:t,nodeBId:e,projectId:c=a.activeProjectId}=o,n=I(c),i=(j=n.compositor.getParent(t))==null?void 0:j.id,r=(p=n.compositor.getParent(e))==null?void 0:p.id;n.compositor.swap(t,e),d("NodeChanged",{projectId:c,nodeId:i}),d("NodeChanged",{projectId:c,nodeId:r})},X=async o=>{const{parentId:t,childIds:e,projectId:c=a.activeProjectId}=o;I(c).compositor.reorder(t,e),d("NodeChanged",{projectId:c,nodeId:t})},Y=async o=>{const{projectId:t=a.activeProjectId}=o,e=I(t);await s.clients.LiveApi().project.startProjectBroadcast({collectionId:e.videoApi.project.collectionId,projectId:e.videoApi.project.projectId})},Z=async o=>{const{projectId:t=a.activeProjectId}=o,e=I(t);await s.clients.LiveApi().project.stopProjectBroadcast({collectionId:e.videoApi.project.collectionId,projectId:e.videoApi.project.projectId})},_=async o=>{var v;const{rtmpUrl:t,rtmpKey:e,enabled:c,projectId:n=a.activeProjectId,metadata:i={},props:r={}}=o,j=I(n),p={rtmpPush:{key:e,url:t}},l=await((v=s.clients.LiveApi().destination)==null?void 0:v.createDestination({collectionId:j.videoApi.project.collectionId,projectId:j.videoApi.project.projectId,address:p,enabled:c,metadata:u(u({},i),r)}));return await d("DestinationAdded",l.destination),B(l.destination)},$=async o=>{var n;const{destinationId:t,projectId:e=a.activeProjectId}=o,c=I(e);await((n=s.clients.LiveApi().destination)==null?void 0:n.deleteDestination({collectionId:c.videoApi.project.collectionId,projectId:c.videoApi.project.projectId,destinationId:t})),await d("DestinationRemoved",{projectId:e,destinationId:t})},tt=async o=>{var p;const{rtmpUrl:t,rtmpKey:e,destinationId:c,projectId:n=a.activeProjectId}=o,i=I(n),r={key:e,url:t},j=await((p=s.clients.LiveApi().destination)==null?void 0:p.updateDestination({collectionId:i.videoApi.project.collectionId,projectId:i.videoApi.project.projectId,destinationId:c,updateMask:["address.rtmpPush"],address:{rtmpPush:r}}));await d("DestinationChanged",j.destination)},T=async o=>{var j,p;const{projectId:t=a.activeProjectId,destinationId:e,props:c={}}=o,n=I(t),i=n.videoApi.project.destinations.find(l=>l.destinationId===e);if(!i)return;const r=await((p=s.clients.LiveApi().destination)==null?void 0:p.updateDestination({collectionId:n.videoApi.project.collectionId,projectId:n.videoApi.project.projectId,destinationId:e,updateMask:["metadata"],metadata:m(u({},i.metadata||{}),{props:u(u({},((j=i.metadata)==null?void 0:j.props)||{}),c)})}));await d("DestinationChanged",r.destination)},et=o=>T({projectId:o.projectId,destinationId:o.destinationId,props:o.metadata}),ot=async o=>{var p;const{enabled:t,destinationId:e,projectId:c=a.activeProjectId}=o,n=I(c);if(n.videoApi.project.destinations.find(l=>e===l.destinationId).enabled===t)return;const r=await((p=s.clients.LiveApi().destination)==null?void 0:p.updateDestination({collectionId:n.videoApi.project.collectionId,projectId:n.videoApi.project.projectId,destinationId:e,updateMask:["enabled"],enabled:t}));await d("DestinationChanged",r.destination),y(t?"DestinationEnabled":"DestinationDisabled",{projectId:c,destinationId:e})},ct=async o=>{var j,p;const{rtmpUrl:t,rtmpKey:e,projectId:c=a.activeProjectId}=o,n=I(c),i={key:e,url:t},r=!0;if(n.videoApi.project.destinations.length>0){const l=await((j=s.clients.LiveApi().destination)==null?void 0:j.updateDestination({collectionId:n.videoApi.project.collectionId,projectId:n.videoApi.project.projectId,destinationId:n.videoApi.project.destinations[0].destinationId,updateMask:["address.rtmpPush"],address:{rtmpPush:i}}));await d("DestinationChanged",l.destination)}else{const l=await((p=s.clients.LiveApi().destination)==null?void 0:p.createDestination({collectionId:n.videoApi.project.collectionId,projectId:n.videoApi.project.projectId,address:{rtmpPush:i},enabled:r}));await d("DestinationAdded",l.destination)}y("DestinationSet",{projectId:c,rtmpUrl:t,rtmpKey:e})};export{_ as addDestination,J as createNode,E as createProject,W as deleteNode,F as deleteProject,G as joinRoom,Q as moveNode,$ as removeDestination,X as reorderNodes,z as setActiveProject,ct as setDestination,ot as setDestinationEnabled,O as setNodeLayout,Y as startBroadcast,Z as stopBroadcast,V as swapNodes,tt as updateDestination,et as updateDestinationMeta,T as updateDestinationProps,H as updateNode,S as updateProjectMeta,U as updateProjectProps,q as updateUserProps};
//# sourceMappingURL=commands.fead8cd5.js.map