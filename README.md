# Holistic Helper

Holistic Helper is an AI-powered platform that combines Traditional Chinese Medicine (TCM) with modern technology to empower practitioners and enhance patient care.

## Features

- **Streamlined Patient Management**: Organize, store, and access patient information effortlessly
- **AI-Driven Diagnostic Insights**: Generate comprehensive TCM diagnostic reports using advanced AI algorithms
- **Customized Treatment Planning**: Receive tailored recommendations for acupuncture points, herbal formulas, and lifestyle adjustments
- **Seamless Data Integration**: Integrates with Weaviate for knowledge retrieval and cloud storage solutions

## Technologies Used

- Next.js (React framework)
- TypeScript
- Supabase (Backend-as-a-Service)
- Weaviate (AI-powered knowledge graph)
- Tailwind CSS (Styling)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Supabase CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rowbot1/holistic-helper2.git
cd holistic-helper2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
holistic-helper/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── supabase/
│   ├── functions/        # Edge functions
│   └── migrations/       # Database migrations
└── public/               # Static assets
```

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For support or inquiries, please contact support@acuassist.com
