# Neighborhood SF Trip Challenge Dashboard

This is a dashboard for tracking participant progress in the Neighborhood SF Trip Challenge, where students need to complete 100 hours of coding to qualify for a trip to San Francisco.

## Features

- **Dashboard Overview**: Visualize overall statistics and progress
- **Participant Listing**: View all participants with detailed information
- **Search & Filtering**: Find participants by name, GitHub username, Slack name, or airport code
- **Progress Tracking**: See how participants are progressing toward their 100-hour goal
- **Time Breakdown**: Visualize time spent in different tracking methods (Hackatime vs Stopwatch)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Source

The dashboard fetches data from the Neighborhood API at:
```
https://adventure-time.hackclub.dev/api/getNeighborsSecurely
```

This API provides participant information including:
- Personal details (name, profile picture)
- Time tracking data across different methods
- Social profiles (GitHub, Slack)
- Airport information

## Technology Stack

- Next.js
- React
- Chart.js for data visualization
- Custom CSS with no frameworks - pure CSS styling with a modern component-based architecture

## Styling Approach

The dashboard uses a custom CSS system with:

- CSS Variables for colors, spacing, shadows, and typography
- Component-based modular CSS classes
- Modern layout techniques (Flexbox and Grid)
- No external CSS frameworks
- Responsive design for mobile, tablet, and desktop

The design features a Neighborhood-inspired color palette with vibrant colors, modern card layouts, and engaging data visualizations. 