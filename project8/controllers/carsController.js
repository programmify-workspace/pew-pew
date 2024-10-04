const db = require('../config/db');

const carController = {
  getCars: async (req, res) => {
    try {
      // Extract query parameters from the request (filtering and pagination)
      const { make, year, price, page = 1 } = req.query;

      const limit = 8;  // Number of cars per page
      const offset = (page - 1) * limit;

      // Base query
      let query = 'SELECT * FROM cars WHERE 1=1';
      let queryParams = [];

      // Add filters dynamically
      if (make) {
        query += ' AND make = ?';
        queryParams.push(make);
      }
      if (year) {
        query += ' AND year = ?';
        queryParams.push(year);
      }
      if (price) {
        query += ' AND price <= ?';
        queryParams.push(price);
      }

      // Add pagination (limit and offset)
      query += ' LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);

      // Run the filtered query
      const result = await db.query(query, queryParams);

      // Get total count for pagination
      let countQuery = 'SELECT COUNT(*) AS count FROM cars WHERE 1=1';
      let countParams = queryParams.slice(0, -2); // remove limit and offset
      if (make) {
        countQuery += ' AND make = ?';
      }
      if (year) {
        countQuery += ' AND year = ?';
      }
      if (price) {
        countQuery += ' AND price <= ?';
      }
      const totalCountResult = await db.query(countQuery, countParams);
      const totalCount = totalCountResult[0][0].count;
      const totalPages = Math.ceil(totalCount / limit);

      // Get unique car makes for the dropdown
      const makesResult = await db.query('SELECT DISTINCT make FROM cars');
      const makes = makesResult[0].map(row => row.make);

      // Check if there are no cars found
      if (result[0].length === 0) {
        res.render('index', {
          cars: [],  // Pass an empty array for cars
          message: 'No cars found. Try different filters.',  // Pass the 'No cars found' message
          filters: { make, year, price },
          pagination: {
            currentPage: parseInt(page),
            totalPages: totalPages
          },
          makes: makes  // Pass the dynamic list of makes
        });
      } else {
        // Render the cars data as usual
        res.render('index', {
          cars: result[0],
          message: '',  // No message when cars are found
          filters: { make, year, price },
          pagination: {
            currentPage: parseInt(page),
            totalPages: totalPages
          },
          makes: makes  // Pass the dynamic list of makes
        });
      }
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).send('Oops! Internal Server Error');
    }
  }
}

module.exports = carController;
