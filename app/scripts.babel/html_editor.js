'use strict'

$(function() {
  let switchFlg = false,
    alisHtmlEditorId = 'alis-html-editor',
    htmlConvertBtnDefaultText = chrome.i18n.getMessage(
      'htmlConvertBtnDefaultMessage'
    ),
    $htmlConvertBtn = $('<button>')
      .addClass('btn-txt')
      .text(htmlConvertBtnDefaultText)

  $htmlConvertBtn.on('click', function() {
    let $areaBody = $('.area-body')
    if (switchFlg) {
      let $htmlTextarea = $(`#${alisHtmlEditorId}`)
      $areaBody.empty()
      $areaBody.append($htmlTextarea.val())
      $htmlTextarea.remove()
      $areaBody.css({ display: '' })

      $htmlConvertBtn.text(htmlConvertBtnDefaultText)
    } else {
      $areaBody.find('.medium-insert-buttons').remove()
      $areaBody.find('.medium-insert-active').remove()

      $areaBody.css({ display: 'none' })

      let $htmlTextarea = $('<textarea>')
        .attr({
          id: alisHtmlEditorId,
          rows: 500
        })
        .val(alisEx.formatFactory($areaBody.html()))
      $areaBody.after($htmlTextarea)

      $htmlConvertBtn.text(
        chrome.i18n.getMessage('htmlConvertBtnReturnMessage')
      )
    }
    switchFlg = !switchFlg
  })
  let $htmlConvertDiv = $('<div>')
    .addClass('html-convert-btn')
    .append($htmlConvertBtn)
  if (alisEx.isArticleEditPage(location.href)) {
    $('body').append($htmlConvertDiv)
  }
  let href = location.href,
    observer = new MutationObserver(function(mutations) {
      let currentHref = location.href
      if (href !== currentHref) {
        if (!alisEx.isArticleEditPage(currentHref)) {
          $htmlConvertDiv.remove()
        }
      }
    })

  observer.observe(document, { childList: true, subtree: true })
})
