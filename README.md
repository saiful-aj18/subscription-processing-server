````markdown
# 📚 Subscription Processing Server

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** that demonstrates a subscription-based system with **SSLCommerz payment integration**. Users can register, subscribe to different plans, access the Open Library Search API, and manage their subscriptions.

## 🚀 Features

- User registration with unique API Key generation
- Subscription plans
  - Free
  - Basic
  - Premium
- SSLCommerz payment gateway integration
- Open Library Search API proxy
- Cancel active subscription
- Mock payment success & failure callbacks
- Environment variable configuration
- RESTful API structure

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- SSLCommerz
- Axios
- dotenv
- UUID

---

## 📂 Project Structure

```
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/saiful-aj18/subscription-processing-server.git
```

### Navigate into the project

```bash
cd subscription-processing-server
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=3030

MONGODB_URI=your_mongodb_connection_string

SSL_STORE_ID=your_ssl_store_id
SSL_STORE_PASSWORD=your_ssl_store_password
SSL_IS_LIVE=false
```

### Start the server

```bash
npm run dev
```

---

## 📌 Base URL

```
http://localhost:3030
```

---

# API Endpoints

## Register User

**POST**

```
/api/register
```

Body

```json
{
  "email": "user@example.com"
}
```

---

## Subscribe

**POST**

```
/api/subscribe
```

Body

```json
{
  "apiKey": "YOUR_API_KEY",
  "targetTier": "basic"
}
```

Available tiers

- free
- basic
- premium

---

## Search Books

**GET**

```
/api/search?q=harry+potter&apiKey=YOUR_API_KEY
```

---

## Cancel Subscription

**POST**

```
/api/cancel-subscription
```

Body

```json
{
  "apiKey": "YOUR_API_KEY"
}
```

---

## Payment Success Callback

**POST**

```
/api/payment/success
```

---

## Payment Fail Callback

**POST**

```
/api/payment/fail
```

---

## Health Check

**GET**

```
/
```

---

# Testing

The API can be tested using:

- Bruno
- Postman
- Thunder Client

---

# Payment Flow

```
Register User
      │
      ▼
Receive API Key
      │
      ▼
Subscribe
      │
      ▼
SSLCommerz Payment Gateway
      │
      ▼
Payment Success / Fail Callback
      │
      ▼
Subscription Updated
      │
      ▼
Search Open Library API
```

---

## 📦 Scripts

```bash
npm run dev
npm start
```

---

## 👨‍💻 Author

**Saiful Islam**

GitHub: https://github.com/saiful-aj18
````
