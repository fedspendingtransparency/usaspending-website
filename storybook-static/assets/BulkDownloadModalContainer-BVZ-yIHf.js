import { n as __esmMin, o as __toESM } from "./rolldown-runtime-D1cXj70v.js";
import { G as init_bulkDownloadActions, H as require_lib, Ja as connect_default, On as init_Icons, Ua as init_es, W as bulkDownloadActions_exports, Xa as bindActionCreators, Yt as require_react_aria_modal, Za as init_redux, hn as Close, pn as CheckCircle, ro as require_jsx_runtime } from "./index.js-CgeUxZJy.js";
import React from "react";
import PropTypes from "prop-types";
//#region src/js/components/bulkDownload/modal/ModalContent.jsx
/**
* ModalContent.jsx
* Created by Lizzie Salita 11/3/17
*/
var import_lib, import_jsx_runtime$2, propTypes$2, ModalContent;
var init_ModalContent = __esmMin((() => {
	import_lib = require_lib();
	init_Icons();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$2 = {
		hideModal: PropTypes.func,
		setDownloadCollapsed: PropTypes.func,
		expectedFile: PropTypes.string
	};
	ModalContent = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { copied: false };
			this.onCopy = this.onCopy.bind(this);
		}
		componentDidMount() {
			this.props.setDownloadCollapsed(true);
		}
		onCopy() {
			this.setState({ copied: true });
		}
		render() {
			const icon = /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "icon valid",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CheckCircle, {})
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "download-status-screen",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
					className: "main-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h3", { children: "We’re preparing your download." }),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: "details",
							children: "This may take a little while — wait times vary based on site traffic and file size."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
							className: "link-box",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", { children: "Action Required: Once your download is ready, the link below is required to access your file. Be sure to copy your link; this download link is temporary and will expire." }),
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
									className: "link",
									children: this.props.expectedFile
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_lib.CopyToClipboard, {
									text: this.props.expectedFile,
									onCopy: this.onCopy,
									children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("button", { children: [this.state.copied ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: icon }) : null, this.state.copied ? "Copied" : "Copy Link"] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: "sub-details",
							children: "To keep browsing, copy the download link and close this window; your download status will appear at the bottom of the screen."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							className: "finish-button",
							onClick: this.props.hideModal,
							children: "Close"
						})
					]
				})
			});
		}
	};
	ModalContent.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/bulkDownload/modal/BulkDownloadModal.jsx
/**
* BulkDownloadModal.jsx
* Created by Lizzie Salita 11/3/17
*/
var import_react_aria_modal, import_jsx_runtime$1, propTypes$1, BulkDownloadModal;
var init_BulkDownloadModal = __esmMin((() => {
	import_react_aria_modal = /* @__PURE__ */ __toESM(require_react_aria_modal(), 1);
	init_Icons();
	init_ModalContent();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		mounted: PropTypes.bool,
		hideModal: PropTypes.func,
		setDownloadCollapsed: PropTypes.func,
		pendingDownload: PropTypes.bool,
		expectedFile: PropTypes.string
	};
	BulkDownloadModal = class extends React.Component {
		constructor(props) {
			super(props);
			this.hideModal = this.hideModal.bind(this);
		}
		hideModal() {
			if (this.props.pendingDownload) {
				this.props.setDownloadCollapsed(true);
				this.props.hideModal();
				return;
			}
			this.props.hideModal();
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_react_aria_modal.default, {
				mounted: this.props.mounted,
				onExit: this.props.hideModal,
				titleText: "Download Center",
				dialogClass: "bulk-download-modal",
				verticallyCenter: true,
				escapeExits: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "bulk-download-modal",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "download-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "header-content",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h1", { children: "Download Data" }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
								className: "close-wrapper",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("button", {
									className: "close-button",
									onClick: this.props.hideModal,
									title: "Close",
									"aria-label": "Close",
									children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Close, { alt: "Close modal" })
								})
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "download-body",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ModalContent, {
							hideModal: this.props.hideModal,
							setDownloadCollapsed: this.props.setDownloadCollapsed,
							expectedFile: this.props.expectedFile
						})
					})]
				})
			});
		}
	};
	BulkDownloadModal.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/containers/bulkDownload/modal/BulkDownloadModalContainer.jsx
/**
* BulkDownloadModalContainer.jsx
* Created by Lizzie Salita 11/3/17
*/
var import_jsx_runtime, propTypes, BulkDownloadModalContainer, BulkDownloadModalContainer_default;
var init_BulkDownloadModalContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_bulkDownloadActions();
	init_BulkDownloadModal();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		mounted: PropTypes.bool,
		hideModal: PropTypes.func,
		setDownloadCollapsed: PropTypes.func,
		bulkDownload: PropTypes.object
	};
	BulkDownloadModalContainer = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkDownloadModal, {
				setDownloadCollapsed: this.props.setDownloadCollapsed,
				pendingDownload: this.props.bulkDownload.download.pendingDownload,
				expectedFile: this.props.bulkDownload.download.expectedUrl,
				mounted: this.props.mounted,
				hideModal: this.props.hideModal
			});
		}
	};
	BulkDownloadModalContainer.propTypes = propTypes;
	BulkDownloadModalContainer_default = connect_default((state) => ({ bulkDownload: state.bulkDownload }), (dispatch) => bindActionCreators(bulkDownloadActions_exports, dispatch))(BulkDownloadModalContainer);
}));
//#endregion
export { init_BulkDownloadModalContainer as n, BulkDownloadModalContainer_default as t };
