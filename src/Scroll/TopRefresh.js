/*

──────────────────────────────────────────
──────────────────────────────────────────
SCROLL TOP WHEN REFRESH BROWSER
──────────────────────────────────────────
──────────────────────────────────────────

R.TopRefresh()

*/

R.TopRefresh = function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0)
        }
    }
}
