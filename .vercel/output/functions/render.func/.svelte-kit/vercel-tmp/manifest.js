export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["HFP_300_41.png","favicon.ico","favicon.png","gate.png","hf.css","images/ADEM.jpg","images/MRI.jpeg","images/dwi.jpg","images/mri.jpg"]),
	mimeTypes: {".png":"image/png",".ico":"image/vnd.microsoft.icon",".css":"text/css",".jpg":"image/jpeg",".jpeg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-dd335262.js","imports":["_app/immutable/start-dd335262.js","_app/immutable/chunks/index-0d543ad8.js","_app/immutable/chunks/singletons-e7675bc1.js","_app/immutable/chunks/parse-b67c4dc9.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js'),
			() => import('../output/server/nodes/10.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/api/card",
				pattern: /^\/api\/card\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/card/_server.js')
			},
			{
				id: "/api/card/[slug]",
				pattern: /^\/api\/card\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/card/_slug_/_server.js')
			},
			{
				id: "/api/card/[slug]/score",
				pattern: /^\/api\/card\/([^/]+?)\/score\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/card/_slug_/score/_server.js')
			},
			{
				id: "/api/card/[slug]/study",
				pattern: /^\/api\/card\/([^/]+?)\/study\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/card/_slug_/study/_server.js')
			},
			{
				id: "/api/category",
				pattern: /^\/api\/category\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/category/_server.js')
			},
			{
				id: "/api/category/[slug]",
				pattern: /^\/api\/category\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/category/_slug_/_server.js')
			},
			{
				id: "/api/upload",
				pattern: /^\/api\/upload\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/upload/_server.js')
			},
			{
				id: "/api/user/performance",
				pattern: /^\/api\/user\/performance\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/user/performance/_server.js')
			},
			{
				id: "/protected/admin",
				pattern: /^\/protected\/admin\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/protected/admin/edit",
				pattern: /^\/protected\/admin\/edit\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/protected/study",
				pattern: /^\/protected\/study\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/protected/study/[slug]",
				pattern: /^\/protected\/study\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4], errors: [1,,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/public/auth/login",
				pattern: /^\/public\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/public/auth/logout",
				pattern: /^\/public\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/public/auth/logout/_server.js')
			},
			{
				id: "/public/auth/sso",
				pattern: /^\/public\/auth\/sso\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/public/auth/sso/_server.js')
			},
			{
				id: "/public/util/log",
				pattern: /^\/public\/util\/log\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/public/util/log/_server.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
