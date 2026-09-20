import { SITE_URL, TOOLS, toolUrl } from "./toolsConfig";

const PDF_PATTERN = ["*://*/*.pdf", "*://*/*.pdf?*"];

function openTool(route: string, sourceUrl?: string) {
  const tool = TOOLS.find((candidate) => candidate.route === route);
  void chrome.tabs.create({ url: tool ? toolUrl(tool, sourceUrl) : new URL(route, SITE_URL).toString() });
}

function createContextMenus() {
  void chrome.contextMenus.removeAll().then(() => {
    chrome.contextMenus.create({ id: "open-pdf-tool", title: "Open with PDF Tool", contexts: ["link", "page"], targetUrlPatterns: PDF_PATTERN });
    chrome.contextMenus.create({ id: "summarize-pdf", title: "Summarize PDF with AI", contexts: ["link", "page"], targetUrlPatterns: PDF_PATTERN });
    chrome.contextMenus.create({ id: "ask-pdf", title: "Ask PDF with AI", contexts: ["link", "page"], targetUrlPatterns: PDF_PATTERN });
    chrome.contextMenus.create({ id: "compress-pdf", title: "Compress PDF", contexts: ["link", "page"], targetUrlPatterns: PDF_PATTERN });
  });
}

chrome.runtime.onInstalled.addListener(createContextMenus);
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const sourceUrl = info.linkUrl ?? info.pageUrl ?? tab?.url;
  if (!sourceUrl) return;
  const route = info.menuItemId === "summarize-pdf"
    ? "/ai-summarizer"
    : info.menuItemId === "ask-pdf"
      ? "/ai-ask-pdf"
      : info.menuItemId === "compress-pdf"
        ? "/compress-pdf"
        : "/tools";
  openTool(route, sourceUrl);
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "open-pdf-tool") void chrome.action.openPopup();
});
