const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const dataFile = path.join(__dirname, 'applications.json');

app.post('/api/applications', async (req, res) => {
  const submission = { ...req.body, submittedAt: new Date().toISOString() };
  let existing = [];
  try {
    const content = await fs.readFile(dataFile, 'utf8');
    existing = JSON.parse(content);
  } catch (err) {
    // file might not exist yet
  }
  existing.push(submission);
  await fs.writeFile(dataFile, JSON.stringify(existing, null, 2));
  res.status(201).json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
