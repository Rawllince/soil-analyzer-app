# Soil Quality Assessment Tool

A modern web application designed to help farmers assess soil quality and receive personalized crop recommendations based on soil parameters. Built with React, TypeScript, and Tailwind CSS for a responsive and user-friendly experience.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
The Soil Quality Assessment Tool empowers farmers and agricultural professionals to make data-driven decisions about crop selection. By analyzing key soil parameters such as soil type, moisture content, organic matter levels, and pH balance, the application provides scientifically-informed crop recommendations that optimize yield potential and promote sustainable farming practices.

The tool uses an intelligent recommendation algorithm that considers multiple soil factors simultaneously to suggest the most suitable crops for specific conditions, helping users maximize productivity while maintaining soil health.

## Features
- **Interactive Soil Assessment Form**: Easy-to-use interface for inputting soil parameters including:
  - Soil type selection (Clay, Sandy, Loam, Silt, Peat, Chalky)
  - Moisture level slider (0-100%)
  - Organic content percentage (0-10%)
  - pH level range (4-10)
- **Intelligent Crop Recommendations**: Dynamic algorithm that analyzes all input parameters to provide personalized crop suggestions
- **Detailed Crop Information**: Each recommendation includes:
  - Crop description and growing requirements
  - Suitability rating (Excellent/Good/Fair)
  - Key benefits and advantages
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Educational Content**: Information about sustainable agriculture and soil health
- **Contact Support**: Direct communication channel for questions and feedback

## Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI (Headless UI primitives)
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts (for future analytics features)
- **Package Manager**: Bun
- **Deployment**: Vercel

## Installation

### Prerequisites
- Node.js (version 18 or higher)
- Bun package manager (recommended) or npm

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rawllince/soil-quality-assessment-tool.git
   cd soil-quality-assessment-tool
   ```

2. **Install dependencies**
   ```bash
   # Using Bun (recommended)
   bun install

   # Or using npm
   npm install
   ```

3. **Start the development server**
   ```bash
   # Using Bun
   bun run dev

   # Or using npm
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

### Build for Production
```bash
# Using Bun
bun run build

# Or using npm
npm run build
```

## Usage

### Getting Started
1. Navigate to the homepage of the application
2. Fill out the soil assessment form with your soil parameters:
   - **Soil Type**: Select from available options (Clay, Sandy, Loam, Silt, Peat, Chalky)
   - **Moisture Level**: Use the slider to indicate soil moisture percentage
   - **Organic Content**: Set the organic matter percentage in your soil
   - **pH Level**: Adjust the pH slider to match your soil's acidity/alkalinity

3. Click "Get Crop Recommendations" to receive personalized suggestions

### Understanding Recommendations
The tool analyzes your inputs against a comprehensive crop database and returns up to 6 recommended crops, ranked by suitability:
- **Excellent**: Optimal conditions for maximum yield
- **Good**: Suitable conditions with good potential
- **Fair**: Acceptable conditions but may require additional management

Each recommendation includes:
- Detailed description of growing requirements
- Key benefits and advantages
- Suitability rating

### Navigation
- **Home**: Main assessment form and results
- **About**: Learn about the project and sustainable agriculture
- **Contact**: Get support and provide feedback

## Project Structure
```
soil-analyzer-app/
├── public/
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components (shadcn/ui)
│   │   ├── CropRecommendations.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── SoilAssessmentForm.jsx
│   ├── hooks/
│   │   ├── use-mobile.jsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Index.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   └── cropRecommendations.ts
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.js
└── README.md
```

## API Reference

### Crop Recommendation Algorithm

The core recommendation engine uses the following logic:

**Input Parameters:**
- `soilType`: String (clay | sandy | loam | silt | peat | chalky)
- `moisture`: Number (0-100)
- `organicContent`: Number (0-10)
- `ph`: Number (4-10)

**Output:**
Array of crop objects with:
- `name`: String
- `description`: String
- `suitability`: "excellent" | "good" | "fair"
- `benefits`: String[]

**Supported Crops:**
- Wheat, Corn (Maize), Rice, Potatoes, Soybeans
- Barley, Cotton, Carrots, Lettuce, Sunflowers
- Tomatoes, Alfalfa

Each crop has specific soil requirements that are evaluated against user inputs.

## Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Guidelines
- Follow the existing code style and TypeScript conventions
- Add tests for new features
- Update documentation as needed
- Ensure responsive design works across devices

### Areas for Contribution
- Additional crop recommendations
- Enhanced algorithm accuracy
- New UI features
- Performance optimizations
- Accessibility improvements

## License

This project is open source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for educational and commercial purposes.

## Contact

**Project Owner:** Rawllince Onyango Okello

- **Email:** rawllincecj@gmail.com
- **Phone:** +254 726 737 491
- **Live Demo:** [https://farmer-scheatsheet.vercel.app/](https://farmer-scheatsheet.vercel.app/)

For support, questions, or feedback:
- Use the contact form within the application
- Email directly for technical inquiries
- Open an issue on GitHub for bug reports

---

**Thank you for using the Soil Quality Assessment Tool!** We hope this application helps you make informed decisions for sustainable and productive farming.
