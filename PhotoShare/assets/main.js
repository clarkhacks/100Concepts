/* Carrd Site JS | carrd.co | License: MIT */

(function() {

	var	on = addEventListener,
		$ = function(q) { return document.querySelector(q) },
		$$ = function(q) { return document.querySelectorAll(q) },
		$body = document.body,
		$inner = $('.inner'),
		client = (function() {
	
			var o = {
					browser: 'other',
					browserVersion: 0,
					os: 'other',
					osVersion: 0,
					mobile: false,
					canUse: null,
					flags: {
						lsdUnits: false,
					},
				},
				ua = navigator.userAgent,
				a, i;
	
			// browser, browserVersion.
				a = [
					['firefox',		/Firefox\/([0-9\.]+)/],
					['edge',		/Edge\/([0-9\.]+)/],
					['safari',		/Version\/([0-9\.]+).+Safari/],
					['chrome',		/Chrome\/([0-9\.]+)/],
					['chrome',		/CriOS\/([0-9\.]+)/],
					['ie',			/Trident\/.+rv:([0-9]+)/]
				];
	
				for (i=0; i < a.length; i++) {
	
					if (ua.match(a[i][1])) {
	
						o.browser = a[i][0];
						o.browserVersion = parseFloat(RegExp.$1);
	
						break;
	
					}
	
				}
	
			// os, osVersion.
				a = [
					['ios',			/([0-9_]+) like Mac OS X/,			function(v) { return v.replace('_', '.').replace('_', ''); }],
					['ios',			/CPU like Mac OS X/,				function(v) { return 0 }],
					['ios',			/iPad; CPU/,						function(v) { return 0 }],
					['android',		/Android ([0-9\.]+)/,				null],
					['mac',			/Macintosh.+Mac OS X ([0-9_]+)/,	function(v) { return v.replace('_', '.').replace('_', ''); }],
					['windows',		/Windows NT ([0-9\.]+)/,			null],
					['undefined',	/Undefined/,						null],
				];
	
				for (i=0; i < a.length; i++) {
	
					if (ua.match(a[i][1])) {
	
						o.os = a[i][0];
						o.osVersion = parseFloat( a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1 );
	
						break;
	
					}
	
				}
	
				// Hack: Detect iPads running iPadOS.
					if (o.os == 'mac'
					&&	('ontouchstart' in window)
					&&	(
	
						// 12.9"
							(screen.width == 1024 && screen.height == 1366)
						// 10.2"
							||	(screen.width == 834 && screen.height == 1112)
						// 9.7"
							||	(screen.width == 810 && screen.height == 1080)
						// Legacy
							||	(screen.width == 768 && screen.height == 1024)
	
					))
						o.os = 'ios';
	
			// mobile.
				o.mobile = (o.os == 'android' || o.os == 'ios');
	
			// canUse.
				var _canUse = document.createElement('div');
	
				o.canUse = function(property, value) {
	
					var style;
	
					// Get style.
						style = _canUse.style;
	
					// Property doesn't exist? Can't use it.
						if (!(property in style))
							return false;
	
					// Value provided?
						if (typeof value !== 'undefined') {
	
							// Assign value.
								style[property] = value;
	
							// Value is empty? Can't use it.
								if (style[property] == '')
									return false;
	
						}
	
					return true;
	
				};
	
			// flags.
				o.flags.lsdUnits = o.canUse('width', '100dvw');
	
			return o;
	
		}()),
		trigger = function(t) {
			dispatchEvent(new Event(t));
		},
		cssRules = function(selectorText) {
	
			var ss = document.styleSheets,
				a = [],
				f = function(s) {
	
					var r = s.cssRules,
						i;
	
					for (i=0; i < r.length; i++) {
	
						if (r[i] instanceof CSSMediaRule && matchMedia(r[i].conditionText).matches)
							(f)(r[i]);
						else if (r[i] instanceof CSSStyleRule && r[i].selectorText == selectorText)
							a.push(r[i]);
	
					}
	
				},
				x, i;
	
			for (i=0; i < ss.length; i++)
				f(ss[i]);
	
			return a;
	
		},
		thisHash = function() {
	
			var h = location.hash ? location.hash.substring(1) : null,
				a;
	
			// Null? Bail.
				if (!h)
					return null;
	
			// Query string? Move before hash.
				if (h.match(/\?/)) {
	
					// Split from hash.
						a = h.split('?');
						h = a[0];
	
					// Update hash.
						history.replaceState(undefined, undefined, '#' + h);
	
					// Update search.
						window.location.search = a[1];
	
				}
	
			// Prefix with "x" if not a letter.
				if (h.length > 0
				&&	!h.match(/^[a-zA-Z]/))
					h = 'x' + h;
	
			// Convert to lowercase.
				if (typeof h == 'string')
					h = h.toLowerCase();
	
			return h;
	
		},
		scrollToElement = function(e, style, duration) {
	
			var y, cy, dy,
				start, easing, offset, f;
	
			// Element.
	
				// No element? Assume top of page.
					if (!e)
						y = 0;
	
				// Otherwise ...
					else {
	
						offset = (e.dataset.scrollOffset ? parseInt(e.dataset.scrollOffset) : 0) * parseFloat(getComputedStyle(document.documentElement).fontSize);
	
						switch (e.dataset.scrollBehavior ? e.dataset.scrollBehavior : 'default') {
	
							case 'default':
							default:
	
								y = e.offsetTop + offset;
	
								break;
	
							case 'center':
	
								if (e.offsetHeight < window.innerHeight)
									y = e.offsetTop - ((window.innerHeight - e.offsetHeight) / 2) + offset;
								else
									y = e.offsetTop - offset;
	
								break;
	
							case 'previous':
	
								if (e.previousElementSibling)
									y = e.previousElementSibling.offsetTop + e.previousElementSibling.offsetHeight + offset;
								else
									y = e.offsetTop + offset;
	
								break;
	
						}
	
					}
	
			// Style.
				if (!style)
					style = 'smooth';
	
			// Duration.
				if (!duration)
					duration = 750;
	
			// Instant? Just scroll.
				if (style == 'instant') {
	
					window.scrollTo(0, y);
					return;
	
				}
	
			// Get start, current Y.
				start = Date.now();
				cy = window.scrollY;
				dy = y - cy;
	
			// Set easing.
				switch (style) {
	
					case 'linear':
						easing = function (t) { return t };
						break;
	
					case 'smooth':
						easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
						break;
	
				}
	
			// Scroll.
				f = function() {
	
					var t = Date.now() - start;
	
					// Hit duration? Scroll to y and finish.
						if (t >= duration)
							window.scroll(0, y);
	
					// Otherwise ...
						else {
	
							// Scroll.
								window.scroll(0, cy + (dy * easing(t / duration)));
	
							// Repeat.
								requestAnimationFrame(f);
	
						}
	
				};
	
				f();
	
		},
		scrollToTop = function() {
	
			// Scroll to top.
				scrollToElement(null);
	
		},
		loadElements = function(parent) {
	
			var a, e, x, i;
	
			// IFRAMEs.
	
				// Get list of unloaded IFRAMEs.
					a = parent.querySelectorAll('iframe[data-src]:not([data-src=""])');
	
				// Step through list.
					for (i=0; i < a.length; i++) {
	
						// Load.
							a[i].src = a[i].dataset.src;
	
						// Mark as loaded.
							a[i].dataset.src = "";
	
					}
	
			// Video.
	
				// Get list of videos (autoplay).
					a = parent.querySelectorAll('video[autoplay]');
	
				// Step through list.
					for (i=0; i < a.length; i++) {
	
						// Play if paused.
							if (a[i].paused)
								a[i].play();
	
					}
	
			// Autofocus.
	
				// Get first element with data-autofocus attribute.
					e = parent.querySelector('[data-autofocus="1"]');
	
				// Determine type.
					x = e ? e.tagName : null;
	
					switch (x) {
	
						case 'FORM':
	
							// Get first input.
								e = e.querySelector('.field input, .field select, .field textarea');
	
							// Found? Focus.
								if (e)
									e.focus();
	
							break;
	
						default:
							break;
	
					}
	
		},
		unloadElements = function(parent) {
	
			var a, e, x, i;
	
			// IFRAMEs.
	
				// Get list of loaded IFRAMEs.
					a = parent.querySelectorAll('iframe[data-src=""]');
	
				// Step through list.
					for (i=0; i < a.length; i++) {
	
						// Don't unload? Skip.
							if (a[i].dataset.srcUnload === '0')
								continue;
	
						// Mark as unloaded.
							a[i].dataset.src = a[i].src;
	
						// Unload.
							a[i].src = '';
	
					}
	
			// Video.
	
				// Get list of videos.
					a = parent.querySelectorAll('video');
	
				// Step through list.
					for (i=0; i < a.length; i++) {
	
						// Pause if playing.
							if (!a[i].paused)
								a[i].pause();
	
					}
	
			// Autofocus.
	
				// Get focused element.
					e = $(':focus');
	
				// Found? Blur.
					if (e)
						e.blur();
	
	
		};
	
		// Expose scrollToElement.
			window._scrollToTop = scrollToTop;
	
	// "On Load" animation.
		on('load', function() {
			setTimeout(function() {
				$body.className = $body.className.replace(/\bis-loading\b/, 'is-playing');
	
				setTimeout(function() {
					$body.className = $body.className.replace(/\bis-playing\b/, 'is-ready');
				}, 750);
			}, 100);
		});
	
	// Sections.
		(function() {
	
			var initialSection, initialScrollPoint, initialId,
				header, footer, name, hideHeader, hideFooter, disableAutoScroll,
				h, e, ee, k,
				locked = false,
				doNextSection = function() {
	
					var section;
	
					section = $('#main > .inner > section.active').nextElementSibling;
	
					if (!section || section.tagName != 'SECTION')
						return;
	
					location.href = '#' + section.id.replace(/-section$/, '');
	
				},
				doPreviousSection = function() {
	
					var section;
	
					section = $('#main > .inner > section.active').previousElementSibling;
	
					if (!section || section.tagName != 'SECTION')
						return;
	
					location.href = '#' + (section.matches(':first-child') ? '' : section.id.replace(/-section$/, ''));
	
				},
				doFirstSection = function() {
	
					var section;
	
					section = $('#main > .inner > section:first-of-type');
	
					if (!section || section.tagName != 'SECTION')
						return;
	
					location.href = '#' + section.id.replace(/-section$/, '');
	
				},
				doLastSection = function() {
	
					var section;
	
					section = $('#main > .inner > section:last-of-type');
	
					if (!section || section.tagName != 'SECTION')
						return;
	
					location.href = '#' + section.id.replace(/-section$/, '');
	
				},
				sections = {};
	
			// Expose doNextSection, doPreviousSection, doFirstSection, doLastSection.
				window._next = doNextSection;
				window._previous = doPreviousSection;
				window._first = doFirstSection;
				window._last = doLastSection;
	
			// Override exposed scrollToTop.
				window._scrollToTop = function() {
	
					var section, id;
	
					// Scroll to top.
						scrollToElement(null);
	
					// Section active?
						if (!!(section = $('section.active'))) {
	
							// Get name.
								id = section.id.replace(/-section$/, '');
	
								// Index section? Clear.
									if (id == 'home')
										id = '';
	
							// Reset hash to section name (via new state).
								history.pushState(null, null, '#' + id);
	
						}
	
				};
	
			// Initialize.
	
				// Set scroll restoration to manual.
					if ('scrollRestoration' in history)
						history.scrollRestoration = 'manual';
	
				// Header, footer.
					header = $('#header');
					footer = $('#footer');
	
				// Show initial section.
	
					// Determine target.
						h = thisHash();
	
						// Contains invalid characters? Might be a third-party hashbang, so ignore it.
							if (h
							&&	!h.match(/^[a-zA-Z0-9\-]+$/))
								h = null;
	
						// Scroll point.
							if (e = $('[data-scroll-id="' + h + '"]')) {
	
								initialScrollPoint = e;
								initialSection = initialScrollPoint.parentElement;
								initialId = initialSection.id;
	
							}
	
						// Section.
							else if (e = $('#' + (h ? h : 'home') + '-section')) {
	
								initialScrollPoint = null;
								initialSection = e;
								initialId = initialSection.id;
	
							}
	
						// Missing initial section?
							if (!initialSection) {
	
								// Default to index.
									initialScrollPoint = null;
									initialSection = $('#' + 'home' + '-section');
									initialId = initialSection.id;
	
								// Clear index URL hash.
									history.replaceState(undefined, undefined, '#');
	
							}
	
					// Get options.
						name = (h ? h : 'home');
						hideHeader = name ? ((name in sections) && ('hideHeader' in sections[name]) && sections[name].hideHeader) : false;
						hideFooter = name ? ((name in sections) && ('hideFooter' in sections[name]) && sections[name].hideFooter) : false;
						disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false;
	
					// Deactivate all sections (except initial).
	
						// Initially hide header and/or footer (if necessary).
	
							// Header.
								if (header && hideHeader) {
	
									header.classList.add('hidden');
									header.style.display = 'none';
	
								}
	
							// Footer.
								if (footer && hideFooter) {
	
									footer.classList.add('hidden');
									footer.style.display = 'none';
	
								}
	
						// Deactivate.
							ee = $$('#main > .inner > section:not([id="' + initialId + '"])');
	
							for (k = 0; k < ee.length; k++) {
	
								ee[k].className = 'inactive';
								ee[k].style.display = 'none';
	
							}
	
					// Activate initial section.
						initialSection.classList.add('active');
	
					// Load elements.
						loadElements(initialSection);
	
						if (header)
							loadElements(header);
	
						if (footer)
							loadElements(footer);
	
					// Scroll to top (if not disabled for this section).
						if (!disableAutoScroll)
							scrollToElement(null, 'instant');
	
				// Load event.
					on('load', function() {
	
						// Scroll to initial scroll point (if applicable).
					 		if (initialScrollPoint)
								scrollToElement(initialScrollPoint, 'instant');
	
					});
	
			// Hashchange event.
				on('hashchange', function(event) {
	
					var section, scrollPoint, id, sectionHeight, currentSection, currentSectionHeight,
						name, hideHeader, hideFooter, disableAutoScroll,
						h, e, ee, k;
	
					// Lock.
						if (locked)
							return false;
	
					// Determine target.
						h = thisHash();
	
						// Contains invalid characters? Might be a third-party hashbang, so ignore it.
							if (h
							&&	!h.match(/^[a-zA-Z0-9\-]+$/))
								return false;
	
						// Scroll point.
							if (e = $('[data-scroll-id="' + h + '"]')) {
	
								scrollPoint = e;
								section = scrollPoint.parentElement;
								id = section.id;
	
							}
	
						// Section.
							else if (e = $('#' + (h ? h : 'home') + '-section')) {
	
								scrollPoint = null;
								section = e;
								id = section.id;
	
							}
	
						// Anything else.
							else {
	
								// Default to index.
									scrollPoint = null;
									section = $('#' + 'home' + '-section');
									id = section.id;
	
								// Clear index URL hash.
									history.replaceState(undefined, undefined, '#');
	
							}
	
					// No section? Bail.
						if (!section)
							return false;
	
					// Section already active?
						if (!section.classList.contains('inactive')) {
	
							// Get options.
								name = (section ? section.id.replace(/-section$/, '') : null);
								disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false;
	
						 	// Scroll to scroll point (if applicable).
						 		if (scrollPoint)
									scrollToElement(scrollPoint);
	
							// Otherwise, just scroll to top (if not disabled for this section).
								else if (!disableAutoScroll)
									scrollToElement(null);
	
							// Bail.
								return false;
	
						}
	
					// Otherwise, activate it.
						else {
	
							// Lock.
								locked = true;
	
							// Clear index URL hash.
								if (location.hash == '#home')
									history.replaceState(null, null, '#');
	
							// Get options.
								name = (section ? section.id.replace(/-section$/, '') : null);
								hideHeader = name ? ((name in sections) && ('hideHeader' in sections[name]) && sections[name].hideHeader) : false;
								hideFooter = name ? ((name in sections) && ('hideFooter' in sections[name]) && sections[name].hideFooter) : false;
								disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false;
	
							// Deactivate current section.
	
								// Hide header and/or footer (if necessary).
	
									// Header.
										if (header && hideHeader) {
	
											header.classList.add('hidden');
	
											setTimeout(function() {
												header.style.display = 'none';
											}, 250);
	
										}
	
									// Footer.
										if (footer && hideFooter) {
	
											footer.classList.add('hidden');
	
											setTimeout(function() {
												footer.style.display = 'none';
											}, 250);
	
										}
	
								// Deactivate.
									currentSection = $('#main > .inner > section:not(.inactive)');
	
									if (currentSection) {
	
										// Get current height.
											currentSectionHeight = currentSection.offsetHeight;
	
										// Deactivate.
											currentSection.classList.add('inactive');
	
										// Unload elements.
											unloadElements(currentSection);
	
										// Hide.
											setTimeout(function() {
												currentSection.style.display = 'none';
												currentSection.classList.remove('active');
											}, 250);
	
									}
	
							// Activate target section.
								setTimeout(function() {
	
									// Show header and/or footer (if necessary).
	
										// Header.
											if (header && !hideHeader) {
	
												header.style.display = '';
	
												setTimeout(function() {
													header.classList.remove('hidden');
												}, 0);
	
											}
	
										// Footer.
											if (footer && !hideFooter) {
	
												footer.style.display = '';
	
												setTimeout(function() {
													footer.classList.remove('hidden');
												}, 0);
	
											}
	
									// Activate.
	
										// Show.
											section.style.display = '';
	
										// Trigger 'resize' event.
											trigger('resize');
	
										// Scroll to top (if not disabled for this section).
											if (!disableAutoScroll)
												scrollToElement(null, 'instant');
	
										// Get target height.
											sectionHeight = section.offsetHeight;
	
										// Set target heights.
											if (sectionHeight > currentSectionHeight) {
	
												section.style.maxHeight = currentSectionHeight + 'px';
												section.style.minHeight = '0';
	
											}
											else {
	
												section.style.maxHeight = '';
												section.style.minHeight = currentSectionHeight + 'px';
	
											}
	
										// Delay.
											setTimeout(function() {
	
												// Activate.
													section.classList.remove('inactive');
													section.classList.add('active');
	
												// Temporarily restore target heights.
													section.style.minHeight = sectionHeight + 'px';
													section.style.maxHeight = sectionHeight + 'px';
	
												// Delay.
													setTimeout(function() {
	
														// Turn off transitions.
															section.style.transition = 'none';
	
														// Clear target heights.
															section.style.minHeight = '';
															section.style.maxHeight = '';
	
														// Load elements.
															loadElements(section);
	
													 	// Scroll to scroll point (if applicable).
													 		if (scrollPoint)
																scrollToElement(scrollPoint, 'instant');
	
														// Delay.
															setTimeout(function() {
	
																// Turn on transitions.
																	section.style.transition = '';
	
																// Unlock.
																	locked = false;
	
															}, 75);
	
													}, 500 + 250);
	
											}, 75);
	
								}, 250);
	
						}
	
					return false;
	
				});
	
				// Hack: Allow hashchange to trigger on click even if the target's href matches the current hash.
					on('click', function(event) {
	
						var t = event.target,
							tagName = t.tagName.toUpperCase(),
							scrollPoint;
	
						// Find real target.
							switch (tagName) {
	
								case 'IMG':
								case 'SVG':
								case 'USE':
								case 'U':
								case 'STRONG':
								case 'EM':
								case 'CODE':
								case 'S':
								case 'MARK':
								case 'SPAN':
	
									// Find ancestor anchor tag.
										while ( !!(t = t.parentElement) )
											if (t.tagName == 'A')
												break;
	
									// Not found? Bail.
										if (!t)
											return;
	
									break;
	
								default:
									break;
	
							}
	
						// Target is an anchor *and* its href is a hash?
							if (t.tagName == 'A'
							&&	t.getAttribute('href').substr(0, 1) == '#') {
	
								// Hash matches an invisible scroll point?
									if (!!(scrollPoint = $('[data-scroll-id="' + t.hash.substr(1) + '"][data-scroll-invisible="1"]'))) {
	
										// Prevent default.
											event.preventDefault();
	
										// Scroll to element.
											scrollToElement(scrollPoint);
	
									}
	
								// Hash matches the current hash?
									else if (t.hash == window.location.hash) {
	
										// Prevent default.
											event.preventDefault();
	
										// Replace state with '#'.
											history.replaceState(undefined, undefined, '#');
	
										// Replace location with target hash.
											location.replace(t.hash);
	
									}
	
							}
	
					});
	
		})();
	
	// Browser hacks.
	
		// Init.
			var style, sheet, rule;
	
			// Create <style> element.
				style = document.createElement('style');
				style.appendChild(document.createTextNode(''));
				document.head.appendChild(style);
	
			// Get sheet.
				sheet = style.sheet;
	
		// Mobile.
			if (client.mobile) {
	
				// Prevent overscrolling on Safari/other mobile browsers.
				// 'vh' units don't factor in the heights of various browser UI elements so our page ends up being
				// a lot taller than it needs to be (resulting in overscroll and issues with vertical centering).
					(function() {
	
						// Lsd units available?
							if (client.flags.lsdUnits) {
	
								document.documentElement.style.setProperty('--viewport-height', '100dvh');
								document.documentElement.style.setProperty('--background-height', '100lvh');
	
							}
	
						// Otherwise, use innerHeight hack.
							else {
	
								var f = function() {
									document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
									document.documentElement.style.setProperty('--background-height', (window.innerHeight + 250) + 'px');
								};
	
								on('load', f);
								on('resize', f);
								on('orientationchange', function() {
	
									// Update after brief delay.
										setTimeout(function() {
											(f)();
										}, 100);
	
								});
	
							}
	
					})();
	
			}
	
		// Android.
			if (client.os == 'android') {
	
				// Prevent background "jump" when address bar shrinks.
				// Specifically, this fix forces the background pseudoelement to a fixed height based on the physical
				// screen size instead of relying on "vh" (which is subject to change when the scrollbar shrinks/grows).
					(function() {
	
						// Insert and get rule.
							sheet.insertRule('body::after { }', 0);
							rule = sheet.cssRules[0];
	
						// Event.
							var f = function() {
								rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px';
							};
	
							on('load', f);
							on('orientationchange', f);
							on('touchmove', f);
	
					})();
	
				// Apply "is-touch" class to body.
					$body.classList.add('is-touch');
	
			}
	
		// iOS.
			else if (client.os == 'ios') {
	
				// <=11: Prevent white bar below background when address bar shrinks.
				// For some reason, simply forcing GPU acceleration on the background pseudoelement fixes this.
					if (client.osVersion <= 11)
						(function() {
	
							// Insert and get rule.
								sheet.insertRule('body::after { }', 0);
								rule = sheet.cssRules[0];
	
							// Set rule.
								rule.style.cssText = '-webkit-transform: scale(1.0)';
	
						})();
	
				// <=11: Prevent white bar below background when form inputs are focused.
				// Fixed-position elements seem to lose their fixed-ness when this happens, which is a problem
				// because our backgrounds fall into this category.
					if (client.osVersion <= 11)
						(function() {
	
							// Insert and get rule.
								sheet.insertRule('body.ios-focus-fix::before { }', 0);
								rule = sheet.cssRules[0];
	
							// Set rule.
								rule.style.cssText = 'height: calc(100% + 60px)';
	
							// Add event listeners.
								on('focus', function(event) {
									$body.classList.add('ios-focus-fix');
								}, true);
	
								on('blur', function(event) {
									$body.classList.remove('ios-focus-fix');
								}, true);
	
						})();
	
				// Apply "is-touch" class to body.
					$body.classList.add('is-touch');
	
			}
	
	// Variables.
		var variables = {
	
			/**
			 * Cache.
			 * @var {object}
			 */
			cache: {},
	
			/**
			 * Handlers.
			 * @var {object}
			 */
			handlers: {
				form: function(e, name, value) {
	
					// Step through inputs.
						e.querySelectorAll('input').forEach(function(input) {
	
							// "value" attribute.
								if (input.hasAttribute('value'))
									input.setAttribute('value', variables.replaceVariable(input.getAttribute('value'), name, value));
	
							// "placeholder" attribute.
								if (input.hasAttribute('placeholder'))
									input.setAttribute('placeholder', variables.replaceVariable(input.getAttribute('placeholder'), name, value));
	
						});
	
					// Step through labels, buttons.
						e.querySelectorAll('label, button').forEach(function(label) {
	
							// Inner HTML.
								if (label.childNodes.length == 1
								&&	label.childNodes[0].nodeType == Node.TEXT_NODE)
									label.innerHTML = variables.replaceVariable(label.innerHTML, name, value);
	
						});
	
				},
				list: function(e, name, value) {
	
					// Step through paragraphs.
						e.querySelectorAll('p').forEach(function(p) {
	
							// Inner HTML.
								p.innerHTML = variables.replaceVariable(p.innerHTML, name, value);
	
						});
	
				},
				table: function(e, name, value) {
	
					// Step through table cells, table headings.
						e.querySelectorAll('td, th').forEach(function(x) {
	
							// Inner HTML.
								x.innerHTML = variables.replaceVariable(x.innerHTML, name, value);
	
						});
	
				},
				text: function(e, name, value) {
					e.innerHTML = variables.replaceVariable(e.innerHTML, name, value);
				},
			},
	
			/**
			 * URL params.
			 * @var {URLSearchParams}
			 */
			urlParams: null,
	
			/**
			 * Gets a previously cached variable value (or generates it with a handler if it isn't already cached).
			 * @param {string} source Source.
			 * @param {string} key Key.
			 * @param {function} handler Handler.
			 * @return {mixed} Value.
			 */
			cacheValue: function(source, key, handler) {
	
				var name = source + '.' + key;
	
				if (!(name in this.cache))
					this.cache[name] = String(handler(key));
	
				return this.cache[name];
	
			},
	
			/**
			 * Escapes HTML in a string.
			 * @param {string} s String.
			 * @return {string} Escaped string.
			 */
			escapeHTML: function(s) {
	
				// Blank, null, or undefined? Return blank string.
					if (s === ''
					||	s === null
					||	s === undefined)
						return '';
	
				// Escape HTML characters.
					var a = {
						'&': '&amp;',
						'<': '&lt;',
						'>': '&gt;',
						'"': '&quot;',
						"'": '&#39;',
					};
	
					s = s.replace(/[&<>"']/g, function(x) {
						return a[x];
					});
	
				return s;
	
			},
	
			/**
			 * Gets a variable value.
			 * @param {string} name Name.
			 * @return {mixed} Value.
			 */
			getValue: function(name) {
	
				var	_this = this,
					value = '',
					source, key, value,
					a;
	
				try {
	
					// Split name into source, key.
						a = name.split('.', 2);
	
						if (a.length != 2)
							throw 'Invalid name.';
	
						source = a[0];
						key = a[1];
	
					// Determine source.
						switch (a[0]) {
	
							case 'url':
								value = this.cacheValue(source, key, function(key) {
	
									// URL parameter exists? Use it.
										if (_this.urlParams.has(key))
											return _this.urlParams.get(key);
	
									return '';
	
								});
	
								break;
	
							case 'client':
	
								value = this.cacheValue(source, key, function(key) {
	
									switch (key) {
	
										case 'timestamp':
											return Math.round(Date.now() / 1000);
	
										case 'time':
											return (new Date()).toLocaleTimeString([], { timeStyle: 'short' });
	
										case 'fulltime':
											return (new Date()).toLocaleTimeString([], { timeStyle: 'medium' });
	
										case 'date':
											return (new Date()).toLocaleDateString([], { dateStyle: 'short' });
	
										case 'fulldate':
											return (new Date()).toLocaleDateString([], { dateStyle: 'long' });
	
										case 'utc_timestamp':
											return Math.round(Date.now() / 1000) + ((new Date()).getTimezoneOffset() * 60);
	
										case 'utc_time':
											return (new Date()).toLocaleTimeString([], { timeZone: 'UTC', timeStyle: 'short' });
	
										case 'utc_fulltime':
											return (new Date()).toLocaleTimeString([], { timeZone: 'UTC', timeStyle: 'medium' });
	
										case 'utc_date':
											return (new Date()).toLocaleDateString([], { timeZone: 'UTC', dateStyle: 'short' });
	
										case 'utc_fulldate':
											return (new Date()).toLocaleDateString([], { timeZone: 'UTC', dateStyle: 'long' });
	
										default:
											break;
	
									}
	
									return '';
	
								});
	
								break;
	
							default:
								throw 'Invalid source.';
	
						}
	
				}
				catch {
	
					// Do nothing.
	
				}
	
				return value;
	
			},
	
			/**
			 * Determines if a string has at least one {{source.name|fallback}} variable.
			 * @param {string} s String.
			 * @return {bool} True if yes, false if no.
			 */
			hasVariables: function(s) {
				return !!s.match(/\{\{[^\}]+\}\}/);
			},
	
			/**
			 * Initializes variables.
			 * @param {string} selector Selector.
			 */
			init: function(selector) {
	
				this.urlParams = new URLSearchParams(window.location.search);
	
				if (selector)
					this.parseSelectorAll(selector);
	
			},
	
			/**
			 * Parses variables on a given element.
			 * @param {object} e Element.
			 */
			parse: function(e) {
	
				var	_this = this,
					type, name, value, handler,
					a, x;
	
				// Determine element type.
	
					// Form.
						if (e.tagName == 'FORM')
							handler = this.handlers.form;
	
					// Table.
						else if (e.classList.contains('table-wrapper'))
							handler = this.handlers.table;
	
					// List.
						else if (e.classList.contains('list'))
							handler = this.handlers.list;
	
					// Text.
						else if (
							e.tagName == 'P'
						||	e.tagName == 'H1'
						||	e.tagName == 'H2'
						||	e.tagName == 'H3'
						||	e.tagName == 'H4'
						||	e.tagName == 'H5'
						||	e.tagName == 'H6'
						||	e.tagName == 'ADDRESS'
						||	e.tagName == 'BLOCKQUOTE')
							handler = this.handlers.text;
	
					// Fallback.
						else
							handler = function(e, name, value) { };
	
				// Step through variables.
					a = e.dataset.variables.split(',');
	
					for (name of a) {
	
						// Get value.
							value = this.getValue(name);
	
						// Call handler.
							handler(e, name, value);
	
						// Step through anchors.
							e.querySelectorAll('a').forEach(function(anchor) {
	
								// "href" attribute.
									if (anchor.hasAttribute('href'))
										anchor.setAttribute('href', _this.replaceVariable(anchor.getAttribute('href'), name, value));
	
								// Inner HTML.
									anchor.innerHTML = _this.replaceVariable(anchor.innerHTML, name, value);
	
							});
	
					}
	
			},
	
			/**
			 * Parses variables on the first element matching a given selector.
			 * @param {string} selector Selector.
			 */
			parseSelector: function(selector) {
	
				var e = $(selector);
	
				if (e)
					this.parse(e);
	
			},
	
			/**
			 * Parses variables on all elements matching a given selector.
			 * @param {string} selector Selector.
			 */
			parseSelectorAll: function(selector) {
	
				var	_this = this,
					ee = $$(selector);
	
				if (ee.length > 0)
					ee.forEach(function(e) {
						_this.parse(e);
					});
	
			},
	
			/**
			 * Parses a string for variables within a given element context.
			 * @param {object} e Element.
			 * @oaram {string} s String.
			 * @return {string} Parsed string.
			 */
			parseString: function(e, s) {
	
				var a, name, value;
	
				// Parse 'variables' data value.
					if (!('variables' in e.dataset))
						return s;
	
					a = e.dataset.variables.split(',');
	
				// Step through variables.
					for (name of a) {
	
						// Get value.
							value = this.getValue(name);
	
						// Replace variable.
							s = this.replaceVariable(s, name, value);
	
					}
	
				return s;
	
			},
	
			/**
			 * Applies a variable value to a string.
			 * @param {string} s String.
			 * @param {string} name Name.
			 * @param {string} value Value.
			 * @return {string} String.
			 */
			replaceVariable: function(s, name, value) {
	
				// Invalid variable name? Bail.
					if (!name.match(/^[a-zA-Z0-9\_\-\.]+$/))
						return s;
	
				// Build regexp.
					var r = new RegExp('\{\{' + name.replace('.', '\.') + '(\|[^\}]*)?\}\}', 'g');
	
				// Undefined string? Reset to empty.
					if (s === undefined
					||	s === null)
						s = '';
	
				// Non-empty value? Replace entire variable.
					if (value !== '') {
	
						s = s.replace(
							r,
							this.escapeHTML(value)
						);
	
					}
	
				// Otherwise, use fallback.
					else {
	
						s = s.replace(
							r,
							function(s, x) {
	
								if (x === undefined)
									return '';
	
								return x.substr(1);
	
							}
						);
	
					}
	
				return s;
	
			},
	
		};
	
		// Initialize.
			variables.init('[data-variables]');
	
	// Gallery.
		/**
		 * Lightbox gallery.
		 */
		function lightboxGallery() {
		
			var _this = this;
		
			/**
			 * ID.
			 * @var {string}
			 */
			this.id = 'gallery';
		
			/**
			 * Wrapper.
			 * @var {DOMElement}
			 */
			this.$wrapper = $('#' + this.id);
		
			/**
			 * Modal.
			 * @var {DOMElement}
			 */
			this.$modal = null;
		
			/**
			 * Modal image.
			 * @var {DOMElement}
			 */
			this.$modalImage = null;
		
			/**
			 * Modal next.
			 * @var {DOMElement}
			 */
			this.$modalNext = null;
		
			/**
			 * Modal previous.
			 * @var {DOMElement}
			 */
			this.$modalPrevious = null;
		
			/**
			 * Links.
			 * @var {nodeList}
			 */
			this.$links = null;
		
			/**
			 * Lock state.
			 * @var {bool}
			 */
			this.locked = false;
		
			/**
			 * Current index.
			 * @var {integer}
			 */
			this.current = null;
		
			/**
			 * Transition delay (must match CSS).
			 * @var {integer}
			 */
			this.delay = 375;
		
			/**
			 * Navigation state.
			 * @var {bool}
			 */
			this.navigation = null;
		
			/**
			 * Mobile state.
			 * @var {bool}
			 */
			this.mobile = null;
		
			/**
			 * Zoom interval ID.
			 * @var {integer}
			 */
			this.zoomIntervalId = null;
		
			// Init modal.
				this.initModal();
		
		};
		
			/**
			 * Initialize.
			 * @param {object} config Config.
			 */
			lightboxGallery.prototype.init = function(config) {
		
				var _this = this,
					$links = $$('#' + config.id + ' .thumbnail'),
					navigation = config.navigation,
					mobile = config.mobile,
					i, j;
		
				// Determine if navigation needs to be disabled (despite what our config says).
					j = 0;
		
					// Step through items.
						for (i = 0; i < $links.length; i++) {
		
							// Not ignored? Increment count.
								if ($links[i].dataset.lightboxIgnore != '1')
									j++;
		
						}
		
					// Less than two allowed items? Disable navigation.
						if (j < 2)
							navigation = false;
		
				// Bind click events.
					for (i=0; i < $links.length; i++) {
		
						// Ignored? Skip.
							if ($links[i].dataset.lightboxIgnore == '1')
								continue;
		
						// Bind click event.
							(function(index) {
								$links[index].addEventListener('click', function(event) {
		
									// Prevent default.
										event.stopPropagation();
										event.preventDefault();
		
									// Show.
										_this.show(index, {
											$links: $links,
											navigation: navigation,
											mobile: mobile
										});
		
								});
							})(i);
		
					}
		
			};
		
			/**
			 * Init modal.
			 */
			lightboxGallery.prototype.initModal = function() {
		
				var	_this = this,
					$modal,
					$modalImage,
					$modalNext,
					$modalPrevious;
		
				// Build element.
					$modal = document.createElement('div');
						$modal.id = this.id + '-modal';
						$modal.tabIndex = -1;
						$modal.className = 'gallery-modal';
						$modal.innerHTML = '<div class="inner"><img src="" /></div><div class="nav previous"></div><div class="nav next"></div><div class="close"></div>';
						$body.appendChild($modal);
		
					// Image.
						$modalImage = $('#' + this.id + '-modal img');
							$modalImage.addEventListener('load', function() {
		
								// Delay (wait for visible transition, if not switching).
									setTimeout(function() {
		
										// No longer visible? Bail.
											if (!$modal.classList.contains('visible'))
												return;
		
										// Set loaded.
											$modal.classList.add('loaded');
		
										// Clear switching after delay.
											setTimeout(function() {
												$modal.classList.remove('switching');
											}, _this.delay);
		
									}, ($modal.classList.contains('switching') ? 0 : _this.delay));
		
							});
		
					// Navigation.
						$modalNext = $('#' + this.id + '-modal .next');
						$modalPrevious = $('#' + this.id + '-modal .previous');
		
				// Methods.
					$modal.show = function(index, offset) {
		
						var item,
							i, j, found;
		
						// Locked? Bail.
							if (_this.locked)
								return;
		
						// No index provided? Use current.
							if (typeof index != 'number')
								index = _this.current;
		
						// Offset provided? Find first allowed offset item.
							if (typeof offset == 'number') {
		
								found = false;
								j = 0;
		
								// Step through items using offset (up to item count).
									for (j = 0; j < _this.$links.length; j++) {
		
										// Increment index by offset.
											index += offset;
		
										// Less than zero? Jump to end.
											if (index < 0)
												index = _this.$links.length - 1;
		
										// Greater than length? Jump to beginning.
											else if (index >= _this.$links.length)
												index = 0;
		
										// Already there? Bail.
											if (index == _this.current)
												break;
		
										// Get item.
											item = _this.$links.item(index);
		
											if (!item)
												break;
		
										// Not ignored? Found!
											if (item.dataset.lightboxIgnore != '1') {
		
												found = true;
												break;
		
											}
		
									}
		
								// Couldn't find an allowed item? Bail.
									if (!found)
										return;
		
							}
		
						// Otherwise, see if requested item is allowed.
							else {
		
								// Check index.
		
									// Less than zero? Jump to end.
										if (index < 0)
											index = _this.$links.length - 1;
		
									// Greater than length? Jump to beginning.
										else if (index >= _this.$links.length)
											index = 0;
		
									// Already there? Bail.
										if (index == _this.current)
											return;
		
								// Get item.
									item = _this.$links.item(index);
		
									if (!item)
										return;
		
								// Ignored? Bail.
									if (item.dataset.lightboxIgnore == '1')
										return;
		
							}
		
						// Mobile? Set zoom handler interval.
							if (client.mobile)
								_this.zoomIntervalId = setInterval(function() {
									_this.zoomHandler();
								}, 250);
		
						// Lock.
							_this.locked = true;
		
						// Current?
							if (_this.current !== null) {
		
								// Clear loaded.
									$modal.classList.remove('loaded');
		
								// Set switching.
									$modal.classList.add('switching');
		
								// Delay (wait for switching transition).
									setTimeout(function() {
		
										// Set current, src.
											_this.current = index;
											$modalImage.src = item.href;
		
										// Delay.
											setTimeout(function() {
		
												// Focus.
													$modal.focus();
		
												// Unlock.
													_this.locked = false;
		
											}, _this.delay);
		
									}, _this.delay);
		
							}
		
						// Otherwise ...
							else {
		
								// Set current, src.
									_this.current = index;
									$modalImage.src = item.href;
		
								// Set visible.
									$modal.classList.add('visible');
		
								// Delay.
									setTimeout(function() {
		
										// Focus.
											$modal.focus();
		
										// Unlock.
											_this.locked = false;
		
									}, _this.delay);
		
							}
		
					};
		
					$modal.hide = function() {
		
						// Locked? Bail.
							if (_this.locked)
								return;
		
						// Already hidden? Bail.
							if (!$modal.classList.contains('visible'))
								return;
		
						// Lock.
							_this.locked = true;
		
						// Clear visible, loaded, switching.
							$modal.classList.remove('visible');
							$modal.classList.remove('loaded');
							$modal.classList.remove('switching');
		
						// Clear zoom handler interval.
							clearInterval(_this.zoomIntervalId);
		
						// Delay (wait for visible transition).
							setTimeout(function() {
		
								// Clear src.
									$modalImage.src = '';
		
								// Unlock.
									_this.locked = false;
		
								// Focus.
									$body.focus();
		
								// Clear current.
									_this.current = null;
		
							}, _this.delay);
		
					};
		
					$modal.next = function() {
						$modal.show(null, 1);
					};
		
					$modal.previous = function() {
						$modal.show(null, -1);
					};
		
					$modal.first = function() {
						$modal.show(0);
					};
		
					$modal.last = function() {
						$modal.show(_this.$links.length - 1);
					};
		
				// Events.
					$modal.addEventListener('click', function(event) {
						$modal.hide();
					});
		
					$modal.addEventListener('keydown', function(event) {
		
						// Not visible? Bail.
							if (!$modal.classList.contains('visible'))
								return;
		
						switch (event.keyCode) {
		
							// Right arrow, Space.
								case 39:
								case 32:
		
									if (!_this.navigation)
										break;
		
									event.preventDefault();
									event.stopPropagation();
		
									$modal.next();
		
									break;
		
							// Left arrow.
								case 37:
		
									if (!_this.navigation)
										break;
		
									event.preventDefault();
									event.stopPropagation();
		
									$modal.previous();
		
									break;
		
							// Home.
								case 36:
		
									if (!_this.navigation)
										break;
		
									event.preventDefault();
									event.stopPropagation();
		
									$modal.first();
		
									break;
		
							// End.
								case 35:
		
									if (!_this.navigation)
										break;
		
									event.preventDefault();
									event.stopPropagation();
		
									$modal.last();
		
									break;
		
							// Escape.
								case 27:
		
									event.preventDefault();
									event.stopPropagation();
		
									$modal.hide();
		
									break;
		
						}
		
					});
		
					$modalNext.addEventListener('click', function(event) {
						$modal.next();
					});
		
					$modalPrevious.addEventListener('click', function(event) {
						$modal.previous();
					});
		
				// Set.
					this.$modal = $modal;
					this.$modalImage = $modalImage;
					this.$modalNext = $modalNext;
					this.$modalPrevious = $modalPrevious;
		
			};
		
			/**
			 * Show.
			 * @param {string} href Image href.
			 */
			lightboxGallery.prototype.show = function(href, config) {
		
				// Update config.
					this.$links = config.$links;
					this.navigation = config.navigation;
					this.mobile = config.mobile;
		
					if (this.navigation) {
		
						this.$modalNext.style.display = '';
						this.$modalPrevious.style.display = '';
		
					}
					else {
		
						this.$modalNext.style.display = 'none';
						this.$modalPrevious.style.display = 'none';
		
					}
		
				// Mobile and not permitted? Bail.
					if (client.mobile && !this.mobile)
						return;
		
				// Show modal.
					this.$modal.show(href);
		
			};
		
			/**
			 * Zoom handler.
			 */
			lightboxGallery.prototype.zoomHandler = function() {
		
				var threshold = window.matchMedia('(orientation: portrait)').matches ? 50 : 100;
		
				// Zoomed in? Set zooming.
					if (window.outerWidth > window.innerWidth + threshold)
						this.$modal.classList.add('zooming');
		
				// Otherwise, clear zooming.
					else
						this.$modal.classList.remove('zooming');
		
			};
		
			var _lightboxGallery = new lightboxGallery;
	
	// Gallery: gallery.
		_lightboxGallery.init({
			id: 'gallery',
			navigation: true,
			mobile: true
		});

})();