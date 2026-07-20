import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
//#region src/content/featuredContent/bringing-data-to-life.mdx
function _createMdxContent(props) {
	const _components = {
		a: "a",
		h2: "h2",
		img: "img",
		p: "p",
		...props.components
	};
	return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Attention: Infrastructure!" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Planes, trains, and automobiles can get you where you need to go. But what if there’s no roads, bridges, or airports? America’s infrastructure is a key part of transportation that’s often overlooked by the average person." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "“Infrastructure” is a word used to describe systems and facilities like highways, drinking water systems, and energy. But how much do governments invest in things like this?" }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"A simple ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search",
				children: "USAspending.gov search"
			}),
			" for the ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.congress.gov/bill/117th-congress/house-bill/3684",
				children: "Infrastructure Investment and Jobs Act"
			}),
			" shows that in Fiscal Year 2025, the U.S. awarded ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/search?hash=33228179bd72f92d81811df275b956a4",
				children: "$187.6B"
			}),
			" in new funding for infrastructure projects."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: (0, import_jsx_runtime.jsx)(_components.img, {
			src: "bringing-data-to-life.png",
			alt: "highway intersection"
		}) }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Very few people look at a smooth interstate on-ramp and think, “I funded that infrastructure.”" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Ever hit a pothole going 60 miles an hour on the highway? That’s hard to miss." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "When a government doesn’t invest in infrastructure, it can result in bumpy roads, crumbling bridges, and even overcrowded airports. Poor infrastructure often goes unnoticed, but when it fails, the impacts can range from inconvenient to dangerous." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://cec.gmu.edu/",
				children: "George Mason College of Engineering and Computing"
			}),
			" hosted a hackathon (an innovation event where teams work to create a solution to a problem) using data from The U.S. Department of the Treasury Bureau of the Fiscal Service’s ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/",
				children: "USAspending.gov"
			}),
			" website. The hackathon, titled \"Bringing USAspending Data to Life: Connecting Federal Investments to Everyday Experiences,\" challenged students to find creative and accessible ways to connect government spending data directly to the environments, landmarks, and infrastructure projects people see every day."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "“Bringing Data to Life” Challenge Winners" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "Each student team’s project included ways to make federal spending more visible, tangible, and meaningful to the public." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "The winning team created \"Local Impact Assistant,\" a mash-up between Google Maps and a trivia game, but for federal spending. They tackled real-world tech challenges like API integration and AI rate limits (dealing with Gemini's constraints by pre-generating quiz data), built the experience using the Godot game engine, and coordinated everything remotely. The result maps federal projects in your community while keeping you engaged with gamified quizzes. It's the kind of tool that could help you discover that the new playground down the street was funded by a federal grant." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "The second place team created “Where It Went,” a real-time interactive mapping application that visualizes federal spending across the United States. The application generates AI-driven spending insights and reports, making it easy for anyone to understand how government money flows across different communities." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "The third place team leveraged USAspending’s API to create a website that presents data through an interactive map and dynamic filters." }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.h2, { children: "Innovation for the Future of Government Spending" }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "At USAspending, we want to invite the next generation of innovators to reimagine what’s possible. Events like the Hackathon generate invaluable ideas and insights about the future of government spending and how everyday people can access our information." }),
		"\n",
		(0, import_jsx_runtime.jsxs)(_components.p, { children: [
			"Ready to explore what federal spending looks like in your community? Visit ",
			(0, import_jsx_runtime.jsx)(_components.a, {
				href: "https://www.usaspending.gov/",
				children: "USAspending.gov"
			}),
			" to dive into the data yourself. Whether you're an educator, a data enthusiast, or just curious about where your tax dollars go, there's a place for you in this conversation."
		] }),
		"\n",
		(0, import_jsx_runtime.jsx)(_components.p, { children: "And maybe the next time you’re driving down the highway, you’ll see an overpass and think “I funded that infrastructure!”" })
	] });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? (0, import_jsx_runtime.jsx)(MDXLayout, {
		...props,
		children: (0, import_jsx_runtime.jsx)(_createMdxContent, { ...props })
	}) : _createMdxContent(props);
}
var import_jsx_runtime;
//#endregion
__esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
}))();
export { MDXContent as default };
