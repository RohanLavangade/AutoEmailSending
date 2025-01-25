const express = require('express');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/emails', emailRoutes);

// Error Handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
