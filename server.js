import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/soil-analyzer')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Models
const soilAssessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  soilType: String,
  moisture: Number,
  organicContent: Number,
  ph: Number,
  recommendations: [{
    name: String,
    description: String,
    suitability: String,
    benefits: [String]
  }],
  createdAt: { type: Date, default: Date.now }
});

const SoilAssessment = mongoose.model('SoilAssessment', soilAssessmentSchema);

// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '' },
  location: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/assessments', authenticateToken, async (req, res) => {
  try {
    const { soilType, moisture, organicContent, ph } = req.body;

    // Generate recommendations (using the same logic as frontend)
    const recommendations = getCropRecommendations({ soilType, moisture, organicContent, ph });

    const assessment = new SoilAssessment({
      userId: req.user.id,
      soilType,
      moisture,
      organicContent,
      ph,
      recommendations
    });

    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/assessments', authenticateToken, async (req, res) => {
  try {
    const assessments = await SoilAssessment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crop recommendation logic (moved from frontend)
function getCropRecommendations(data) {
  const { soilType, moisture, organicContent, ph } = data;
  const recommendations = [];

  // Wheat - versatile crop
  if ((soilType === "loam" || soilType === "clay") && ph >= 6 && ph <= 7.5 && moisture >= 40) {
    recommendations.push({
      name: "Wheat",
      description: "A staple grain crop ideal for your soil conditions. Thrives in moderate climates with adequate moisture.",
      suitability: moisture >= 60 && organicContent >= 2.5 ? "excellent" : "good",
      benefits: ["High market value", "Multiple varieties available", "Good rotation crop", "Drought tolerant once established"]
    });
  }

  // Corn - nutrient demanding
  if ((soilType === "loam" || soilType === "silt") && moisture >= 60 && organicContent >= 3 && ph >= 5.5 && ph <= 7) {
    recommendations.push({
      name: "Corn (Maize)",
      description: "High-yielding crop perfect for nutrient-rich soils. Requires consistent moisture throughout growing season.",
      suitability: organicContent >= 4 && moisture >= 70 ? "excellent" : "good",
      benefits: ["High yield potential", "Multiple uses (grain, silage, fresh)", "Good for organic matter retention", "Excellent rotation crop"]
    });
  }

  // Rice - water-loving
  if (moisture >= 80 && (soilType === "clay" || soilType === "silt") && ph >= 5.5 && ph <= 7) {
    recommendations.push({
      name: "Rice",
      description: "Excellent for waterlogged conditions and clay soils. Requires flooded fields or very high moisture.",
      suitability: moisture >= 90 && soilType === "clay" ? "excellent" : "good",
      benefits: ["Thrives in wet conditions", "High caloric yield per acre", "Improves soil structure", "Stable market demand"]
    });
  }

  // Potatoes - versatile
  if ((soilType === "sandy" || soilType === "loam") && moisture >= 50 && ph >= 5 && ph <= 6.5 && organicContent >= 2) {
    recommendations.push({
      name: "Potatoes",
      description: "Root vegetable that performs well in slightly acidic, well-drained soils with good organic content.",
      suitability: soilType === "loam" && organicContent >= 3 ? "excellent" : "good",
      benefits: ["High yield per acre", "Short growing season", "Multiple harvests possible", "Good storage crop"]
    });
  }

  // Soybeans - nitrogen-fixing
  if ((soilType === "loam" || soilType === "silt" || soilType === "clay") && ph >= 6 && ph <= 7 && moisture >= 50) {
    recommendations.push({
      name: "Soybeans",
      description: "Legume crop that enriches soil with nitrogen. Excellent for crop rotation and soil health.",
      suitability: organicContent >= 2.5 && moisture >= 60 ? "excellent" : "good",
      benefits: ["Fixes nitrogen in soil", "High protein content", "Good market value", "Improves soil for next crop"]
    });
  }

  // Barley - hardy grain
  if (ph >= 6.5 && ph <= 8 && moisture >= 35 && (soilType === "loam" || soilType === "clay" || soilType === "chalky")) {
    recommendations.push({
      name: "Barley",
      description: "Hardy grain crop tolerant of various conditions. Good for alkaline soils and lower moisture.",
      suitability: soilType === "loam" && ph >= 7 ? "excellent" : "good",
      benefits: ["Drought tolerant", "Short growing season", "Multiple uses (feed, malt, food)", "Tolerates alkaline soils"]
    });
  }

  // Sort by suitability
  const order = { excellent: 0, good: 1, fair: 2 };
  recommendations.sort((a, b) => order[a.suitability] - order[b.suitability]);

  // Return top 6 recommendations
  return recommendations.slice(0, 6);
}

// Auth routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Profile routes
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { email, name, location } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { email, name, location }, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});