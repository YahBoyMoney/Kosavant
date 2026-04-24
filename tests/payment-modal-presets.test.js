const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const privacyPolicyPath = path.join(__dirname, '..', 'privacy-policy.html');

test('payment modal offers the recommended preset service buttons', () => {
  assert.match(indexHtml, /data-payment-preset="15-min-consult"/);
  assert.match(indexHtml, /15 Min Consult/);
  assert.match(indexHtml, /data-payment-preset="30-min-consult"/);
  assert.match(indexHtml, /30 Min Consult/);
  assert.match(indexHtml, /data-payment-preset="brand-audit"/);
  assert.match(indexHtml, /Brand Audit/);
  assert.match(indexHtml, /data-payment-preset="custom-payment"/);
  assert.match(indexHtml, /Custom Payment/);
});

test('homepage pay entry uses plain secure checkout language', () => {
  assert.match(indexHtml, /id="payBtn"/);
  assert.match(indexHtml, />\s*Secure Checkout\s*</i);
  assert.match(indexHtml, /Stripe, PayPal, and Bitcoin/i);
});

test('payment modal guides visitors through a simple two-step flow', () => {
  assert.match(indexHtml, />\s*Step 1\s*</i);
  assert.match(indexHtml, /Choose your service/i);
  assert.match(indexHtml, />\s*Step 2\s*</i);
  assert.match(indexHtml, /Pick how you want to pay/i);
});

test('payment modal simplifies Stripe into one primary checkout action plus PayPal and Bitcoin', () => {
  assert.match(indexHtml, /id="secureCheckoutBtn"/);
  assert.match(indexHtml, /Secure Stripe Checkout/i);
  assert.match(indexHtml, /id="paypalButtonWrap"/);
  assert.match(indexHtml, /PayPal/i);
  assert.match(indexHtml, /id="bitcoinBtn"/);
  assert.match(indexHtml, />\s*Bitcoin\s*</i);
  assert.doesNotMatch(indexHtml, /id="applePayBtn"/);
  assert.doesNotMatch(indexHtml, /id="gpayBtn"/);
});

test('payment modal plainly explains the Stripe and PayPal roles', () => {
  assert.match(indexHtml, /Stripe checkout is ready for the \$50 15 Min Consult/i);
  assert.match(indexHtml, /PayPal charges the exact selected amount/i);
  assert.match(indexHtml, /Apple Pay, Google Pay, Cash App, bank transfer, and cards/i);
});

test('payment summary keeps the selected service and best payment match visible', () => {
  assert.match(indexHtml, /id="payServiceLabel"/);
  assert.match(indexHtml, /id="payServiceAmount"/);
  assert.match(indexHtml, /Best payment match/i);
});

test('site ships a real privacy policy page for checkout and feedback trust', () => {
  assert.match(indexHtml, /href="https:\/\/kosavant\.com\/privacy-policy\.html"/);
  assert.equal(fs.existsSync(privacyPolicyPath), true);
});
