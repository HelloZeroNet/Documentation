

$(function() {
	//$("[role=contentinfo]").append("<a href='#loadComments' class='loadcomments'>Load comments</a>");
	setTimeout(loadComments, 3000)
	$(".rst-current-version").on("click", function() {
		fixGithubLink($('.injected a:contains(View)'))
		fixGithubLink($('.injected a:contains(Edit)'))
	})
})

function fixGithubLink(elem) {
	if (elem.length)
		elem.attr("href", elem.attr("href").replace(/\/home\/docs\/checkouts\/readthedocs.org\/.*?\/latest/, ""))
}

function loadComments() {
	$("[role=contentinfo]").append('<div id="disqus_thread"></div>')

	var disqus_shortname = 'zeronet';

	(function() {
	    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
	    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	})();
}