//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//


router.post('/check-answers-bulk', function (req, res) {
  // 1. Get the array of IDs checked by the user from the form data
  let selectedIDs = req.session.data['selected_prisoners'];

  // Handle edge case where a single checkbox submission arrives as a string instead of an array
  if (typeof selectedIDs === 'string') {
    selectedIDs = [selectedIDs];
  }

  // 2. Fetch your master array list of prisoners
  const allPrisoners = req.session.data['prisoners'] || [];

  // 3. Filter the list to find the matching prisoners and extract ONLY their names
  const chosenNames = allPrisoners
    .filter(prisoner => selectedIDs && selectedIDs.includes(prisoner.id.toString()))
    .map(prisoner => prisoner.name);

  // 4. Save the array of clean names into session memory for the next page
  req.session.data['bulkSelectedNames'] = chosenNames;

  // 5. Redirect to your destination summary view page
  res.redirect('/check-answers-bulk');
});

