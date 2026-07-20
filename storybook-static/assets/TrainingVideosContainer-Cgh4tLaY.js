import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ar as tc, Fr as init_dist, Jn as getBaseUrl, Pr as FontAwesomeIcon, Tr as rc, Ua as init_es, Xn as init_socialShare, Yn as handleShareOptionClick, _r as ac, cr as Js, en as init_modalActions, fr as Qs, hr as Xa, ir as $s, nn as showTrainingVideoModal, qa as useDispatch, ro as require_jsx_runtime, tn as showModal, xr as init_index_es, ya as init_mobileBreakpoints } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, E as homePageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_BannerPageHeader, t as BannerPageHeader } from "./BannerPageHeader-BC5NwUDM.js";
import { n as init_ShareDownloadButtonGroup, t as ShareDownloadButtonGroup } from "./ShareDownloadButtonGroup-9ELwV16I.js";
import { o as init_featuredContentHelper, s as transformDate } from "./featuredContentHelper-C4z4x-zw.js";
import { useEffect, useRef, useState } from "react";
import PropTypes, { oneOfType } from "prop-types";
import { throttle } from "lodash-es";
//#region src/js/models/v2/video/VideoMetadata.js
var VideoMetadata;
var init_VideoMetadata = __esmMin((() => {
	init_featuredContentHelper();
	VideoMetadata = {
		populate(data) {
			this.id = data.id || "";
			this.title = data.snippet.title || "";
			this.description = data.snippet.description || "";
			this._publishedAt = data.snippet.publishedAt || "";
			this._duration = data.contentDetails.duration || "";
			this.thumbnails = data.snippet.thumbnails || "";
		},
		get url() {
			return `https://www.youtube.com/watch?v=${this.id}`;
		},
		get publishedAt() {
			return transformDate(this._publishedAt);
		},
		get durationInSecs() {
			const str = this._duration.toUpperCase();
			let hours = "";
			let min = "";
			let sec = "";
			let duration = str.replace("PT", "");
			let totalDuration = 0;
			if (duration.indexOf("H") > -1) {
				hours = duration.split("H");
				duration = hours[1];
				totalDuration += parseInt(hours[0], 10) * 3600;
			}
			if (duration.indexOf("M") > -1) {
				min = duration.split("M");
				duration = min[1];
				totalDuration += parseInt(min[0], 10) * 60;
			}
			if (duration.indexOf("S") > -1) {
				sec = duration.replace("S", "");
				if (sec.length > 0) totalDuration += parseInt(sec, 10);
			}
			return totalDuration;
		},
		get duration() {
			const str = this._duration.toUpperCase();
			let hours = "";
			let min = "";
			let sec = "";
			let duration = str.replace("PT", "");
			if (duration.indexOf("H") > -1) {
				hours = duration.split("H");
				duration = hours[1];
				hours = `${hours[0]}:`;
			}
			if (duration.indexOf("M") > -1) {
				min = duration.split("M");
				duration = min[1];
				min = min[0];
			} else min = `0`;
			if (hours && min?.length < 2) min = `0${min}`;
			if (min) min = `${min}:`;
			if (duration.indexOf("S") > -1) {
				sec = duration.replace("S", "");
				if (sec.length < 2) sec = `0${sec}`;
			} else sec = `00`;
			return `${hours}${min}${sec}`;
		}
	};
}));
//#endregion
//#region src/config/trainingVideos/playListMetadata.js
var metaData;
var init_playListMetadata = __esmMin((() => {
	metaData = {
		kind: "youtube#videoListResponse",
		items: [
			{
				kind: "youtube#video",
				etag: "DhXW8xzOOxLGkQ-CZ6DG2ee9GnY",
				id: "5gMp2kyzEoo",
				snippet: {
					publishedAt: "2023-01-09T13:30:01Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TUTORIAL: How to Use USAspending Downloads",
					description: "Do you love the data on USAspending.gov and want to download them for your own reports and analyses? USAspending.gov has a variety of download options to suit your needs. Watch this video to learn about the download features and how to use them!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:11 Advanced Search download\n\n6:05 Award Profile download\n\n7:48 Award Data Archive download\n\n10:15 Custom Award Data download\n\n12:43 Custom Account Data download\n\n16:38 COVID-19 Spending Profile download\n\n17:51 Data Dictionary\n\n20:22 Thank you!\n\nLINKS:\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/5gMp2kyzEoo/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/5gMp2kyzEoo/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/5gMp2kyzEoo/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/5gMp2kyzEoo/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/5gMp2kyzEoo/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"Download",
						"Advanced Search",
						"Contracts (Procurement)",
						"Financial Assistance",
						"Subawards",
						"Account Spending",
						"COVID-19 Spending"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "TUTORIAL: How to Use USAspending Downloads",
						description: "Do you love the data on USAspending.gov and want to download them for your own reports and analyses? USAspending.gov has a variety of download options to suit your needs. Watch this video to learn about the download features and how to use them!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:11 Advanced Search download\n\n6:05 Award Profile download\n\n7:48 Award Data Archive download\n\n10:15 Custom Award Data download\n\n12:43 Custom Account Data download\n\n16:38 COVID-19 Spending Profile download\n\n17:51 Data Dictionary\n\n20:22 Thank you!\n\nLINKS:\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT21M3S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "Bv1QrPeS_4v5kGJ81qOASl_uPXU",
				id: "AEKL2LOkRZY",
				snippet: {
					publishedAt: "2022-12-05T17:30:02Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TUTORIAL: How to Use USAspending API Endpoints",
					description: "Are you interested in creating customized and automated reports using USAspending data? If so, you'll want to learn about USAspending API endpoints! APIs (application programming interfaces) serve data from the backend to the frontend of USAspending.gov. You can use them to create reports using the data you see (and don't see) on the USAspending website. Watch the video to learn more!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n0:30 Step 1: Introduction to APIs\n  •  When to use an API\n  •  What is an API\n  •  Rest API endpoints\n  •  GET and POST requests\n\n3:08 Step 2: State profile GET request\n  •  Find data on a State profile page\n  •  Use the Inspect feature in your browser to find API paths\n  •  Use the Headers tab to copy and enter the Request URL in a new tab and compare the API output to what is presented on the State profile age\n\n5:52 Step 3: Advanced Search POST request\n  •  Submit an example search in Advanced Search\n  •  Find the specific data point you are interested in\n  •  Use the Inspect feature in your browser to find the API path for that endpoint\n  •  Use the Response tab to match the data point between the API endpoint and the Advanced Search result\n  •  Use the Payload tab to match the filters between the API endpoint and the Advanced Search result\n  •  Use the Headers tab to copy and enter the Request URL in a new tab and access the API endpoint documentation (which should match the Payload tab)\n  •  Use the filter objects in the API endpoint documentation and Payload tab to write your own API calls for use in your own reports and analyses\n\n9:17 Thank you!\n\nLINKS:\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/AEKL2LOkRZY/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/AEKL2LOkRZY/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/AEKL2LOkRZY/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/AEKL2LOkRZY/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/AEKL2LOkRZY/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "TUTORIAL: How to Use USAspending API Endpoints",
						description: "CHAPTERS:\n\n0:00 Welcome!\n\n0:30 Step 1: Introduction to APIs\n  •  When to use an API\n  •  What is an API\n  •  Rest API endpoints\n  •  GET and POST requests\n\n3:08 Step 2: State profile GET request\n  •  Find data on a State profile page\n  •  Use the Inspect feature in your browser to find API paths\n  •  Use the Headers tab to copy and enter the Request URL in a new tab and compare the API output to what is presented on the State profile age\n\n5:52 Step 3: Advanced Search POST request\n  •  Submit an example search in Advanced Search\n  •  Find the specific data point you are interested in\n  •  Use the Inspect feature in your browser to find the API path for that endpoint\n  •  Use the Response tab to match the data point between the API endpoint and the Advanced Search result\n  •  Use the Payload tab to match the filters between the API endpoint and the Advanced Search result\n  •  Use the Headers tab to copy and enter the Request URL in a new tab and access the API endpoint documentation (which should match the Payload tab)\n  •  Use the filter objects in the API endpoint documentation and Payload tab to write your own API calls for use in your own reports and analyses\n\n9:17 Thank you!\n\nLINKS:\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT9M58S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "MWujZVVt-qe6XQF93w_11wW8uCo",
				id: "Fzl4OIjP73A",
				snippet: {
					publishedAt: "2022-10-17T12:00:16Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "QUICK START: How to Find Government Contracts for Small Businesses",
					description: "Are you interested in small business market research for government contracts? USAspending.gov lets you search for federal contracts by industry, location, recipient type, set-asides, and more. Learn about how to find specific contracts and spending data in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:13 Step 1: Identify top industries for small businesses\n  •  In Advanced Search, use the Award Type, Location, Recipient Type filters. Then click 'Submit Search.'\n  •  Click on the Categories tab to see top agencies, recipients, and industries (using PSC or NAICS codes) for your search.\n  •  Refine your search based on any top industries you found.\n\n2:15 Step 2: Identify federal contracts with set-asides\n  •  Refine your search using the Type of Set-Aside filter. Click 'Submit Search.'\n  •  In the Table tab, sort results to see the contracts ending soon, which may indicate an opportunity to recompete for these contracts.\n\n3:08 Step 3: Identify potential subcontract opportunities\n  •  Remove filters for set-asides and small businesses.\n  •  Use the Award Amount filter to set a minimum of $750,000. Awards above this amount are required to have a subcontracting plan.\n  •  Click 'Submit Search.' In the Table tab, sort results to see the most recent start dates. These newer contracts are more likely to have subcontract opportunities. \n\n4:20 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/Fzl4OIjP73A\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/Fzl4OIjP73A/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/Fzl4OIjP73A/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/Fzl4OIjP73A/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/Fzl4OIjP73A/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/Fzl4OIjP73A/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"open data",
						"government spending",
						"federal spending",
						"fiscal service",
						"treasury",
						"award spending",
						"federal award",
						"federal contract",
						"subcontract",
						"small business",
						"set aside",
						"industry",
						"product",
						"service",
						"recipient"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "QUICK START: How to Find Government Contracts for Small Businesses",
						description: "Are you interested in small business market research for government contracts? USAspending.gov lets you search for federal contracts by industry, location, recipient type, set-asides, and more. Learn about how to find specific contracts and spending data in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:13 Step 1: Identify top industries for small businesses\n  •  In Advanced Search, use the Award Type, Location, Recipient Type filters. Then click 'Submit Search.'\n  •  Click on the Categories tab to see top agencies, recipients, and industries (using PSC or NAICS codes) for your search.\n  •  Refine your search based on any top industries you found.\n\n2:15 Step 2: Identify federal contracts with set-asides\n  •  Refine your search using the Type of Set-Aside filter. Click 'Submit Search.'\n  •  In the Table tab, sort results to see the contracts ending soon, which may indicate an opportunity to recompete for these contracts.\n\n3:08 Step 3: Identify potential subcontract opportunities\n  •  Remove filters for set-asides and small businesses.\n  •  Use the Award Amount filter to set a minimum of $750,000. Awards above this amount are required to have a subcontracting plan.\n  •  Click 'Submit Search.' In the Table tab, sort results to see the most recent start dates. These newer contracts are more likely to have subcontract opportunities. \n\n4:20 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/Fzl4OIjP73A\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT5M4S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "9sLC_wOxOSR_h95DDvXFMgQ9Hhg",
				id: "b8l-ZBhQ900",
				snippet: {
					publishedAt: "2022-08-15T12:30:11Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TUTORIAL: How to Find COVID and Infrastructure Spending",
					description: "Did you know that USAspending.gov tracks spending from bills addressing COVID-19 pandemic relief and infrastructure projects?  Spending from the CARES Act, American Rescue Plan Act, the Infrastructure Investment and Jobs Act, and similar bills is tracked using fund codes assigned by the Office of Management and Budget. Learn more about how to find COVID relief spending and infrastructure spending in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome, and Introduction to Disaster Emergency Fund Codes (DEFC)\n\n2:04 Step 1: Finding COVID-19 Spending or Infrastructure Spending in Advanced Search\n  •  In Advanced Search, use the DEFC filter.\n  •  Then click 'Submit Search.'\n\n3:27 Step 1 (cont.): Reviewing Results in Advanced Search\n  •  Each row in the Table shows a new or existing award that has received DEFC funding.\n  •  Scroll to the right in the Table to see columns for DEFC values, COVID-19 obligations, and COVID-19 outlays for each award.\n  •  Click on any link in the Award ID column to visit the award summary page for that award.\n  •  Click on the Subaward toggle above the Table to see subawards whose prime award has received DEFC funding. Scroll to the right to see links to prime award summary pages for each subaward.\n\n6:15 Step 1 (cont.): Downloading Results from Advanced Search\n  •  Click on the 'Download' button in the top right of the page and select the Award-level download (narrow your search results first, if necessary).\n  •  In the Prime Award Summaries files, search the column headers for COVID-19 obligations and outlays using the term \"COVID\".\n  •  Subawards files (and Transaction-level files) include reference information from the Prime Award Summaries files on COVID-19 obligations and outlays.\n\n10:02 Step 2: Finding COVID-19 Spending or Infrastructure Spending in Custom Account Data Download\n  •  In Custom Account Data Download, use the DEFC filter.\n  •  Specify the Fiscal Year (and Quarter) for your download.\n  •  Select Federal Account unless you know you want Treasury Account.\n\n11:29 Step 2 (cont.): Selecting File Type in Custom Account Data Download\n  •  Select File B if you want award and non-award spending from agencies. Download and search for the 'obligations_incurred' column and the 'gross_outlay_amount_FYB_to_period_end' column.\n  •  Select File C if you want only award spending from agencies. Download and search for the 'transaction_obligated_amount' column and the 'gross_outlay_amount_FYB_to_period_end' column.\n\n14:34 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/hct0oHSGVHA\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/b8l-ZBhQ900/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/b8l-ZBhQ900/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/b8l-ZBhQ900/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/b8l-ZBhQ900/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/b8l-ZBhQ900/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"open data",
						"government spending",
						"federal spending",
						"award spending",
						"federal award",
						"subaward",
						"prime recipient",
						"subaward recipient",
						"prime award",
						"obligation",
						"outlay",
						"covid spending",
						"covid relief",
						"covid stimulus",
						"relief bill",
						"stimulus bill",
						"infrastructure spending",
						"infrastructure bill",
						"infrastructure grant",
						"infrastructure program",
						"infrastructure project",
						"infrastructure investment",
						"pandemic spending",
						"pandemic stimulus",
						"pandemic relief",
						"pandemic fund",
						"pandemic money"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "TUTORIAL: How to Find COVID and Infrastructure Spending",
						description: "Did you know that USAspending.gov tracks spending from bills addressing COVID-19 pandemic relief and infrastructure projects?  Spending from the CARES Act, American Rescue Plan Act, the Infrastructure Investment and Jobs Act, and similar bills is tracked using fund codes assigned by the Office of Management and Budget. Learn more about how to find COVID relief spending and infrastructure spending in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome, and Introduction to Disaster Emergency Fund Codes (DEFC)\n\n2:04 Step 1: Finding COVID-19 Spending or Infrastructure Spending in Advanced Search\n  •  In Advanced Search, use the DEFC filter.\n  •  Then click 'Submit Search.'\n\n3:27 Step 1 (cont.): Reviewing Results in Advanced Search\n  •  Each row in the Table shows a new or existing award that has received DEFC funding.\n  •  Scroll to the right in the Table to see columns for DEFC values, COVID-19 obligations, and COVID-19 outlays for each award.\n  •  Click on any link in the Award ID column to visit the award summary page for that award.\n  •  Click on the Subaward toggle above the Table to see subawards whose prime award has received DEFC funding. Scroll to the right to see links to prime award summary pages for each subaward.\n\n6:15 Step 1 (cont.): Downloading Results from Advanced Search\n  •  Click on the 'Download' button in the top right of the page and select the Award-level download (narrow your search results first, if necessary).\n  •  In the Prime Award Summaries files, search the column headers for COVID-19 obligations and outlays using the term \"COVID\".\n  •  Subawards files (and Transaction-level files) include reference information from the Prime Award Summaries files on COVID-19 obligations and outlays.\n\n10:02 Step 2: Finding COVID-19 Spending or Infrastructure Spending in Custom Account Data Download\n  •  In Custom Account Data Download, use the DEFC filter.\n  •  Specify the Fiscal Year (and Quarter) for your download.\n  •  Select Federal Account unless you know you want Treasury Account.\n\n11:29 Step 2 (cont.): Selecting File Type in Custom Account Data Download\n  •  Select File B if you want award and non-award spending from agencies. Download and search for the 'obligations_incurred' column and the 'gross_outlay_amount_FYB_to_period_end' column.\n  •  Select File C if you want only award spending from agencies. Download and search for the 'transaction_obligated_amount' column and the 'gross_outlay_amount_FYB_to_period_end' column.\n\n14:34 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/hct0oHSGVHA\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT15M16S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "59KgK2tTQWaZ_aFw_AWrcccpixY",
				id: "b9ABwzIyCNI",
				snippet: {
					publishedAt: "2022-08-15T12:30:10Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "QUICK START: How to Find Government Spending to Your State",
					description: "Did you know you can track federal spending to your state, county, or congressional district? USAspending.gov is the single most complete source of spending data on federal awards and subawards such as contracts, grants, and loans. Learn more about how to track federal spending to your community in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:11 Step 1: Download your data in Advanced Search\n  •  In Advanced Search, use the Time Period filter and the Location filter. You can search by state, county, or congressional district.\n  •  Then click the Download button and select 'Transactions' and 'Everything'.\n\n2:06 Step 2: Calculate spending from prime awards\n  •  Open the Contracts Prime Transactions file and sum up the Federal Action Obligation column.\n  •  Open the Assistance Prime Transactions file and sum up the Federal Action Obligation column *and* the Original Loan Subsidy Cost column.\n\n3:15 Step 3: Calculate spending from subawards\n  •  Open the Contracts Subawards file and sum up the Subaward Amount column.\n  •  Open the Assistance Subawards file and sum up the Subaward Amount column.\n\n4:09 Thank you!\n\nLINKS:\n\n  •  Watch our \"TUTORIAL\" video on this topic: https://youtu.be/ZuvZQ33ZvAE\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/b9ABwzIyCNI/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/b9ABwzIyCNI/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/b9ABwzIyCNI/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/b9ABwzIyCNI/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/b9ABwzIyCNI/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"open data",
						"government spending",
						"federal spending",
						"fiscal service",
						"treasury",
						"award spending",
						"federal award",
						"federal contract",
						"federal loan",
						"federal grant",
						"congressional district",
						"county",
						"state",
						"subaward",
						"prime recipient",
						"subaward recipient",
						"prime award",
						"obligation",
						"outlay"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en-US",
					localized: {
						title: "QUICK START: How to Find Government Spending to Your State",
						description: "Did you know you can track federal spending to your state, county, or congressional district? USAspending.gov is the single most complete source of spending data on federal awards and subawards such as contracts, grants, and loans. Learn more about how to track federal spending to your community in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:11 Step 1: Download your data in Advanced Search\n  •  In Advanced Search, use the Time Period filter and the Location filter. You can search by state, county, or congressional district.\n  •  Then click the Download button and select 'Transactions' and 'Everything'.\n\n2:06 Step 2: Calculate spending from prime awards\n  •  Open the Contracts Prime Transactions file and sum up the Federal Action Obligation column.\n  •  Open the Assistance Prime Transactions file and sum up the Federal Action Obligation column *and* the Original Loan Subsidy Cost column.\n\n3:15 Step 3: Calculate spending from subawards\n  •  Open the Contracts Subawards file and sum up the Subaward Amount column.\n  •  Open the Assistance Subawards file and sum up the Subaward Amount column.\n\n4:09 Thank you!\n\nLINKS:\n\n  •  Watch our \"TUTORIAL\" video on this topic: https://youtu.be/ZuvZQ33ZvAE\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT4M57S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "tcAmONVc2VTtlhswXqZ8ReifWmg",
				id: "hct0oHSGVHA",
				snippet: {
					publishedAt: "2022-08-15T12:30:10Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "QUICK START: How to Find COVID and Infrastructure Spending",
					description: "Did you know that USAspending.gov tracks spending from bills addressing COVID-19 pandemic relief and infrastructure projects?  Spending from the CARES Act, American Rescue Plan Act, the Infrastructure Investment and Jobs Act, and similar bills is tracked using fund codes assigned by the Office of Management and Budget. Learn more about how to find COVID relief spending and infrastructure spending in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome, and Introduction to Disaster Emergency Fund Codes (DEFC)\n\n1:22 Step 1: Finding COVID-19 Spending or Infrastructure Spending in Advanced Search\n  •  In Advanced Search, use the DEFC filter.\n  •  Then click 'Submit Search.'\n\n2:00 Step 1 (cont.): Reviewing Results in Advanced Search\n  •  Each row in the Table shows a new or existing award that has received DEFC funding.\n  •  Scroll to the right in the Table to see columns for DEFC values, COVID-19 obligations, and COVID-19 outlays for each award.\n  •  Click on the Subaward toggle above the Table to see subawards whose prime award has received DEFC funding.\n\n2:52 Step 1 (cont.): Downloading Results from Advanced Search\n  •  Click on the 'Download' button in the top right of the page and select the Award-level download (narrow your search results first, if necessary).\n  •  In the Prime Award Summaries files, search the column headers for COVID-19 obligations and outlays using the term \"COVID\".\n  •  Subawards files (and Transaction-level files) include reference information from the Prime Award Summaries files on COVID-19 obligations and outlays.\n\n4:57 Step 2: Finding COVID-19 Spending or Infrastructure Spending in Custom Account Data Download\n  •  In Custom Account Data Download, use the DEFC filter.\n  •  There are two options for File Types that have DEFC data. Select File B if you want award and non-award spending from agencies. Download and search for the 'obligations_incurred' column and the 'gross_outlay_amount_FYB_to_period_end' column.\n  •  Select File C if you want only award spending from agencies. Download and search for the 'transaction_obligated_amount' column and the 'gross_outlay_amount_FYB_to_period_end' column.\n\n6:35 Thank you!\n\nLINKS:\n\n  •  Watch our \"TUTORIAL\" video on this topic: https://youtu.be/b8l-ZBhQ900\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/hct0oHSGVHA/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/hct0oHSGVHA/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/hct0oHSGVHA/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/hct0oHSGVHA/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/hct0oHSGVHA/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"open data",
						"government spending",
						"federal spending",
						"award spending",
						"federal award",
						"subaward",
						"prime recipient",
						"subaward recipient",
						"prime award",
						"obligation",
						"outlay",
						"covid spending",
						"covid relief",
						"covid stimulus",
						"relief bill",
						"stimulus bill",
						"infrastructure spending",
						"infrastructure bill",
						"infrastructure grant",
						"infrastructure program",
						"infrastructure project",
						"infrastructure investment",
						"pandemic spending",
						"pandemic stimulus",
						"pandemic relief",
						"pandemic fund",
						"pandemic money"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en-US",
					localized: {
						title: "QUICK START: How to Find COVID and Infrastructure Spending",
						description: "Did you know that USAspending.gov tracks spending from bills addressing COVID-19 pandemic relief and infrastructure projects?  Spending from the CARES Act, American Rescue Plan Act, the Infrastructure Investment and Jobs Act, and similar bills is tracked using fund codes assigned by the Office of Management and Budget. Learn more about how to find COVID relief spending and infrastructure spending in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome, and Introduction to Disaster Emergency Fund Codes (DEFC)\n\n1:22 Step 1: Finding COVID-19 Spending or Infrastructure Spending in Advanced Search\n  •  In Advanced Search, use the DEFC filter.\n  •  Then click 'Submit Search.'\n\n2:00 Step 1 (cont.): Reviewing Results in Advanced Search\n  •  Each row in the Table shows a new or existing award that has received DEFC funding.\n  •  Scroll to the right in the Table to see columns for DEFC values, COVID-19 obligations, and COVID-19 outlays for each award.\n  •  Click on the Subaward toggle above the Table to see subawards whose prime award has received DEFC funding.\n\n2:52 Step 1 (cont.): Downloading Results from Advanced Search\n  •  Click on the 'Download' button in the top right of the page and select the Award-level download (narrow your search results first, if necessary).\n  •  In the Prime Award Summaries files, search the column headers for COVID-19 obligations and outlays using the term \"COVID\".\n  •  Subawards files (and Transaction-level files) include reference information from the Prime Award Summaries files on COVID-19 obligations and outlays.\n\n4:57 Step 2: Finding COVID-19 Spending or Infrastructure Spending in Custom Account Data Download\n  •  In Custom Account Data Download, use the DEFC filter.\n  •  There are two options for File Types that have DEFC data. Select File B if you want award and non-award spending from agencies. Download and search for the 'obligations_incurred' column and the 'gross_outlay_amount_FYB_to_period_end' column.\n  •  Select File C if you want only award spending from agencies. Download and search for the 'transaction_obligated_amount' column and the 'gross_outlay_amount_FYB_to_period_end' column.\n\n6:35 Thank you!\n\nLINKS:\n\n  •  Watch our \"TUTORIAL\" video on this topic: https://youtu.be/b8l-ZBhQ900\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT7M15S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "sY-6V4s9iSVTfYlu8o6nl_3OPPc",
				id: "8-r7aSvl8tY",
				snippet: {
					publishedAt: "2022-11-07T13:30:04Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TUTORIAL: How to Find Federal Grants",
					description: "Are you researching grants awarded by the federal government to organizations such as nonprofits? USAspending.gov lets you search for federal grants by agency, location, recipient type, and more. Learn about how to find specific grants and spending data in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:05 Step 1: Using Advanced Search filters to find grants\n  •  In Advanced Search, use the Award Type, Agency, Location, Recipient, Recipient Type, and Assistance Listing (CFDA Program) filters. Then click 'Submit Search.'\n  •  Use the subaward toggle to find results for subawards rather than prime awards.\n\n4:55 Step 2: Reviewing search results for grants (Table tab)\n  •  Use the Table tab to see all the award summaries that match your selected filters.\n  •  Click on the links in the Award ID column to see the profile page for any individual grant. These profiles have more information about the assistance listing that authorized the grant. This information is drawn from SAM.gov and Grants.gov. \n\n6:43 Step 2: Reviewing search results for grants (Time, Map, and Categories tabs)\n  •  Use the Time tab to see how much has been spent over time.\n  •  Use the Map tab to see how much has been spent in various locations.\n  •  Use the Categories tab to see the breakdown of spending by agency, recipient, or assistance listing. You can refine your search by any of these categories.\n\n9:28 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/apPBqcy6F1k\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/8-r7aSvl8tY/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/8-r7aSvl8tY/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/8-r7aSvl8tY/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/8-r7aSvl8tY/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/8-r7aSvl8tY/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "TUTORIAL: How to Find Federal Grants",
						description: "Are you researching grants awarded by the federal government to organizations such as nonprofits? USAspending.gov lets you search for federal grants by agency, location, recipient type, and more. Learn about how to find specific grants and spending data in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:05 Step 1: Using Advanced Search filters to find grants\n  •  In Advanced Search, use the Award Type, Agency, Location, Recipient, Recipient Type, and Assistance Listing (CFDA Program) filters. Then click 'Submit Search.'\n  •  Use the subaward toggle to find results for subawards rather than prime awards.\n\n4:55 Step 2: Reviewing search results for grants (Table tab)\n  •  Use the Table tab to see all the award summaries that match your selected filters.\n  •  Click on the links in the Award ID column to see the profile page for any individual grant. These profiles have more information about the assistance listing that authorized the grant. This information is drawn from SAM.gov and Grants.gov. \n\n6:43 Step 2: Reviewing search results for grants (Time, Map, and Categories tabs)\n  •  Use the Time tab to see how much has been spent over time.\n  •  Use the Map tab to see how much has been spent in various locations.\n  •  Use the Categories tab to see the breakdown of spending by agency, recipient, or assistance listing. You can refine your search by any of these categories.\n\n9:28 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/apPBqcy6F1k\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT10M6S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "GG-ZMbnhSQGBwVG9XvLgb-zkYrQ",
				id: "apPBqcy6F1k",
				snippet: {
					publishedAt: "2022-11-07T13:30:03Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "QUICK START: How to Find Federal Grants",
					description: "Are you researching grants awarded by the federal government to organizations such as nonprofits? USAspending.gov lets you search for federal grants by agency, location, recipient type, and more. Learn about how to find specific grants and spending data in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n0:49 Step 1: Using Advanced Search filters to find grants\n  •  In Advanced Search, use the Award Type, Agency, Location, Recipient, Recipient Type, and Assistance Listing (CFDA Program) filters. Then click 'Submit Search.'\n  •  Use the subaward toggle to find results for subawards rather than prime awards.\n\n1:35 Step 2: Reviewing search results for grants (Table tab)\n  •  Use the Table tab to see all the award summaries that match your selected filters.\n  •  Use the Time tab to see how much has been spent over time.\n  •  Use the Map tab to see how much has been spent in various locations.\n  •  Use the Categories tab to see the breakdown of spending by agency, recipient, or assistance listing. You can refine your search by any of these categories.\n  •  Use the subaward toggle to find results for subawards rather than prime awards.\n\n2:41 Thank you!\n\nLINKS:\n\n  •  Watch our \"TUTORIAL\" video on this topic: https://youtu.be/8-r7aSvl8tY\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/apPBqcy6F1k/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/apPBqcy6F1k/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/apPBqcy6F1k/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/apPBqcy6F1k/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/apPBqcy6F1k/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "QUICK START: How to Find Federal Grants",
						description: "Are you researching grants awarded by the federal government to organizations such as nonprofits? USAspending.gov lets you search for federal grants by agency, location, recipient type, and more. Learn about how to find specific grants and spending data in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n0:49 Step 1: Using Advanced Search filters to find grants\n  •  In Advanced Search, use the Award Type, Agency, Location, Recipient, Recipient Type, and Assistance Listing (CFDA Program) filters. Then click 'Submit Search.'\n  •  Use the subaward toggle to find results for subawards rather than prime awards.\n\n1:35 Step 2: Reviewing search results for grants (Table tab)\n  •  Use the Table tab to see all the award summaries that match your selected filters.\n  •  Use the Time tab to see how much has been spent over time.\n  •  Use the Map tab to see how much has been spent in various locations.\n  •  Use the Categories tab to see the breakdown of spending by agency, recipient, or assistance listing. You can refine your search by any of these categories.\n  •  Use the subaward toggle to find results for subawards rather than prime awards.\n\n2:41 Thank you!\n\nLINKS:\n\n  •  Watch our \"TUTORIAL\" video on this topic: https://youtu.be/8-r7aSvl8tY\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT3M22S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "_XbygWfqK9pp-bnj4mnJiY9K6nk",
				id: "jYs3zq3Tvs0",
				snippet: {
					publishedAt: "2022-10-17T12:00:34Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TUTORIAL: How to Find Government Contracts for Small Businesses",
					description: "Are you interested in small business market research for government contracts? USAspending.gov lets you search for federal contracts by industry, location, recipient type, set-asides, and more. Learn about how to find specific contracts and spending data in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:11 Step 1: Identify top industries for small businesses\n  •  In Advanced Search, use the Award Type, Location, Recipient Type filters. Then click 'Submit Search.'\n  •  Click on the Categories tab to see top agencies, recipients, and industries (using PSC or NAICS codes) for your search.\n  •  Refine your search based on any top industries you found.\n\n4:40 Step 2: Identify federal contracts with set-asides\n  •  Refine your search using the Type of Set-Aside filter. Click 'Submit Search.'\n  •  In the Table tab, sort results to see the contracts ending soon, which may indicate an opportunity to recompete for these contracts.\n\n6:30 Step 3: Identify potential subcontract opportunities\n  •  Remove filters for set-asides and small businesses.\n  •  Use the Award Amount filter to set a minimum of $750,000. Awards above this amount are required to have a subcontracting plan.\n  •  Click 'Submit Search.' In the Table tab, sort results to see the most recent start dates. These newer contracts are more likely to have subcontract opportunities. \n\n8:22 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/Fzl4OIjP73A\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/jYs3zq3Tvs0/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/jYs3zq3Tvs0/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/jYs3zq3Tvs0/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/jYs3zq3Tvs0/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/jYs3zq3Tvs0/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"open data",
						"government spending",
						"federal spending",
						"fiscal service",
						"treasury",
						"award spending",
						"federal award",
						"federal contract",
						"subcontract",
						"small business",
						"set aside",
						"industry",
						"product",
						"service",
						"recipient"
					],
					categoryId: "22",
					liveBroadcastContent: "none",
					localized: {
						title: "TUTORIAL: How to Find Government Contracts for Small Businesses",
						description: "Are you interested in small business market research for government contracts? USAspending.gov lets you search for federal contracts by industry, location, recipient type, set-asides, and more. Learn about how to find specific contracts and spending data in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:11 Step 1: Identify top industries for small businesses\n  •  In Advanced Search, use the Award Type, Location, Recipient Type filters. Then click 'Submit Search.'\n  •  Click on the Categories tab to see top agencies, recipients, and industries (using PSC or NAICS codes) for your search.\n  •  Refine your search based on any top industries you found.\n\n4:40 Step 2: Identify federal contracts with set-asides\n  •  Refine your search using the Type of Set-Aside filter. Click 'Submit Search.'\n  •  In the Table tab, sort results to see the contracts ending soon, which may indicate an opportunity to recompete for these contracts.\n\n6:30 Step 3: Identify potential subcontract opportunities\n  •  Remove filters for set-asides and small businesses.\n  •  Use the Award Amount filter to set a minimum of $750,000. Awards above this amount are required to have a subcontracting plan.\n  •  Click 'Submit Search.' In the Table tab, sort results to see the most recent start dates. These newer contracts are more likely to have subcontract opportunities. \n\n8:22 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/Fzl4OIjP73A\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT9M4S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "7VCijZViNVchLU8vMyx_dtlhTkY",
				id: "b7SDGhSZ5wM",
				snippet: {
					publishedAt: "2022-08-15T12:30:15Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "USAspending.gov Origin Story",
					description: "Did you know that the U.S. government publishes open data on federal spending? USAspending.gov is the authoritative source of federal spending data for the public, researchers, and policymakers alike. Learn more about the origin story for USAspending.gov in this video! \n\nWe want to hear your ideas for future videos. Drop us a comment below! \n\nLINKS:\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/b7SDGhSZ5wM/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/b7SDGhSZ5wM/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/b7SDGhSZ5wM/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/b7SDGhSZ5wM/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/b7SDGhSZ5wM/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"open data",
						"federal spending",
						"government spending",
						"fiscal service",
						"Treasury",
						"FFATA",
						"DATA Act",
						"agency spending",
						"award spending",
						"Federal Funding Accountability and Transparency Act",
						"Digital Accountability and Transparency Act"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en-US",
					localized: {
						title: "USAspending.gov Origin Story",
						description: "Did you know that the U.S. government publishes open data on federal spending? USAspending.gov is the authoritative source of federal spending data for the public, researchers, and policymakers alike. Learn more about the origin story for USAspending.gov in this video! \n\nWe want to hear your ideas for future videos. Drop us a comment below! \n\nLINKS:\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT3M45S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "OEHC4VqwNxIXJc5O9GUReZ8_T5Y",
				id: "ZuvZQ33ZvAE",
				snippet: {
					publishedAt: "2022-08-15T12:30:09Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TUTORIAL: How to Find Government Spending to Your State",
					description: "Did you know you can track federal spending to your state, county, or congressional district? USAspending.gov is the single most complete source of spending data on federal awards and subawards such as contracts, grants, and loans. Learn more about how to track federal spending to your community in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:44 Step 1: Download your data in Advanced Search\n  •  In Advanced Search, use the Time Period filter and the Location filter. You can search by state, county, or congressional district.\n  •  Then click the Download button and select 'Transactions' and 'Everything'.\n\n4:06 Step 2: Calculate spending from prime awards\n  •  Open the Contracts Prime Transactions file and sum up the Federal Action Obligation column.\n  •  Open the Assistance Prime Transactions file and sum up the Federal Action Obligation column *and* the Original Loan Subsidy Cost column.\n\n7:57 Step 3: Calculate spending from subawards\n  •  Open the Contracts Subawards file and sum up the Subaward Amount column.\n  •  Open the Assistance Subawards file and sum up the Subaward Amount column.\n\n10:20 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/b9ABwzIyCNI\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/ZuvZQ33ZvAE/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/ZuvZQ33ZvAE/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/ZuvZQ33ZvAE/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/ZuvZQ33ZvAE/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/ZuvZQ33ZvAE/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"open data",
						"government spending",
						"federal spending",
						"fiscal service",
						"treasury",
						"award spending",
						"federal award",
						"federal contract",
						"federal loan",
						"federal grant",
						"congressional district",
						"county",
						"state",
						"subaward",
						"prime recipient",
						"subaward recipient",
						"prime award",
						"obligation",
						"outlay"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en-US",
					localized: {
						title: "TUTORIAL: How to Find Government Spending to Your State",
						description: "Did you know you can track federal spending to your state, county, or congressional district? USAspending.gov is the single most complete source of spending data on federal awards and subawards such as contracts, grants, and loans. Learn more about how to track federal spending to your community in this video!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:44 Step 1: Download your data in Advanced Search\n  •  In Advanced Search, use the Time Period filter and the Location filter. You can search by state, county, or congressional district.\n  •  Then click the Download button and select 'Transactions' and 'Everything'.\n\n4:06 Step 2: Calculate spending from prime awards\n  •  Open the Contracts Prime Transactions file and sum up the Federal Action Obligation column.\n  •  Open the Assistance Prime Transactions file and sum up the Federal Action Obligation column *and* the Original Loan Subsidy Cost column.\n\n7:57 Step 3: Calculate spending from subawards\n  •  Open the Contracts Subawards file and sum up the Subaward Amount column.\n  •  Open the Assistance Subawards file and sum up the Subaward Amount column.\n\n10:20 Thank you!\n\nLINKS:\n\n  •  Watch our \"QUICK START\" video on this topic: https://youtu.be/b9ABwzIyCNI\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?section=training\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT11M7S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "NT_CXmbGOk-SfhPae97J-ZrCAJM",
				id: "2GSWlHlPULE",
				snippet: {
					publishedAt: "2023-02-06T13:30:00Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TUTORIAL: How to Find Federal Funding Recipients",
					description: "Have you ever wondered who receives federal funding in the form of contracts, grants, or loans? You can search for these federal award recipients (and subrecipients) on http://USAspending.gov ! Just use the Recipient Profiles landing page or the Advanced Search page. Watch this video to learn more!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:01 Prime recipients versus subrecipients\n  •  Definitions\n  •  Personally identifiable information (PII), aggregate records, and redacted records\n  •  How to avoid double-counting award amounts\n\n5:40 Searching for prime recipients\n  •  Use the Recipient Profiles landing page to search for prime recipient names or unique entity identifier (UEI) codes\n  •  Note the icons indicating \"Recipient\" organization, \"Child\" organization, and \"Parent\" organization\n  •  Click on a Parent Recipient profile page\n  •  Drill down to a Child Recipient profile page\n  •  Click on \"View awards to this recipient\" to see Advanced Search results for the Child Recipient\n  •  Use Advanced Search to search for prime recipients\n\n16:06 Searching for subrecipients\n  •  Use Advanced Search to search for subrecipients by clicking on the \"Subawards\" toggle in the top right of the page\n  •  Click on any Subaward ID link to visit the Prime Award Summary page that includes that subaward; scroll to the \"Award History\" section and click on the \"Subawards\" tab to see additional details\n  •  Refine your subaward recipient search by using additional filters in Advanced Search\n\n19:57 Thank you!\n\nLINKS:\n\n  •  Visit http://USAspending.gov : https://www.usaspending.gov/   \n\n•  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on http://USAspending.gov  by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on http://USAspending.gov  for your organization:\n      https://www.usaspending.gov/about?section=training\n\n We  look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/2GSWlHlPULE/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/2GSWlHlPULE/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/2GSWlHlPULE/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/2GSWlHlPULE/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/2GSWlHlPULE/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"Advanced Search",
						"Award Recipients",
						"Subawards",
						"Contracts (Procurement)",
						"Financial Assistance"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "TUTORIAL: How to Find Federal Funding Recipients",
						description: "Have you ever wondered who receives federal funding in the form of contracts, grants, or loans? You can search for these federal award recipients (and subrecipients) on http://USAspending.gov ! Just use the Recipient Profiles landing page or the Advanced Search page. Watch this video to learn more!\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n1:01 Prime recipients versus subrecipients\n  •  Definitions\n  •  Personally identifiable information (PII), aggregate records, and redacted records\n  •  How to avoid double-counting award amounts\n\n5:40 Searching for prime recipients\n  •  Use the Recipient Profiles landing page to search for prime recipient names or unique entity identifier (UEI) codes\n  •  Note the icons indicating \"Recipient\" organization, \"Child\" organization, and \"Parent\" organization\n  •  Click on a Parent Recipient profile page\n  •  Drill down to a Child Recipient profile page\n  •  Click on \"View awards to this recipient\" to see Advanced Search results for the Child Recipient\n  •  Use Advanced Search to search for prime recipients\n\n16:06 Searching for subrecipients\n  •  Use Advanced Search to search for subrecipients by clicking on the \"Subawards\" toggle in the top right of the page\n  •  Click on any Subaward ID link to visit the Prime Award Summary page that includes that subaward; scroll to the \"Award History\" section and click on the \"Subawards\" tab to see additional details\n  •  Refine your subaward recipient search by using additional filters in Advanced Search\n\n19:57 Thank you!\n\nLINKS:\n\n  •  Visit http://USAspending.gov : https://www.usaspending.gov//n/n   \n\n•  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on http://USAspending.gov  by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on http://USAspending.gov  for your organization:\n      https://www.usaspending.gov/about?section=trainin\n\n We look forward to hearing from you!"
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT20M38S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "7dNgkHvz9UsA6ZQKTvvfjrqV5K0",
				id: "z6QwQR_7beM",
				snippet: {
					publishedAt: "2023-05-15T12:00:49Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "OVERVIEW: Getting Started with USAspending.gov",
					description: "Ever wondered what was possible with government spending data? Here is the ONE video that you'll need to overview the major features and data on USAspending.gov. Learn about our interactive tools and ready-made analyses — all accessible from the homepage!\n\nWe want to hear your ideas for future videos. Drop us a comment below! \n\nCHAPTERS:\n\n0:00 Welcome!\n\n0:47 Spending Explorer tool (drilldown into spending categories)\n\n1:24 Advanced Search tool (search for data about federal awards such as contracts, grants, and loans)\n\n2:39 Spending Profile pages (readymade analyses on spending topics)\n\n3:21 Download and API (tools to provide access to bulk data)\n\n3:40 Resources (reference and learning materials to help you use the website and data)\n\nLINKS: \n\n • Visit USAspending.gov: <https://www.usaspending.gov/> \n\n • Sign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov \n\n • Ask questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov\n\n • Request customized training on USAspending.gov for your organization: <https://www.usaspending.gov/about?sec...> \n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/z6QwQR_7beM/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/z6QwQR_7beM/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/z6QwQR_7beM/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/z6QwQR_7beM/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/z6QwQR_7beM/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"Spending Explorer",
						"Advanced Search",
						"Account Spending",
						"Contracts",
						"Financial Assistance",
						"Download",
						"API"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "OVERVIEW: Getting Started with USAspending.gov",
						description: "Ever wondered what was possible with government spending data? Here is the ONE video that you'll need to overview the major features and data on USAspending.gov. Learn about our interactive tools and ready-made analyses — all accessible from the homepage!\n\nWe want to hear your ideas for future videos. Drop us a comment below! \n\nCHAPTERS:\n\n0:00 Welcome!\n\n0:47 Spending Explorer tool (drilldown into spending categories)\n\n1:24 Advanced Search tool (search for data about federal awards such as contracts, grants, and loans)\n\n2:39 Spending Profile pages (readymade analyses on spending topics)\n\n3:21 Download and API (tools to provide access to bulk data)\n\n3:40 Resources (reference and learning materials to help you use the website and data)\n\nLINKS: \n\n • Visit USAspending.gov: <https://www.usaspending.gov/> \n\n • Sign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov \n\n • Ask questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov\n\n • Request customized training on USAspending.gov for your organization: <https://www.usaspending.gov/about?sec...> \n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT4M41S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "w6eBlEykL-AEINDDUG98QNSDmCs",
				id: "fLNHjzYKCaQ",
				snippet: {
					publishedAt: "2023-08-08T12:09:04Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "DATA SOURCES: Appropriations, Obligations, and Outlays",
					description: "Welcome to the first video in our series about the Data Sources page. Learn about important federal spending terminology and how to distinguish topline budget figures such as obligations and outlays! Explore the Data Sources page here: https://www.usaspending.gov/data-sources\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n0:42 Appropriations\nAppropriation is a process by which Congress identifies and approves spending for a specific purpose. Without an appropriation, federal agencies won’t receive funding, and thus can’t spend money. \n\nFederal Account Profile Example: https://www.usaspending.gov/federal_account/075-0512\n\n1:48 Obligations\nObligations are binding agreements that agencies enter to spend budgetary resources on authorized purposes such as agency employee salaries or federal awards like contracts, grants, and loans. \n\n2:19 Outlays\nWhen the agency actually makes a payment, these payments are recorded as outlays. Outlays represent the official spending of funds that have been obligated. \n\nAgency Profile Example: https://www.usaspending.gov/agency/department-of-health-and-human-services?fy=2021\n\nAward Profile Example: https://www.usaspending.gov/award/CONT_AWD_75H70421F80001_7527_75FCMC18D0047_7530\n\n3:51 Thank you!\n\nLINKS:\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?sec..\n\nWe look forward to hearing from you!",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/fLNHjzYKCaQ/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/fLNHjzYKCaQ/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/fLNHjzYKCaQ/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/fLNHjzYKCaQ/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/fLNHjzYKCaQ/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "DATA SOURCES: Appropriations, Obligations, and Outlays",
						description: "Welcome to the first video in our series about the Data Sources page. Learn about important federal spending terminology and how to distinguish topline budget figures such as obligations and outlays! Explore the Data Sources page here: https://www.usaspending.gov/data-sources\n\nWe want to hear your ideas for future videos. Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n0:42 Appropriations\nAppropriation is a process by which Congress identifies and approves spending for a specific purpose. Without an appropriation, federal agencies won’t receive funding, and thus can’t spend money. \n\nFederal Account Profile Example: https://www.usaspending.gov/federal_account/075-0512\n\n1:48 Obligations\nObligations are binding agreements that agencies enter to spend budgetary resources on authorized purposes such as agency employee salaries or federal awards like contracts, grants, and loans. \n\n2:19 Outlays\nWhen the agency actually makes a payment, these payments are recorded as outlays. Outlays represent the official spending of funds that have been obligated. \n\nAgency Profile Example: https://www.usaspending.gov/agency/department-of-health-and-human-services?fy=2021\n\nAward Profile Example: https://www.usaspending.gov/award/CONT_AWD_75H70421F80001_7527_75FCMC18D0047_7530\n\n3:51 Thank you!\n\nLINKS:\n\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\n  •  Request customized training on USAspending.gov for your organization:\n      https://www.usaspending.gov/about?sec..\n\nWe look forward to hearing from you!"
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT4M27S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "YXupmPwvcVhmSxd5cVpD35cZZ-k",
				id: "c-bqfpWSSrI",
				snippet: {
					publishedAt: "2024-03-06T15:50:25Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TESTIMONIAL: Your Data, Your Story: Michael LeJeune on How Procurement Consultants Use USAspending",
					description: "USAspending.gov is excited to launch our first video in our customer testimonial campaign, \"Your Data, Your Story.\" Learn how Americans use USAspending to make data-driven decisions related to their personal and professional goals, and how you can get started with USAspending!\n\nMichael LeJeune, an RSM Federal Partner Federal Access Program Manager, describes \"USAspending as a one-stop shop for all of your market intelligence information.\" Listen to Michael describe how he helps business owners navigate the government market, primarily looking at who buys what they sell and building a strategy around that.\n\nCHAPTERS:\n0:43 Tell us about yourself.\n1:05 Why is federal spending data important to you?\n1:27 What features on USAspending.gov provide the most value to you?\n2:56 What have you made using data from USAspending.gov?\n3:19 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you!\n\n#YourDataYourStory #USAspending #GovernmentSpending",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/c-bqfpWSSrI/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/c-bqfpWSSrI/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/c-bqfpWSSrI/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/c-bqfpWSSrI/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/c-bqfpWSSrI/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"federal government spending",
						"financial data",
						"testimonial",
						"customer testimonial",
						"USA spending",
						"government spending data"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "Your Data, Your Story: Michael LeJeune on How Procurement Consultants Use USAspending",
						description: "USAspending.gov is excited to launch our first video in our customer testimonial campaign, \"Your Data, Your Story.\" Learn how Americans use USAspending to make data-driven decisions related to their personal and professional goals, and how you can get started with USAspending!\n\nMichael LeJeune, an RSM Federal Partner Federal Access Program Manager, describes \"USAspending as a one-stop shop for all of your market intelligence information.\" Listen to Michael describe how he helps business owners navigate the government market, primarily looking at who buys what they sell and building a strategy around that.\n\nCHAPTERS:\n0:43 Tell us about yourself.\n1:05 Why is federal spending data important to you?\n1:27 What features on USAspending.gov provide the most value to you?\n2:56 What have you made using data from USAspending.gov?\n3:19 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you!\n\n#YourDataYourStory #USAspending #GovernmentSpending"
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT4M11S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "G8I-3zmsOiDpwAbGoSqdP_dpn-A",
				id: "PKFYRaSGKOc",
				snippet: {
					publishedAt: "2024-06-26T11:50:28Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TESTIMONIAL: Your Data, Your Story: Alicia Wilson-Ahlstrom with the Children's Funding Project",
					description: "USAspending.gov is excited to continue our customer testimonial campaign, \"Your Data, Your Story.\" Learn how individuals use USAspending.gov to make data-driven decisions related to their personal and professional goals, and how you can get started today!\n\nAlicia Wilson-Ahlstrom, Director of Research Capacity of the Children's Funding Project, describes how she uses USAspending.gov to research equitable and sustainable opportunities for children and youth across the country.  \n\nCHAPTERS: \n0:45 Tell us about yourself.\n1:07 Why is federal spending data important to you?\n1:41 What features on USAspending.gov provide the most value to you?\n2:43 How do you use data from USAspending.gov?\n3:05 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you!\n\n#YourDataYourStory #USAspending #GovernmentSpending",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/PKFYRaSGKOc/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/PKFYRaSGKOc/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/PKFYRaSGKOc/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/PKFYRaSGKOc/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/PKFYRaSGKOc/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"federal government spending",
						"financial data",
						"customer testimonial",
						"nonprofit",
						"government spending",
						"government data"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					localized: {
						title: "Your Data, Your Story: Alicia Wilson-Ahlstrom with the Children's Funding Project",
						description: "USAspending.gov is excited to continue our customer testimonial campaign, \"Your Data, Your Story.\" Learn how individuals use USAspending.gov to make data-driven decisions related to their personal and professional goals, and how you can get started today!\n\nAlicia Wilson-Ahlstrom, Director of Research Capacity of the Children's Funding Project, describes how she uses USAspending.gov to research equitable and sustainable opportunities for children and youth across the country.  \n\nCHAPTERS: \n0:45 Tell us about yourself.\n1:07 Why is federal spending data important to you?\n1:41 What features on USAspending.gov provide the most value to you?\n2:43 How do you use data from USAspending.gov?\n3:05 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\n  •  Visit USAspending.gov: https://www.usaspending.gov/\n  •  Sign up for our email list to receive updates and release notes by sending an email to:\n      join-usaspending@lists.fiscal.treasury.gov\n  •  Ask questions about the tools, features, and data on USAspending.gov by sending an email to:\n      usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you!\n\n#YourDataYourStory #USAspending #GovernmentSpending"
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT4M3S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "XWVvQJo_jCuDYpwSBt-DXYKTXpw",
				id: "5N7u7VNOYmo",
				snippet: {
					publishedAt: "2025-01-13T19:18:19Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TESTIMONIAL: Your Data, Your Story: Maura Beatty",
					description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from Maura Beatty, Vice President of Deluxe Delivery Systems & Logisitics based out of New York City. Learn more about how Maura uses USAspending.gov to research and discover large contracts that are in the transportation or logistics industries for award opportunities.\n\nCHAPTERS:\n0:47 Tell us about yourself\n1:23 Why is federal spending data important to you?\n1:56 What features on USAspending.gov provide the most value to you?\n2:29 How do you use data from USAspending.gov?\n3:14 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\n- Visit USAspending.gov: https://www.usaspending.gov/\n- Sign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov\n- Ask questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you! #YourDataYourStory #USAspending #governmentspending \n\nPlease Note: Screenshots in the video may not be exactly as-is on the live site since improvements are consistently being deployed.",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/5N7u7VNOYmo/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/5N7u7VNOYmo/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/5N7u7VNOYmo/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/5N7u7VNOYmo/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/5N7u7VNOYmo/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"#governmentspending",
						"#financialdata",
						"#data",
						"#customertestimonial"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en",
					localized: {
						title: "Your Data, Your Story: Maura Beatty",
						description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from Maura Beatty, Vice President of Deluxe Delivery Systems & Logisitics based out of New York City. Learn more about how Maura uses USAspending.gov to research and discover large contracts that are in the transportation or logistics industries for award opportunities.\n\nCHAPTERS:\n0:47 Tell us about yourself\n1:23 Why is federal spending data important to you?\n1:56 What features on USAspending.gov provide the most value to you?\n2:29 How do you use data from USAspending.gov?\n3:14 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\n- Visit USAspending.gov: https://www.usaspending.gov/\n- Sign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov\n- Ask questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you! #YourDataYourStory #USAspending #governmentspending \n\nPlease Note: Screenshots in the video may not be exactly as-is on the live site since improvements are consistently being deployed."
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT3M32S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular"
				}
			},
			{
				kind: "youtube#video",
				etag: "5F3t5EN3tLUcLUF2KDQThhwkM5M",
				id: "zqGDGY2Qzko",
				snippet: {
					publishedAt: "2025-05-08T19:52:13Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TESTIMONIAL: Your Data, Your Story: John Ullrich",
					description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from John Ullrich, a lecturer in the Systems and Engineering Department at the University of Arizona. Learn more about how John uses USAspending.gov to explore government spending dependencies.\n\nCHAPTERS:\n0:41 Tell us about yourself\n1:17 Why is federal spending data important to you?\n1:43 What features on USAspending.gov provide the most value to you?\n2:25 How do you use data from USAspending.gov?\n2:50 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\nVisit USAspending.gov: https://www.usaspending.gov/\nSign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov\nAsk questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you! #YourDataYourStory #USAspending #governmentspending \n\nPlease Note: Screenshots in the video may not be exactly as-is on the live site since improvements are consistently being deployed.",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/zqGDGY2Qzko/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/zqGDGY2Qzko/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/zqGDGY2Qzko/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/zqGDGY2Qzko/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/zqGDGY2Qzko/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"#governmentspending",
						"#financialdata",
						"#data",
						"#customertestimonial"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en",
					localized: {
						title: "TESTIMONIAL: Your Data, Your Story: John Ullrich",
						description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from John Ullrich, a lecturer in the Systems and Engineering Department at the University of Arizona. Learn more about how John uses USAspending.gov to explore government spending dependencies.\n\nCHAPTERS:\n0:41 Tell us about yourself\n1:17 Why is federal spending data important to you?\n1:43 What features on USAspending.gov provide the most value to you?\n2:25 How do you use data from USAspending.gov?\n2:50 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\nVisit USAspending.gov: https://www.usaspending.gov/\nSign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov\nAsk questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you! #YourDataYourStory #USAspending #governmentspending \n\nPlease Note: Screenshots in the video may not be exactly as-is on the live site since improvements are consistently being deployed."
					},
					defaultAudioLanguage: "en-US"
				},
				contentDetails: {
					duration: "PT3M20S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "hSwu7H0mEGEeBgTNgj09VPSawYw",
				id: "3oJCWiGfl04",
				snippet: {
					publishedAt: "2025-07-31T16:00:05Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TESTIMONIAL: Your Data, Your Story: Keon Muldrow",
					description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from Keon Muldrow, Subcenter Director at Johnson County Community College. Learn more about how Keon helps his clients use USAspending.gov to find government contracts and funding opportunities.\n\nCHAPTERS:\n0:34 Tell us about yourself\n0:52 Why is federal spending data important to you?\n1:04 What features on USAspending.gov provide the most value to you?\n2:25 What have you made using data from USAspending.gov?\n3:06 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\nVisit USAspending.gov: https://www.usaspending.gov/\nSign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov\nAsk questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you! #YourDataYourStory #USAspending #governmentspending \n\nPlease Note: Screenshots in the video may not be exactly as-is on the live site since improvements are consistently being deployed.",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/3oJCWiGfl04/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/3oJCWiGfl04/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/3oJCWiGfl04/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/3oJCWiGfl04/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/3oJCWiGfl04/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					tags: [
						"financial data",
						"government spending",
						"data",
						"customer testimonial",
						"government transparency",
						"open data"
					],
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en",
					localized: {
						title: "Your Data, Your Story: Keon Muldrow",
						description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from Keon Muldrow, Subcenter Director at Johnson County Community College. Learn more about how Keon helps his clients use USAspending.gov to find government contracts and funding opportunities.\n\nCHAPTERS:\n0:34 Tell us about yourself\n0:52 Why is federal spending data important to you?\n1:04 What features on USAspending.gov provide the most value to you?\n2:25 What have you made using data from USAspending.gov?\n3:06 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\nVisit USAspending.gov: https://www.usaspending.gov/\nSign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov\nAsk questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov\n\nWe look forward to hearing from you! #YourDataYourStory #USAspending #governmentspending \n\nPlease Note: Screenshots in the video may not be exactly as-is on the live site since improvements are consistently being deployed."
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT3M48S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular"
				}
			},
			{
				kind: "youtube#video",
				etag: "NJMiQ7881bHHQmE11cqWRQZzA2M",
				id: "pRGY0VfQ4II",
				snippet: {
					publishedAt: "2025-09-30T12:01:36Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "Exploring America's Finances with USAspending.gov and FiscalData.Treasury.gov",
					description: "Have you ever wondered where your tax dollars actually go? The good news is, it's not a secret. This short video details how you can explore America's finances using the data on USAspending.gov and FiscalData.Treasury.gov.",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/pRGY0VfQ4II/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/pRGY0VfQ4II/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/pRGY0VfQ4II/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/pRGY0VfQ4II/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/pRGY0VfQ4II/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en",
					localized: {
						title: "Exploring America's Finances with USAspending.gov and FiscalData.Treasury.gov",
						description: "Have you ever wondered where your tax dollars actually go? The good news is, it's not a secret. This short video details how you can explore America's finances using the data on USAspending.gov and FiscalData.Treasury.gov."
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT1M23S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: false
				}
			},
			{
				kind: "youtube#video",
				etag: "PFDeqCG3RcJvMEm6Uaah1Rv3if8",
				id: "3-oakEz2juE",
				snippet: {
					publishedAt: "2025-12-03T12:32:53Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TESTIMONIAL: Your Data, Your Story: David Gill",
					description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from David Gill, Acting Manager, Analytics and Technology Solutions Branch at Department of the Treasury, Internal Revenue Service. Learn more about how David used USAspending.gov to help a small business obtain a key contract.",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/3-oakEz2juE/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/3-oakEz2juE/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/3-oakEz2juE/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/3-oakEz2juE/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/3-oakEz2juE/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en",
					localized: {
						title: "TESTIMONIAL: Your Data, Your Story: David Gill",
						description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from David Gill, Acting Manager, Analytics and Technology Solutions Branch at Department of the Treasury, Internal Revenue Service. Learn more about how David used USAspending.gov to help a small business obtain a key contract."
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT3M39S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			},
			{
				kind: "youtube#video",
				etag: "2C7GftuAA7wjFAbfFmTxzdRYW80",
				id: "J1-xg6CXDUE",
				snippet: {
					publishedAt: "2026-03-06T21:32:35Z",
					channelId: "UCyDn83O-0XC98H3TCV-VCGQ",
					title: "TESTIMONIAL: Your Data, Your Story: Jean-Claude Ndongo, Ph.D.",
					description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from Jean-Claude Ndongo, Ph.D., an instructor at Florida Atlantic University. Learn more about how Dr. Ndongo and his students use USAspending.gov for their research on public budgeting and finance.\n\nCHAPTERS:\n0:26 Tell us about yourself\n0:52 Why is federal spending data important to you?\n1:32 What features on USAspending.gov provide the most value to you?\n2:06 What have you made using data from USAspending.gov?\n3:00 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\n-Visit USAspending.gov: https://www.usaspending.gov/.\n-Sign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov.\n-Ask questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov.\n\nWe look forward to hearing from you! #YourDataYourStory #USAspending #governmentspending \n\nPlease Note: Screenshots in the video may not be exactly as-is on the live site since improvements are consistently being deployed.",
					thumbnails: {
						default: {
							url: "https://i.ytimg.com/vi/J1-xg6CXDUE/default.jpg",
							width: 120,
							height: 90
						},
						medium: {
							url: "https://i.ytimg.com/vi/J1-xg6CXDUE/mqdefault.jpg",
							width: 320,
							height: 180
						},
						high: {
							url: "https://i.ytimg.com/vi/J1-xg6CXDUE/hqdefault.jpg",
							width: 480,
							height: 360
						},
						standard: {
							url: "https://i.ytimg.com/vi/J1-xg6CXDUE/sddefault.jpg",
							width: 640,
							height: 480
						},
						maxres: {
							url: "https://i.ytimg.com/vi/J1-xg6CXDUE/maxresdefault.jpg",
							width: 1280,
							height: 720
						}
					},
					channelTitle: "USAspending",
					categoryId: "27",
					liveBroadcastContent: "none",
					defaultLanguage: "en",
					localized: {
						title: "TESTIMONIAL: Your Data, Your Story: Jean-Claude Ndongo, Ph.D.",
						description: "Everyone has a data story. What's yours? The \"Your Data, Your Story\" campaign continues with a testimonial from Jean-Claude Ndongo, Ph.D., an instructor at Florida Atlantic University. Learn more about how Dr. Ndongo and his students use USAspending.gov for their research on public budgeting and finance.\n\nCHAPTERS:\n0:26 Tell us about yourself\n0:52 Why is federal spending data important to you?\n1:32 What features on USAspending.gov provide the most value to you?\n2:06 What have you made using data from USAspending.gov?\n3:00 What is the best advice that you have for using USAspending.gov?\n\nLINKS:\n-Visit USAspending.gov: https://www.usaspending.gov/.\n-Sign up for our email list to receive updates and release notes by sending an email to: join-usaspending@lists.fiscal.treasury.gov.\n-Ask questions about the tools, features, and data on USAspending.gov by sending an email to: usaspending.help@fiscal.treasury.gov.\n\nWe look forward to hearing from you! #YourDataYourStory #USAspending #governmentspending \n\nPlease Note: Screenshots in the video may not be exactly as-is on the live site since improvements are consistently being deployed."
					},
					defaultAudioLanguage: "en"
				},
				contentDetails: {
					duration: "PT3M32S",
					dimension: "2d",
					definition: "hd",
					caption: "true",
					licensedContent: false,
					contentRating: {},
					projection: "rectangular",
					hasCustomThumbnail: true
				}
			}
		]
	};
}));
//#endregion
//#region src/js/components/trainingVideos/videoThumbnails/PlayButton.jsx
var import_jsx_runtime$7, PlayButton;
var init_PlayButton = __esmMin((() => {
	init_dist();
	import_jsx_runtime$7 = require_jsx_runtime();
	PlayButton = () => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
		className: "overlay-play-button",
		children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "play-button-bg",
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, {
				icon: "play",
				className: "play-button__icon"
			})
		})
	});
}));
//#endregion
//#region src/js/components/trainingVideos/videoThumbnails/Duration.jsx
var import_jsx_runtime$6, propTypes$5, Duration;
var init_Duration = __esmMin((() => {
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$5 = {
		duration: PropTypes.string,
		isFeaturedVideo: PropTypes.bool
	};
	Duration = ({ duration, isFeaturedVideo }) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
		className: `overlay-duration ${isFeaturedVideo ? "featured-video" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("span", {
			className: "duration-text",
			children: duration
		})
	});
	Duration.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/trainingVideos/videoThumbnails/VideoThumbnail.jsx
var import_jsx_runtime$5, propTypes$4, VideoThumbnail;
var init_VideoThumbnail = __esmMin((() => {
	init_index_es();
	init_PlayButton();
	init_Duration();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$4 = {
		showPlay: PropTypes.bool,
		showDuration: PropTypes.bool,
		thumbnailUrl: PropTypes.string,
		title: PropTypes.string,
		duration: PropTypes.string,
		isFeaturedVideo: PropTypes.bool
	};
	VideoThumbnail = ({ showPlay, showDuration, thumbnailUrl, title, duration, isFeaturedVideo }) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Qs, { children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)($s, {
		width: 12,
		className: "video-thumbnail__column-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("img", {
				src: thumbnailUrl,
				title,
				alt: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Qs, {
				className: "video-thumbnail__play-overlay",
				children: showPlay && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(PlayButton, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Qs, {
				className: "video-thumbnail__duration-overlay",
				children: showDuration && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Duration, {
					duration,
					isFeaturedVideo
				})
			})
		]
	}) });
	VideoThumbnail.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/trainingVideos/featuredVideo/FeaturedVideo.jsx
/**
* FeaturedVideo.jsx
* Created by Brian Petway 12/05/22
*/
var import_jsx_runtime$4, propTypes$3, FeaturedVideo;
var init_FeaturedVideo = __esmMin((() => {
	init_es();
	init_modalActions();
	init_index_es();
	init_mobileBreakpoints();
	init_socialShare();
	init_VideoThumbnail();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$3 = {
		featuredVideo: PropTypes.object,
		url: oneOfType([PropTypes.string, PropTypes.func])
	};
	FeaturedVideo = ({ featuredVideo }) => {
		const slug = "https://www.youtube.com/watch?v=b7SDGhSZ5wM";
		const [windowWidth, setWindowWidth] = useState(0);
		const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const onShareClick = (name) => {
			const emailArgs = {
				subject: `${`${featuredVideo.title}`}`,
				body: `Watch this video about USAspending.gov: ${slug}`
			};
			handleShareOptionClick(name, slug, emailArgs, handleShareDispatch);
		};
		useEffect(() => {
			const handleResize = throttle(() => {
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth) {
					setWindowWidth(newWidth);
					setIsMobile(newWidth < 992);
				}
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, [windowWidth]);
		const launchModal = (e) => {
			e.persist();
			dispatch(showTrainingVideoModal({
				url: featuredVideo.thumbnails.maxres.url,
				modalType: "training-videos",
				title: featuredVideo.title,
				description: featuredVideo.description,
				publishedAt: featuredVideo.publishedAt,
				duration: featuredVideo.duration,
				id: featuredVideo.id
			}));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("section", {
			className: "featured-video__section",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "grid-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(Qs, { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)($s, {
					width: 5,
					desktop: 5,
					tablet: 12,
					mobile: 12,
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
						className: "featured-video__text",
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "featured-video__heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								tabIndex: "0",
								className: "featured-video__headline",
								onKeyUp: (e) => {
									if (e.key === "Enter") launchModal(e);
								},
								onClick: launchModal,
								children: [
									"Learn how USAspending.gov",
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("br", {}),
									"got started"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
								className: "featured-video__inline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
									className: "featured-video__publishedAt",
									children: featuredVideo.publishedAt
								}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
									className: "training-video-feature__column-share-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Js, {
										url: "https://www.youtube.com/watch?v=b7SDGhSZ5wM",
										tabIndex: 0,
										onShareOptionClick: onShareClick,
										colors: {
											backgroundColor: "#1b2b85",
											color: "#DFE1E2"
										},
										dropdownDirection: isMobile ? "left" : "right",
										classNames: "no-margin-left",
										noShareText: true
									})
								})]
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)($s, {
					width: 7,
					desktop: 7,
					tablet: 12,
					mobile: 12,
					onKeyDown: launchModal,
					onClick: launchModal,
					children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(VideoThumbnail, {
						tabIndex: "0",
						thumbnailUrl: featuredVideo.thumbnails.maxres.url,
						duration: featuredVideo.duration,
						url: VideoThumbnail.url,
						showPlay: true,
						showDuration: true,
						isFeaturedVideo: true,
						title: featuredVideo.title,
						alt: featuredVideo.title
					})
				})] })
			})
		});
	};
	FeaturedVideo.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/trainingVideos/videoCard/VideoCard.jsx
/**
* VideoCard.jsx
* Created by Andrea Blackwell 12/20/22
*/
var import_jsx_runtime$3, propTypes$2, VideoCard;
var init_VideoCard = __esmMin((() => {
	init_index_es();
	init_es();
	init_socialShare();
	init_mobileBreakpoints();
	init_VideoThumbnail();
	init_modalActions();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$2 = {
		thumbnailUrl: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		duration: PropTypes.string,
		publishedAt: PropTypes.string,
		onClick: PropTypes.func,
		onKeyUp: PropTypes.func,
		url: oneOfType([PropTypes.string, PropTypes.func])
	};
	VideoCard = ({ thumbnailUrl, title, duration, onClick, description, onKeyUp, publishedAt, url }) => {
		const [windowWidth, setWindowWidth] = useState(0);
		const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
		const dispatch = useDispatch();
		const handleShareDispatch = (e) => {
			dispatch(showModal(e));
		};
		const onShareClick = (name) => {
			handleShareOptionClick(name, url, {
				subject: `${`${title}`}`,
				body: `Watch this video about USAspending.gov: ${url}`
			}, handleShareDispatch);
		};
		useEffect(() => {
			const handleResize = throttle(() => {
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth) {
					setWindowWidth(newWidth);
					setIsMobile(newWidth < 992);
				}
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, []);
		let changedTitle;
		let overline;
		const titleIndex = title.indexOf(":");
		if (titleIndex > 0 && titleIndex + 2 < title.length) {
			changedTitle = title.substring(titleIndex + 2);
			overline = title.substring(0, titleIndex);
		} else {
			changedTitle = title;
			overline = "RESOURCE";
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(tc, {
			variant: "outline",
			size: "md",
			tabIndex: "0",
			onKeyUp,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ac, {
				onClick,
				variant: "expanded",
				thumbnail: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(VideoThumbnail, {
					thumbnailUrl,
					duration,
					showPlay: true,
					showDuration: true,
					title: changedTitle
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(rc, {
				overline,
				headline: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
					className: "video-card__headline",
					onClick,
					children: changedTitle
				}) }),
				text: description,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "list-of-videos__inline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "video-card__metadiv",
						children: publishedAt
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "list-of-videos__column-share-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Js, {
							url,
							tabIndex: 0,
							onKeyUp,
							onShareOptionClick: onShareClick,
							colors: {
								backgroundColor: "white",
								color: "#2378c3"
							},
							dropdownDirection: isMobile ? "left" : "right",
							classNames: "no-margin-left",
							noShareText: true
						})
					})]
				})
			})]
		});
	};
	VideoCard.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/trainingVideos/listOfVideos/ListOfVideos.jsx
/**
* ListOfVideos.jsx
* Created by Brian Petway 12/05/22
*/
var import_jsx_runtime$2, propTypes$1, ListOfVideos;
var init_ListOfVideos = __esmMin((() => {
	init_es();
	init_modalActions();
	init_index_es();
	init_VideoCard();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$1 = { videos: PropTypes.array };
	ListOfVideos = ({ videos }) => {
		const dispatch = useDispatch();
		const [sortOrder, setSortOrder] = useState();
		const [videoList, setVideoList] = useState(videos);
		const originalVideoList = videos;
		const prevSortRef = useRef();
		useEffect(() => {
			setSortOrder("Newest");
		}, []);
		useEffect(() => {
			const tmpVideos = [...originalVideoList];
			if (prevSortRef.current === sortOrder) return;
			prevSortRef.current = sortOrder;
			if (sortOrder === "Newest") tmpVideos.sort((a, b) => new Date(b._publishedAt) - new Date(a._publishedAt));
			if (sortOrder === "Oldest") tmpVideos.sort((a, b) => new Date(a._publishedAt) - new Date(b._publishedAt));
			if (sortOrder === "Longest") tmpVideos.sort((a, b) => new Date(b.durationInSecs) - new Date(a.durationInSecs));
			if (sortOrder === "Shortest") tmpVideos.sort((a, b) => new Date(a.durationInSecs) - new Date(b.durationInSecs));
			setVideoList(tmpVideos);
		}, [originalVideoList, sortOrder]);
		const sortBy = () => {
			[...originalVideoList].sort((a, b) => b.value > a.value);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("section", {
			className: "list-of-videos__section",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "grid-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Qs, {
					className: "list-of-videos__sort",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)($s, {
						width: 12,
						className: "video-sort",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: "video-sort-label",
							children: "Sort By: "
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Xa, {
							className: "video-sort-list",
							sortFn: sortBy,
							options: [
								{
									name: "Newest",
									value: "0",
									onClick: () => {
										setSortOrder("Newest");
									}
								},
								{
									name: "Oldest",
									value: 1,
									onClick: () => {
										setSortOrder("Oldest");
									}
								},
								{
									name: "Shortest",
									value: 2,
									onClick: () => {
										setSortOrder("Shortest");
									}
								},
								{
									name: "Longest",
									value: 3,
									onClick: () => {
										setSortOrder("Longest");
									}
								}
							],
							dropdownDirection: "right",
							backgroundColor: "#ffffff",
							selectedOption: sortOrder
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Qs, {
					hasGutter: true,
					gutterSize: "lg",
					children: videoList.map((video) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)($s, {
						desktopxl: 4,
						desktop: 6,
						tablet: 12,
						mobile: 12,
						className: "list-of-videos__video",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(VideoCard, {
							onKeyUp: (e) => {
								e.persist();
								if (e.key === "Enter" && e.target.className !== "usa-dt-picker__button" && !e.target.className.includes("text")) dispatch(showTrainingVideoModal({
									url: video.thumbnails.maxres.url,
									modalType: "training-videos",
									title: video.title,
									description: video.description,
									publishedAt: video.publishedAt,
									duration: video.duration,
									id: video.id
								}));
							},
							tabIndex: "0",
							thumbnailUrl: video.thumbnails.maxres.url,
							id: video.id,
							title: video.title,
							duration: video.duration,
							publishedAt: video.publishedAt,
							url: video.url,
							description: video.description,
							onClick: (e) => {
								e.persist();
								dispatch(showTrainingVideoModal({
									url: video.thumbnails.maxres.url,
									modalType: "training-videos",
									title: video.title,
									description: video.description,
									publishedAt: video.publishedAt,
									duration: video.duration,
									id: video.id
								}));
							}
						}, video.id)
					}, video.id))
				})]
			})
		});
	};
	ListOfVideos.propTypes = propTypes$1;
}));
//#endregion
//#region src/_scss/pages/trainingVideos/trainingVideos.scss
var require_trainingVideos = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/trainingVideos/TrainingVideosPage.jsx
var import_jsx_runtime$1, propTypes, body, getEmailSocialShareData, TrainingVideosPage;
var init_TrainingVideosPage = __esmMin((() => {
	init_PageWrapper();
	init_metaTagHelper();
	init_BannerPageHeader();
	init_es();
	init_modalActions();
	init_socialShare();
	init_ShareDownloadButtonGroup();
	init_FeaturedVideo();
	init_ListOfVideos();
	init_index_es();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes = {
		featuredVideo: PropTypes.object,
		videos: PropTypes.array
	};
	body = "Learn how to use USAspending.gov and understand the data. Subscribe to our YouTube for the latest videos!";
	require_trainingVideos();
	getEmailSocialShareData = {
		subject: "USAspending.gov Training Videos",
		body: "View the training videos on USAspending.gov: https://www.usaspending.gov/training-videos"
	};
	TrainingVideosPage = ({ featuredVideo, videos }) => {
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, "training-videos", getEmailSocialShareData, handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PageWrapper, {
			pageName: "TrainingVideos",
			classNames: "training-videos-page",
			noHeader: true,
			metaTagProps: { ...homePageMetaTags },
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("main", {
				id: "main-content",
				className: "main-content training-videos-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BannerPageHeader, {
						kicker: "RESOURCES",
						title: "Training Videos",
						body,
						faIcon: "graduation-cap",
						primaryColor: "#00687D",
						secondaryColor: "#0081A1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Qs, {
						className: "training-videos__main-share-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)($s, {
							className: "training-videos__main-share-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ShareDownloadButtonGroup, {
								url: getBaseUrl("training-videos"),
								hideDownload: true,
								onShareClick: handleShare
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FeaturedVideo, { featuredVideo }),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ListOfVideos, { videos })
				]
			})
		});
	};
	TrainingVideosPage.propTypes = propTypes;
}));
//#endregion
//#region src/js/containers/trainingVideos/TrainingVideosContainer.jsx
var import_jsx_runtime, TrainingVideosContainer;
//#endregion
__esmMin((() => {
	init_VideoMetadata();
	init_playListMetadata();
	init_TrainingVideosPage();
	import_jsx_runtime = require_jsx_runtime();
	TrainingVideosContainer = () => {
		const videos = [];
		let featuredVideo = {};
		const featuredVideoId = "b7SDGhSZ5wM";
		metaData.items.forEach((item) => {
			if (item.id === featuredVideoId) {
				featuredVideo = Object.create(VideoMetadata);
				featuredVideo.populate(item);
			} else {
				const videoMetadata = Object.create(VideoMetadata);
				videoMetadata.populate(item);
				videos.push(videoMetadata);
			}
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingVideosPage, {
			featuredVideo,
			videos
		});
	};
}))();
export { TrainingVideosContainer as default };
