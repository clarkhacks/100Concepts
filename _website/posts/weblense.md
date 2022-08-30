---
title: "Screenshot API ✅"
date: "2022-08-30"
---
## WebLense

* Similar to the codepen.io preview
* Save Photos for fast access
* Refresh photos
* Basic controls

__Todo:__
* ✅ Capture screenshot
* ✅ Serve screenshot if exists
* ✅ Rate limits for bots
* ✅ Error handling
* ✅ Documentation
* ✅ Host It!


## API

/lense/**HEIGHT**x**WIDTH**/

**Paramters:**

| Parameter  | Description                         |
| ---------- | ----------------------------------- |
| **HEIGHT** | Height of the screenshot in pixels. |
| **WIDTH**  | Width of the screenshot in pixels.  |

**Queries:**

| Parameter | Description                           |
| --------- | ------------------------------------- |
| **url**   | URL of the page to screenshot.        |
| **full**  | If true, the entire page is captured. |
| **type**  | Type of screenshot. png/jpeg          |

## Example

![Clark.Today](https://weblense.wkmn.app/lense/800x1200/?url=https://www.clark.today)