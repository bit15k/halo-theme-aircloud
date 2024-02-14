var catalog = []; // 全局变量，用于存储目录信息

function createCatalog(obj) {
    catalog = []; // 清空目录信息

    // 匹配文章标题标签，并添加锚点
    obj = obj.replace(/<h([1-6])(.*?)>(.*?)<\/h\1>/gi, function(match, level, attributes, title) {
        catalog.push({text: title.trim().replace(/<\/?[^>]+(>|$)/g, ''), depth: level}); // 存储目录信息
        var anchor = title.trim().replace(/<\/?[^>]+(>|$)/g, '').replace(/\s+/g, '-').toLowerCase(); // 生成锚点
        return '<h' + level + attributes + ' id="' + anchor + '"><a name="' + anchor + '"></a>' + title + '</h' + level + '>';
    });
    // console.log(catalog)
    return catalog;
}

function getCatalog() {
    var index = '';
    if (catalog.length > 0) {
        index = '<ol class="toc">\n';
        var prev_depth = '';
        var to_depth = 0;

        catalog.forEach(function(catalog_item) {
            var catalog_depth = catalog_item.depth;

            if (prev_depth) {
                if (catalog_depth == prev_depth) {
                    index += '</li>\n';
                } else if (catalog_depth > prev_depth) {
                    to_depth++;
                    index += '<ol class="toc-child">\n';
                } else {
                    var to_depth2 = (to_depth > (prev_depth - catalog_depth)) ? (prev_depth - catalog_depth) : to_depth;
                    if (to_depth2) {
                        for (var i = 0; i < to_depth2; i++) {
                            index += '</li>\n</ol>\n';
                            to_depth--;
                        }
                    }
                    index += '</li>';
                }
            }
            index += '<li class="toc-item"><a class="toc-link" href="#' + catalog_item.text + '"><span class="toc-text">' + catalog_item.text + '</span></a>';
            prev_depth = catalog_item.depth;
        });

        for (var i = 0; i <= to_depth; i++) {
            index += '</li>\n</ol>\n';
        }

        index = '<div id="toc" class="toc-article">\n' + index + '</div>\n';
    }
    //console.log(index);
    return index;
}
function replaceCatalog(newIndex) {
    var tocElement = document.getElementById("toc"); // 获取要替换的目标元素
    //console.log(tocElement.classList); // 查看元素的类名列表

    if (tocElement) {
        tocElement.outerHTML = newIndex; // 替换目标元素的内容
    }
}
