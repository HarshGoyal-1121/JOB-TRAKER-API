require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/applications');
const remRoutes = require('./routes/reminders');
const { swaggerUi, specs } = require('./swagger');

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/reminders', remRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

require('./cron');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
