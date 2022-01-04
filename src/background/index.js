/**
 *
 */
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(function (
  info = {}
) {
  const { request, rule } = info

  console.log('Info>>>>', info)
})
