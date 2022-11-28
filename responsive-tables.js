/*
* Responsive Table JQuery
* Code by M.Bilal93
* https://github.com/mbilal93/responsive-tables/
* */
if(typeof jQuery == 'undefined') {console.log('jQuery not found');}

$.fn.responsiveTables = function (opts) {
  var options = {
    breakpoint: 768, 
    onResponsive: new Function, 
    onRevert: new Function
  };
  $.extend(options, opts);
  let tables = [];
  let blocks = [];
  let parentTable = this;
  let childTable;
  let defaultBlock = table => {
      $(table).wrap('<div class="table-responsive-block-container"></div>');
      $(table).after('<div class="table-responsive-block"></div>');
      let block = $(table).next(".table-responsive-block");
      let heads = $(table).find("thead > tr").children();
      let foot = $(table).find("tfoot > tr").children();
     // block.hide();
      $(table).find("tbody > tr").each(function (j) {
          block.append('<div class="table-block"></div>');
          let table_block = block.children(":last-child");
          $(this).children().each(function (i) {
              let bodyclass = this.tagName === "TH" ? "thead head" : "body";
              let rowClass = "";
              bodyclass = bodyclass + " " + $(table).find("tbody").attr("class");
              if (typeof heads[i] !== "undefined") {
                  if (heads[i].innerHTML === "" && $(this).find("a").length > 0) {
                      rowClass = "is_button"
                  }
                  let head = '<div class="head">' + heads[i].innerHTML + "</div>";
                  table_block.append('<div class="block-row ' + rowClass + '">' + head + '<div class="' + bodyclass + '">' + this.innerHTML + "</div></div>")
              } else {
                  table_block.append('<div class="block-row ' + rowClass + ' nohead"><div class="' + bodyclass + '">' + this.innerHTML + "</div></div>")
              }
              if (j > 0) {
                  $(table_block).find(".head:not(.thead) .chkcontainer").remove()
              } else if (j === 0 && i === 0) {
                  let h = $(table_block).find(".head:not(.thead) .chkcontainer");
                  $(table_block).find(".head:not(.thead) .chkcontainer").remove();
                  $(table_block).before(h);
                  $(table_block).prev().wrap('<div class="table-block body checkall"></div>')
              }
          });
          if ($(table).find("tfoot").length > 0) {
              if (typeof foot[j + 1] !== "undefined") {
                  table_block.append('<div class="block-row block-footer"><div class="head">' + foot[0].innerHTML + '</div><div class="body">' + foot[j + 1].innerHTML + "</div></div>")
              }
          }
      }).promise().done(()=>{
          childTable = $(parentTable).next('.table-responsive-block');
      })
  };
  let makeResponsive = () => {
      $(".table-responsive-block-container").each(function (k) {
          var w = window.innerWidth;
          //const childTable = $(parentTable).next(".table-responsive-block");
          var breakpoint = options.breakpoint;
          if (w < breakpoint) {
              if ($(this).children().eq(0).hasClass("table")) {
                  $(this).html(blocks[k]);
                  if (!$(this).hasClass("table-responsive-active")) {
                      options.onResponsive();
                      $(this).addClass("table-responsive-active")
                  }
                  //$(parentTable).hide();
                 // childTable.show()
                  
                  $(this).html(childTable);
              }
          } else {
              // $(parentTable).show();
              // childTable.hide();
              $(this).html(parentTable);
              if ($(this).hasClass("table-responsive-active")) {
                  options.onRevert();
                  $(this).removeClass("table-responsive-active")
              }
          }
      })
  };
  $(this).each(function () {
      var _this = this;
      setTimeout(function () {
          defaultBlock(_this)
      }, 200)
  }).promise().done(function () {
      let s;
      setTimeout(function () {
          $(".table-responsive-block-container").each(function (k) {
              tables[k] = $(this).children("table");
              blocks[k] = $(this).children(".table-responsive-block")
          });
          $(".table-responsive-block-container").children(".table-responsive-block").remove();
          clearTimeout(s);
          s = setTimeout(function () {
              makeResponsive();
              $(window).bind("resize", makeResponsive)
          }, 100)
      }, 100)
  })
};