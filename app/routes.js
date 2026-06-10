//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Intercept form submit from /version-3-0/cancel-or-move
router.post('/version-3-0/cancel-or-move', function (req, res) {
  var stillNeedTransfer = req.session.data['stillNeedTransfer']

  if (stillNeedTransfer === 'yes') {
    res.redirect('/version-3-0/transfer-moved')
  } else {
    res.redirect('/version-3-0/transfer-cancelled')
  }
})

module.exports = router