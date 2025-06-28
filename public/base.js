// @ts-check
var loadStartedAt = Date.now();
var prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
var themes = ['light-theme', 'dark-theme'];
var documentElement = document.documentElement;
var preferredTheme = prefersDark ? themes[1] : themes[0];

console.log({ preferredTheme, prefersDark });

documentElement.classList.add(preferredTheme);

var isStandalone = matchMedia && matchMedia('(display-mode: standalone)').matches;

function removeSplash() {
  var nodes = Array.from(document.querySelectorAll('.splash'));
  if (!nodes.length) return;

  for (var idx = 0; idx < nodes.length; idx++) {
    var parentElement = nodes[idx].parentElement;
    if (nodes[idx] && parentElement && nodes[idx].tagName !== 'SCRIPT') {
      parentElement.removeChild(nodes[idx]);
    }
  }

  window.dispatchEvent(new CustomEvent('splashcomplete'));
  window.removeEventListener('routeloaded', removeSplash);
  documentElement.removeAttribute('no-scroll');
}

function onRouteLoad() {
  var currentTime = Date.now();
  var timeGap = 1500 - (currentTime - loadStartedAt);
  setTimeout(removeSplash, timeGap);
}

function init() {
  documentElement.setAttribute('no-scroll', 'true');

  // Remove Splash immediately when is PWA (Standalone)
  isStandalone && removeSplash();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('routeloaded', onRouteLoad);

init();
