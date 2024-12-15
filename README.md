# DishFindr Main Program

## Overview
DishFindr is a microservice-based web application designed to provide personalized recipe, wine, and dish recommendations. The main program serves as the core application, integrating various microservices to deliver seamless functionality.

## Features
- User authentication
- Management of user dietary restrictions and allergies
- Ingredient-based recipe recommendations
- Wine pairing suggestions
- Dish recommendations based on wine selection

## Architecture
The application follows a microservice architecture consisting of the following components:

1. **Main Program**: Serves as the frontend and API gateway.
2. **Microservices**:
    - [User Preferences Microservice](https://github.com/sirus-the-beaver/cs361-microservice-b)
    - [Recipe Recommendation Microservice](https://github.com/sirus-the-beaver/cs361-microservice-c)
    - [Wine Recommendation Microservice](https://github.com/sirus-the-beaver/cs361-microservice-d)

Each microservice is responsible for its domain logic and communicates with the main program through RESTful APIs.

## Tech Stack
- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **API**: [Spoonacular API](https://spoonacular.com/food-api)
- **Deployment**: Heroku