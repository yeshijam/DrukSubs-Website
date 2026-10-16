# DrukSubs website

A responsive starter website for DrukSubs, built with HTML5, CSS3, and vanilla JavaScript.

## Run locally
1. Extract the `druksubs` folder.
2. Open `index.html` in a modern browser.
3. No build step or package installation is required.

## Before publishing
- Replace `assets/logo.png` with an updated official logo file if needed (keep the filename or update the paths in `index.html`).
- Open `js/script.js` and replace `REPLACE_WITH_WHATSAPP_NUMBER` with your business WhatsApp number in international format, digits only. For Bhutan, start with `975`.
- Replace `hello@druksubs.example` in `index.html` and `js/script.js` with a real business email address.
- Update service descriptions, available plans, durations, and prices in `index.html`. Current pricing is intentionally shown as “To be confirmed”.
- Review and publish real Terms & Conditions, Privacy Policy, and Refund Policy content. The current footer links are placeholders.
- Confirm that your intended subscription sales and fulfillment method comply with each provider's current terms and applicable law.

## How to edit products
The three product cards are in `index.html` inside `#productGrid`. Each card includes a `data-category` (`entertainment` or `ai`), product name, description, plan placeholder, price placeholder, and request button. To add a service, duplicate a `.product-card` block and update its text, category, and `data-product` button value.

## Order workflow
- The order dialog gathers the product, optional plan, name, contact, and notes.
- The website creates a pre-filled WhatsApp message and opens WhatsApp after the customer submits.
- The customer must press Send in WhatsApp. The website does not itself transmit or store the order.
- The contact form uses the same WhatsApp flow once the business number is configured.
- If the number is not configured, the page shows a clear message rather than pretending the order was sent.

## Important limitations
- No customer accounts, payment gateway, order database, or backend are included.
- A real online contact form that delivers submissions without WhatsApp requires a backend or a form service.
- The site does not collect passwords, one-time codes, or payment details.
- Product availability, price, and plan details must be confirmed manually with the customer.

## Assets
- `assets/logo.png`: the logo file supplied for DrukSubs.
