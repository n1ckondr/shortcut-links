const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.route'));
app.use('/t', require('./routes/redirect.routes'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 5000;
const URI = config.get('mongoURI');

async function start() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);
    });
  } catch (e) {
    console.log(`Server Error: ${e.message}`);
    process.exit(1);
  }
}

start().catch(console.dir);
