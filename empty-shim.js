// Empty shim replacing Next.js's internal polyfill-module.js.
// Modern browsers natively support Baseline ES features:
// - Array.prototype.at
// - Array.prototype.flat
// - Array.prototype.flatMap
// - Object.fromEntries
// - Object.hasOwn
// - String.prototype.trimStart / trimEnd
// - Promise.prototype.finally
// - URL.canParse
// This prevents Lighthouse / Google PageSpeed Insights from flagging legacy polyfill bytes.
export {};
