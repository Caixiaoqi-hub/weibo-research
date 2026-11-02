const params = new URLSearchParams(window.location.search);
const code = params.get("code") || "";
const error = params.get("error") || "";
const title = document.querySelector("#callback-title");
const message = document.querySelector("#callback-message");
const icon = document.querySelector("#callback-icon");
const result = document.querySelector("#callback-result");
const codeElement = document.querySelector("#callback-code");
const copyButton = document.querySelector("#copy-button");
const status = document.querySelector("#callback-status");

if (code) {
  title.textContent = "授权已完成";
  message.textContent = "微博开放平台已返回授权码。请返回项目设备完成下一步，不要将此页面转发给他人。";
  icon.textContent = "✓";
  result.hidden = false;
  codeElement.textContent = code;
  copyButton.hidden = false;
} else if (error) {
  title.textContent = "授权未完成";
  message.textContent = "微博开放平台返回了错误。请关闭此页面并重新发起授权。";
  icon.textContent = "!";
  status.textContent = `错误代码：${error}`;
} else {
  title.textContent = "未找到授权结果";
  message.textContent = "当前地址中没有授权码。请从微博开放平台重新进入授权流程。";
  icon.textContent = "!";
}

copyButton.addEventListener("click", async () => {
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    status.textContent = "授权码已复制到剪贴板，请勿转发。";
  } catch {
    status.textContent = "浏览器未能自动复制，请手动选择授权码。";
  }
});
