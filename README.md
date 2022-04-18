# Simple Data ETL-V metrics dashboard
![This is an image](https://user-images.githubusercontent.com/98665493/163761215-f72793c7-9249-4157-ace1-6bb389a2c8a0.png)

This example demonstrates:
- Basic API endpoints to send data based on a .csv file (vanilla JS)
- Data filtering for datasource and campaign (or combined)
- Frontend application built in React (Typescript)
- Minimal use of UI library (basic html elements)
- State management using React hooks
- Development environment using Vitejs (HMR)
- Data visualization using chartjs
- Styling using tailwind.css (no css)
- Responsive
- Light/dark mode toggle

# Installation

To run the application, you will need to run both the API and Frontend simultineously.

## Backend

Starting from the `root` folder, navigate to the `server` folder
```
cd server
```
install dependancies 
```
npm i
```
build the API
```
npm run build
```
launch API server
```
npm run server
```
API is running on `http://localhost:8080/`

## Frontend

From the `root` folder
```
npm i
```
run the app
```
npm run dev
```
Frontend is running on `http://localhost:3000/`


