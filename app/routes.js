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

router.post('/version-3-0/futher-details-needed', function (req, res) {
  var stillNeedTransfer = req.session.data['furtherDetails']

  if (stillNeedTransfer === 'yes') {
    res.redirect('/version-3-0/transfer-destination-optional')
  } else {
    res.redirect('/version-3-0/check-answers-plans-incomplete')
  }
})

router.post('/version-3-0/cancel-plan', function (req, res) {
  var stillNeedTransfer = req.session.data['cancelPlan']

  if (stillNeedTransfer === 'yes') {
    res.redirect('/version-3-0/confirmation-plan-cancelled')
  } else {
    res.redirect('/version-3-0/manage-prisoner-record-plans')
  }
})


module.exports = router