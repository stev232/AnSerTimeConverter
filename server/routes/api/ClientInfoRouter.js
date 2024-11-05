const router = require('express').Router();
const config = require('../../config/connection');
const seq = require('sequelize');

// GET: Fetch all ClientInfo records for a specific account number
router.get('/:accountNum', async (req, res) => {
  const accountNum = req.params.accountNum;
  const query = `
    SELECT 
      [id],
      [client_name],
      [contact_name],
      [contact_email],
      [contact_phone_number],
      [account_number]
    FROM [isapi].[dbo].[newClientPaperWork]
    WHERE [account_number] = :accountNum
    ORDER BY [client_name] ASC
  `;

  try {
    // Execute the query to fetch data based on account number
    const result = await config.query(query, {
      replacements: { accountNum },
      type: seq.QueryTypes.SELECT,
    });

    // If no records are found, return a 404 status
    if (result.length === 0) {
      return res.status(404).json({ message: 'No ClientInfo records found for this account number.' });
    }

    // Return the fetched records as a JSON response
    res.json(result);
  } catch (err) {
    console.error('Error fetching ClientInfo:', err);
    res.status(500).send('Error occurred: ' + err);
  }
});

// POST: Create a new ClientInfo record
router.post('/', async (req, res) => {
  const { account_number, client_name, contact_name, contact_email, contact_phone_number } = req.body;
  const query = `
    INSERT INTO [isapi].[dbo].[newClientPaperWork] 
      (account_number, client_name, contact_name, contact_email, contact_phone_number) 
    VALUES 
      (:account_number, :client_name, :contact_name, :contact_email, :contact_phone_number)
  `;

  try {
    // Execute the query to insert a new record
    await config.query(query, {
      replacements: { account_number, client_name, contact_name, contact_email, contact_phone_number },
      type: seq.QueryTypes.INSERT,
    });

    // Return success message after successful insertion
    res.status(201).send('ClientInfo record created successfully.');
  } catch (err) {
    console.error('Error creating ClientInfo:', err);
    res.status(500).send('Error occurred: ' + err);
  }
});

// PUT: Update an existing ClientInfo record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { client_name, contact_name, contact_email, contact_phone_number } = req.body;
  const query = `
    UPDATE [isapi].[dbo].[newClientPaperWork] 
    SET client_name = :client_name, 
        contact_name = :contact_name, 
        contact_email = :contact_email, 
        contact_phone_number = :contact_phone_number 
    WHERE id = :id
  `;

  try {
    // Execute the query to update the record
    await config.query(query, {
      replacements: { client_name, contact_name, contact_email, contact_phone_number, id },
      type: seq.QueryTypes.UPDATE,
    });

    // Return success message after successful update
    res.send('ClientInfo record updated successfully.');
  } catch (err) {
    console.error('Error updating ClientInfo:', err);
    res.status(500).send('Error occurred: ' + err);
  }
});

// DELETE: Remove a ClientInfo record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = `
    DELETE FROM [isapi].[dbo].[newClientPaperWork] 
    WHERE id = :id
  `;

  try {
    // Execute the query to delete the record
    await config.query(query, {
      replacements: { id },
      type: seq.QueryTypes.DELETE,
    });

    // Return success message after successful deletion
    res.send('ClientInfo record deleted successfully.');
  } catch (err) {
    console.error('Error deleting ClientInfo:', err);
    res.status(500).send('Error occurred: ' + err);
  }
});

// Export the router to be used in the main server file
module.exports = router;


