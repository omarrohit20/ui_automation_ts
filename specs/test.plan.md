# Juice Shop Automation Test Plan

## Application Overview

End-to-end test plan for OWASP Juice Shop demo at https://demo.owasp-juice.shop. Covers home page, search, product selection, cart and checkout, registration and login, and validation/error conditions.

## Test Scenarios

### 1. Homepage and Product Browsing

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify home page loads with product listings and cookie banner

**File:** `tests/homepage-and-browsing.spec.ts`

**Steps:**
  1. Navigate to https://demo.owasp-juice.shop
    - expect: Page URL is https://demo.owasp-juice.shop/#/
    - expect: Page title contains "OWASP Juice Shop"
  2. Check cookie consent banner is displayed
    - expect: Cookie consent dialog text contains "fruit cookies"
    - expect: Buttons "But me wait!" and "Me want it!" are visible
  3. Dismiss cookie consent
    - expect: Cookie consent dialog is not visible
    - expect: Main product grid is visible with items per page control

#### 1.2. Search for a product and validate results

**File:** `tests/homepage-and-browsing.spec.ts`

**Steps:**
  1. Open search control and enter "Apple Juice"
    - expect: Search textbox is enabled
    - expect: Search suggestions or filtered list appears
  2. Verify displayed products contain "Apple Juice"
    - expect: At least one product card title includes "Apple Juice"
    - expect: No results message is not shown

#### 1.3. Pagination behavior and items per page setting

**File:** `tests/homepage-and-browsing.spec.ts`

**Steps:**
  1. Set items per page to 12 (default) and verify pagination text
    - expect: Text shows "1 – 12 of"
    - expect: Next button is enabled
    - expect: Previous button is disabled
  2. Click Next page
    - expect: Page index updates to show next range (e.g., "13 – 24")
    - expect: Displayed products change accordingly

### 2. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 2.1. Add product to cart and verify cart contents

**File:** `tests/cart-and-checkout.spec.ts`

**Steps:**
  1. From home page click on product "Banana Juice (1000ml)"
    - expect: Product details page opens
    - expect: Add to Basket button is visible
  2. Click "Add to Basket"
    - expect: Cart badge quantity increments by 1
    - expect: Cart side panel or page shows Banana Juice item

#### 2.2. Complete checkout flow with guest user

**File:** `tests/cart-and-checkout.spec.ts`

**Steps:**
  1. Go to basket/cart
    - expect: Basket page displays item(s)
    - expect: Total amount is shown
  2. Proceed to checkout and fill in checkout fields
    - expect: Checkout form fields are displayed
    - expect: Valid values accepted
  3. Submit checkout
    - expect: Order confirmation appears or appropriate next step is displayed
    - expect: No blocking error messages appear

### 3. Authentication and Account

**Seed:** `tests/seed.spec.ts`

#### 3.1. Register new user and log out

**File:** `tests/authentication.spec.ts`

**Steps:**
  1. Open account menu and click Register
    - expect: Registration form is visible
  2. Fill registration form with unique email and strong password
    - expect: Registration succeeds with welcome message or account menu shows user email
  3. Log out from account menu
    - expect: Account menu reverts to logged-out state
    - expect: Login/Register options appear

#### 3.2. Login existing user and navigate to profile

**File:** `tests/authentication.spec.ts`

**Steps:**
  1. Open account menu and click Login
    - expect: Login form is visible
  2. Enter registered credentials and submit
    - expect: Login succeeds
    - expect: Account menu shows logged-in state
  3. Verify profile or account page accessibility
    - expect: Profile page loads
    - expect: Order history or personal data is shown

### 4. Negative and Security Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 4.1. Attempt checkout with empty cart and validate error

**File:** `tests/negative-security.spec.ts`

**Steps:**
  1. Ensure cart is empty
    - expect: Cart badge shows 0 or no items
    - expect: Basket page indicates empty cart
  2. Attempt to access checkout directly via URL /#/checkout
    - expect: App redirects to cart or shows message that cart is empty
    - expect: No checkout form is shown

#### 4.2. SQL injection attempt in search field

**File:** `tests/negative-security.spec.ts`

**Steps:**
  1. Enter "' OR '1'='1" in search field and submit
    - expect: No application crash
    - expect: No irrelevant data exposure
    - expect: Search returns no items or safe handling message
  2. Verify that the search result is sanitized and contains no injection output
    - expect: Result does not contain query raw payload in unexpected places
    - expect: App still functional
