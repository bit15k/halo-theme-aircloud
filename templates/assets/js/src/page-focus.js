module.exports = function (){
// 获取当前页面的相对路径
    var currentPagePath = window.location.pathname;

    // 获取id为nav-content的元素下所有的a标签
    var navLinks = document.querySelectorAll('#nav-content a');

    // 遍历所有的a标签
    for (var i = 0; i < navLinks.length; i++) {
        var link = navLinks[i];
        var href = link.getAttribute('href');

        // 如果href与当前页面的相对路径相同，则设置其父元素的class属性为active
        if (href === currentPagePath) {
            link.parentNode.classList.add('active');
        }
    }
}