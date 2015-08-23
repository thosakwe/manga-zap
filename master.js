ko.bindingHandlers.manga_image = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).attr('src', "https://cdn.mangaeden.com/mangasimg/" + valueAccessor());
    }
};
ko.bindingHandlers.manga_url = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).attr("href", "manga.html?manga=" + valueAccessor());
    }
};

ko.bindingHandlers.chapter_url = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).attr("href", "chapter.html?chapter=" + valueAccessor());
    }
};

ko.bindingHandlers.data_title = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).attr("data-title", valueAccessor() || "Untitled");
    }
};

ko.bindingHandlers.chapter_image = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var data = valueAccessor();
        $(element)
            .text(data[0])
            .attr("data-src", "https://cdn.mangaeden.com/mangasimg/" + data[1])
            .attr("data-width", data[2])
            .attr("data-height", data[3]);
    }
};

var faves = [];
var fs = require('fs');
function addFave() {
    faves.push(parse('manga'));
    fs.writeFile("favorites.json", JSON.stringify(faves), faveOn);
}
function removeFave() {
    var index = faves.indexOf(parse('manga'));
    if (index > -1) {
        faves.splice(index, 1);
    }
    fs.writeFile("favorites.json", JSON.stringify(faves), faveOff);
}
function faveOn(err) {
    if (!err)
        man.fave(true);
    $(".add_fave").click(addFave);
    $(".remove_fave").click(removeFave);
}
function faveOff(err) {
    if (!err)
        man.fave(false);
    $(".add_fave").click(addFave);
    $(".remove_fave").click(removeFave);
}
function loadFave() {
    fs.exists("favorites.json", function (exists) {
        if (exists) {
            fs.readFile("favorites.json", function (err, data) {
                if (err) throw err;
                else {
                    faves = JSON.parse(data) || [];
                    if ($.inArray(parse('manga'), faves) > -1) {
                        faveOn();
                    }
                }
            });
        }
    });
}

function goHome() {
    if (window.location.href.indexOf("read.html") < 0) {
        window.location = "read.html";
    }
}

$(function () {
    $.get('menu.html', function (data) {
        $("#menu").replaceWith(data);
    });
    window.setTimeout(function () {
        $('.card .dimmable.image').dimmer({
            on: 'hover'
        });
        $(".ui.dropdown").dropdown();
        $(".main.menu .item").tab();
        $(".page_loader").remove();
        $(".back.item").click(function () {
            window.history.go(-1);
        });
        $(".table").tablesort();
    }, 1000);

});