# 1. New Requirements

> Requirements are not prioritized.

* Do not download a new financial products if only bank changed in filter settings.
    * Filter actual products by selected bank.
* Not Found page.
* Nice external fonts.
* Desktop version.
* Consolidated color scheme.

---

# 2. Code and Architecture Improvements

> Make a better software quality of actual product.

* Enum is used probably as anti-pattern in select factory.
* `package.xml` dependencies - add comment: "Scaffolded by `<tool name>`" - don't stabilize version of these dependencies
  and left as is?


* Documentation
    * store model
        * response
        * financial products to show


* Documentation - README
    * screenshots
    * ESLint output
    * Sonar output
    * Mention note about:
        * Portal is complete mobile first - easy expandable to desktop version.
        * diagram(s)
        * Explain project's dir structure.
        * Vue.js - using composition programming style (reactivity under full control)
        * Global code format - Prettier.
        * ESLint with all its plugins.
        * PostCSS?

---

# 3. Ideas

## 3.1. Product

* dark theme

## 3.2 Technology and Architecture

* CSS style naming convention
* Use axios HTTP client and fake JSON server.
* Global reactive data store with professional state container. _Vuex id deprecated._
* 

