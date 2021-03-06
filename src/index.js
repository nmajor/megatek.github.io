require('../index.html');
require('./scss/style.scss');
var $ = require('./jquery-1.12.3');

var megatekDescTemplate = $('#content-body').html();
var akiraDescTemplate = require('./templates/akira-desc.html');
var nickDescTemplate = require('./templates/nick-desc.html');

function clearSelectionForChoppedImage($elm) {
  $elm.removeClass('nick')
  .removeClass('akira');

  return $elm;
}

function setChoppedImage($elm, selection) {
  var $child = $($elm.children('.whole')[0]);

  $elm.removeClass('selected')
  .addClass('selected');

  clearSelectionForChoppedImage($child).addClass(selection);
}

function unsetChoppedImage($elm) {
  var $child = $($elm.children('.whole')[0]);

  $elm.removeClass('selected');
}

function templateFactory(selection) {
  switch(selection) {
    case 'akira':
      return akiraDescTemplate;
    case 'nick':
      return nickDescTemplate;
    default:
      return megatekDescTemplate;
  }
}

function setContentBody($elm, selection) {
  $elm.addClass('hide');
  setTimeout(function() {
    $elm.html(templateFactory(selection));
    $elm.removeClass('hide');
  }, 700);
}

function unsetContentBody($elm) {
  $elm.addClass('hide');
  setTimeout(function() {
    $elm.html(templateFactory());
    $elm.removeClass('hide');
  }, 700);
}

function submitContactForm(event) {
  console.log('blah');
}

$(".chopped-image > .half").click(function(event) {
  var $elm = $(event.target);
  var $parent = $elm.parent();
  var selection = $elm.data('selection');

  setChoppedImage($parent, selection);
  setContentBody($('#content-body'), selection);
});

$(".chopped-image > .whole").click(function(event) {
  var $elm = $(event.target);
  var $parent = $elm.parent();

  unsetChoppedImage($parent);
  unsetContentBody($('#content-body'));
});
